const _gameObjects = [];

class GameObject {
  constructor(x, y) {
    _gameObjects.push(this);
    this.position = createVector(x, y);
  }

  _draw() {
    push();
    translate(this.position.x, this.position.y);
    this.draw();
    pop();
  }

  draw() { }

  _onMousePressed(x, y) {
    this.onMousePressed(x, y);
  }

  onMousePressed() { }
}
