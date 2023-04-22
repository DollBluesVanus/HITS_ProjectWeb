let cities = [];
let totalCities = 10;

const populationSize = 50;

const fitness = [];
let population = [];
let bestEver;
let bestDistance = Infinity;

let statusP;


function setup() {
  createCanvas(1905, 700);
  totalCities = parseInt(prompt("Введите количество городов:", ""));
  statusP = createP();
}


function draw() {
  background(148, 110, 175);

  stroke(34, 34, 34);
  strokeWeight(4);
  noFill();

  statusP.style('color', '#d4d4d4');
  statusP.style('font-size', '48px');
  statusP.position(650, 750);

  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 16, 16);
  }

  if (cities.length === totalCities) {
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    beginShape();

    for (let i = 0; i < bestEver.length; i++) {
      const n = bestEver[i];
      vertex(cities[n].x, cities[n].y);
      ellipse(cities[n].x, cities[n].y, 16, 16);
    }
    
    endShape();

    statusP.position(700, 750);
    statusP.html('Генетический алгоритм');

  } else {
    statusP.html('Нажмите, чтобы добавить город ' + (cities.length + 1));
  }
}


function mousePressed() {
  if (cities.length < totalCities) {
    const v = createVector(mouseX, mouseY);
    cities.push(v);

    if (cities.length === totalCities) {
      const order = [];

      for (let i = 0; i < totalCities; i++) {
        order[i] = i;
      }

      for (let i = 0; i < populationSize; i++) {
        population[i] = shuffle(order);
      }
    }
  }
}


function swap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calculateDistance(points, order) {
  let sum = 0;

  for (let i = 0; i < order.length - 1; i++) {
    const cityAIndex = order[i];
    const cityA = points[cityAIndex];
    const cityBIndex = order[i + 1];
    const cityB = points[cityBIndex];
    const distance = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += distance;
  }
  
  return sum;
}