class Box {
  constructor(x, y, w, h) {
    const options = {
      restitution: 0.5
    }    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.Body.setMass(this.body, this.body.mass*4);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
  }
  
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0, 200, 100);
    rectMode(CENTER);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
    
  }
}