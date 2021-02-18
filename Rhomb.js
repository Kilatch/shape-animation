class Rhomb {
  constructor({ x, y, w, color } = {}) {
    this.x = x
    this.y = y
    this.w = w
    this.color = color
    this.innerRhomb = null
    this.angle = 0
  }

  createInnerRhomb(color) {
    this.innerRhomb = new Rhomb({
      x: this.x,
      y: this.y,
      w: this.w - options.innerWidth,
      color,
    })
  }

  rotate() {
    this.angle -= options.rotationSpeed
    if (this.innerRhomb) {
      this.innerRhomb.rotate()
    }
  }

  expandInnerRhomb() {
    if (this.innerRhomb) {
      this.w -= random(0.2, 0.5)
    }
  }

  expand() {
    this.w += options.expandSpeed
    if (this.innerRhomb) {
      this.innerRhomb.expand()
    }
  }

  outOfBound() {
    if (options.shapeD === 'rect') {
      return this.w >= width * 2
    }
    return this.w >= width + 500
  }

  show() {
    push()
    fill(this.color)
    if (this.innerRhomb && options.borders) {
      stroke(this.innerRhomb.color)
    } else {
      noStroke()
    }
    translate(width / 2, height / 2)
    rotate(options.startingAngle + this.angle)
    if (options.shapeD === 'rect') {
      rect(this.x, this.y, this.w)
    } else {
      ellipse(this.x, this.y, this.w)
    }
    pop()
    if (this.innerRhomb) {
      this.innerRhomb.show()
    }
  }
}
