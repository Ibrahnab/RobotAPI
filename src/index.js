var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//variables and arrays
var id = 5;
var company = 'Test company';
var isPublished = true;
var x = 'hlelo';
var age;
age = 30;
//Arrays
var ids = [1, 2, 3, 4, 5];
ids.push(2);
var arr = [1, true, "hello"];
//Tuple
var tuple = [1, 2];
var person = [1, 'Brad', true];
var employee;
employee: [[1, "adam"], [2, "jull"]]; //Array of tuples
//union type
var pid = 2;
//enum
var Direction1;
(function (Direction1) {
    Direction1["Up"] = "Up";
    Direction1["Down"] = "Down";
    Direction1["Left"] = "Left";
    Direction1["Right"] = "Right";
})(Direction1 || (Direction1 = {}));
var user = {
    id: 1,
    name: 'John'
};
console.log("Direction: " + Direction1.Down);
//Type assertion
var cid = 1;
var customerId = cid; //first way to do it
customerId = cid; //second way to do it
//function with params and return values
function addNum(x, y) {
    return x + y;
}
function log(message) {
    console.log(message);
}
var user1 = {
    id: 1,
    name: 'John'
};
//Using interface with function, still need to define every parameters, but makes sure to obey the type structure
var add = function (x, y) { return x + y; };
var Person = /** @class */ (function () {
    //Runs when new object of this class is initialized, similar to java
    function Person(id, name) {
        this.id = id;
        this.name = name;
        this.age = 2;
        this.registerMsg();
    }
    Person.prototype.registerMsg = function () {
        console.log("".concat(this.name, " is now registered"));
    };
    Person.prototype.adjustParams = function (id, name) {
        this.id = id;
        this.name = name;
    };
    Person.prototype.getId = function () {
        return this.id;
    };
    return Person;
}());
console.log("helo");
var brad = new Person(1, "brad");
var mike = new Person(2, "mike");
//Subclasses
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    /*The constructor here still needs the parameters of the parent class,
    they are initialized by calling the super() function and passing
    those parameters, the parent class takes care of the assignment.
    While this new subclass takes care of its own parameters*/
    function Employee(id, name, position) {
        var _this = _super.call(this, id, name) || this;
        _this.position = position;
        return _this;
    }
    return Employee;
}(Person));
var emp = new Employee(3, 'Shawn', 'Dev');
//Generics
function getArray(items) {
    return new Array().concat(items);
}
var numArray = getArray([1, 2, 3, 4]); //Which allows you to define the type when the array is created
var strArray = getArray(['brad', 'John', 'Jill']);
numArray.push(2);
