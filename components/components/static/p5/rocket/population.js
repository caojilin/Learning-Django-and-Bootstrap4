class Population {
    constructor() {
        this.rockets = [];
        this.popsize = 100;
        this.matingpool = [];

        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    evaluate() {
        let maxfit = 0;
        // Iterate through all rockets and calcultes their fitness
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }
        console.log("maxfit" + maxfit);

        // Normalises fitnesses
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        // Take rockets fitness make in to scale of 1 to 100
        // A rocket with high fitness will highly likely will be in the mating pool
        for (let i = 0; i < this.popsize; i++) {
            let n = 0;
            if (this.rockets[i].fitness > 0.5 && this.rockets[i].fitness < 0.8) {
                n = this.rockets[i].fitness * 10;

            } else if (this.rockets[i].fitness > 0.9) {
                n = this.rockets[i].fitness * 50;

            } else {
                n = this.rockets[i].fitness * 5;
            }
            for (let j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
        console.log("matingpoll length" + this.matingpool.length);

    }

    selection() {
        let newRockets = [];
        for (let i = 0; i < this.popsize; i++) {
            let parentA = random(this.matingpool).dna;
            let parentB = random(this.matingpool).dna;
            let child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    run() {
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

}