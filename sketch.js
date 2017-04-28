/* eslint-disable */
var vehicle, cnv, stayWithinWalls;

var food = [];
var colors = [];

function setup() {
    cnv = createCanvas(500, 500);
    cnv.parent("#cnv");

    $("canvas").css("position", "static");

    vehicle = new Vehicle();
    centre = createVector(width / 2, height / 2);

    stayWithinWalls = $("#within-walls");

    noStroke();

    for (var i = 0; i < 20; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
        var r = random(255);
        var g = random(255);
        var b = random(255);
        colors.push(color(r, g, b));
    }
    cnv.mouseClicked(function() {
        food.push(createVector(mouseX, mouseY));
        colors.push(color(random(255), random(255), random(255)))
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
        fill(colors[i]);
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
