var gridW = 100;
var gridH = 100;
var gridWxH = gridW * gridH;
var position = [0, 0];
var Direction;
(function (Direction) {
    Direction["NORTH"] = "N";
    Direction["SOUTH"] = "S";
    Direction["WEST"] = "W";
    Direction["EAST"] = "E";
})(Direction || (Direction = {}));
var compass = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
var compasss = ['N', 'E', 'S', 'W'];
var Obstacle = /** @class */ (function () {
    function Obstacle(positionXY) {
        this.positionXY = positionXY;
    }
    Obstacle.prototype.getPosition = function () {
        return this.positionXY;
    };
    return Obstacle;
}());
var Grid = /** @class */ (function () {
    function Grid(gridW, gridH, obstacles) {
        this.gridW = gridW;
        this.gridH = gridH;
        this.obstacles = obstacles;
        this.gridWxH = gridH * gridW;
    }
    Grid.prototype.isWithinBounds = function (newPositionXY) {
        //Check if the new position is within the grid boundaries
        if (newPositionXY[0] < 0
            || newPositionXY[0] > this.gridW
            || newPositionXY[1] < 0
            || newPositionXY[1] > this.gridH) {
            return false;
        }
        return true;
    };
    Grid.prototype.notOverlappingObstacle = function (newPositionXY) {
        //Check if the new position collides with any obstacles in the grid
        console.log("     x: " + newPositionXY[0] + " y: " + newPositionXY[1]);
        if (this.obstacles.findIndex(function (e) { return e.getPosition()[0] == newPositionXY[0] && e.getPosition()[1] == newPositionXY[1]; }) > -1) {
            return false;
        }
        return true;
    };
    Grid.prototype.getGridW = function () {
        return this.gridW;
    };
    Grid.prototype.getGridH = function () {
        return this.gridH;
    };
    return Grid;
}());
var Robot = /** @class */ (function () {
    function Robot(positionXY, direction, grid) {
        this.positionXY = positionXY;
        this.direction = direction;
        this.grid = grid;
    }
    Robot.prototype.followCommands = function (commands) {
        //execute all the commands given
        for (var i = 0; i < commands.length; i++) {
            var char = commands[i];
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
        return this.positionXY;
    };
    Robot.prototype.moveFB = function (direction) {
        var numDir = direction == 'f' ? -1 : 1;
        var newPosition = this.positionXY;
        // if(this.direction == Direction.NORTH || this.direction == Direction.SOUTH){
        //      newPosition = [this.positionXY[0], this.positionXY[1] + numDir];
        // }
        // else{
        //     newPosition = [this.positionXY[0] + numDir, this.positionXY[1]];
        // }
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
    };
    Robot.prototype.moveToNewPosition = function (newPosition) {
        this.positionXY = newPosition;
    };
    Robot.prototype.turnLR = function (direction) {
        var _this = this;
        //Get the direction to turn in the compass
        var numDir = direction == 'l' ? -1 : 1;
        var compassPos = compass.findIndex(function (e) { return e == _this.direction; }); //Find the index of the current direction in the compass
        this.direction = compass[(((compassPos + numDir) % 4) + 4) % 4]; //Turn to the l/r of that direction
        console.log("New direction: " + this.direction);
    };
    Robot.prototype.getPositionXY = function () {
        return this.positionXY;
    };
    return Robot;
}());
//-------------
var obstacle1 = new Obstacle([48, 50]);
var grid1 = new Grid(100, 100, []);
var grid2 = new Grid(50, 50, []);
var grid3 = new Grid(100, 100, [obstacle1]);
var robot1 = new Robot([0, 0], Direction.SOUTH, grid1);
var robot2 = new Robot([1, 1], Direction.NORTH, grid2);
var robot3 = new Robot([50, 50], Direction.NORTH, grid3);
robot1.followCommands("fflff");
robot2.followCommands("fflff");
robot3.followCommands("fflffrbb");
var posTuple = robot1.getPositionXY();
console.log("x: " + posTuple[0] + " y: " + posTuple[1] + ", ( x: 2 y: 2)");
var posTuple2 = robot2.getPositionXY();
console.log("x: " + posTuple2[0] + " y: " + posTuple2[1] + ", (x: 1 y: 0)");
var posTuple3 = robot3.getPositionXY();
console.log("x: " + posTuple3[0] + " y: " + posTuple3[1] + ", (x: 48 y: 49)");
