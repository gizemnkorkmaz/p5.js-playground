let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(900, 600, WEBGL);
}

function draw() {
  background(0);
  ambientLight(70, 70, 200);
  pointLight(230, 75, 60, 220, 0, 500);

  rotateX(angleX);
  rotateY(angleY);

  sphere(220);
  angleY += 0.005;
  angleX += 0.005;
}
