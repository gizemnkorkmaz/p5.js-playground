let stars = [];
let numStars = 2000;
let tetrisPieces = [];
let lastPieceTime = 0;
let pieceInterval = 1000;
let grid = [];
let gridSize = 15;
let gridWidth = 30;
let gridHeight = 20;
let particles = [];
let score = 0;
let linesCleared = 0;
let nextPiece = null;
let gameOver = false;
let screenShake = 0;
let countdown = 3;
let progress = 0;
let maxProgress = 100;

// Pixel font data for numbers 0-9
const pixelNumbers = {
  0: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  1: [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  2: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  3: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  4: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  5: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  6: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  7: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  8: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  9: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
};

// Pixel font data for letters
const pixelLetters = {
  C: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  M: [
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  R: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  X: [
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
  ],
};

function drawPixelText(text, x, y, size, color) {
  push();
  translate(x, y);
  fill(color);
  noStroke();

  let currentX = 0;
  for (let char of text.toUpperCase()) {
    let pixelData;
    if (char >= "0" && char <= "9") {
      pixelData = pixelNumbers[char];
    } else {
      pixelData = pixelLetters[char];
    }

    if (pixelData) {
      for (let row = 0; row < pixelData.length; row++) {
        for (let col = 0; col < pixelData[row].length; col++) {
          if (pixelData[row][col] === 1) {
            rect(currentX + col * size, row * size, size, size);
          }
        }
      }
      currentX += (pixelData[0].length + 1) * size;
    }
  }
  pop();
}

function setup() {
  let canvas = createCanvas(600, 400, WEBGL);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // Initialize grid
  for (let i = 0; i < gridWidth; i++) {
    grid[i] = [];
    for (let j = 0; j < gridHeight; j++) {
      grid[i][j] = null;
    }
  }

  // Create stars with colors
  for (let i = 0; i < numStars; i++) {
    // Randomly choose between white and colored stars
    let isColored = random() < 0.3; // 30% chance of being colored
    let starColor;
    if (isColored) {
      // Choose from pastel colors
      let colors = [
        color(255, 182, 193), // Pastel Pink
        color(144, 238, 144), // Pastel Green
        color(173, 216, 230), // Pastel Blue
        color(255, 255, 153), // Pastel Yellow
        color(221, 160, 221), // Pastel Purple
        color(175, 238, 238), // Pastel Cyan
        color(255, 218, 185), // Pastel Orange
      ];
      starColor = random(colors);
    } else {
      starColor = color(255); // White
    }

    stars.push({
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
      z: random(-300, 300),
      size: random(0.2, 1.0),
      speed: random(0.2, 1.0),
      twinkle: random(0.5, 1.2),
      twinkleSpeed: random(0.01, 0.03),
      color: starColor,
    });
  }

  // Create first next piece
  nextPiece = createRandomPiece();
}

function createRandomPiece() {
  const types = ["I", "O", "T", "L", "J", "S", "Z"];
  const colors = [
    color(255, 182, 193), // Pastel Pink
    color(144, 238, 144), // Pastel Green
    color(173, 216, 230), // Pastel Blue
    color(255, 255, 153), // Pastel Yellow
    color(221, 160, 221), // Pastel Purple
    color(175, 238, 238), // Pastel Cyan
    color(255, 218, 185), // Pastel Orange
  ];

  return {
    type: random(types),
    color: random(colors),
  };
}

function checkLines() {
  let linesToClear = [];
  for (let j = gridHeight - 1; j >= 0; j--) {
    let lineFull = true;
    for (let i = 0; i < gridWidth; i++) {
      if (grid[i][j] === null) {
        lineFull = false;
        break;
      }
    }
    if (lineFull) {
      linesToClear.push(j);
    }
  }

  if (linesToClear.length > 0) {
    // Add points based on number of lines cleared
    score += linesToClear.length * 100;
    linesCleared += linesToClear.length;

    // Create line clear particles
    for (let y of linesToClear) {
      for (let x = 0; x < gridWidth; x++) {
        if (grid[x][y]) {
          createLineClearParticles(
            x * gridSize - width / 2,
            y * gridSize - height / 2,
            grid[x][y].color
          );
        }
      }
    }

    // Remove lines and shift down
    for (let y of linesToClear) {
      for (let j = y; j > 0; j--) {
        for (let i = 0; i < gridWidth; i++) {
          grid[i][j] = grid[i][j - 1];
        }
      }
      for (let i = 0; i < gridWidth; i++) {
        grid[i][0] = null;
      }
    }

    // Add screen shake effect
    screenShake = 10;
  }
}

function createLineClearParticles(x, y, color) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      pos: createVector(x, y, 0),
      vel: p5.Vector.random3D().mult(random(3, 7)),
      size: random(1, 2),
      life: 255,
      color: [red(color), green(color), blue(color)],
    });
  }
}

function draw() {
  background(0);

  // Apply screen shake
  if (screenShake > 0) {
    translate(
      random(-screenShake, screenShake),
      random(-screenShake, screenShake)
    );
    screenShake -= 0.5;
  }

  // Draw title in top-left corner with  colors
  drawPixelText(
    "COSMIC",
    -width / 2 + 20,
    -height / 2 + 20,
    3,
    color(255, 182, 193, 200)
  );
  drawPixelText(
    "TETRIS",
    -width / 2 + 20,
    -height / 2 + 40,
    3,
    color(173, 216, 230, 200)
  );

  // Draw score in top-right corner with  colors
  drawPixelText(
    "SCORE",
    width / 2 - 100,
    -height / 2 + 20,
    3,
    color(255, 255, 153, 200)
  );
  drawPixelText(
    score.toString(),
    width / 2 - 100,
    -height / 2 + 40,
    3,
    color(255, 255, 153, 200)
  );

  // Draw next piece preview with  colors
  drawPixelText(
    "NEXT",
    width / 2 - 100,
    height / 2 - 100,
    3,
    color(221, 160, 221, 200)
  );
  if (nextPiece) {
    push();
    translate(width / 2 - 50, height / 2 - 50);
    fill(nextPiece.color);
    noStroke();
    switch (nextPiece.type) {
      case "I":
        rect(-15, -5, 30, 10);
        break;
      case "O":
        rect(-10, -10, 20, 20);
        break;
      case "T":
        rect(-10, -10, 20, 10);
        rect(0, 0, 10, 10);
        break;
      case "L":
        rect(-10, -10, 10, 30);
        rect(0, 0, 10, 10);
        break;
      case "J":
        rect(0, -10, 10, 30);
        rect(-10, 0, 10, 10);
        break;
      case "S":
        rect(-10, -10, 20, 10);
        rect(0, 0, 20, 10);
        break;
      case "Z":
        rect(0, -10, 20, 10);
        rect(-10, 0, 20, 10);
        break;
    }
    pop();
  }

  // Draw progress bar at the bottom
  push();
  noStroke();
  // Background of progress bar
  fill(50);
  rect(-width / 2, height / 2 - 10, width, 10);
  // Progress fill
  fill(255, 182, 193); // Pastel pink color
  rect(-width / 2, height / 2 - 10, width * (progress / maxProgress), 10);
  pop();

  // Draw stars with colors and softer twinkling
  for (let star of stars) {
    star.z += star.speed;
    if (star.z > 300) {
      star.z = -300;
    }

    let size = map(star.z, -300, 300, star.size * 1.5, star.size * 0.5);
    let brightness = map(star.z, -300, 300, 150, 30);

    let twinkle = sin(frameCount * star.twinkleSpeed) * 0.2 + 1;
    size *= twinkle;
    brightness *= twinkle;

    push();
    translate(star.x, star.y, star.z);
    if (star.color === color(255)) {
      // White stars
      fill(255, brightness);
    } else {
      // Colored stars
      let r = red(star.color);
      let g = green(star.color);
      let b = blue(star.color);
      fill(r, g, b, brightness);
    }
    noStroke();
    sphere(size);
    pop();
  }

  // Check if game has started
  if (countdown > 0) {
    // Draw countdown
    push();
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(countdown.toString(), 0, 0);
    pop();

    // Update countdown
    if (frameCount % 60 === 0) {
      countdown--;
    }
    return;
  }

  // Create new tetris piece periodically
  if (millis() - lastPieceTime > pieceInterval && !gameOver) {
    tetrisPieces.push({
      type: nextPiece.type,
      x: random(-width / 4, width / 4),
      y: -height / 2,
      speed: random(2, 4),
      rotation: random(TWO_PI),
      color: nextPiece.color,
    });
    nextPiece = createRandomPiece();
    lastPieceTime = millis();
  }

  // Update and draw tetris pieces with rounded corners
  for (let i = tetrisPieces.length - 1; i >= 0; i--) {
    let piece = tetrisPieces[i];

    if (canMoveDown(piece)) {
      piece.y += piece.speed * 2;
    } else {
      createLandingParticles(piece);
      addToGrid(piece);
      tetrisPieces.splice(i, 1);
      score += 10;
      checkLines();

      if (piece.y <= -height / 2 + gridSize) {
        gameOver = true;
      }
    }

    push();
    translate(piece.x, piece.y);
    rotate(piece.rotation);

    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = piece.color;
    fill(piece.color);
    noStroke();

    // Draw pieces with rounded corners
    let cornerRadius = 3;
    switch (piece.type) {
      case "I":
        rect(-22.5, -7.5, 45, 15, cornerRadius);
        break;
      case "O":
        rect(-15, -15, 30, 30, cornerRadius);
        break;
      case "T":
        rect(-15, -15, 30, 15, cornerRadius);
        rect(0, 0, 10, 10, cornerRadius);
        break;
      case "L":
        rect(-15, -15, 15, 45, cornerRadius);
        rect(0, 0, 15, 15, cornerRadius);
        break;
      case "J":
        rect(0, -15, 15, 45, cornerRadius);
        rect(-10, 0, 15, 15, cornerRadius);
        break;
      case "S":
        rect(-15, -15, 30, 15, cornerRadius);
        rect(0, 0, 30, 15, cornerRadius);
        break;
      case "Z":
        rect(0, -15, 30, 15, cornerRadius);
        rect(-15, 0, 30, 15, cornerRadius);
        break;
    }
    drawingContext.shadowBlur = 0;
    pop();
  }

  // Update and draw particles with enhanced effects
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.pos.add(p.vel);
    p.life -= 1.5;

    push();
    translate(p.pos.x, p.pos.y, p.pos.z);
    fill(p.color[0], p.color[1], p.color[2], p.life);
    noStroke();
    sphere(p.size);
    pop();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  // Draw stacked pieces from grid
  drawGrid();

  // Draw game over screen with  colors
  if (gameOver) {
    push();
    fill(0, 0, 0, 200);
    noStroke();
    rect(-width / 2, -height / 2, width, height);

    fill(255, 182, 193);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", 0, -50);
    textSize(24);
    text("Final Score: " + score, 0, 0);
    textSize(16);
    text("Press R to Restart", 0, 50);
    pop();
  }
}

function createLandingParticles(piece) {
  // Create fewer particles for a subtler effect
  for (let i = 0; i < 20; i++) {
    particles.push({
      pos: createVector(piece.x, piece.y, 0),
      vel: p5.Vector.random3D().mult(random(1, 2)),
      size: random(1, 2),
      life: 255,
      color: [red(piece.color), green(piece.color), blue(piece.color)],
    });
  }

  // Create fewer fragments of the piece
  let fragmentCount = 5;
  let fragmentSize = 4;
  for (let i = 0; i < fragmentCount; i++) {
    let angle = random(TWO_PI);
    let distance = random(5, 15);
    let fragmentX = piece.x + cos(angle) * distance;
    let fragmentY = piece.y + sin(angle) * distance;

    particles.push({
      pos: createVector(fragmentX, fragmentY, 0),
      vel: createVector(cos(angle) * 2, sin(angle) * 2, random(-1, 1)),
      size: fragmentSize,
      life: 255,
      color: [red(piece.color), green(piece.color), blue(piece.color)],
    });
  }

  // Add smaller screen shake effect
  screenShake = 5;
}

function canMoveDown(piece) {
  // Convert piece position to grid coordinates
  let gridX = floor((piece.x + width / 2) / gridSize);
  let gridY = floor((piece.y + height / 2) / gridSize);

  // Check if piece would hit bottom or other pieces
  if (gridY >= gridHeight - 1) return false;

  // Check collision with other pieces in grid
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if (grid[i][j] !== null) {
        if (abs(gridX - i) < 2 && abs(gridY + 1 - j) < 2) {
          return false;
        }
      }
    }
  }

  return true;
}

function addToGrid(piece) {
  let gridX = floor((piece.x + width / 2) / gridSize);
  let gridY = floor((piece.y + height / 2) / gridSize);

  if (gridX >= 0 && gridX < gridWidth && gridY >= 0 && gridY < gridHeight) {
    grid[gridX][gridY] = piece;
    progress = min(progress + 2, maxProgress);
  }
}

function drawGrid() {
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      if (grid[i][j] !== null) {
        let piece = grid[i][j];
        push();
        translate(i * gridSize - width / 2, j * gridSize - height / 2);
        fill(piece.color);
        noStroke();

        // Draw the specific tetris shape
        switch (piece.type) {
          case "I":
            rect(-22.5, -7.5, 45, 15);
            break;
          case "O":
            rect(-15, -15, 30, 30);
            break;
          case "T":
            rect(-15, -15, 30, 15);
            rect(0, 0, 15, 15);
            break;
          case "L":
            rect(-15, -15, 15, 45);
            rect(0, 0, 15, 15);
            break;
          case "J":
            rect(0, -15, 15, 45);
            rect(-15, 0, 15, 15);
            break;
          case "S":
            rect(-15, -15, 30, 15);
            rect(0, 0, 30, 15);
            break;
          case "Z":
            rect(0, -15, 30, 15);
            rect(-15, 0, 30, 15);
            break;
        }
        pop();
      }
    }
  }
}

function keyPressed() {
  if (key === "r" && gameOver) {
    // Reset game
    grid = [];
    for (let i = 0; i < gridWidth; i++) {
      grid[i] = [];
      for (let j = 0; j < gridHeight; j++) {
        grid[i][j] = null;
      }
    }
    tetrisPieces = [];
    particles = [];
    score = 0;
    linesCleared = 0;
    pieceInterval = 1000;
    gameOver = false;
    countdown = 3;
    nextPiece = createRandomPiece();
    progress = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
