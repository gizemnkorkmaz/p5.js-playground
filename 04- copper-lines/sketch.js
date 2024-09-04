let lines = [];
const numLines = 15;
let copperColor;
let glitchIntensity = 0;
let lastGlitchTime = 0;
const glitchInterval = 3000;
const ambientSound = new Audio("./ambient_sound.mp3");
const beepSound = new Audio("./beep_sound.mp3");

function setup() {
  createCanvas(600, 600);
  copperColor = color(184, 115, 51);

  ambientSound.loop = true;
  ambientSound.play();

  for (let i = 0; i < numLines; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);

    lines.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      opacity: random(255),
      fadeSpeed: random(0.5, 2),
      color: copperColor,
    });

    lines.push({
      x1: width - x1,
      y1: height - y1,
      x2: width - x2,
      y2: height - y2,
      opacity: random(255),
      fadeSpeed: random(0.5, 2),
      color: copperColor,
    });
  }
}

function draw() {
  background(0);

  if (millis() - lastGlitchTime > glitchInterval) {
    triggerGlitch();
    lastGlitchTime = millis();
  }

  if (random() < glitchIntensity * 0.1) {
    applyCanvasGlitch();
  }

  for (let lineObj of lines) {
    if (random() < glitchIntensity * 0.2) {
      lineObj.color = getGlitchColor();
    }

    stroke(lineObj.color);
    strokeWeight(2);

    let x1 = lineObj.x1 + random(-5, 5) * glitchIntensity;
    let y1 = lineObj.y1 + random(-5, 5) * glitchIntensity;
    let x2 = lineObj.x2 + random(-5, 5) * glitchIntensity;
    let y2 = lineObj.y2 + random(-5, 5) * glitchIntensity;

    line(x1, y1, x2, y2);

    lineObj.opacity += lineObj.fadeSpeed;

    if (lineObj.opacity > 255 || lineObj.opacity < 0) {
      lineObj.fadeSpeed *= -1;
    }

    lineObj.color = lerpColor(lineObj.color, copperColor, 0.05);
  }

  glitchIntensity *= 0.95;
}

function mousePressed() {
  triggerGlitch();
}

function triggerGlitch() {
  glitchIntensity = 1;
  applyCanvasGlitch();
  beepSound.play();
  for (let lineObj of lines) {
    lineObj.color = getGlitchColor();
  }
}

function getGlitchColor() {
  if (random() < 0.1) {
    return color(255);
  } else {
    return color(random(50, 150), random(150, 255), random(0, 100));
  }
}

function applyCanvasGlitch() {
  loadPixels();
  for (let i = 0; i < 20; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    let w = floor(random(10, 50));
    let h = floor(random(5, 20));
    let sourceX = floor(random(width - w));
    let sourceY = floor(random(height - h));

    for (let dx = 0; dx < w; dx++) {
      for (let dy = 0; dy < h; dy++) {
        let sourcePix = (sourceY + dy) * width + sourceX + dx;
        let destPix = (y + dy) * width + x + dx;
        pixels[destPix * 4] = pixels[sourcePix * 4];
        pixels[destPix * 4 + 1] = pixels[sourcePix * 4 + 1];
        pixels[destPix * 4 + 2] = pixels[sourcePix * 4 + 2];
        pixels[destPix * 4 + 3] = pixels[sourcePix * 4 + 3];
      }
    }
  }
  updatePixels();

  filter(BLUR, glitchIntensity * 3);
}
