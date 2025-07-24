const NB_BOTTLES = 7;

let bottles;
let solution;
let timer;
let start;
let win;

let titleLabel;
let counterLabel;
let timerLabel;
let stepsLabel;
let font;

let bottleSounds = [];

function countSimilarItems(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) count++;
  }
  return count;
}

function updateCount() {
  counterLabel.text = countSimilarItems(bottles, solution);
  win = counterLabel.text === NB_BOTTLES;
}

function getColors(nb) {
  colorMode(HSB);
  const colors = [];
  for (let i = 0; i < nb; i++) {
    const hue = ((i * 360 / nb) + random(-10, 10) + 360) % 360;
    const c = color(hue, random(50, 100), random(50, 100));
    colors.push(c);
  }
  return shuffle(colors);
}

function preload() {
  font = loadFont('DelaGothicOne-Regular.ttf');

  const bottleSoundFiles = [
    'assets/sfx/bottle1.mp3',
    'assets/sfx/bottle2.mp3',
    'assets/sfx/bottle3.mp3',
    'assets/sfx/bottle4.mp3',
    'assets/sfx/bottle5.mp3',
  ];

  for (const bottleSoundFile of bottleSoundFiles) {
    bottleSounds.push(loadSound(bottleSoundFile));
  }
}

function reset() {
  solution = shuffle(bottles);
  updateCount();
  start = millis();
  win = false;
  stepsLabel.text = 0;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  pixelDensity(1);
  
  // Create labels
  titleLabel = new Label("Las Botellas", 92, CENTER, TOP);
  titleLabel.font = font;
  counterLabel = new Label(0, 128, CENTER, CENTER);
  timerLabel = new Label(0, 128, LEFT, BASELINE);
  stepsLabel = new Label(0, 128, RIGHT, BASELINE);
  
  // Create bottles
  const colors = getColors(NB_BOTTLES);

  bottles = [];
  for (let i = 0; i < NB_BOTTLES; i++) {
    const bottle = new Bottle(0, colors[i]);
    bottles.push(bottle);
  }

  solution = shuffle(bottles);
  updateCount();

  windowResized();

  reset();
}

function draw() {
  if (!win) {
    timerLabel.text = round((millis() - start) / 1000, 2);
  }
  
  background(220);

  for (const gameObject of _gameObjects) {
    gameObject._draw();
  }
}

function computePositions() {
  // Position of the labels
  let titleFits = false;
  for (let textSize = 92; !titleFits; textSize--) {
    titleLabel.textSize = textSize;
    const titleWidth = titleLabel.computeWidth();
    titleFits = titleWidth < width - 20;
  }
  titleLabel.position.set(width / 2, 10);

  counterLabel.position.set(width / 2, 200);

  let timerFits = false;
  for (let textSize = 128; !timerFits; textSize--) {
    timerLabel.textSize = textSize;
    stepsLabel.textSize = textSize;
    const timerWidth = timerLabel.computeWidth('000.00');
    timerFits = timerWidth < width / 2 - 20;
  }
  timerLabel.position.set(10, height - 10);
  stepsLabel.position.set(width - 10, height - 10);

  // Position of the bottles
  const minSpace = 10;
  let radius = (width - minSpace * (NB_BOTTLES + 1)) / (NB_BOTTLES * 2);
  radius = min(radius, 100);
  const freeSpace = width - radius * 2 * NB_BOTTLES;
  const spaceBetween = freeSpace / (NB_BOTTLES + 1);

  const y = height * 0.66;
  for (let i = 0; i < NB_BOTTLES; i++) {
    const x = (i + 1) * spaceBetween + (i * 2 + 1) * radius;
    const bottle = bottles[i];
    bottle.position.set(x, y);
    bottle.radius = radius;
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  computePositions();
}

function mousePressed() {
  if (win) {
    reset();
    return;
  }

  for (const gameObject of _gameObjects) {
    gameObject._onMousePressed(mouseX, mouseY);
  }

  const selected = bottles.filter((b) => b.selected);
  if (selected.length === 2) {
    stepsLabel.text++;
    
    selected[0].selected = false;
    selected[1].selected = false;

    // Inverse les positions physiques
    const tmpPos = selected[0].position;
    selected[0].position = selected[1].position;
    selected[1].position = tmpPos;

    // Inverse les positions physiques
    const i1 = bottles.indexOf(selected[0]);
    const i2 = bottles.indexOf(selected[1]);
    bottles[i1] = selected[1];
    bottles[i2] = selected[0];

    updateCount();

    random(bottleSounds).play();
  }
}
