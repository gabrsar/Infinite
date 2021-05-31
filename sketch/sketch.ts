let direction: number = 1;
let lastX = 0;
let lastY = 0;
let a = 0;
let noiseStrengthMultiplier = 0.1;
let velocityOffset: number;


let noiseIncrement = 0.01;

let maxCenterWanderDistance: number;

let lastCoordinates: p5.Vector;
let curveDeviationOffset: p5.Vector;
let curveCenterOffset: p5.Vector;
let midScreen: p5.Vector;
let curveSizeOffset: p5.Vector;


function makeCanvas() {
    createCanvas(windowWidth, windowHeight);
    background(220);
    midScreen = createVector(windowWidth / 2, windowHeight / 2);
    maxCenterWanderDistance = Math.min(windowWidth, windowHeight) * 0.4;
}

function bigRandom(a = 10 ** 9) {
    return Math.random() * a;
}

function startValues() {
    lastCoordinates = createVector(0, 0);
    curveDeviationOffset = createVector(bigRandom(), bigRandom());
    curveCenterOffset = createVector(bigRandom(), bigRandom());
    curveSizeOffset = createVector(bigRandom(), bigRandom());
    velocityOffset = bigRandom();
}

function setup() {
    startValues();
    makeCanvas();
    angleMode(DEGREES);
}

function windowResized() {
    makeCanvas();
}

function draw() {
    if (frameCount % 5 == 0) {
        background(`rgba(220, 220, 220, 0.02)`);
    }

    a++;

    const velocity = 4;
    const t = (a / 100 * velocity);
    if (t % 360 == 0) {
        direction *= -1;
        a = 0;
    }

    const baseCurveSize = createVector(
        noise(curveSizeOffset.x += 0.001),
        noise(curveSizeOffset.y += 0.001)
    )


    const curveSize = createVector(
        0.6 + noise(curveDeviationOffset.x += 0.05) * noiseStrengthMultiplier,
        0.4 + noise(curveDeviationOffset.y += 0.01) * noiseStrengthMultiplier,
    )

    const curveCenter = createVector(
        (-0.5 + noise(curveCenterOffset.x += noiseIncrement)) * maxCenterWanderDistance,
        (-0.5 + noise(curveCenterOffset.y += noiseIncrement)) * maxCenterWanderDistance,
    )


    translate(midScreen.x, midScreen.y);

    const x = curveCenter.x + (direction * midScreen.x * curveSize.x * Math.cos(t));
    const y = curveCenter.y + (direction * midScreen.y * curveSize.y * Math.sin(t * 2));

    line(x, y, lastCoordinates.x || x, lastCoordinates.y || y);

    lastCoordinates.x = x;
    lastCoordinates.y = y;
}


