/* eslint-disable */
class Vehicle {
	constructor(x = width / 2, y = height / 2, size = 8) {
		this.position = createVector(x, y);
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);

		this.size = size;

		this.maxSpeed = 3;
		this.maxForce = 0.1;

		this.numOfObjectsPassed = 0;
	}
	applyForce(force) {
		this.acceleration.add(force);
	}
	findClosestObject(objects) {
		var closestDistance, distance, index;
		index = -1;
		closestDistance = Infinity;
		for (var i = objects.length - 1; i >= 0; i--) {
			distance = objects[i].position.dist(this.position);
			if (distance < closestDistance) {
				closestDistance = distance;
				index = i;
			}
		}
		return food[index];
	}
	boundary() {
		var steeringForce,
			desiredVelocity = null;

		if (this.position.x < 25) {
			desiredVelocity = createVector(this.maxSpeed, this.velocity.y);
		} else if (this.position.x > width - 25) {
			desiredVelocity = createVector(-this.maxSpeed, this.velocity.y);
		}
		if (this.position.y < 25) {
			desiredVelocity = createVector(this.velocity.x, this.maxSpeed);
		} else if (this.position.y > height - 25) {
			desiredVelocity = createVector(this.velocity.x, -this.maxSpeed);
		}
		if (desiredVelocity !== null) {
			steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
			steeringForce.normalize();
			steeringForce.mult(this.maxForce * 2);
			this.applyForce(steeringForce);
		}
	}
	seek(objects) {
		var desiredVelocity, steeringForce, target;

		target = this.findClosestObject(objects);
		// target = target.position;

		desiredVelocity = p5.Vector.sub(target.position, this.position);
		desiredVelocity.normalize();
		desiredVelocity.mult(this.maxSpeed);

		steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
		steeringForce.limit(this.maxForce);

		this.applyForce(steeringForce);

		if (target.position.dist(this.position) < 10) {
			var index = objects.indexOf(target);
			objects.splice(index, 1);
			colors.splice(index, 1);

			this.numOfObjectsPassed++;

			updateCheckpointCount();
		}
	}
	flee(target) {
		var desiredVelocity, steeringForce;

		desiredVelocity = p5.Vector.sub(target.position, this.position);
		desiredVelocity.normalize();
		desiredVelocity.mult(-this.maxSpeed);

		steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
		steeringForce.limit(this.maxForce);

		this.applyForce(steeringForce);
	}
	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);

		// this.maxForce = $("#steer").val();
		// this.maxSpeed = $("#speed").val();

		this.acceleration.mult(0);
	}
	display() {
		push();
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading() + radians(90));
		fill(255, 255, 255);
		triangle(
			0,
			-this.size * 2,
			this.size,
			this.size,
			-this.size,
			this.size
		);
		pop();
	}
	render() {
		this.update();
		this.display();
		if (stayWithinWalls.is(':checked')) this.boundary();
	}
	reset() {
		this.position = createVector(width / 2, height / 2 + 20);
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
	}
}
