"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "N";
    Direction["SOUTH"] = "S";
    Direction["WEST"] = "W";
    Direction["EAST"] = "E";
})(Direction || (Direction = {}));
let compass = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
class Obstacle {
    constructor(positionXY) {
        this.positionXY = positionXY;
    }
    getPosition() {
        return this.positionXY;
    }
}
class Grid {
    constructor(gridW, gridH, obstacles) {
        this.gridW = gridW;
        this.gridH = gridH;
        this.obstacles = obstacles;
        this.gridWxH = gridH * gridW;
    }
    isWithinBounds(positionXY) {
        //Check if a given position is within the grid boundaries
        if (positionXY[0] < 0
            || positionXY[0] > this.gridW
            || positionXY[1] < 0
            || positionXY[1] > this.gridH) {
            return false;
        }
        return true;
    }
    notOverlappingObstacle(positionXY) {
        //Check if a given position collides with any obstacles in the grid
        console.log("     nextPos = x: " + positionXY[0] + " y: " + positionXY[1]);
        if (this.obstacles.findIndex(e => e.getPosition()[0] == positionXY[0] && e.getPosition()[1] == positionXY[1]) > -1) {
            return false;
        }
        return true;
    }
    getGridW() {
        return this.gridW;
    }
    getGridH() {
        return this.gridH;
    }
}
class Robot {
    constructor(positionXY, direction, grid) {
        this.positionXY = positionXY;
        this.direction = direction;
        this.grid = grid;
    }
    followCommands(commands) {
        //execute all the commands given
        for (let i = 0; i < commands.length; i++) {
            let char = commands[i];
            if (char == 'f' || char == 'b') {
                if (!this.moveFB(char)) {
                    //Obstacle detected, terminate the loop, thus stopping the robot.
                    break;
                }
            }
            else {
                this.turnLR(char);
            }
        }
        console.log("\n");
        return this.positionXY;
    }
    moveFB(direction) {
        let numDir = direction == 'f' ? -1 : 1;
        let newPosition = this.positionXY;
        switch (this.direction) {
            case (Direction.NORTH):
                newPosition = [this.positionXY[0], this.positionXY[1] + numDir];
                break;
            case (Direction.SOUTH):
                newPosition = [this.positionXY[0], this.positionXY[1] + (numDir * (-1))];
                break;
            case (Direction.WEST):
                newPosition = [this.positionXY[0] + numDir, this.positionXY[1]];
                break;
            case (Direction.EAST):
                newPosition = [this.positionXY[0] + (numDir * (-1)), this.positionXY[1]];
                break;
            default:
        }
        //Check if the new position is valid
        if (!this.grid.isWithinBounds(newPosition) || !this.grid.notOverlappingObstacle(newPosition)) {
            console.log("obstacle detected!");
            return false;
        }
        this.moveToNewPosition(newPosition);
        return true;
    }
    moveToNewPosition(newPosition) {
        this.positionXY = newPosition;
    }
    turnLR(direction) {
        //Get the direction to turn in the compass
        let numDir = direction == 'l' ? -1 : 1;
        const compassPos = compass.findIndex(e => e == this.direction); //Find the index of the current direction in the compass
        this.direction = compass[(((compassPos + numDir) % 4) + 4) % 4]; //Turn to the l/r of that direction
        console.log("New direction: " + this.direction);
    }
    getPositionXY() {
        return this.positionXY;
    }
}
//------------- Testing function
function Tester(gridWH, obstaclesPosXY, robotPosXY, robotDir, moveCommands) {
    //Create obstacles with given list
    let obstacles = [];
    for (let i = 0; i < obstaclesPosXY.length; i++) {
        obstacles.push(new Obstacle([obstaclesPosXY[i][0], obstaclesPosXY[i][1]]));
    }
    //Create a grid with given inputs
    let grid = new Grid(gridWH[0], gridWH[1], obstacles);
    //Create a robot with given inputs
    let robot = new Robot(robotPosXY, robotDir, grid);
    //Follow the given commands
    robot.followCommands(moveCommands);
    let posTuple = robot.getPositionXY();
    console.log("Final position: x: " + posTuple[0] + " y: " + posTuple[1] + "\n ---------------");
}
Tester([100, 100], [], [0, 0], Direction.SOUTH, "fflff");
Tester([50, 50], [], [1, 1], Direction.NORTH, "fflff");
Tester([100, 100], [[48, 50]], [50, 50], Direction.NORTH, "fflffrbb");
//--------------- Manual tests
let obstacle1 = new Obstacle([48, 50]);
// let grid1 = new Grid(100,100,[]);
// let grid2 = new Grid(50,50,[])
let grid3 = new Grid(100, 100, [obstacle1]);
// let robot1 = new Robot([0,0],Direction.SOUTH,grid1);
// let robot2 = new Robot([1,1],Direction.NORTH,grid2);
let robot3 = new Robot([50, 50], Direction.NORTH, grid3);
// robot1.followCommands("fflff");
// robot2.followCommands("fflff");
robot3.followCommands("fflffrbb");
// let posTuple:[number, number] = robot1.getPositionXY();
// console.log("x: " + posTuple[0] + " y: " + posTuple[1] + ", ( x: 2 y: 2)");
// let posTuple2:[number, number] = robot2.getPositionXY();
// console.log("x: " + posTuple2[0] + " y: " + posTuple2[1] + ", (x: 1 y: 0)");
let posTuple3 = robot3.getPositionXY();
console.log("x: " + posTuple3[0] + " y: " + posTuple3[1] + ", (x: 48 y: 49)");
//# sourceMappingURL=robot.js.map