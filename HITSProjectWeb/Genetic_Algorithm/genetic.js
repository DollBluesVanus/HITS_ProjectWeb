function calculateFitness() {
  for (let i = 0; i < population.length; i++) {
    var distance = calculateDistance(cities, population[i]);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestEver = population[i];
    }

    fitness[i] = 1 / (distance + 1);
  }
}


function normalizeFitness() {
  let sum = 0;

  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }

  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}


function nextGeneration() {
  const newPopulation = [];

  for (let i = 0; i < population.length; i++) {
    let order = pickOne(population, fitness);

    mutate(order);
    newPopulation[i] = order;
  }

  population = newPopulation;
}


function pickOne(list, probability) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - probability[index];
    index++;
  }

  index--;
  return list[index].slice();
}

function mutate(order) {
  var indexA = floor(random(order.length));
  var indexB = floor(random(order.length));
  swap(order, indexA, indexB);
}


