/* eslint-disable */
var vehicle, cnv, stayWithinWalls;

var food = [];
var colors = [];

var gradColors = [];

function setup() {
	// let w = $('.canvas-container').width();
	// let h = $('.canvas-container').height();

	// console.log(450, 600);

	cnv = createCanvas(650, 550);
	cnv.parent('#cnv');

	gradColors = [
		color(255, 165, 0),
		color(228, 137, 35),
		color(216, 124, 50),
		color(197, 104, 73),
		color(98, 15, 163),
		color(113, 27, 153),
		color(128, 39, 142),
		color(146, 55, 127),
	];

	// $("canvas").css("position", "static");

	vehicle = new Vehicle();
	centre = createVector(width / 2, height / 2);

	stayWithinWalls = $('#within-walls');

	noStroke();

	for (var i = 0; i < 20; i++) {
		var x = random(30, width - 30);
		var y = random(30, height - 30);

		var clrIndex = Math.floor(random(gradColors.length));

		food.push(new Food(x, y, gradColors[clrIndex]));

		// var r = random(255);
		// var g = random(255);
		// var b = random(255);
		// colors.push(color(255, 165, 0));
	}

	cnv.mouseClicked(function () {
		food.push(
			new Food(
				mouseX,
				mouseY,
				gradColors[Math.floor(random(gradColors.length))]
			)
		);
		$('#checkpoint-count').css('opacity', 0.5);
		$('#checkpoint-count').css('color', '#8f8f8f');
		// colors.push(color(random(255), random(255), random(255)));
	});
}

function draw() {
	// push();
	// fill('white');
	// text('Points passed = ' + vehicle.numOfObjectsPassed, 10, 20);
	// pop();

	background(22, 22, 22);

	vehicle.render();
	if (food.length != 0) {
		vehicle.seek(food);
	} else {
		finish();
	}

	for (var i = 0; i < food.length; i++) {
		// console.log(gradColors.length);
		// var ind = Math.floor(random(gradColors.length));
		// console.log(gradColors[i]);
		// ind++;
		// fill(gradColors[ind % 8]);
		// ellipse(food[i].x, food[i].y, 8, 8);
		food[i].display();
	}

	// updateCheckpointCount();
}

function finish() {
	vehicle.reset();
	push();
	textAlign(CENTER);
	textSize(32);
	fill('white');
	text('FINISHED', width / 2, height / 2);
	pop();

	$('#checkpoint-count').css('opacity', 1);
	$('#checkpoint-count').css('color', '#ffbb00');
}

// function windowResized() {
// 	let w = $('.canvas-container').width();
// 	let h = $('.canvas-container').height();
// 	// console.log(w, h);
// 	resizeCanvas(w, h);
// }
