import React, { useState, useEffect, useRef } from 'react';

// --- 1. Type Definitions ---
interface Entity {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MovingPlatform extends Entity {
  startX: number;
  endX: number;
  speed: number;
  dir: number;
}

interface Enemy extends Entity {
  startX: number;
  endX: number;
  speed: number;
  dir: number;
  vy: number;
  onGround: boolean;
}

interface LevelData {
  platforms: Entity[];
  movingPlatforms: MovingPlatform[];
  enemies: Enemy[];
  spikes: Entity[];
  invisiblePlatforms: Entity[];
  goalFlag: Entity;
}

interface Player extends Entity {
  vx: number;
  vy: number;
  onGround: boolean;
  direction: number;
  state: 'idle' | 'running' | 'jumping';
  invincible: boolean;
  invincibleTimer: number;
  hasDoubleJump: boolean;
}

interface GameState extends LevelData {
  player: Player;
  camera: { x: number };
}

// --- 2. Main Component ---
export default function FlatPlatformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number>(0);
  const [level, setLevel] = useState(1);
  const [godMode, setGodMode] = useState(false);
  
  // Input tracking
  const keys = useRef({ left: false, right: false, up: false, jumpPressed: false });

  // Helper to generate level data with proper types
  const getLevelData = (levelNum: number): LevelData => {
    const levels: Record<number, LevelData> = {
      1: {
        platforms: [
          { x: 0, y: 400, w: 300, h: 20 },
          { x: 400, y: 350, w: 200, h: 20 },
          { x: 2400, y: 300, w: 500, h: 20 }
        ],
        movingPlatforms: [],
        enemies: [],
        spikes: [],
        invisiblePlatforms: [],
        goalFlag: { x: 2800, y: 260, w: 40, h: 100 }
      },
      // ... Add other levels here following the LevelData interface
    };

    // Fallback for high levels (Level 10+)
    if (levelNum >= 10) {
        // Logic for procedural/cycled levels
        return levels[1]; // Simplified for this snippet
    }

    return levels[levelNum] || levels[1];
  };

  // --- 3. Game State Initialization ---
  const gameStateRef = useRef<GameState>({
    player: { 
      x: 100, y: 300, w: 28, h: 38, vx: 0, vy: 0, 
      onGround: false, direction: 1, state: 'idle',
      invincible: false, invincibleTimer: 0, hasDoubleJump: false 
    },
    camera: { x: 0 },
    ...getLevelData(1)
  });

  // --- 4. Game Loop & Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const update = () => {
      const state = gameStateRef.current;
      const { player, movingPlatforms, enemies } = state;

      // Update Moving Platforms (Fixes your Vercel Error)
      movingPlatforms.forEach((platform: MovingPlatform) => {
        platform.x += platform.speed * platform.dir;
        if (platform.x >= platform.endX || platform.x <= platform.startX) {
          platform.dir *= -1;
        }
      });

      // Update Enemies
      enemies.forEach((enemy: Enemy) => {
        enemy.x += enemy.speed * enemy.dir;
        if (enemy.x >= enemy.endX || enemy.x <= enemy.startX) {
          enemy.dir *= -1;
        }
      });

      // Basic Player Physics (Example)
      player.vy += 0.8; // Gravity
      player.x += player.vx;
      player.y += player.vy;

      // Screen scrolling
      state.camera.x = player.x - canvas.width / 2;

      draw(ctx, state);
      animationFrame.current = requestAnimationFrame(update);
    };

    const draw = (ctx: CanvasRenderingContext2D, state: GameState) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Draw Platforms
      ctx.fillStyle = '#4a4e69';
      state.platforms.forEach(p => {
        ctx.fillRect(p.x - state.camera.x, p.y, p.w, p.h);
      });

      // Draw Moving Platforms
      ctx.fillStyle = '#9a8c98';
      state.movingPlatforms.forEach(p => {
        ctx.fillRect(p.x - state.camera.x, p.y, p.w, p.h);
      });

      // Draw Player
      ctx.fillStyle = godMode ? '#ff0' : '#f2e9e4';
      ctx.fillRect(player.x - state.camera.x, player.y, player.w, player.h);
    };

    update();
    return () => cancelAnimationFrame(animationFrame.current);
  }, [godMode, level]);

  // --- 5. Controls ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'a') keys.current.left = true;
      if (e.key === 'd') keys.current.right = true;
      if (e.key === ' ' || e.key === 'w') keys.current.up = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'a') keys.current.left = false;
      if (e.key === 'd') keys.current.right = false;
      if (e.key === ' ' || e.key === 'w') keys.current.up = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">
      <h1 className="text-white text-2xl mb-4">Level {level} {godMode && "(God Mode)"}</h1>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="border-4 border-gray-700 rounded-lg shadow-2xl bg-blue-900"
      />
    </div>
  );
}
