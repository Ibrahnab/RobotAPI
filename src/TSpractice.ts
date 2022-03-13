
//variables and arrays
let id: number = 5;
let company: string = 'Test company'
let isPublished: boolean = true;
let x: any = 'hlelo'

let age: number
age = 30;

//Arrays
let ids: number[] = [1,2,3,4,5]

ids.push(2)

let arr: any[] = [1,true,"hello"]

//Tuple
let tuple: [number, number] = [1,2];
let person: [number, string, boolean] = [1,'Brad',true];

let employee: [number, string,][]

employee: [[1,"adam"], [2,"jull"]] //Array of tuples

//union type

let pid: string | number = 2;

//enum

enum Direction1 {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right= 'Right'
}

//Objects

type User = {id: number, name: string}

const user: User = {
    id: 1,
    name: 'John'
}

console.log("Direction: " + Direction1.Down)

//Type assertion
let cid: any = 1;
let customerId = <number>cid    //first way to do it
customerId = cid as number  //second way to do it

//function with params and return values
function addNum(x:number,y:number):number {
    return x+y
}

function log(message: string | number):void {
    console.log(message)
}

//Interfaces, same as "type" but without equals. Same as interfaces in Java
//Cannot use interfaces with primitives or unions however
interface UserInterface {
    readonly id: number, // readonly makes the parameter not overwritable after initializing
    name: string
    age?: number    // ? makes the parameter optional
}

const user1: UserInterface = {
    id: 1,
    name: 'John'
}

interface MathFunc {
    (x: number, y: number): number
}

//Using interface with function, still need to define every parameters, but makes sure to obey the type structure
const add: MathFunc = (x:number, y:number): number => x +y 


//Classes with interface

interface PersonInterface {
    id:number,
    name: string,
    age?: number
    getId():number
}

class Person implements PersonInterface {
    public id: number;
    public name: string;
    public age?: number;

    //Runs when new object of this class is initialized, similar to java
    constructor(id:number, name:string) {
        this.id = id;
        this.name=name
        this.age = 2;
        this.registerMsg()
    }

    registerMsg() {
        console.log(`${this.name} is now registered`)
    }

    adjustParams(id:number, name:string){
        this.id = id;
        this.name = name
    }

    getId():number{
        return this.id
    }
}

console.log("helo")
const brad = new Person(1,"brad")
const mike = new Person(2,"mike")

//Subclasses

class Employee extends Person {
    
    public position: string

    /*The constructor here still needs the parameters of the parent class, 
    they are initialized by calling the super() function and passing 
    those parameters, the parent class takes care of the assignment. 
    While this new subclass takes care of its own parameters*/

    constructor(id: number, name:string , position: string){
        super(id, name)
        this.position = position;
    }
}

const emp = new Employee(3,'Shawn', 'Dev')


//Generics

function getArray<T> (items:T[]): T[] { //instead of writing :any[], write :T[]
    return new Array().concat(items)
}

let numArray = getArray<number>([1,2,3,4]) //Which allows you to define the type when the array is created

let strArray = getArray<string>(['brad', 'John', 'Jill'])

numArray.push(2)



