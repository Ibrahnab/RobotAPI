"use strict";
//variables and arrays
let id = 5;
let company = 'Test company';
let isPublished = true;
let x = 'hlelo';
let age;
age = 30;
//Arrays
let ids = [1, 2, 3, 4, 5];
ids.push(2);
let arr = [1, true, "hello"];
//Tuple
let tuple = [1, 2];
let person = [1, 'Brad', true];
let employee;
employee: [[1, "adam"], [2, "jull"]]; //Array of tuples
//union type
let pid = 2;
//enum
var Direction1;
(function (Direction1) {
    Direction1["Up"] = "Up";
    Direction1["Down"] = "Down";
    Direction1["Left"] = "Left";
    Direction1["Right"] = "Right";
})(Direction1 || (Direction1 = {}));
const user = {
    id: 1,
    name: 'John'
};
console.log("Direction: " + Direction1.Down);
//Type assertion
let cid = 1;
let customerId = cid; //first way to do it
customerId = cid; //second way to do it
//function with params and return values
function addNum(x, y) {
    return x + y;
}
function log(message) {
    console.log(message);
}
const user1 = {
    id: 1,
    name: 'John'
};
//Using interface with function, still need to define every parameters, but makes sure to obey the type structure
const add = (x, y) => x + y;
class Person {
    //Runs when new object of this class is initialized, similar to java
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.age = 2;
        this.registerMsg();
    }
    registerMsg() {
        console.log(`${this.name} is now registered`);
    }
    adjustParams(id, name) {
        this.id = id;
        this.name = name;
    }
    getId() {
        return this.id;
    }
}
console.log("helo");
const brad = new Person(1, "brad");
const mike = new Person(2, "mike");
//Subclasses
class Employee extends Person {
    /*The constructor here still needs the parameters of the parent class,
    they are initialized by calling the super() function and passing
    those parameters, the parent class takes care of the assignment.
    While this new subclass takes care of its own parameters*/
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(3, 'Shawn', 'Dev');
//Generics
function getArray(items) {
    return new Array().concat(items);
}
let numArray = getArray([1, 2, 3, 4]); //Which allows you to define the type when the array is created
let strArray = getArray(['brad', 'John', 'Jill']);
numArray.push(2);
//# sourceMappingURL=TSpractice.js.map