class Food {
	constructor(x, y, fillColor) {
		this.x = x;
		this.y = y;
		this.position = createVector(x, y);
		this.fillColor = fillColor;
	}

	display() {
		fill(this.fillColor);
		ellipse(this.position.x, this.position.y, 8, 8);
	}
}
