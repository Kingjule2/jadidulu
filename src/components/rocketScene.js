// All coordinates belong to this canvas. The camera never moves the document.
export const FLIGHT_TIMING = Object.freeze({
  ignition: 1,
  launch: 2.2,
  follow: 2.5, // Follow for exactly 300 ms after lift-off.
  exit: 3.2,
  reveal: 4.6,
  end: 7.5,
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smokeTextures = new WeakMap();

function getSmokeTextures(ctx) {
  if (!smokeTextures.has(ctx)) {
    // Rasterize the soft edges once; each frame only composites small sprites.
    smokeTextures.set(ctx, ['175, 194, 221', '191, 176, 221'].map((color) => {
      const texture = document.createElement('canvas');
      texture.width = texture.height = 64;
      const brush = texture.getContext('2d');
      const gradient = brush.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, `rgba(${color}, .85)`);
      gradient.addColorStop(.45, `rgba(${color}, .65)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      brush.fillStyle = gradient;
      brush.fillRect(0, 0, 64, 64);
      return texture;
    }));
  }
  return smokeTextures.get(ctx);
}

const rocketScale = (width) => width < 600 ? .82 : 1;
const groundLevel = (height) => height * .78;

function position(time, width, height) {
  const flight = Math.max(0, time - FLIGHT_TIMING.launch);
  return {
    x: width * .5 + (1 - Math.cos(Math.min(flight, 2) * 1.8)) * Math.min(width * .12, 68),
    y: groundLevel(height) - 34 * rocketScale(width) - height * (.35 * flight + 1.8 * flight * flight),
  };
}

export function flightFrame(time, width, height) {
  const rocket = position(time, width, height);
  const tracked = position(Math.min(time, FLIGHT_TIMING.follow), width, height);
  const camera = position(FLIGHT_TIMING.launch, width, height).y - tracked.y;
  return { x: rocket.x, y: rocket.y + camera, camera };
}

function shape(ctx, color, draw) {
  ctx.beginPath();
  draw();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRocket(ctx, x, y, time, width, height) {
  const next = position(time + .05, width, height);
  const current = position(time, width, height);
  const flying = time >= FLIGHT_TIMING.launch;
  const igniting = time >= FLIGHT_TIMING.ignition && !flying;
  const shake = igniting ? clamp((time - FLIGHT_TIMING.ignition) / .5, 0, 1) : 0;
  const angle = flying ? Math.atan2(next.x - current.x, current.y - next.y) : Math.sin(time * 48) * .035 * shake;
  ctx.save();
  ctx.translate(x + Math.sin(time * 65) * 2 * shake, y);
  ctx.rotate(angle);
  const scale = rocketScale(width);
  ctx.scale(scale, scale);

  // A restrained blue exhaust pulse; no flashing or strobing.
  const flame = (flying ? 42 : 8 * shake) + Math.sin(time * 12) * 2;
  if (flying || igniting) {
    shape(ctx, '#b7dfff', () => {
    ctx.moveTo(-10, 27); ctx.quadraticCurveTo(-14, 48, 0, 27 + flame);
    ctx.quadraticCurveTo(14, 48, 10, 27); ctx.closePath();
  });
    shape(ctx, '#ffffff', () => {
    ctx.moveTo(-5, 27); ctx.quadraticCurveTo(-6, 32 + flame * .2, 0, 30 + flame * .5);
    ctx.quadraticCurveTo(6, 32 + flame * .2, 5, 27); ctx.closePath();
  });
  }
  shape(ctx, '#7c3aed', () => {
    ctx.moveTo(-13, 1); ctx.quadraticCurveTo(-31, 14, -27, 34);
    ctx.lineTo(-10, 24); ctx.lineTo(10, 24); ctx.lineTo(27, 34);
    ctx.quadraticCurveTo(31, 14, 13, 1); ctx.closePath();
  });
  shape(ctx, '#ffffff', () => {
    ctx.moveTo(0, -43); ctx.bezierCurveTo(-22, -27, -21, 6, -12, 27);
    ctx.lineTo(12, 27); ctx.bezierCurveTo(21, 6, 22, -27, 0, -43);
  });
  ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 1.7; ctx.stroke();
  shape(ctx, '#2563eb', () => {
    ctx.moveTo(0, -43); ctx.quadraticCurveTo(-11, -35, -15, -20);
    ctx.quadraticCurveTo(0, -25, 15, -20); ctx.quadraticCurveTo(11, -35, 0, -43);
  });
  shape(ctx, '#2563eb', () => ctx.arc(0, -5, 10, 0, Math.PI * 2));
  shape(ctx, '#bfeaff', () => ctx.arc(0, -5, 6.7, 0, Math.PI * 2));
  shape(ctx, '#ffffff', () => ctx.arc(-2, -7, 2, 0, Math.PI * 2));
  shape(ctx, '#1d4ed8', () => ctx.rect(-11, 25, 22, 5));
  ctx.restore();
}

export function drawFlight(ctx, width, height, time) {
  ctx.clearRect(0, 0, width, height);
  const { x, y, camera } = flightFrame(time, width, height);
  const textures = getSmokeTextures(ctx);

  // The launch pad establishes a real resting position before ignition.
  const ground = groundLevel(height) + camera;
  const groundOpacity = clamp((FLIGHT_TIMING.reveal - time) / 1.4, 0, 1);
  ctx.globalAlpha = groundOpacity;
  ctx.fillStyle = '#e6ebf3';
  ctx.fillRect(0, ground, width, height);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, ground); ctx.lineTo(width, ground); ctx.stroke();
  shape(ctx, '#c3cfe0', () => ctx.roundRect(width * .5 - 46, ground - 4, 92, 7, 3));
  ctx.globalAlpha = 1;

  // Only the local scene scrolls, for 300 ms. Speed lines fade at rocket exit.
  const lineOpacity = clamp((time - FLIGHT_TIMING.launch) / .2, 0, 1) * clamp((FLIGHT_TIMING.exit - time) / .4, 0, 1);
  ctx.lineCap = 'round';
  for (let i = 0; i < 20; i++) {
    const lineX = ((i * .61803398875) % 1) * width;
    const lineY = ((i * 137 + camera * (.65 + (i % 3) * .2)) % (height + 180)) - 90;
    ctx.strokeStyle = i % 3 === 0 ? `rgba(147, 111, 209, ${lineOpacity * .24})` : `rgba(91, 142, 206, ${lineOpacity * .22})`;
    ctx.lineWidth = i % 3 === 0 ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(lineX, lineY); ctx.lineTo(lineX, lineY + 24 + (i % 4) * 17); ctx.stroke();
  }

  const smokeFade = 1 - clamp((time - FLIGHT_TIMING.reveal) / (FLIGHT_TIMING.end - FLIGHT_TIMING.reveal), 0, 1);
  const puff = (px, py, radius, opacity, variant) => {
    if (py - radius > height || py + radius < 0) return;
    ctx.globalAlpha = opacity * smokeFade;
    ctx.drawImage(textures[variant], px - radius, py - radius, radius * 2, radius * 2);
  };

  // Dense ground exhaust rolls out in both directions, then rises into the
  // frame. Seeded shapes remain stable across pause, replay, and resizing.
  const groundEmissions = Math.floor((Math.min(time, FLIGHT_TIMING.launch + .15) - FLIGHT_TIMING.ignition) / .035);
  for (let index = 0; index <= groundEmissions; index++) {
    const emitted = FLIGHT_TIMING.ignition + index * .035;
    const age = time - emitted;
    const seed = (index * .61803398875) % 1;
    const radius = (22 + age * 22 + seed * 18) * Math.min(1, width / 650 + .4);
    for (const direction of [-1, 1]) {
      const spread = Math.min(width * .39, 250) * (1 - Math.exp(-age * .9));
      const px = width * .5 + direction * spread * (.3 + seed * .7) + Math.sin(age + index) * 12;
      const py = ground + 4 - age * (27 + seed * 20) - Math.sin(age * 1.4 + index) * 12;
      puff(px, py, radius, .48 * clamp(age / .15, 0, 1), index % 2);
    }
  }

  // A broad, curved exhaust column joins the lingering launch clouds.
  const lastEmission = Math.min(time, FLIGHT_TIMING.exit);
  const trailEmissions = Math.floor((lastEmission - FLIGHT_TIMING.launch) / .025);
  for (let index = 0; index <= trailEmissions; index++) {
    const emitted = FLIGHT_TIMING.launch + index * .025;
    const age = time - emitted;
    const origin = position(emitted, width, height);
    for (let lane = -1; lane <= 1; lane++) {
      const px = origin.x + Math.sin(age * .65 + emitted * 3) * age * 13 + lane * (9 + age * 13);
      const py = origin.y + camera + 44 + age * 10 + Math.sin(index * 2.4) * 10;
      const radius = 15 + age * 23 + Math.sin(index) * 5;
      puff(px, py, radius, .38, index % 2);
    }
  }
  ctx.globalAlpha = 1;

  if (time < FLIGHT_TIMING.exit && y > -100) drawRocket(ctx, x, y, time, width, height);
}
