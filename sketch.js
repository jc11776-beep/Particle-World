let c = [];
let n = 250;
let bolts = [];

function setup() {
  colorMode(HSB, 100);
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < n; i++) {
    c[i] = new Rain(random(width), random(-height, 0), random(8, 18));
  }
}

function draw() {
  background(0, 0, 15);

  // rain
  for (let i = 0; i < c.length; i++) {
    c[i].display();
    c[i].move();
    c[i].moveback();
  }

  // lightning
  for (let i = bolts.length - 1; i >= 0; i--) {
    bolts[i].display();
    bolts[i].move();

    if (bolts[i].timer > 10) {
      bolts.splice(i, 1);
    }
  }
}

function mousePressed() {
  bolts.push(new Lightning(mouseX));
}


class Rain {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.speedY = map(this.s, 8, 18, 4, 10);
  }

  display() {
    stroke(60, 20, 100);
    strokeWeight(1);
    line(this.x, this.y, this.x, this.y + this.s);
  }

  move() {
    this.y += this.speedY;
  }

  moveback() {
    if (this.y > height + this.s) {
      this.x = random(width);
      this.y = random(-80, 0);
      this.s = random(8, 18);
      this.speedY = map(this.s, 8, 18, 4, 10);
    }
  }
}


class Lightning {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.alpha = 100;
    this.timer = 0;
  }

  display() {
    push();
    translate(this.x, 0);


    stroke(60, 0, 100, this.alpha);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let y = 0; y <= height; y += 20) {
      let offset = random(-10, 10);
      vertex(offset, y);
    }
    endShape();

    fill(100, 0, 100, this.alpha * 0.2);
    noStroke();
    circle(0, 0, 600);

    pop();
  }

  move() {
    this.alpha -= 20;
    this.timer++;
  }
}