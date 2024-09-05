let waveAngle = 0;

function setup() {
  createCanvas(900, 600, WEBGL);
  noFill();
}

function draw() {
  background(0);
  rotateX(frameCount * 0);
  rotateY(frameCount * 0.005);
  stroke(255);
  strokeWeight(1);

  torus(120, 50);

  for (let i = 0; i < 200; i++) {
    let angle = i * 100;
    let radius = 200 + i * 0.5;

    let x = cos(angle + waveAngle) * radius;
    let y = sin(angle + waveAngle) * radius;
    let z = i - 100;

    stroke(100, 255 - i, 255);
    line(0, 0, 0, x, y, z);
  }

  waveAngle += 0.005;
}
