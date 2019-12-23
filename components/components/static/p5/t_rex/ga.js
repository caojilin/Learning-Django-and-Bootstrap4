function nextGeneration() {
    console.log('next generation');
    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        dinosaurs[i] = pickOne();
    }
    for (let i = 0; i < TOTAL; i++) {
        savedDinosaurs[i].dispose();
    }
    savedDinosaurs = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedDinosaurs[index].fitness;
        index++;
    }
    index--;
    let t_rex = savedDinosaurs[index];
    let child = new T_Rex(t_rex.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let t_rex of savedDinosaurs) {
        sum += t_rex.score;
    }
    for (let t_rex of savedDinosaurs) {
        t_rex.fitness = t_rex.score / sum;
    }
}
