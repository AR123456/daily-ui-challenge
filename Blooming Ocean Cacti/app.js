const TAU = Math.PI * 2;

const W = 2000;
const H = 1000;
const getPixelIndex = (x, y, imageData) =>
  (Math.floor(x) + Math.floor(y) * imageData.width) * 4;

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
let points = [];

const ctx = document.querySelector(".js-lines").getContext("2d");
const ctxGhost = document.createElement("canvas").getContext("2d");
const imageUrl = "./Ocean-Cactus2.jpg";

const loadImage = () => {
  const img = new Image();
  img.crossOrigin = "";

  return new Promise(function (resolve, reject) {
    img.addEventListener("load", () => {
      resolve(img);
    });

    img.src = imageUrl;
  });
};

const setupCanvas = (width, height) => {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctxGhost.canvas.width = width;
  ctxGhost.canvas.height = height;
};

const getImageData = (ctxDest, image) => {
  ctxDest.drawImage(image, 0, 0, ctxDest.canvas.width, ctxDest.canvas.height);
  const imageData = ctxDest.getImageData(0, 0, W, H);
  return imageData;
};

const getColorFromPosition = ({ x, y }, imageData) => {
  const pixelIndex = getPixelIndex(x, y, imageData);
  return {
    r: imageData.data[pixelIndex],
    g: imageData.data[pixelIndex + 1],
    b: imageData.data[pixelIndex + 2],
  };
};

const getPoint = (width, height) => {
  const pos = {
    x: Math.random() * width,
    y: Math.random() * height,
  };

  const color = getColorFromPosition(pos, imageData);
  const lightness = (color.r + color.g + color.b) / (3 * 255);
  const decay = 1 - Math.min(0.1, lightness * 0.2);

  const life = 1;
  const r = 1;

  return {
    pos,
    color,
    life,
    decay,
    r,
  };
};

const update = (point) => {
  point.r += 0.1;
  point.life *= point.decay;
};

const draw = (point) => {
  ctx.fillStyle = `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, 0.1)`;
  ctx.beginPath();
  ctx.arc(
    point.pos.x - point.r / 2,
    point.pos.y - point.r / 2,
    point.r,
    0,
    TAU
  );
  ctx.closePath();
  ctx.fill();
};

const clear = () => ctx.clearRect(0, 0, W, H);

const MAX_FRAMES = 600; // Set when to stop the animation
let frameCount = 0;

const loop = () => {
  if (frameCount >= MAX_FRAMES) {
    return; // Stop the animation once we reach the maximum frame count
  }

  points.forEach((point) => {
    update(point);
    draw(point);
  });

  // Add new points
  for (let i = 0; i < 10; i++) {
    points.push(getPoint(W, H));
    points.push(getPoint(W, H));
    points.push(getPoint(W, H));
  }

  // Filter out points that are nearly "dead"
  points = points.filter((p) => p.life > 0.01);

  frameCount++; // Increment the frame count
  requestAnimationFrame(loop); // Continue the loop
};

const start = async () => {
  const image = await loadImage();
  const { width, height } = image;

  setupCanvas(W, H);
  imageData = getImageData(ctxGhost, image);

  ctx.canvas.addEventListener("click", () => {
    points = [];
    ctx.clearRect(0, 0, width, height);
  });

  loop(); // Start the animation loop
};

start();
