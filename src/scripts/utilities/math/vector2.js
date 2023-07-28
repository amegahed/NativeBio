/******************************************************************************\
|                                                                              |
|                                  vector2.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a two dimensional vector type and its operations.        |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

export default class Vector2 {

	constructor(x, y) {

		// set attributes
		//
		this.x = x;
		this.y = y;
	}

	//
	// querying methods
	//

	equals(vector) {
		return (vector && (this.x == vector.x) && (this.y == vector.y));
	}

	isTowards(vector) {
		return this.dot(vector) > 0;
	}

	isAwayFrom(vector) {
		return this.dot(vector) < 0;
	}

	isPerpendicularTo(vector) {
		return this.dot(vector) == 0;
	}

	isParallelTo(vector) {
		return this.dot(vector) == Math.sqrt(this.dot(this) * vector.dot(vector));
	}

	//
	// converting methods
	//

	clone() {
		return new Vector2(this.x, this.y);
	}

	toString(separator, precision) {
		
		// set optional parameter defaults
		//
		if (!separator) {
			separator = Vector2.separator;
		}
		if (!precision) {
			precision = Vector2.precision;
		}

		// convert to string
		//
		return this.x.toPrecision(precision) + separator + this.y.toPrecision(precision);
	}

	//
	// vector arithmetic methods
	//

	add(vector) {
		this.x = this.x + vector.x;
		this.y = this.y + vector.y;
	}

	subtract(vector) {
		this.x = this.x - vector.x;
		this.y = this.y - vector.y;
	}

	multiplyBy(vector) {
		this.x = this.x * vector.x;
		this.y = this.y * vector.y;
	}

	divideBy(vector) {
		this.x = this.x / vector.x;
		this.y = this.y / vector.y;
	}

	scaleBy(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	}

	scaleTo(scalar) {
		this.normalize();
		this.scaleBy(scalar);
	}

	reverse() {
		this.scaleBy(-1);
	}

	normalize() {
		let length = this.length();
		if (length) {
			this.scaleBy(1 / length);
		}
	}

	//
	// vector function methods
	//

	plus(vector) {
		let x = this.x + vector.x;
		let y = this.y + vector.y;
		return new Vector2(x, y);
	}

	minus(vector) {
		let x = this.x - vector.x;
		let y = this.y - vector.y;
		return new Vector2(x, y);
	}

	times(vector) {
		let x = this.x * vector.x;
		let y = this.y * vector.y;
		return new Vector2(x, y);
	}

	dividedBy(vector) {
		let x = this.x / vector.x;
		let y = this.y / vector.y;
		return new Vector2(x, y);
	}

	scaledBy(scalar) {
		let x = this.x * scalar;
		let y = this.y * scalar;
		return new Vector2(x, y);
	}

	scaledTo(scalar) {
		let length = this.length();
		let x = this.x * scalar;
		let y = this.y * scalar;
		if (length > 0) {
			x /= length;
			y /= length;
		}
		return new Vector2(x, y);
	}

	reversed() {
		return this.scaledBy(-1);
	}

	normalized() {
		return this.scaledBy(1 / this.length());
	}

	parallel(vector) {
		return vector.scaledBy(this.dot(vector) / vector.dot(vector));
	}

	perpendicular(vector) {
		return this.minus(this.parallel(vector));
	}

	toPerpendicular() {
		return new Vector2(-this.y, this.x);
	}

	towards(vector) {
		if (this.isTowards(vector)) {
			return this.clone();
		} else {
			return this.reversed();
		}
	}

	awayFrom(vector) {
		if (this.isAwayFrom(vector)) {
			return this.clone();
		} else {
			return this.reversed();
		}
	}

	//
	// operators
	// 

	dot(vector) {
		return (this.x * vector.x) + (this.y * vector.y);
	}

	determinant(vector) {
		return (this.x * vector.y) - (vector.x * this.y);
	}

	distanceTo(vector) {
		return this.minus(vector).length();
	}

	angleTo(vector, options) {
		let angle1 = Math.atan2(this.y, this.x);
		let angle2 = Math.atan2(vector.y, vector.x);
		let angle = angle2 - angle1;

		if (angle < -Math.PI) {
			angle += (2 * Math.PI);
		}

		// convert to 0 to 360
		//
		if (options && options.positive && angle < 0) {
			angle += (2 * Math.PI);
		}

		// convert to degrees
		//
		if (!options || options && options.units == 'degrees') {
			angle *= 180 / Math.PI;
		}

		return angle;
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	//
	// rotation methods
	//

	rotateBy(angle) {
		let x = this.x * Math.cos(angle * Math.PI / 180) - this.y * Math.sin(angle * Math.PI / 180);
		let y = this.x * Math.sin(angle * Math.PI / 180) + this.y * Math.cos(angle * Math.PI / 180);
		this.x = x;
		this.y = y;
	}

	rotatedBy(angle) {
		let x = this.x * Math.cos(angle * Math.PI / 180) - this.y * Math.sin(angle * Math.PI / 180);
		let y = this.x * Math.sin(angle * Math.PI / 180) + this.y * Math.cos(angle * Math.PI / 180);
		return new Vector2(x, y);
	}

	//
	// converting methods
	//

	toArray() {
		return [this.x, this.y];
	}

	//
	// static attributes
	//

	static precision = 3;
	static separator = ", ";

	//
	// static methods
	//

	static random(x, y) {
		x = Math.random() * x;
		y = Math.random() * y;
		return new Vector2(x, y);
	}

	static srandom(x, y) {
		x = (Math.random() * 2 - 1) * x;
		y = (Math.random() * 2 - 1) * y;
		return new Vector2(x, y);
	}

	static averageOf(vertices) {
		if (!vertices || vertices.length == 0) {
			return;
		}

		let sum = vertices[0];
		for (let i = 1; i < vertices.length; i++) {
			sum = sum.plus(vertices[i]);
		}
		return sum.scaledBy(1 / vertices.length);
	}

	static centerOf(vertices) {
		if (!vertices || vertices.length == 0) {
			return;
		}

		let xmin = vertices[0].x;
		let xmax = vertices[0].x;
		let ymin = vertices[0].y;
		let ymax = vertices[0].y;

		for (let i = 1; i < vertices.length; i++) {
			if (vertices[i].x < xmin) {
				xmin = vertices[i].x;
			}
			if (vertices[i].x > xmax) {
				xmax = vertices[i].x;
			}
			if (vertices[i].y < ymin) {
				ymin = vertices[i].y;
			}
			if (vertices[i].y > ymax) {
				ymax = vertices[i].y;
			}
		}
		let xmean = (xmin + xmax) / 2;
		let ymean = (ymin + ymax) / 2;

		return new Vector2(xmean, ymean);
	}

	static widthOf(vertices) {
		if (!vertices || vertices.length == 0) {
			return;
		}

		let xmin = vertices[0].x;
		let xmax = vertices[0].x;

		for (let i = 1; i < vertices.length; i++) {
			if (vertices[i].x < xmin) {
				xmin = vertices[i].x;
			}
			if (vertices[i].x > xmax) {
				xmax = vertices[i].x;
			}
		}

		return xmax - xmin;
	}

	static heightOf(vertices) {
		if (!vertices || vertices.length == 0) {
			return;
		}

		let ymin = vertices[0].y;
		let ymax = vertices[0].y;

		for (let i = 1; i < vertices.length; i++) {
			if (vertices[i].y < ymin) {
				ymin = vertices[i].y;
			}
			if (vertices[i].y > ymax) {
				ymax = vertices[i].y;
			}
		}

		return ymax - ymin;
	}
}