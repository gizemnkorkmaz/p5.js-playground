let stars = [];

function setup() {
  createCanvas(1000, 700);
  background(0);
  noStroke();

  for (let i = 0; i < 1000; i++) {
    stars.push({
      angle: random(2 * Math.PI),
      distance: random(10, min(width, height) / 3),
      speed: random(0.001, 0.009),
      size: random(1, 2),
    });
  }
}

function draw() {
  background(0, 10);

  translate(width / 2, height / 2);

  for (let star of stars) {
    let x = star.distance * cos(star.angle) * 2;
    let y = star.distance * sin(star.angle);

    // Draw stars
    fill(255);
    ellipse(x, y, star.size, star.size);

    star.angle += star.speed;

    star.distance += 0.08;

    if (star.distance > min(width, height) / 8) {
      star.distance = random(10, min(width, height));
      star.angle = random(Math.PI * 2);
    }
  }
}
