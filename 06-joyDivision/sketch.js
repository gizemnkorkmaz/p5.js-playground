let rows = 60;
let yStep;
let time = 0;
let lineLengthFactor = 0.6; // Adjusted factor to shorten the lines
let padding = 60; // Padding from the top and bottom edges

function setup() {
  createCanvas(800, 500);
  background(0);
  noFill();

  // Adjust yStep to account for the full canvas height minus padding
  yStep = (height - 2 * padding) / rows;
}

function draw() {
  background(0);

  // Calculate the length of each line segment
  let lineStart = 0;
  let lineEnd = width;
  let lineRange = lineEnd - lineStart;
  let segmentLength = lineRange * lineLengthFactor; // Shorter line length

  // Center position for each line segment
  let centerX = width / 2;
  let lineCenterStart = centerX - segmentLength / 2;
  let lineCenterEnd = lineCenterStart + segmentLength;

  for (let y = 0; y < rows; y++) {
    beginShape();
    if (y === Math.floor(rows / 2)) {
      stroke(255, 0, 0); // Red color for the center line
    } else {
      stroke(255);
    }

    for (let x = lineCenterStart; x < lineCenterEnd; x++) {
      let yOffset = map(noise(x * 0.01, y * 0.1, time * 0.1), 0, 1, -20, 20);
      // Adjust y position for padding
      vertex(x, y * yStep + padding + yOffset);
    }
    endShape();
  }

  time += 0.05;
}
