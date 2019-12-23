class Rock {
    constructor(velocity) {
        this.r = random(20, 50);
        this.x = width;
        this.height = 40;
        this.y = height - this.height;
        this.velocity = random(current_rock_speed, current_rock_speed + 1);
    }

    update() {
        this.x -= this.velocity;
    }

    show() {
        fill(0, 100);
        rect(this.x, this.y, this.r, this.height);
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