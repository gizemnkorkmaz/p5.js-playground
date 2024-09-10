let rows = 80;
let yStep;
let lineLengthFactor = 0.7; // Reduced factor for shorter lines
let padding = 100;
let time = 0;

function setup() {
  createCanvas(800, 600);
  background(0);
  stroke(255);
  noFill();
  yStep = (height - 2 * padding) / rows;
}

function draw() {
  background(0);

  let lineStart = 0;
  let lineEnd = width;
  let lineRange = lineEnd - lineStart;
  let segmentLength = lineRange * lineLengthFactor;

  let centerX = width / 2;
  let lineCenterStart = centerX - segmentLength / 2;
  let lineCenterEnd = lineCenterStart + segmentLength;

  for (let y = 0; y < rows; y++) {
    beginShape();
    for (let x = lineCenterStart; x < lineCenterEnd; x++) {
      let xOffset = map(x, lineCenterStart, lineCenterEnd, -PI, PI);
      let yOffset =
        sin(xOffset + time) * 90 * noise(x * 0.01, y * 0.13, time * 0.1);
      vertex(x, y * yStep + padding + yOffset);
    }
    endShape();
  }

  time += 0.02;
}
