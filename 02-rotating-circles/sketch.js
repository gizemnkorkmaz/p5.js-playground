let x;
let y;
let angle = 0;
let shiftingAngle = [];
let numAxis = 5;
let r = 150;
let x2 = [];
let y2 = [];

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);

  for (let i = 0; i < numAxis; i++) {
    shiftingAngle[i] = i * (90 / numAxis);
  }
}

function draw() {
  background(238, 174, 202);
  stroke(255, 100);

  //angle = map(mouseX, 0, width, 0, 360);
  x = r * cos(angle);
  y = r * sin(angle);

  translate(width / 2, height / 2);
  noFill();
  ellipse(0, 0, r * 2, r * 2);
  fill(34, 193, 195);
  ellipse(x, y, 50, 50);

  rotate(-45);
  line(-r, 0, r, 0);
  line(0, -r, 0, r);

  ellipse(x2, 0, 20, 20);
  ellipse(0, y2, 20, 20);

  for (let i = 0; i < numAxis; i++) {
    x2[i] = r * cos(angle + shiftingAngle[i]);
    y2[i] = r * sin(angle + shiftingAngle[i]);

    push();

    rotate(-shiftingAngle[i]);
    line(-r, 0, r, 0);
    line(0, -r, 0, r);

    fill(145, 194, 158);

    ellipse(x2[i], 0, 30, 30);
    ellipse(0, y2[i], 30, 30);

    pop();
  }

  angle += 1;
}
