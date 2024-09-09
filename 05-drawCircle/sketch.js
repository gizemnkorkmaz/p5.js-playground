let noiseTexture;
let glitchIntensity = 3;
let drawingProgress = 0;
const TWO_PI = Math.PI * 2;
const radius = 120;
const wiggleAmount = 5;
let glitchOffset = 10;

function setup() {
  createCanvas(900, 600, WEBGL);
  noFill();
  background(0);
}

function draw() {
  // Set the background color to black
  background(0);

  stroke(random(255), random(255), random(255));
  strokeWeight(3);
  noFill();

  let numSteps = 100;

  beginShape();
  for (let i = 0; i < drawingProgress; i += TWO_PI / numSteps) {
    let x = (radius + random(-wiggleAmount, wiggleAmount)) * cos(i);
    let y = (radius + random(-wiggleAmount, wiggleAmount)) * sin(i);
    vertex(x, y);
  }
  endShape();

  drawingProgress += 0.007;
  if (drawingProgress > TWO_PI) {
    drawingProgress = 0;
  }

  pop();

  let scribbles = createGraphics(width, height);
  scribbles.noFill();
  scribbles.strokeWeight(2);

  scribbles.push();
  scribbles.translate(width / 2, height / 2);

  for (let i = 0; i < 50; i++) {
    scribbles.stroke(random(255), random(255), random(255), 150);
    let x1 = random(-100, 100);
    let y1 = random(-100, 100);
    let x2 = random(-100, 100);
    let y2 = random(-100, 100);
    scribbles.line(x1, y1, x2, y2);
  }

  scribbles.pop();

  push();
  translate(-width / 2, -height / 2);
  image(scribbles, 0, 0);
  pop();

  glitchOffset += 0.01;
}
