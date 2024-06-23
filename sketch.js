let stepLength = 150; // Length of each step
let showMask = true; // Flag to show or hide mask

let animationPercentage = 0; // Progress of the animation (0 to 1)
let animationState = 0; // Current state of the animation (0 to 3)

let width = 1280; // Updated width of the canvas
let height = 720; // Updated height of the canvas

let logo; // Variable to hold the logo image

// Initial line positions
let linesArray = [];

for (let i = 1; i <= 5; i++) {
    linesArray.push({
        x1: stepLength * i,
        y1: height - stepLength * (i - 1),
        x2: stepLength * i,
        y2: height - stepLength * i,
    });
    linesArray.push({
        x1: stepLength * i,
        y1: height - stepLength * i,
        x2: stepLength * (i + 1),
        y2: height - stepLength * i,
    });
}

// Preload function to load the logo image
function preload() {
    logo = loadImage('logo.jpg'); // Load the logo image
}

function setup() {
    createCanvas(width, height); // Create canvas with updated dimensions
    setTimeout(() => {
        showMask = false; // Hide mask after 4000 milliseconds (4 seconds)
    }, 4000);
}

function draw() {
    background(255); // Clear canvas with white background

    // Draw the logo at the top left corner
    image(logo, 10, 10, 100, 100); // Adjust the position and size as needed

    if (animationState === 0) {
        drawSteps();
        drawShapes0();
        animationPercentage += 0.02;
    } else if (animationState === 1) {
        drawSteps1();
        drawShapes1();
        animationPercentage += 0.1;
    } else if (animationState === 2) {
        drawSteps();
        drawShapes2();
        animationPercentage += 0.02;
    } else if (animationState === 3) {
        drawSteps1();
        drawShapes1();
        animationPercentage += 0.1;
    }

    if (animationPercentage > 1) {
        animationPercentage = 0;
        animationState = (animationState + 1) % 4;
    }

    if (showMask) {
        drawMask();
    }
}

function drawSteps() {
    stroke(0);
    strokeWeight(2);

    linesArray.forEach((l, i) => {
        let x1 = l.x1 - animationPercentage * stepLength;
        let y1 = l.y1 + animationPercentage * stepLength;
        let x2 = l.x2 - animationPercentage * stepLength;
        let y2 = l.y2 + animationPercentage * stepLength;

        if (i === 0) {
            if (animationPercentage >= 0 && animationPercentage < 0.2) {
                percentage = rangePercentage(animationPercentage, 0, 0.2);
                y1 += (y2 - y1) * (0.75 + 0.25 * percentage);
            } else {
                return;
            }
        }
        if (i === 1) {
            if (animationPercentage >= 0.2 && animationPercentage < 0.7) {
                percentage = rangePercentage(animationPercentage, 0.2, 0.7);
                x1 += (x2 - x1) * percentage;
            } else if (animationPercentage < 0.2) {
            } else {
                return;
            }
        }
        if (i === 2) {
            if (animationPercentage >= 0.7) {
                percentage = rangePercentage(animationPercentage, 0.7, 1);
                y1 += (y2 - y1) * 0.75 * percentage;
            } else if (animationPercentage < 0.7) {
            } else {
                y1 += (y2 - y1) * 0.75;
            }
        }

        if (i === linesArray.length - 1) {
            if (animationPercentage >= 0.5 && animationPercentage < 0.8) {
                percentage = rangePercentage(animationPercentage, 0.5, 0.8);
                x2 += (x1 - x2) * (1 - percentage);
            } else if (animationPercentage < 0.5) {
                return;
            } else {
            }
        }

        if (i === linesArray.length - 2) {
            if (animationPercentage >= 0.2 && animationPercentage < 0.5) {
                percentage = rangePercentage(animationPercentage, 0.2, 0.5);
                y2 += (y1 - y2) * (0.1 + 0.7 * (1 - percentage));
            } else if (animationPercentage < 0.2) {
                percentage = rangePercentage(animationPercentage, 0, 0.2);
                y2 += (y1 - y2) * (1 - 0.2 * percentage);
            } else if (animationPercentage >= 0.5) {
            }
        }
        line(x1, y1, x2, y2);
    });
}

function drawSteps1() {
    stroke(0);
    strokeWeight(2);

    linesArray.forEach((l, i) => {
        let x1 = l.x1;
        let y1 = l.y1;
        let x2 = l.x2;
        let y2 = l.y2;

        if (i === 0) {
            y1 += (y2 - y1) * (0.75);
        }

        if (i === linesArray.length - 1) {
            return;
        }

        if (i === linesArray.length - 2) {
            return;
        }
        line(x1, y1, x2, y2);
    });
}

function rangePercentage(value, minRange, maxRange) {
    return ((value < minRange || value > maxRange) ? 0 : ((value - minRange) / (maxRange - minRange)));
}

function drawShapes0() {
    push();
    fill(0, 255, 255);
    let rectY = (height - stepLength) - sin(Math.PI * animationPercentage) * 3 * stepLength / 2;
    translate(stepLength * 1.5, rectY - 50 - 2);
    rotate(Math.PI * animationPercentage);
    rect(-25, -50, 50, 100);
    pop();

    push();
    fill(255, 192, 203);
    translate(stepLength * 2.5, (height - stepLength * 2 - 50 - 2) - sin(Math.PI * animationPercentage) * 3 * stepLength / 2);
    arc(0, 0, 100, 100, 0, PI);
    pop();

    fill(255, 165, 0);
    let circleY = (height - stepLength * 3 - 25 - 2) - sin(Math.PI * animationPercentage) * 3 * stepLength / 2;
    ellipse(stepLength * 3.5, circleY, 50);
}

function drawShapes1() {
    push();
    fill(0, 255, 255);
    let rectY = (height - stepLength);
    translate(stepLength * 1.5, rectY - 50 - 2);
    rect(-25, -50, 50, 100);
    pop();

    push();
    fill(255, 192, 203);
    translate(stepLength * 2.5, (height - stepLength * 2 - 50 - 2));
    arc(0, 0, 100, 100, 0, PI);
    pop();

    fill(255, 165, 0);
    let circleY = (height - stepLength * 3 - 25 - 2);
    ellipse(stepLength * 3.5, circleY, 50);
}

function drawShapes2() {
    push();
    fill(0, 255, 255);
    let rectY = (height - stepLength * 1) - sin(Math.PI * animationPercentage) * 3 * stepLength / 2;
    translate(stepLength * 1.5, rectY - 50 - 2);
    rotate(Math.PI * rangePercentage(animationPercentage, 0.01, 0.99));
    rect(-25, -50, 50, 100);
    pop();

    push();
    fill(255, 192, 203);
    translate(stepLength * 2.5, (height - stepLength * 2 - 50 - 2) - sin(Math.PI * animationPercentage) * 3 * stepLength / 2);
    rotate(-2 * Math.PI * rangePercentage(animationPercentage, 0.01, 0.99));
    arc(0, 0, 100, 100, 0, PI);
    pop();

    fill(255, 165, 0);
    let circleY = (height - stepLength * 3 - 25 - 2) - sin(Math.PI * animationPercentage) * stepLength;
    let circleX = stepLength * 3.5 + cos(Math.PI * 2 * rangePercentage(animationPercentage, 0.05, 0.9)) * stepLength / 3.25 - stepLength / 3.25;
    ellipse(circleX, circleY, 50);
}

function drawMask() {
    fill(255);
    noStroke();
    rect(0, 0, width, height);
}
