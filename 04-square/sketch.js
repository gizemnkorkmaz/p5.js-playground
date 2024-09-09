let t = 0;

function setup() {
  createCanvas(900, 600, WEBGL);
  noFill();
}

function draw() {
  background(0);

  t += 0.05;

  push();

  stroke(200);

  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, 200, 200);
  pop();

  drawWavingRect(0, 0, 205, 205, color(255, 200, 0), t / 1, 5);

  drawWavingRect(0, 0, 210, 210, color(255, 100, 0), t / 2, 7);
}

function drawWavingRect(x, y, w, h, col, phase, amplitude) {
  push();
  stroke(col);
  beginShape();

  vertex(x - w / 2, y - h / 2);

  for (let i = 0; i <= 1; i += 0.01) {
    let px = lerp(x - w / 2, x + w / 2, i);
    let py = y - h / 2 + sin(phase + i * TWO_PI) * amplitude;
    vertex(px, py);
  }

  vertex(x + w / 2, y - h / 2);

  for (let i = 0; i <= 1; i += 0.1) {
    let px = x + w / 2 + sin(phase + i * TWO_PI) * amplitude;
    let py = lerp(y - h / 2, y + h / 2, i);
    vertex(px, py);
  }

  vertex(x + w / 2, y + h / 2);

  for (let i = 1; i >= 0; i -= 0.1) {
    let px = lerp(x - w / 2, x + w / 2, i);
    let py = y + h / 2 + sin(phase + i * TWO_PI) * amplitude;
    vertex(px, py);
  }

  vertex(x - w / 2, y + h / 2);

  for (let i = 1; i >= 0; i -= 0.1) {
    let px = x - w / 2 + sin(phase + i * TWO_PI) * amplitude;
    let py = lerp(y - h / 2, y + h / 2, i);
    vertex(px, py);
  }

  endShape(CLOSE);
  pop();
}
