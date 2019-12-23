class T_Rex {
    constructor(brain) {
        this.r = 30;
        this.x = 10;
        this.y = height - this.r;
        this.velocity = 0;
        this.gravity = 1;
        this.lift = -20;

        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }

    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(obstacles) {
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < obstacles.length; i++) {
            let d = obstacles[i].x + obstacles[i].r - this.x;
            if (d < closestD && d > 0) {
                closest = obstacles[i];
                closestD = d;
            }
        }

//        if (closest === null) {
//            closest = new Rock(current_rock_speed);
//            rocks.push(closest);
//        }

        let inputs = [];

        let d = closest.x + closest.r - this.x - this.r;

        inputs[0] = d / width;
        inputs[1] = this.velocity / 20;
        inputs[2] = this.y / height;
        inputs[3] = closest.r / 50;
        inputs[4] = closest.velocity / 10;


        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    show() {
        push();
        fill(255, 0, 0, 100);
        // stroke('red');
        rect(this.x, this.y, this.r, this.r);
        // image(t_rex_img, this.x, this.y, this.r, this.r);
        pop();
    }

    update() {
        // this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.y = constrain(this.y, 0, height - this.r);
        if (this.is_at_bottom()) {
            this.velocity = 0;
        }
        // console.log(this.velocity);
    }

    jump() {
        if (this.is_at_bottom()) {
            this.velocity = this.lift;
        }
    }

    is_at_bottom() {
        // console.log("here");
        return this.y === height - this.r;
    }

}