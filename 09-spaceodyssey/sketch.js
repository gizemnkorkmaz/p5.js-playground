let stars = [];
let monolith;

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < 900; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      z: random(-1000, 1000),
      brightness: random(100, 200),
      speed: random(0.5, 5),
    });
  }

  ambientLight(30);
  monolith = createMonolith();
}

function draw() {
  background(0);

  push();
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.z += star.speed;
    if (star.z > 200) {
      star.z = random(-1000, -200);
      star.x = random(-width, width);
      star.y = random(-height, height);
    }

    let starBrightness = constrain(star.brightness, 100, 200);
    fill(starBrightness, starBrightness, starBrightness * 1.2);
    noStroke();

    if (star.z < 0) {
      push();
      translate(star.x, star.y, star.z);
      box(2);
      pop();
    }
  }
  pop();

  rotateY(frameCount * 0.005);
  pointLight(
    200,
    180,
    150,
    cos(frameCount * 0.003) * 3000,
    0,
    sin(frameCount * 0.003) * 300
  );

  drawMonolith();
}

function createMonolith() {
  return {
    width: 40,
    height: 160,
    depth: 360,
    material: specularMaterial(30),
    shininess: 5,
  };
}

function drawMonolith() {
  push();
  translate(0, 0, 0);
  rotateX(HALF_PI);
  specularMaterial(30);
  shininess(5);
  fill(20);
  noStroke();
  box(monolith.width, monolith.height, monolith.depth);
  pop();
}

function simulateWarpSpeed() {
  push();
  let warpSpeed = 500;

  translate(0, 0, starTwinkle);
  fill(200, 220, 255, 150);
  sphere(3);
  pop();
}
