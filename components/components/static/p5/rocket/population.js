class Population {
    constructor(size) {
        this.rockets = [];
        this.popsize = size;
        this.matingpool = [];

        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    success(){
        let successful_hit = 0;
        for(let i = 0; i < this.popsize; i++){
            if(this.rockets[i].completed){
                successful_hit += 1
            }
        }
        return successful_hit;
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
        // Normalises fitnesses
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit;
        }

        // Take rockets fitness make in to scale of 1 to 100
        // A rocket with high fitness will highly likely will be in the mating pool
        this.matingpool = [];
        for (let i = 0; i < this.popsize; i++) {
            let n = 0;
            if (this.rockets[i].fitness >= 0.95) {
                n = this.rockets[i].fitness * 100;
            }
            for (let j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
        console.log(this.matingpool.length);
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