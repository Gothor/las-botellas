class Label extends GameObject {
  constructor(text, textSize, horizontalAlignment, verticalAlignment) {
    super(0, 0);
    this.text = text;
    this.textSize = textSize;
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.font = null;
  }

  draw() {
    if (this.font) {
      textFont(this.font);
    }
    textAlign(this.horizontalAlignment, this.verticalAlignment);
    textSize(this.textSize);
    text(this.text, 0, 0);
  }

  computeWidth(text) {
    if (!text) text = this.text;

    push();
    if (this.font) {
      textFont(this.font);
    }
    textSize(this.textSize);
    const w = textWidth(text);
    pop();
    return w;
  }
}
