/* eslint-disable */
var vehicle, cnv;

var food = [];

function setup() {
    cnv = createCanvas(500, 500);

    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);

    vehicle = new Vehicle();
    centre = createVector(width / 2, height / 2);

    noStroke();

    for (var i = 0; i < 20; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    cnv.mouseClicked(function() {
        food.push(createVector(mouseX, mouseY));
    });
}

function draw() {
    background(51);

    push();
    fill("white");
    text("Points passed = " + vehicle.numOfObjectsPassed, 10, 20);
    pop();

    vehicle.render();
    if (food.length != 0) {
        vehicle.seek(food);
    } else {
        finish();
    }

    for (var i = 0; i < food.length; i++) {
        fill("green");
        ellipse(food[i].x, food[i].y, 8, 8);
    }
}

function finish() {
    vehicle.reset();
    push();
    textAlign(CENTER);
    textSize(32);
    fill("white");
    text("FINISHED", width / 2, height / 2);
    pop();
}
