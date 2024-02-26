class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.color = 255;
  }

  display() {
    noFill();
    stroke(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    if (this.angle > 0 && this.angle < 45) {
      this.drawRect();
    } else {
      this.drawX();
    }
    pop();
  }

  move() {
    let distance;
    if (pmouseX !== mouseX || pmouseY !== mouseY) {
      distance = dist(mouseX, mouseY, this.x, this.y);

      if (distance < mouseDistance) {
        this.angle += 1;
        this.color = 255;
      }
    }

    if (this.angle > 0 && this.angle < 90) {
      this.angle += 1;

      if (this.color > 70) {
        this.color -= 3;
      }
    } else {
      this.angle = 0;
      this.color = 70;
    }
  }

  drawRect() {
    rect(0, 0, size - offset, size - offset);
  }

  drawX() {
    let margin = -size / 2;

    line(
      margin + offset / 2,
      margin + offset / 2,
      margin + size - offset / 2,
      margin + size - offset / 2
    );
    line(
      margin + size - offset / 2,
      margin + offset / 2,
      margin + offset / 2,
      margin + size - offset / 2
    );
  }
}
