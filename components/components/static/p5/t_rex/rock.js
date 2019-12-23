class Rock {
    constructor() {
        this.r = 30;
        this.x = width;
        this.y = height - this.r;
        this.velocity = random(7,8);
    }

    update() {
        this.x -= this.velocity;
    }

    show() {
        fill(0, 100);
        rect(this.x, this.y, this.r, this.r);
        // image(rock_img, this.x, this.y);
    }

    offscreen() {
        if (this.x < -this.r) {
            return true;
        } else {
            return false;
        }
    }

    hits(t_rex) {
        return collideRectRect(this.x, this.y, this.r, this.r, t_rex.x, t_rex.y, t_rex.r, t_rex.r);
    }
}