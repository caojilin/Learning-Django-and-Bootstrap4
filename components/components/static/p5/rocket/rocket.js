class Rocket {
    constructor(dna) {
        this.pos = createVector(width / 2, height - 50);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crashed = false;
        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fitness = 0;
    }

    applyforce(force) {
        this.acc.add(force);
    }

    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);

        this.fitness = map(d, 0, width, width, 0) + 0.5*Count;

        if (this.completed) {
            this.fitness *= 30;
        }

        if (this.hitBarrier()) {
            this.fitness /= 50;
        }

        if (this.pos.x < 0) {
            this.fitness /= 50;
        }
        if (this.pos.x > width) {
            this.fitness /= 20;
        }
        if (this.pos.y < 0) {
            this.fitness /= 5;
        }
        if (this.pos.y > height) {
            this.fitness /= 30;
        }
    }

    show() {
        push();
        noStroke();
        fill(255, 0, 0, 100);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 30, 5);
        pop();
    }


    hitBarrier() {
        if (
            this.pos.x > rx &&
            this.pos.x < rx + rw &&
            this.pos.y > ry &&
            this.pos.y < ry + rh
        ) {
            return true
        }
    }

    hitWall() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < target_radius / 2) {
            this.completed = true;
            // this.pos = target.copy();
        }
        //check rocket hit barrier

        if (this.hitBarrier()) {
            this.crashed = true;
        }

        if (this.hitWall()) {
            this.crashed = true;
        }

        this.applyforce(this.dna.genes[Count]);

        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }

    }
}