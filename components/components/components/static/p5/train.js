class Train {

  constructor() {
    this.r = 75;
    this.x = width;
    this.y = height - this.r;
  }

  move(units) {
    if (units == null)
      units = 16

    this.x -= units;
  }

  show() {
    image(tImg, this.x, this.y, this.r, this.r);
    fill(255, 50);
    //ellipseMode(CORNER);
    //ellipse(this.x, this.y, this.r, this.r);

  }
  
  offscreen() {
    return this.x < -25
  }

}