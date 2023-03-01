"use strict";
/*
function log(message) {
  console.log(message);
}
var message = 'Hello World';
log(message);
*/
/*
function doSomething() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }

  console.log(`Finally: ${i}`);
}
doSomething();
*/
/*
let count = 5;
count = 'a';
*/
/*
// annotations to specify types otherwise any value is accepted
let a;
a = 1;
a = true;
a = 'a';
*/
/*
let a: number;
let b: boolean;
let c: string;
let e: number[] = [1, 2, 3];
let f: any[] = [1, true, 'a', false];
*/
/*
const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;
enum Color {Red = 0, Green = 1, Blue = 2, Purple = 3};
let backgroundcolor = Color.Red;
*/
/*
// Intellisense as knows working with string
let message = 'abc';
let endsWithC = message1.endsWith('c');
*/
/*
// needs assertion when working with type any
let message;
message = 'abc';
let endsWithC = (<string>message).endsWith('c');
let alternativeWay = (message as string).endsWith('c');
*/
/*
let log = function(message)  {
  console.log(message);
}

let doLog = (message) => {
  console.log(message);
  
}
*/
exports.__esModule = true;
// let doLog = (message) => console.log(message);
// let doLog = message => console.log(message);
// let doLog = () => console.log("Nothing to Add!");
/*
let drawPoint = (x, y) => {
  // ...
}
*/
/*
// bad practice
let drawPoint = (x, y, a, b, c, d, e) => {
  // ...
}
*/
/*
let drawPoint = (point) => {
  // ...
}
drawPoint({
  x: 1
  ,y:2
})
drawPoint({
  name: 'Mosh'
})
*/
/*
// prevent wrong types using inline annotation
let drawPoint = (point: number) => {
  // ...
}
*/
/*
let drawPoint = (point: {x: number, y: number}) => {
  // ...
}
*/
/*
// Interace instead of inline annotation
// Interfaces should use Pascal naming convention (capitals of each word)
interface Point {
  x: number
  ,y: number
}
let drawPoint = (point: Point) => {
  // ...
}
let getDistance = (pointA: Point, pointB: Point) => {
  // ...
}
*/
/*
interface Point {
  x: number
  ,y: number
  ,draw: () => void
}
*/
/*
class Point {
  x: number;
  y: number;

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }

  getDistance(another: Point) {
    // ...
  }
}

let point: Point;
point.draw();
*/
// needs to be initiated before class properties become available
/*
class Point {
  x: number;
  y: number;

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }

  getDistance(another: Point) {
    // ...
  }
}

let point = new Point();
point.x = 1;
point.y = 2;
point.draw();
*/
/*
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
}

let point = new Point(1, 2);
point.draw();
*/
// optional constructor values
/*
class Point {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
}

let point = new Point(1, 2);
point.draw();
*/
// Access Modifiers to protect a value from being changed
/*
class Point {
  private x: number;
  private y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
}

let point = new Point(1, 2);
point.draw();
*/
// because modifiers are in construcctor (private, public, protected), typescript initiates those variables
/*
class Point {
  constructor(private x?: number, private y?: number) {}

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
}

let point = new Point(1, 2);
point.draw();
*/
// getters and setters
/*
class Point {
  constructor(private x?: number, private y?: number) {}

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }

  getX() {
    return this.x
  }

  setX(value) {
    if (value < 0)
      throw new Error('Value cannot be less than 0!');
    this.x = value;
  }
}

let point = new Point(1, 2);
point.setX(10);
point.draw();
*/
/*
class Point {
  constructor(private x?: number, private y?: number) {}

  draw() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }

  get X() {
    return this.x
  }

  set X(value) {
    if (value < 0)
      throw new Error('Value cannot be less than 0!');
    this.x = value;
  }
}

let point = new Point(1, 2);
let x = point.X;
point.X = 10;
point.draw();
*/
// use camel case for properties
/*
class Point {
  constructor(private _x?: number, private _y?: number) {}

  draw() {
    console.log(`X: ${this._x}, Y: ${this._y}`);
  }

  get x() {
    return this._x
  }

  set x(value) {
    if (value < 0)
      throw new Error('Value cannot be less than 0!');
    this._x = value;
  }
}

let point = new Point(1, 2);
let x = point.x;
point.x = 10;
point.draw();
*/
// Modules
var point_1 = require("./point");
var point = new point_1.Point(1, 2);
point.draw();
