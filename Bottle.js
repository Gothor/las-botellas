class Bottle extends GameObject {
  constructor(radius, color) {
    super(0, 0);
    this.radius = radius;
    this.color = color;
    this.selected = false;
  }

  get diameter() {
    return this.radius * 2;
  }

  contains(x, y) {
    return dist(x, y, this.position.x, this.position.y) < this.radius;
  }

  toggle() {
    this.selected = !this.selected;
  }

  draw() {
    if (this.selected) {
      stroke(0);
      strokeWeight(4);
    } else {
      noStroke();
    }
    fill(this.color);

    // const w = 20;
    // const ratioV = 0.017543;
    const ratioH = 0.05; // 1 / 20 pixels de large
    const scale = this.radius * ratioH;

    beginShape();
    vertex(-10 * scale, -15 * scale);
    vertex(-4 * scale, -25 * scale);
    vertex(-4 * scale, -35 * scale);
    bezierVertex(-4 * scale, -38 * scale, 4 * scale, -38 * scale, 4 * scale, -35 * scale);
    vertex(4 * scale, -25 * scale);
    vertex(10 * scale, -15 * scale);
    vertex(10 * scale, 15 * scale);
    bezierVertex(10 * scale, 20 * scale, -10 * scale, 20 * scale, -10 * scale, 15 * scale);
    endShape(CLOSE);
  }

  onMousePressed(x, y) {
    if (!this.contains(x, y)) return;
    this.toggle();
    console.log("IN", this.selected);
  }
}
