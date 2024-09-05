let angle = 0;
let sphereX = -400;
let sphereZ = 0;
let sphereSpeed = 2;
let blackHoleRadius = 300;
let movingTowardsCenter = true;

function setup() {
  createCanvas(900, 600, WEBGL);
  noFill();
}

function draw() {
  background(0);
  ambientLight(255, 255, 255);
  pointLight(255, 0, 255, 300, 0, 500);

  let neonColors = [
    color(255, 0, 255),
    color(0, 255, 255),
    color(255, 255, 0),
    color(0, 255, 0),
    color(255, 0, 0),
    color(0, 0, 255),
  ];

  strokeWeight(2);
  for (let i = 0; i < 70; i++) {
    stroke(neonColors[i % neonColors.length]);

    let controlX1 = sin(angle + i) * (blackHoleRadius - abs(sphereZ));
    let controlY1 = cos(angle + i) * (blackHoleRadius - abs(sphereZ));
    let controlZ1 = cos(angle + i) * 100;

    let controlX2 = 0;
    let controlY2 = 0;
    let controlZ2 = 0;

    let endX = sin(angle + i) * (50 - abs(sphereZ) * 0.2);
    let endY = cos(angle + i) * (150 - abs(sphereZ) * 0.2);
    let endZ = sin(angle + i) * (50 - abs(sphereZ) * 0.2);

    bezier(
      -300,
      -300,
      0,
      controlX1,
      controlY1,
      controlZ1,
      controlX2,
      controlY2,
      controlZ2,
      endX,
      endY,
      endZ
    );
    bezier(
      300,
      300,
      0,
      -controlX1,
      -controlY1,
      -controlZ1,
      -controlX2,
      -controlY2,
      -controlZ2,
      -endX,
      -endY,
      -endZ
    );
  }

  push();
  translate(sphereX, 0, sphereZ);
  rotateX(angle);
  rotateY(angle * 0.5);
  stroke(30, 105, 160);
  strokeWeight(2);
  noFill();
  sphere(100);
  pop();

  if (movingTowardsCenter) {
    sphereZ -= sphereSpeed;
    sphereX += sphereSpeed * 0.5;
    if (sphereZ < -blackHoleRadius) {
      movingTowardsCenter = false;
    }
  } else {
    sphereZ += sphereSpeed;
    sphereX -= sphereSpeed * 0.5;
    if (sphereZ > 0) {
      movingTowardsCenter = true;
    }
  }

  angle += 0.01;
}
