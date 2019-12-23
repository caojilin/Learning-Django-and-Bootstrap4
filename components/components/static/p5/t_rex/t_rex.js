class T_Rex {
    constructor(brain) {
        this.r = 30;
        this.x = 10;
        this.y = height - this.r;
        this.velocity = 0;
        this.gravity = 1;
        this.lift = -15;

        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(3, 4, 2);
        }

    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(rocks) {

        let closest = rocks[rocks.length - 1];
        let second_closest = rocks[rocks.length - 2];
        let d2;
        if (second_closest === undefined) {
            d2 = 0;
        } else {
            d2 = second_closest.x - (this.x + this.r);

        }

        let d1 = closest.x - (this.x + this.r);
        let inputs = [];

        inputs[0] = d1 / width;
        inputs[1] = d2 / width;
        inputs[2] = closest.velocity / 10;

        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.jump();
        }
    }

    show() {
        push();
        fill(255, 50);
        stroke('red');
        rect(this.x, this.y, this.r, this.r);
        // image(t_rex_img, this.x, this.y, this.r, this.r);
        pop();
    }

    update() {
        this.score++;

        this.velocity += this.gravity;
        this.y += this.velocity;
        this.y = constrain(this.y, 0, height - this.r);
    }

    jump() {
        if (this.is_at_bottom()) {
            this.velocity += this.lift;
        }
    }

    is_at_bottom() {
        return this.y === height - this.r;
    }


    hit(rock) {
        return collideRectRect(this.x, this.y, this.r, this.r, rock.x, rock.y, rock.r, rock.r);
    }
}