let glowingLineIndex = 0;
let glowTimer = 0;
let baseColor;
let particles = [];
let pointLightColor;
let iridescenceTimer = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
  baseColor = color(100, 100, 100);
  pointLightColor = color(255, 255, 255);
}

function draw() {
  background(0);

  let redGlow = 100 + 50 * sin(frameCount * 0.03);
  let greenGlow = 100 + 50 * sin(frameCount * 0.05);
  let blueGlow = 100 + 50 * sin(frameCount * 0.07);
  let glowColor = color(redGlow, greenGlow, blueGlow);
  let glowStrength = map(sin(frameCount * 0.05), -1, 1, 60, 120);

  if (frameCount - glowTimer > 60) {
    glowingLineIndex = int(random(0, 4));
    glowTimer = frameCount;
  }

  push();
  rotateX(frameCount * 0.002);
  rotateY(frameCount * 0.001);

  for (let x = -width / 2; x <= width / 2; x += 80) {
    for (let y = -height / 2; y <= height / 2; y += 80) {
      if (glowingLineIndex === 0 || glowingLineIndex === 2) {
        strokeWeight(0.5);
        stroke(
          glowColor.levels[0],
          glowColor.levels[1],
          glowColor.levels[2],
          glowStrength
        );
        line(x, y, -500, x, y, 500);
      } else {
        stroke(baseColor);
        strokeWeight(0.25);
        line(x, y, -500, x, y, 500);
      }
    }
  }

  for (let z = -500; z <= 500; z += 80) {
    for (let x = -width / 2; x <= width / 2; x += 80) {
      if (glowingLineIndex === 1 || glowingLineIndex === 2) {
        strokeWeight(0.5);
        stroke(
          glowColor.levels[0],
          glowColor.levels[1],
          glowColor.levels[2],
          glowStrength
        );
        line(x, -height / 2, z, x, height / 2, z);
      } else {
        stroke(baseColor);
        strokeWeight(0.25);
        line(x, -height / 2, z, x, height / 2, z);
      }
    }

    for (let y = -height / 2; y <= height / 2; y += 80) {
      if (glowingLineIndex === 3 || glowingLineIndex === 2) {
        strokeWeight(0.5);
        stroke(
          glowColor.levels[0],
          glowColor.levels[1],
          glowColor.levels[2],
          glowStrength
        );
        line(-width / 2, y, z, width / 2, y, z);
      } else {
        stroke(baseColor);
        strokeWeight(0.25);
        line(-width / 2, y, z, width / 2, y, z);
      }
    }
  }
  pop();

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isFinished()) {
      particles.splice(i, 1);
    }
  }

  push();
  ambientLight(30);
  directionalLight(255, 100, 100, 1, -1, -1);
  directionalLight(100, 255, 100, -1, 1, 1);
  directionalLight(100, 100, 255, 1, 1, -1);
  pointLight(
    pointLightColor.levels[0],
    pointLightColor.levels[1],
    pointLightColor.levels[2],
    0,
    0,
    300
  );

  let iridescenceColor = color(
    150 + 50 * sin(frameCount * 0.03),
    100 + 50 * sin(frameCount * 0.05),
    200 + 50 * sin(frameCount * 0.07)
  );

  specularMaterial(iridescenceColor);
  shininess(90);

  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);

  if (frameCount % 2 === 0) {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(0, 0, 0));
    }
  }
}


class Particle {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(random(-3, 3), random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0, 0, 0);
    this.lifespan = 255;
    this.size = random(1, 2); 
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 3;
  }

  isFinished() {
    return this.lifespan <= 0;
  }

  display() {
    push();
    noStroke();
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.lifespan
    );
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.size);
    pop();
  }
}
