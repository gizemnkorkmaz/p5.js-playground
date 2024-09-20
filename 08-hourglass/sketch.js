let angleY = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(0.1);

  noFill();
  rotateX(60);
  angleY += 0.0025;

  for (let i = 0; i < 150; i++) {
    let ringRadiusX = 100;
    let ringRadiusY = 200;
    let ringAngle = angleY + i * 105;

    push();
    rotateY(ringAngle);

    beginShape();
    for (let j = 0; j < Math.PI; j += 0.099) {
      let x = cos(j) * ringRadiusX;
      let z = sin(j) * ringRadiusY;

      let waveOffset = 145;
      let y = sin(j * 900 + frameCount * 0.001) * waveOffset;

      vertex(x, y, z);
    }
    endShape(CLOSE);

    pop();
  }
}
