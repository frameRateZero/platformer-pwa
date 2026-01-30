import React, { useState, useEffect, useRef } from 'react';

export default function FlatPlatformer() {
  const canvasRef = useRef(null);
  const animationFrame = useRef(0);
  const [level, setLevel] = useState(1);
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [godMode, setGodMode] = useState(false);
  const [controlMode, setControlMode] = useState(null); // null = menu, 'keyboard', 'mobile'
  const [touchControls, setTouchControls] = useState({ left: false, right: false, jump: false });
  
  const getLevelData = (levelNum) => {
    const levels = {
      1: {
        platforms: [
          { x: 0, y: 400, w: 300, h: 20 },
          { x: 400, y: 350, w: 200, h: 20 },
          { x: 700, y: 300, w: 150, h: 20 },
          { x: 950, y: 350, w: 200, h: 20 },
          { x: 1200, y: 300, w: 250, h: 20 },
          { x: 1500, y: 250, w: 150, h: 20 },
          { x: 1700, y: 300, w: 300, h: 20 },
          { x: 2100, y: 350, w: 200, h: 20 },
          { x: 2400, y: 300, w: 500, h: 20 }
        ],
        movingPlatforms: [],
        enemies: [],
        spikes: [],
        invisiblePlatforms: [],
        goalFlag: { x: 2800, y: 260, w: 40, h: 100 }
      },
      2: {
        platforms: [
          { x: 0, y: 450, w: 250, h: 20 },
          { x: 320, y: 400, w: 150, h: 20 },
          { x: 750, y: 300, w: 140, h: 20 },
          { x: 960, y: 250, w: 180, h: 20 },
          { x: 1210, y: 300, w: 140, h: 20 },
          { x: 1800, y: 350, w: 200, h: 20 },
          { x: 2080, y: 300, w: 200, h: 20 },
          { x: 2350, y: 250, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 540, y: 350, w: 120, h: 15, startX: 470, endX: 680, speed: 2, dir: 1 },
          { x: 1420, y: 320, w: 120, h: 15, startX: 1360, endX: 1600, speed: 2, dir: 1 },
          { x: 1920, y: 320, w: 100, h: 15, startX: 1850, endX: 2000, speed: 2.5, dir: 1 }
        ],
        enemies: [
          { x: 1000, y: 220, w: 25, h: 25, startX: 950, endX: 1080, speed: 1.5, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 1800, y: 330, w: 80, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2680, y: 210, w: 40, h: 100 }
      },
      3: {
        platforms: [
          { x: 0, y: 420, w: 220, h: 20 },
          { x: 290, y: 380, w: 120, h: 20 },
          { x: 670, y: 300, w: 120, h: 20 },
          { x: 1050, y: 220, w: 180, h: 20 },
          { x: 1490, y: 300, w: 120, h: 20 },
          { x: 1680, y: 340, w: 120, h: 20 },
          { x: 2120, y: 250, w: 150, h: 20 },
          { x: 2340, y: 220, w: 500, h: 20 }
        ],
        movingPlatforms: [
          { x: 480, y: 340, w: 110, h: 15, startX: 410, endX: 590, speed: 2, dir: 1 },
          { x: 860, y: 260, w: 110, h: 15, startX: 790, endX: 970, speed: 2, dir: 1 },
          { x: 1300, y: 260, w: 110, h: 15, startX: 1230, endX: 1410, speed: 2, dir: 1 },
          { x: 1870, y: 300, w: 120, h: 15, startX: 1800, endX: 2030, speed: 2.5, dir: 1 }
        ],
        enemies: [
          { x: 480, y: 310, w: 25, h: 25, startX: 480, endX: 580, speed: 1.2, dir: 1, vy: 0, onGround: false },
          { x: 1870, y: 270, w: 25, h: 25, startX: 1870, endX: 2030, speed: 1.5, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 1050, y: 200, w: 100, h: 20 },
          { x: 1490, y: 280, w: 80, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2770, y: 180, w: 40, h: 100 }
      },
      4: {
        platforms: [
          { x: 0, y: 440, w: 200, h: 20 },
          { x: 280, y: 390, w: 130, h: 20 },
          { x: 590, y: 340, w: 120, h: 20 },
          { x: 900, y: 290, w: 120, h: 20 },
          { x: 1210, y: 340, w: 120, h: 20 },
          { x: 1520, y: 380, w: 120, h: 20 },
          { x: 1830, y: 330, w: 120, h: 20 },
          { x: 2140, y: 280, w: 150, h: 20 },
          { x: 2470, y: 250, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 480, y: 360, w: 120, h: 15, startX: 410, endX: 580, speed: 2.2, dir: 1 },
          { x: 1110, y: 310, w: 120, h: 15, startX: 1020, endX: 1200, speed: 2.2, dir: 1 },
          { x: 1730, y: 350, w: 120, h: 15, startX: 1640, endX: 1820, speed: 2.2, dir: 1 }
        ],
        enemies: [
          { x: 900, y: 260, w: 25, h: 25, startX: 900, endX: 1000, speed: 1.4, dir: 1, vy: 0, onGround: false },
          { x: 1830, y: 300, w: 25, h: 25, startX: 1830, endX: 1930, speed: 1.5, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 1210, y: 320, w: 80, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2800, y: 210, w: 40, h: 100 }
      },
      5: {
        platforms: [
          { x: 0, y: 450, w: 200, h: 20 },
          { x: 300, y: 400, w: 140, h: 20 },
          { x: 620, y: 350, w: 130, h: 20 },
          { x: 940, y: 300, w: 130, h: 20 },
          { x: 1260, y: 250, w: 150, h: 20 },
          { x: 1590, y: 300, w: 130, h: 20 },
          { x: 1910, y: 350, w: 130, h: 20 },
          { x: 2230, y: 300, w: 130, h: 20 },
          { x: 2550, y: 250, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 510, y: 370, w: 130, h: 15, startX: 440, endX: 610, speed: 2.3, dir: 1 },
          { x: 830, y: 320, w: 130, h: 15, startX: 750, endX: 930, speed: 2.3, dir: 1 },
          { x: 1480, y: 270, w: 130, h: 15, startX: 1410, endX: 1580, speed: 2.3, dir: 1 },
          { x: 2120, y: 320, w: 130, h: 15, startX: 2040, endX: 2220, speed: 2.4, dir: 1 }
        ],
        enemies: [
          { x: 620, y: 320, w: 25, h: 25, startX: 620, endX: 730, speed: 1.5, dir: 1, vy: 0, onGround: false },
          { x: 1260, y: 220, w: 25, h: 25, startX: 1260, endX: 1390, speed: 1.6, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 940, y: 280, w: 80, h: 20 },
          { x: 1910, y: 330, w: 80, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2880, y: 210, w: 40, h: 100 }
      },
      6: {
        platforms: [
          { x: 0, y: 430, w: 220, h: 20 },
          { x: 330, y: 380, w: 130, h: 20 },
          { x: 650, y: 330, w: 120, h: 20 },
          { x: 1260, y: 260, w: 150, h: 20 },
          { x: 1600, y: 310, w: 120, h: 20 },
          { x: 1920, y: 360, w: 120, h: 20 },
          { x: 2240, y: 310, w: 120, h: 20 },
          { x: 2560, y: 260, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 540, y: 350, w: 130, h: 15, startX: 460, endX: 640, speed: 2.4, dir: 1 },
          { x: 860, y: 300, w: 140, h: 15, startX: 770, endX: 970, speed: 2.4, dir: 1 },
          { x: 1100, y: 280, w: 140, h: 15, startX: 1010, endX: 1250, speed: 2.4, dir: 1 },
          { x: 1490, y: 330, w: 130, h: 15, startX: 1410, endX: 1590, speed: 2.4, dir: 1 },
          { x: 2130, y: 330, w: 130, h: 15, startX: 2040, endX: 2230, speed: 2.5, dir: 1 }
        ],
        enemies: [
          { x: 650, y: 300, w: 25, h: 25, startX: 650, endX: 750, speed: 1.6, dir: 1, vy: 0, onGround: false },
          { x: 1260, y: 230, w: 25, h: 25, startX: 1260, endX: 1390, speed: 1.7, dir: 1, vy: 0, onGround: false },
          { x: 2240, y: 280, w: 25, h: 25, startX: 2240, endX: 2340, speed: 1.7, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 860, y: 280, w: 70, h: 20 },
          { x: 1600, y: 290, w: 70, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2890, y: 220, w: 40, h: 100 }
      },
      7: {
        platforms: [
          { x: 0, y: 440, w: 200, h: 20 },
          { x: 320, y: 390, w: 140, h: 20 },
          { x: 1340, y: 290, w: 150, h: 20 },
          { x: 2180, y: 270, w: 150, h: 20 },
          { x: 2600, y: 260, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 530, y: 360, w: 140, h: 15, startX: 460, endX: 660, speed: 2.5, dir: 1 },
          { x: 750, y: 330, w: 140, h: 15, startX: 660, endX: 860, speed: 2.5, dir: 1 },
          { x: 970, y: 300, w: 140, h: 15, startX: 860, endX: 1080, speed: 2.5, dir: 1 },
          { x: 1190, y: 310, w: 140, h: 15, startX: 1080, endX: 1330, speed: 2.5, dir: 1 },
          { x: 1570, y: 310, w: 150, h: 15, startX: 1490, endX: 1700, speed: 2.6, dir: 1 },
          { x: 1850, y: 290, w: 150, h: 15, startX: 1700, endX: 1970, speed: 2.6, dir: 1 },
          { x: 2070, y: 290, w: 130, h: 15, startX: 1970, endX: 2170, speed: 2.6, dir: 1 }
        ],
        enemies: [
          { x: 750, y: 300, w: 25, h: 25, startX: 750, endX: 840, speed: 1.7, dir: 1, vy: 0, onGround: false },
          { x: 1340, y: 260, w: 25, h: 25, startX: 1340, endX: 1470, speed: 1.8, dir: 1, vy: 0, onGround: false },
          { x: 2180, y: 240, w: 25, h: 25, startX: 2180, endX: 2310, speed: 1.9, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 970, y: 280, w: 70, h: 20 },
          { x: 1850, y: 270, w: 70, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 2930, y: 220, w: 40, h: 100 }
      },
      8: {
        platforms: [
          { x: 0, y: 450, w: 220, h: 20 },
          { x: 1400, y: 280, w: 160, h: 20 },
          { x: 2800, y: 270, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 290, y: 410, w: 150, h: 15, startX: 220, endX: 450, speed: 2.7, dir: 1 },
          { x: 520, y: 370, w: 150, h: 15, startX: 450, endX: 680, speed: 2.7, dir: 1 },
          { x: 750, y: 330, w: 150, h: 15, startX: 680, endX: 910, speed: 2.7, dir: 1 },
          { x: 980, y: 300, w: 150, h: 15, startX: 910, endX: 1140, speed: 2.7, dir: 1 },
          { x: 1210, y: 300, w: 150, h: 15, startX: 1140, endX: 1390, speed: 2.7, dir: 1 },
          { x: 1650, y: 300, w: 150, h: 15, startX: 1560, endX: 1810, speed: 2.8, dir: 1 },
          { x: 1880, y: 330, w: 150, h: 15, startX: 1810, endX: 2040, speed: 2.8, dir: 1 },
          { x: 2110, y: 300, w: 150, h: 15, startX: 2040, endX: 2270, speed: 2.8, dir: 1 },
          { x: 2600, y: 290, w: 150, h: 15, startX: 2500, endX: 2790, speed: 2.8, dir: 1 }
        ],
        enemies: [
          { x: 750, y: 300, w: 25, h: 25, startX: 750, endX: 850, speed: 1.9, dir: 1, vy: 0, onGround: false },
          { x: 1400, y: 250, w: 25, h: 25, startX: 1400, endX: 1540, speed: 2, dir: 1, vy: 0, onGround: false },
          { x: 2110, y: 270, w: 25, h: 25, startX: 2110, endX: 2230, speed: 2, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 980, y: 280, w: 60, h: 20 },
          { x: 1880, y: 310, w: 60, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 3130, y: 230, w: 40, h: 100 }
      },
      9: {
        platforms: [
          { x: 0, y: 460, w: 200, h: 20 },
          { x: 1600, y: 290, w: 180, h: 20 },
          { x: 3200, y: 270, w: 400, h: 20 }
        ],
        movingPlatforms: [
          { x: 270, y: 420, w: 160, h: 15, startX: 200, endX: 460, speed: 2.9, dir: 1 },
          { x: 530, y: 380, w: 160, h: 15, startX: 460, endX: 720, speed: 2.9, dir: 1 },
          { x: 790, y: 340, w: 160, h: 15, startX: 720, endX: 980, speed: 2.9, dir: 1 },
          { x: 1050, y: 310, w: 160, h: 15, startX: 980, endX: 1240, speed: 2.9, dir: 1 },
          { x: 1310, y: 310, w: 160, h: 15, startX: 1240, endX: 1590, speed: 2.9, dir: 1 },
          { x: 1870, y: 310, w: 170, h: 15, startX: 1780, endX: 2060, speed: 3, dir: 1 },
          { x: 2130, y: 340, w: 170, h: 15, startX: 2060, endX: 2320, speed: 3, dir: 1 },
          { x: 2390, y: 310, w: 170, h: 15, startX: 2320, endX: 2580, speed: 3, dir: 1 },
          { x: 2650, y: 280, w: 170, h: 15, startX: 2580, endX: 2840, speed: 3, dir: 1 },
          { x: 2910, y: 290, w: 170, h: 15, startX: 2840, endX: 3190, speed: 3, dir: 1 }
        ],
        enemies: [
          { x: 790, y: 310, w: 25, h: 25, startX: 790, endX: 920, speed: 2.1, dir: 1, vy: 0, onGround: false },
          { x: 1600, y: 260, w: 25, h: 25, startX: 1600, endX: 1760, speed: 2.2, dir: 1, vy: 0, onGround: false },
          { x: 2390, y: 280, w: 25, h: 25, startX: 2390, endX: 2540, speed: 2.2, dir: 1, vy: 0, onGround: false }
        ],
        spikes: [
          { x: 1050, y: 290, w: 60, h: 20 },
          { x: 2130, y: 320, w: 60, h: 20 }
        ],
        invisiblePlatforms: [],
        goalFlag: { x: 3530, y: 230, w: 40, h: 100 }
      }
    };
    
    if (levelNum >= 10) {
      const levelVariations = {
        10: {
          platforms: [
            { x: 0, y: 450, w: 220, h: 20 },
            { x: 1500, y: 300, w: 150, h: 20 },
            { x: 2500, y: 250, w: 400, h: 20 }
          ],
          movingPlatforms: [
            { x: 290, y: 400, w: 130, h: 15, startX: 220, endX: 450, speed: 2.5, dir: 1 }
          ],
          enemies: [
            { x: 1500, y: 270, w: 25, h: 25, startX: 1500, endX: 1630, speed: 1.8, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 1100, y: 330, w: 60, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 550, y: 370, w: 150, h: 20 },
            { x: 780, y: 350, w: 150, h: 20 },
            { x: 1010, y: 350, w: 150, h: 20 },
            { x: 1240, y: 330, w: 150, h: 20 },
            { x: 1740, y: 320, w: 140, h: 20 },
            { x: 1960, y: 300, w: 140, h: 20 },
            { x: 2180, y: 280, w: 140, h: 20 }
          ],
          goalFlag: { x: 2830, y: 210, w: 40, h: 100 }
        },
        11: {
          platforms: [
            { x: 0, y: 460, w: 200, h: 20 },
            { x: 2000, y: 280, w: 140, h: 20 },
            { x: 3200, y: 270, w: 400, h: 20 }
          ],
          movingPlatforms: [],
          enemies: [
            { x: 2000, y: 250, w: 25, h: 25, startX: 2000, endX: 2120, speed: 2, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 1200, y: 330, w: 70, h: 20 },
            { x: 2600, y: 300, w: 70, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 270, y: 410, w: 160, h: 20 },
            { x: 500, y: 380, w: 160, h: 20 },
            { x: 730, y: 360, w: 160, h: 20 },
            { x: 960, y: 350, w: 160, h: 20 },
            { x: 1200, y: 350, w: 160, h: 20 },
            { x: 1440, y: 330, w: 160, h: 20 },
            { x: 1680, y: 310, w: 160, h: 20 },
            { x: 2220, y: 300, w: 150, h: 20 },
            { x: 2450, y: 300, w: 150, h: 20 },
            { x: 2680, y: 290, w: 150, h: 20 },
            { x: 2910, y: 280, w: 150, h: 20 }
          ],
          goalFlag: { x: 3530, y: 230, w: 40, h: 100 }
        },
        12: {
          platforms: [
            { x: 0, y: 450, w: 220, h: 20 },
            { x: 800, y: 320, w: 150, h: 20 },
            { x: 2400, y: 280, w: 400, h: 20 }
          ],
          movingPlatforms: [
            { x: 1700, y: 310, w: 140, h: 15, startX: 1620, endX: 1880, speed: 3, dir: 1 }
          ],
          enemies: [
            { x: 800, y: 290, w: 25, h: 25, startX: 800, endX: 930, speed: 2.1, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 1350, y: 340, w: 60, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 290, y: 400, w: 170, h: 20 },
            { x: 530, y: 370, w: 170, h: 20 },
            { x: 1020, y: 340, w: 160, h: 20 },
            { x: 1260, y: 340, w: 160, h: 20 },
            { x: 1500, y: 330, w: 160, h: 20 },
            { x: 2090, y: 300, w: 150, h: 20 }
          ],
          invisiblePlatforms2: [
            { x: 770, y: 350, w: 170, h: 20 }
          ],
          goalFlag: { x: 2730, y: 240, w: 40, h: 100 }
        },
        13: {
          platforms: [
            { x: 0, y: 440, w: 200, h: 20 },
            { x: 3400, y: 270, w: 400, h: 20 }
          ],
          movingPlatforms: [
            { x: 1800, y: 320, w: 150, h: 15, startX: 1720, endX: 2000, speed: 3.2, dir: 1 }
          ],
          enemies: [
            { x: 1000, y: 320, w: 25, h: 25, startX: 1000, endX: 1140, speed: 2.2, dir: 1, vy: 0, onGround: false },
            { x: 2600, y: 300, w: 25, h: 25, startX: 2600, endX: 2740, speed: 2.3, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 1580, y: 350, w: 70, h: 20 },
            { x: 3000, y: 290, w: 70, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 270, y: 400, w: 180, h: 20 },
            { x: 520, y: 370, w: 180, h: 20 },
            { x: 770, y: 350, w: 180, h: 20 },
            { x: 1020, y: 340, w: 180, h: 20 },
            { x: 1270, y: 340, w: 180, h: 20 },
            { x: 1520, y: 350, w: 180, h: 20 },
            { x: 2220, y: 310, w: 170, h: 20 },
            { x: 2460, y: 300, w: 170, h: 20 },
            { x: 2700, y: 300, w: 170, h: 20 },
            { x: 2940, y: 290, w: 170, h: 20 },
            { x: 3180, y: 280, w: 170, h: 20 }
          ],
          goalFlag: { x: 3730, y: 230, w: 40, h: 100 }
        },
        14: {
          platforms: [
            { x: 0, y: 450, w: 220, h: 20 },
            { x: 1200, y: 300, w: 140, h: 20 },
            { x: 2800, y: 260, w: 400, h: 20 }
          ],
          movingPlatforms: [],
          enemies: [
            { x: 1200, y: 270, w: 25, h: 25, startX: 1200, endX: 1320, speed: 2.3, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 800, y: 350, w: 60, h: 20 },
            { x: 2200, y: 310, w: 60, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 290, y: 410, w: 160, h: 20 },
            { x: 520, y: 380, w: 160, h: 20 },
            { x: 750, y: 360, w: 160, h: 20 },
            { x: 980, y: 340, w: 160, h: 20 },
            { x: 1410, y: 320, w: 170, h: 20 },
            { x: 1650, y: 320, w: 170, h: 20 },
            { x: 1890, y: 310, w: 170, h: 20 },
            { x: 2130, y: 310, w: 170, h: 20 },
            { x: 2370, y: 290, w: 170, h: 20 },
            { x: 2610, y: 270, w: 170, h: 20 }
          ],
          goalFlag: { x: 3130, y: 220, w: 40, h: 100 }
        },
        15: {
          platforms: [
            { x: 0, y: 460, w: 200, h: 20 },
            { x: 3600, y: 270, w: 400, h: 20 }
          ],
          movingPlatforms: [
            { x: 900, y: 360, w: 140, h: 15, startX: 820, endX: 1080, speed: 3.3, dir: 1 },
            { x: 2400, y: 300, w: 140, h: 15, startX: 2320, endX: 2580, speed: 3.3, dir: 1 }
          ],
          enemies: [
            { x: 1500, y: 330, w: 25, h: 25, startX: 1500, endX: 1640, speed: 2.4, dir: 1, vy: 0, onGround: false },
            { x: 3000, y: 280, w: 25, h: 25, startX: 3000, endX: 3140, speed: 2.4, dir: 1, vy: 0, onGround: false }
          ],
          spikes: [
            { x: 1500, y: 350, w: 70, h: 20 },
            { x: 3000, y: 300, w: 70, h: 20 }
          ],
          invisiblePlatforms: [
            { x: 270, y: 410, w: 180, h: 20 },
            { x: 520, y: 380, w: 180, h: 20 },
            { x: 1180, y: 350, w: 180, h: 20 },
            { x: 1430, y: 350, w: 180, h: 20 },
            { x: 1680, y: 330, w: 180, h: 20 },
            { x: 1930, y: 320, w: 180, h: 20 },
            { x: 2180, y: 310, w: 180, h: 20 },
            { x: 2680, y: 300, w: 180, h: 20 },
            { x: 2930, y: 300, w: 180, h: 20 },
            { x: 3180, y: 290, w: 180, h: 20 },
            { x: 3430, y: 280, w: 180, h: 20 }
          ],
          goalFlag: { x: 3930, y: 230, w: 40, h: 100 }
        }
      };
      
      // Return specific level or cycle through variations
      if (levelVariations[levelNum]) {
        return levelVariations[levelNum];
      } else {
        // For levels 16+, cycle through 10-15 with increased difficulty
        const cycleLevel = 10 + ((levelNum - 10) % 6);
        const difficultyBoost = Math.floor((levelNum - 10) / 6) * 0.4;
        const baseLevel = levelVariations[cycleLevel];
        
        return {
          ...baseLevel,
          movingPlatforms: baseLevel.movingPlatforms.map(p => ({
            ...p,
            speed: p.speed + difficultyBoost
          })),
          enemies: baseLevel.enemies.map(e => ({
            ...e,
            speed: e.speed + difficultyBoost * 0.5
          }))
        };
      }
    }
    
    return levels[levelNum] || levels[1];
  };
  
  const gameStateRef = useRef({
    player: { 
      x: 100, 
      y: 300, 
      w: 28, 
      h: 38, 
      vx: 0, 
      vy: 0, 
      onGround: false,
      direction: 1,
      state: 'idle',
      invincible: false,
      invincibleTimer: 0,
      hasDoubleJump: false
    },
    camera: { x: 0 },
    ...getLevelData(1)
  });
  
  const keys = useRef({ left: false, right: false, up: false, jumpPressed: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = true;
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') && !keys.current.up) {
        keys.current.up = true;
        keys.current.jumpPressed = false;
      }
      
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        setGodMode(prev => !prev);
      }
      
      // Level skip in God Mode: Ctrl + Number keys
      if (godMode && e.ctrlKey && e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const targetLevel = parseInt(e.key);
        if (targetLevel > 0) {
          setLevel(targetLevel);
          const levelData = getLevelData(targetLevel);
          gameStateRef.current.platforms = levelData.platforms;
          gameStateRef.current.movingPlatforms = levelData.movingPlatforms || [];
          gameStateRef.current.enemies = levelData.enemies || [];
          gameStateRef.current.spikes = levelData.spikes || [];
          gameStateRef.current.invisiblePlatforms = levelData.invisiblePlatforms || [];
          gameStateRef.current.goalFlag = levelData.goalFlag;
          gameStateRef.current.player.x = 100;
          gameStateRef.current.player.y = 300;
          gameStateRef.current.player.vx = 0;
          gameStateRef.current.player.vy = 0;
          gameStateRef.current.camera.x = 0;
        }
      }
      
      // Level navigation in God Mode: Ctrl + Arrow keys
      if (godMode && e.ctrlKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevLevel = Math.max(1, level - 1);
          setLevel(prevLevel);
          const levelData = getLevelData(prevLevel);
          gameStateRef.current.platforms = levelData.platforms;
          gameStateRef.current.movingPlatforms = levelData.movingPlatforms || [];
          gameStateRef.current.enemies = levelData.enemies || [];
          gameStateRef.current.spikes = levelData.spikes || [];
          gameStateRef.current.invisiblePlatforms = levelData.invisiblePlatforms || [];
          gameStateRef.current.goalFlag = levelData.goalFlag;
          gameStateRef.current.player.x = 100;
          gameStateRef.current.player.y = 300;
          gameStateRef.current.player.vx = 0;
          gameStateRef.current.player.vy = 0;
          gameStateRef.current.camera.x = 0;
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextLevel = level + 1;
          setLevel(nextLevel);
          const levelData = getLevelData(nextLevel);
          gameStateRef.current.platforms = levelData.platforms;
          gameStateRef.current.movingPlatforms = levelData.movingPlatforms || [];
          gameStateRef.current.enemies = levelData.enemies || [];
          gameStateRef.current.spikes = levelData.spikes || [];
          gameStateRef.current.invisiblePlatforms = levelData.invisiblePlatforms || [];
          gameStateRef.current.goalFlag = levelData.goalFlag;
          gameStateRef.current.player.x = 100;
          gameStateRef.current.player.y = 300;
          gameStateRef.current.player.vx = 0;
          gameStateRef.current.player.vy = 0;
          gameStateRef.current.camera.x = 0;
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        keys.current.up = false;
        keys.current.jumpPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [godMode, level]);

  const drawPlayer = (ctx, player, camera, frame) => {
    const x = player.x - camera.x;
    const y = player.y;
    
    ctx.save();
    
    if (godMode) {
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 20;
    }
    
    if (player.invincible && Math.floor(frame / 5) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    const bounce = player.state === 'running' ? Math.sin(frame * 0.3) * 1.5 : 0;
    
    if (player.state === 'jumping') {
      ctx.fillStyle = '#E8E8FF';
      ctx.beginPath();
      ctx.ellipse(x + 14, y + 18, 11, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#F0F0FF';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 8);
      ctx.quadraticCurveTo(x + 14, y - 2, x + 20, y + 8);
      ctx.quadraticCurveTo(x + 18, y + 14, x + 14, y + 16);
      ctx.quadraticCurveTo(x + 10, y + 14, x + 8, y + 8);
      ctx.fill();
      
      ctx.fillStyle = '#D0D0E8';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 4);
      ctx.lineTo(x + 8, y - 2);
      ctx.lineTo(x + 12, y + 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 4);
      ctx.lineTo(x + 20, y - 2);
      ctx.lineTo(x + 16, y + 2);
      ctx.fill();
      
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.arc(x + 16, y + 8, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#B8B8D8';
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 16);
      ctx.quadraticCurveTo(x + 8, y + 25, x + 10, y + 32);
      ctx.lineTo(x + 18, y + 32);
      ctx.quadraticCurveTo(x + 20, y + 25, x + 16, y + 16);
      ctx.fill();
      
      ctx.strokeStyle = '#C0C0C0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 22, y + 20);
      ctx.lineTo(x + 30, y + 18);
      ctx.stroke();
      ctx.fillStyle = '#8B8B8B';
      ctx.fillRect(x + 22, y + 19, 3, 2);
      
    } else if (player.state === 'running') {
      const legFrame = Math.floor(frame / 5) % 4;
      
      ctx.fillStyle = '#E8E8FF';
      ctx.beginPath();
      ctx.ellipse(x + 14, y + 18 + bounce, 11, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#F0F0FF';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 8 + bounce);
      ctx.quadraticCurveTo(x + 14, y - 2 + bounce, x + 20, y + 8 + bounce);
      ctx.quadraticCurveTo(x + 18, y + 14 + bounce, x + 14, y + 16 + bounce);
      ctx.quadraticCurveTo(x + 10, y + 14 + bounce, x + 8, y + 8 + bounce);
      ctx.fill();
      
      ctx.fillStyle = '#D0D0E8';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 4 + bounce);
      ctx.lineTo(x + 8, y - 2 + bounce);
      ctx.lineTo(x + 12, y + 2 + bounce);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 4 + bounce);
      ctx.lineTo(x + 20, y - 2 + bounce);
      ctx.lineTo(x + 16, y + 2 + bounce);
      ctx.fill();
      
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.arc(x + 16, y + 8 + bounce, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#B8B8D8';
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 16 + bounce);
      const cloakWave = Math.sin(frame * 0.3) * 3;
      ctx.quadraticCurveTo(x + 6 + cloakWave, y + 25, x + 8, y + 34);
      ctx.lineTo(x + 16, y + 34);
      ctx.quadraticCurveTo(x + 22 + cloakWave, y + 25, x + 16, y + 16 + bounce);
      ctx.fill();
      
      ctx.fillStyle = '#D0D0E8';
      if (legFrame === 0 || legFrame === 2) {
        ctx.fillRect(x + 10, y + 34, 4, 4);
        ctx.fillRect(x + 14, y + 36, 4, 2);
      } else {
        ctx.fillRect(x + 14, y + 34, 4, 4);
        ctx.fillRect(x + 10, y + 36, 4, 2);
      }
      
    } else {
      const breathe = Math.sin(frame * 0.04) * 1;
      
      ctx.fillStyle = '#E8E8FF';
      ctx.beginPath();
      ctx.ellipse(x + 14, y + 18 + breathe, 11, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#F0F0FF';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 8 + breathe);
      ctx.quadraticCurveTo(x + 14, y - 2 + breathe, x + 20, y + 8 + breathe);
      ctx.quadraticCurveTo(x + 18, y + 14 + breathe, x + 14, y + 16 + breathe);
      ctx.quadraticCurveTo(x + 10, y + 14 + breathe, x + 8, y + 8 + breathe);
      ctx.fill();
      
      ctx.fillStyle = '#D0D0E8';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 4 + breathe);
      ctx.lineTo(x + 8, y - 2 + breathe);
      ctx.lineTo(x + 12, y + 2 + breathe);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 4 + breathe);
      ctx.lineTo(x + 20, y - 2 + breathe);
      ctx.lineTo(x + 16, y + 2 + breathe);
      ctx.fill();
      
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.arc(x + 16, y + 8 + breathe, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#B8B8D8';
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 16 + breathe);
      ctx.quadraticCurveTo(x + 8, y + 25, x + 10, y + 34);
      ctx.lineTo(x + 18, y + 34);
      ctx.quadraticCurveTo(x + 20, y + 25, x + 16, y + 16 + breathe);
      ctx.fill();
      
      ctx.fillStyle = '#D0D0E8';
      ctx.fillRect(x + 10, y + 34, 4, 4);
      ctx.fillRect(x + 14, y + 34, 4, 4);
    }
    
    ctx.restore();
  };

  const drawGoalFlag = (ctx, flag, camera, frame) => {
    const x = flag.x - camera.x;
    const y = flag.y;
    const wave = Math.sin(frame * 0.1);
    
    // Pole
    ctx.fillStyle = '#4A4A4A';
    ctx.fillRect(x + 18, y, 4, flag.h);
    
    // Pole base
    ctx.fillStyle = '#3A3A3A';
    ctx.fillRect(x + 14, y + flag.h, 12, 8);
    
    // Flag fabric with wave
    ctx.fillStyle = '#FF6B9D';
    ctx.beginPath();
    ctx.moveTo(x + 22, y + 10);
    ctx.lineTo(x + 45 + wave * 4, y + 20);
    ctx.lineTo(x + 43 + wave * 3, y + 35);
    ctx.lineTo(x + 22, y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Flag highlight/shine
    ctx.fillStyle = '#FFB3D1';
    ctx.beginPath();
    ctx.moveTo(x + 22, y + 10);
    ctx.lineTo(x + 35 + wave * 3, y + 15);
    ctx.lineTo(x + 33 + wave * 2, y + 22);
    ctx.lineTo(x + 22, y + 20);
    ctx.closePath();
    ctx.fill();
    
    // Flag shadow
    ctx.fillStyle = 'rgba(200, 50, 100, 0.3)';
    ctx.beginPath();
    ctx.moveTo(x + 22, y + 28);
    ctx.lineTo(x + 40 + wave * 3, y + 32);
    ctx.lineTo(x + 38 + wave * 2, y + 38);
    ctx.lineTo(x + 22, y + 40);
    ctx.closePath();
    ctx.fill();
    
    // Sparkles around flag
    ctx.fillStyle = '#FFEB3B';
    const sparkle1 = Math.sin(frame * 0.15) * 0.5 + 0.5;
    const sparkle2 = Math.cos(frame * 0.15 + 1) * 0.5 + 0.5;
    const sparkle3 = Math.sin(frame * 0.15 + 2) * 0.5 + 0.5;
    
    ctx.globalAlpha = sparkle1;
    ctx.beginPath();
    ctx.arc(x + 35, y + 15, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = sparkle2;
    ctx.beginPath();
    ctx.arc(x + 42, y + 25, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = sparkle3;
    ctx.beginPath();
    ctx.arc(x + 38, y + 35, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1;
  };

  const drawEnemy = (ctx, enemy, camera, frame) => {
    const x = enemy.x - camera.x;
    const y = enemy.y;
    const bounce = Math.sin(frame * 0.2) * 2;
    
    ctx.fillStyle = '#FF4444';
    ctx.beginPath();
    ctx.ellipse(x + 12, y + 12 + bounce, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + 8, y + 10 + bounce, 3, 0, Math.PI * 2);
    ctx.arc(x + 16, y + 10 + bounce, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + 8, y + 10 + bounce, 1.5, 0, Math.PI * 2);
    ctx.arc(x + 16, y + 10 + bounce, 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + 12, y + 15 + bounce, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();
  };

  const drawSpikes = (ctx, spike, camera) => {
    const x = spike.x - camera.x;
    const y = spike.y;
    
    // Draw spikes pointing UP from the platform surface
    ctx.fillStyle = '#888888';
    const spikeCount = Math.floor(spike.w / 15);
    for (let i = 0; i < spikeCount; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 15, y + spike.h);
      ctx.lineTo(x + i * 15 + 7, y);
      ctx.lineTo(x + i * 15 + 15, y + spike.h);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = '#555555';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Base platform for spikes
    ctx.fillStyle = '#666666';
    ctx.fillRect(x, y + spike.h, spike.w, 5);
  };
  
  const getSpikeHitbox = (spike) => {
    return {
      x: spike.x + spike.w * 0.1,
      y: spike.y,
      w: spike.w * 0.8,
      h: spike.h * 0.6
    };
  };

  useEffect(() => {
    if (!controlMode) return; // Don't start game loop until control mode is selected
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;

    const gameLoop = () => {
      animationFrame.current++;
      
      const player = gameStateRef.current.player;
      const camera = gameStateRef.current.camera;
      const platforms = gameStateRef.current.platforms;
      const movingPlatforms = gameStateRef.current.movingPlatforms || [];
      const enemies = gameStateRef.current.enemies || [];
      const spikes = gameStateRef.current.spikes || [];
      const invisiblePlatforms = gameStateRef.current.invisiblePlatforms || [];
      const goalFlag = gameStateRef.current.goalFlag;
      
      if (player.invincible) {
        player.invincibleTimer--;
        if (player.invincibleTimer <= 0) {
          player.invincible = false;
        }
      }
      
      movingPlatforms.forEach(platform => {
        platform.x += platform.speed * platform.dir;
        if (platform.x >= platform.endX || platform.x <= platform.startX) {
          platform.dir *= -1;
        }
      });
      
      const allPlatforms = [...platforms, ...movingPlatforms, ...invisiblePlatforms];
      
      enemies.forEach(enemy => {
        enemy.vy += 0.6;
        enemy.y += enemy.vy;
        
        enemy.onGround = false;
        for (let platform of allPlatforms) {
          if (enemy.x + enemy.w > platform.x &&
              enemy.x < platform.x + platform.w &&
              enemy.y + enemy.h > platform.y &&
              enemy.y < platform.y + platform.h) {
            if (enemy.vy > 0) {
              enemy.y = platform.y - enemy.h;
              enemy.vy = 0;
              enemy.onGround = true;
            }
          }
        }
        
        if (enemy.onGround) {
          enemy.x += enemy.speed * enemy.dir;
          if (enemy.x >= enemy.endX || enemy.x <= enemy.startX) {
            enemy.dir *= -1;
          }
        }
      });
      
      // Handle controls based on control mode
      const isLeftPressed = controlMode === 'mobile' ? touchControls.left : keys.current.left;
      const isRightPressed = controlMode === 'mobile' ? touchControls.right : keys.current.right;
      const isJumpPressed = controlMode === 'mobile' ? touchControls.jump : keys.current.up;
      
      if (isLeftPressed) {
        player.vx = -4;
        player.direction = -1;
      } else if (isRightPressed) {
        player.vx = 4;
        player.direction = 1;
      } else {
        player.vx = 0;
      }
      
      player.x += player.vx;
      
      player.vy += 0.6;
      player.y += player.vy;
      
      if (isJumpPressed && !keys.current.jumpPressed) {
        if (player.onGround) {
          player.vy = -13;
          player.onGround = false;
          player.hasDoubleJump = godMode;
          keys.current.jumpPressed = true;
        } else if (player.hasDoubleJump && godMode) {
          player.vy = -13;
          player.hasDoubleJump = false;
          keys.current.jumpPressed = true;
        }
      }
      
      player.onGround = false;
      
      for (let platform of allPlatforms) {
        if (player.x + player.w > platform.x &&
            player.x < platform.x + platform.w &&
            player.y + player.h > platform.y &&
            player.y < platform.y + platform.h) {
          if (player.vy > 0) {
            player.y = platform.y - player.h;
            player.vy = 0;
            player.onGround = true;
            player.hasDoubleJump = godMode;
          }
        }
      }
      
      if (!player.invincible) {
        for (let enemy of enemies) {
          if (!godMode && player.x + player.w > enemy.x &&
              player.x < enemy.x + enemy.w &&
              player.y + player.h > enemy.y &&
              player.y < enemy.y + enemy.h) {
            player.x = 100;
            player.y = 300;
            player.vx = 0;
            player.vy = 0;
            camera.x = 0;
            player.invincible = true;
            player.invincibleTimer = 60;
          }
        }
      }
      
      if (!player.invincible) {
        for (let spike of spikes) {
          const spikeHitbox = getSpikeHitbox(spike);
          if (!godMode && player.x + player.w > spikeHitbox.x &&
              player.x < spikeHitbox.x + spikeHitbox.w &&
              player.y + player.h > spikeHitbox.y &&
              player.y < spikeHitbox.y + spikeHitbox.h) {
            player.x = 100;
            player.y = 300;
            player.vx = 0;
            player.vy = 0;
            camera.x = 0;
            player.invincible = true;
            player.invincibleTimer = 60;
          }
        }
      }
      
      if (player.x + player.w > goalFlag.x &&
          player.x < goalFlag.x + goalFlag.w &&
          player.y + player.h > goalFlag.y &&
          player.y < goalFlag.y + goalFlag.h) {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        const levelData = getLevelData(nextLevel);
        gameStateRef.current.platforms = levelData.platforms;
        gameStateRef.current.movingPlatforms = levelData.movingPlatforms || [];
        gameStateRef.current.enemies = levelData.enemies || [];
        gameStateRef.current.spikes = levelData.spikes || [];
        gameStateRef.current.invisiblePlatforms = levelData.invisiblePlatforms || [];
        gameStateRef.current.goalFlag = levelData.goalFlag;
        player.x = 100;
        player.y = 300;
        player.vx = 0;
        player.vy = 0;
        camera.x = 0;
      }
      
      if (!player.onGround) {
        player.state = 'jumping';
      } else if (player.vx !== 0) {
        player.state = 'running';
      } else {
        player.state = 'idle';
      }
      
      if (player.x < 0) player.x = 0;
      
      if (player.y > canvas.height + 50) {
        player.x = 100;
        player.y = 300;
        player.vx = 0;
        player.vy = 0;
        camera.x = 0;
      }
      
      const targetCameraX = player.x - 250;
      camera.x += (targetCameraX - camera.x) * 0.1;
      if (camera.x < 0) camera.x = 0;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#B8D8FF');
      gradient.addColorStop(1, '#E8F4FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cloudOffset = animationFrame.current * 0.2;
      
      ctx.fillStyle = '#FFFFFF';
      let cloud1X = (120 + cloudOffset) % (canvas.width + 250) - 125;
      ctx.beginPath();
      ctx.arc(cloud1X, 70, 22, 0, Math.PI * 2);
      ctx.arc(cloud1X + 20, 65, 28, 0, Math.PI * 2);
      ctx.arc(cloud1X + 45, 68, 25, 0, Math.PI * 2);
      ctx.arc(cloud1X + 65, 72, 20, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(cloud1X + 10, 78, 18, 0, Math.PI);
      ctx.arc(cloud1X + 35, 78, 22, 0, Math.PI);
      ctx.arc(cloud1X + 55, 80, 18, 0, Math.PI);
      ctx.fill();
      
      let cloud2X = (400 + cloudOffset) % (canvas.width + 250) - 125;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cloud2X, 110, 25, 0, Math.PI * 2);
      ctx.arc(cloud2X + 25, 105, 32, 0, Math.PI * 2);
      ctx.arc(cloud2X + 52, 108, 28, 0, Math.PI * 2);
      ctx.arc(cloud2X + 75, 112, 22, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(cloud2X + 12, 120, 20, 0, Math.PI);
      ctx.arc(cloud2X + 40, 120, 25, 0, Math.PI);
      ctx.arc(cloud2X + 65, 122, 20, 0, Math.PI);
      ctx.fill();
      
      let cloud3X = (680 + cloudOffset) % (canvas.width + 250) - 125;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cloud3X, 50, 20, 0, Math.PI * 2);
      ctx.arc(cloud3X + 18, 46, 26, 0, Math.PI * 2);
      ctx.arc(cloud3X + 40, 48, 23, 0, Math.PI * 2);
      ctx.arc(cloud3X + 58, 52, 18, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(cloud3X + 8, 58, 16, 0, Math.PI);
      ctx.arc(cloud3X + 30, 58, 20, 0, Math.PI);
      ctx.arc(cloud3X + 50, 60, 16, 0, Math.PI);
      ctx.fill();
      
      platforms.forEach(platform => {
        const px = platform.x - camera.x;
        
        const grassGradient = ctx.createLinearGradient(0, platform.y - 8, 0, platform.y);
        grassGradient.addColorStop(0, '#7ED957');
        grassGradient.addColorStop(1, '#5FB83B');
        ctx.fillStyle = grassGradient;
        ctx.fillRect(px, platform.y - 8, platform.w, 8);
        
        ctx.fillStyle = '#8FE767';
        for (let i = 10; i < platform.w - 10; i += 20) {
          ctx.beginPath();
          ctx.moveTo(px + i, platform.y - 8);
          ctx.lineTo(px + i - 3, platform.y - 12);
          ctx.lineTo(px + i, platform.y - 10);
          ctx.lineTo(px + i + 3, platform.y - 12);
          ctx.lineTo(px + i, platform.y - 8);
          ctx.fill();
        }
        
        const dirtGradient = ctx.createLinearGradient(0, platform.y, 0, platform.y + platform.h);
        dirtGradient.addColorStop(0, '#9B6B3D');
        dirtGradient.addColorStop(1, '#7A5230');
        ctx.fillStyle = dirtGradient;
        ctx.fillRect(px, platform.y, platform.w, platform.h);
        
        ctx.strokeStyle = '#5A3820';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, platform.y - 8, platform.w, platform.h + 8);
        
        ctx.fillStyle = '#6B4A2A';
        for (let i = 8; i < platform.w - 8; i += 25) {
          ctx.beginPath();
          ctx.arc(px + i, platform.y + 8, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px + i + 12, platform.y + 14, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      movingPlatforms.forEach(platform => {
        const px = platform.x - camera.x;
        
        ctx.fillStyle = '#AA88FF';
        ctx.fillRect(px, platform.y, platform.w, platform.h);
        
        ctx.strokeStyle = '#8855DD';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, platform.y, platform.w, platform.h);
        
        ctx.fillStyle = '#CCAAFF';
        for (let i = 10; i < platform.w - 10; i += 20) {
          ctx.fillRect(px + i, platform.y + 3, 3, 3);
          ctx.fillRect(px + i + 5, platform.y + 8, 3, 3);
        }
      });
      
      if (level >= 10 && invisiblePlatforms.length > 0) {
        invisiblePlatforms.forEach(platform => {
          const px = platform.x - camera.x;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillRect(px, platform.y, platform.w, platform.h);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(px, platform.y, platform.w, platform.h);
          ctx.setLineDash([]);
        });
      }
      
      spikes.forEach(spike => {
        drawSpikes(ctx, spike, camera);
      });
      
      enemies.forEach(enemy => {
        drawEnemy(ctx, enemy, camera, animationFrame.current);
      });
      
      drawGoalFlag(ctx, goalFlag, camera, animationFrame.current);
      
      drawPlayer(ctx, player, camera, animationFrame.current);
      
      if (showHitboxes) {
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        
        ctx.strokeRect(player.x - camera.x, player.y, player.w, player.h);
        
        allPlatforms.forEach(platform => {
          ctx.strokeRect(platform.x - camera.x, platform.y, platform.w, platform.h);
        });
        
        ctx.strokeStyle = '#00FFFF';
        movingPlatforms.forEach(platform => {
          ctx.strokeRect(platform.x - camera.x, platform.y, platform.w, platform.h);
        });
        
        ctx.strokeStyle = '#FF0000';
        enemies.forEach(enemy => {
          ctx.strokeRect(enemy.x - camera.x, enemy.y, enemy.w, enemy.h);
        });
        
        ctx.strokeStyle = '#FFFF00';
        spikes.forEach(spike => {
          const spikeHitbox = getSpikeHitbox(spike);
          ctx.strokeRect(spikeHitbox.x - camera.x, spikeHitbox.y, spikeHitbox.w, spikeHitbox.h);
        });
        
        ctx.strokeStyle = '#FF00FF';
        ctx.strokeRect(goalFlag.x - camera.x, goalFlag.y, goalFlag.w, goalFlag.h);
      }
      
      animationId = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => cancelAnimationFrame(animationId);
  }, [level, showHitboxes, godMode, controlMode, touchControls]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {controlMode === null ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Cartoony Platformer</h1>
          <p className="text-xl text-gray-300 mb-8">Choose Your Control Mode</p>
          <div className="flex gap-6">
            <button
              onClick={() => setControlMode('keyboard')}
              className="px-8 py-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              🖥️ Computer<br/>
              <span className="text-sm font-normal">Keyboard Controls</span>
            </button>
            <button
              onClick={() => setControlMode('mobile')}
              className="px-8 py-6 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              📱 Mobile<br/>
              <span className="text-sm font-normal">Touch Controls</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-white text-center">
            <h1 className="text-2xl font-bold mb-2">Cartoony Platformer</h1>
            <p className="text-sm">
              {controlMode === 'keyboard' ? 'Use Arrow Keys or WASD to move and jump' : 'Use on-screen buttons to move and jump'}
            </p>
            <p className="text-xs mt-1 text-purple-300">Level {level} - Reach the flag to advance!</p>
            {level >= 10 && (
              <p className="text-xs mt-1 text-cyan-300">⚠️ Invisible platforms active!</p>
            )}
            {godMode && (
              <p className="text-xs mt-1 text-yellow-300">✨ God Mode Active! Invincible + Double Jump (Ctrl+I to toggle)</p>
            )}
            {godMode && (
              <p className="text-xs mt-1 text-cyan-300">🎮 Level Select: Ctrl+1-9 for levels, Ctrl+← → to navigate</p>
            )}
            <div className="flex gap-2 justify-center mt-3">
              <button
                onClick={() => setShowHitboxes(!showHitboxes)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm font-semibold transition-colors"
              >
                {showHitboxes ? 'Hide Hitboxes' : 'Show Hitboxes'}
              </button>
              <button
                onClick={() => setControlMode(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm font-semibold transition-colors"
              >
                Change Controls
              </button>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border-4 border-purple-700 bg-sky-200 shadow-2xl"
          />
          {controlMode === 'mobile' && (
            <div className="flex gap-4 mt-4">
              <div className="flex gap-2">
                <button
                  onTouchStart={() => setTouchControls(prev => ({ ...prev, left: true }))}
                  onTouchEnd={() => setTouchControls(prev => ({ ...prev, left: false }))}
                  onMouseDown={() => setTouchControls(prev => ({ ...prev, left: true }))}
                  onMouseUp={() => setTouchControls(prev => ({ ...prev, left: false }))}
                  className="w-20 h-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white text-3xl font-bold shadow-lg"
                >
                  ←
                </button>
                <button
                  onTouchStart={() => setTouchControls(prev => ({ ...prev, right: true }))}
                  onTouchEnd={() => setTouchControls(prev => ({ ...prev, right: false }))}
                  onMouseDown={() => setTouchControls(prev => ({ ...prev, right: true }))}
                  onMouseUp={() => setTouchControls(prev => ({ ...prev, right: false }))}
                  className="w-20 h-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white text-3xl font-bold shadow-lg"
                >
                  →
                </button>
              </div>
              <button
                onTouchStart={() => {
                  setTouchControls(prev => ({ ...prev, jump: true }));
                  keys.current.jumpPressed = false;
                }}
                onTouchEnd={() => {
                  setTouchControls(prev => ({ ...prev, jump: false }));
                  keys.current.jumpPressed = false;
                }}
                onMouseDown={() => {
                  setTouchControls(prev => ({ ...prev, jump: true }));
                  keys.current.jumpPressed = false;
                }}
                onMouseUp={() => {
                  setTouchControls(prev => ({ ...prev, jump: false }));
                  keys.current.jumpPressed = false;
                }}
                className="w-32 h-20 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white text-2xl font-bold shadow-lg"
              >
                JUMP
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
          