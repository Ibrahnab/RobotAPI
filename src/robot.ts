
enum Direction {
    NORTH = 'N',
    SOUTH = 'S',
    WEST = 'W',
    EAST = 'E'
}

let compass: Direction[] = [Direction.NORTH,Direction.EAST, Direction.SOUTH, Direction.WEST];
let compasss: string[] = ['N', 'E', 'S','W'];

class Obstacle {
    private positionXY: [number, number];

    constructor(positionXY: [number, number]){
        this.positionXY = positionXY;
    }

    getPosition(): [number, number] {
        return this.positionXY;
    }
}

class Grid{
    private gridW: number;
    private gridH: number;
    private obstacles: Obstacle[];

    public gridWxH: number;

    constructor(gridW:number, gridH: number, obstacles: Obstacle[]) {
        this.gridW = gridW;
        this.gridH = gridH;
        this.obstacles = obstacles;

        this.gridWxH = gridH*gridW;
    }

    isWithinBounds(positionXY:[number,number]): boolean {

        //Check if a given position is within the grid boundaries
        if(    positionXY[0] < 0 
            || positionXY[0] > this.gridW
            || positionXY[1] < 0
            || positionXY[1] > this.gridH
            
        ){
            return false;
        }

        return true;
    }

    notOverlappingObstacle(positionXY:[number,number]): boolean{

        //Check if a given position collides with any obstacles in the grid
        console.log( "     x: " +  positionXY[0] + " y: " + positionXY[1])

        if(this.obstacles.findIndex(e => e.getPosition()[0] == positionXY[0] && e.getPosition()[1] == positionXY[1]) > -1){
            return false;
        }

        return true;
    }

    getGridW(){
        return this.gridW;
    }

    getGridH(){
        return this.gridH;
    }
}

class Robot {
    private positionXY: [number, number];
    private direction: Direction;
    private grid: Grid;

    constructor(positionXY:[number, number], direction: Direction, grid: Grid){
        this.positionXY = positionXY;
        this.direction = direction;
        this.grid = grid;
    }

    followCommands(commands: string):[number,number]{

        //execute all the commands given
        for(let i=0;i<commands.length;i++){

            let char = commands[i];
            if(char == 'f' || char == 'b'){
                if(!this.moveFB(char)){
                    //Obstacle detected, terminate the loop, thus stopping the robot.
                    break;
                }
            }
            else{
                this.turnLR(char);
            }
        }
        return this.positionXY;
    }

    moveFB(direction: string): boolean {

        let numDir: number = direction == 'f' ? -1 : 1;
        let newPosition: [number,number] = this.positionXY;

        switch(this.direction){
            case(Direction.NORTH): 
                newPosition = [this.positionXY[0], this.positionXY[1] + numDir];
                break;
            case(Direction.SOUTH):
                newPosition = [this.positionXY[0], this.positionXY[1] + (numDir*(-1))];
                break;
            case(Direction.WEST): 
                newPosition = [this.positionXY[0] + numDir, this.positionXY[1]];
                break;
            case(Direction.EAST):
                newPosition = [this.positionXY[0] + (numDir*(-1)), this.positionXY[1]];
                break;
            default:
        }

        //Check if the new position is valid
        if(!this.grid.isWithinBounds(newPosition) || !this.grid.notOverlappingObstacle(newPosition)){
            console.log("obstacle detected!");
            return false;
        }
        
        this.moveToNewPosition(newPosition);
        return true;
    }

    moveToNewPosition(newPosition: [number,number]){
        this.positionXY = newPosition;
    }

    turnLR(direction: string) {
        //Get the direction to turn in the compass
        let numDir: number = direction == 'l' ? -1 : 1;
        
        const compassPos = compass.findIndex(e => e == this.direction) //Find the index of the current direction in the compass
        this.direction = compass[(((compassPos + numDir) % 4) + 4) % 4]; //Turn to the l/r of that direction
        console.log("New direction: " + this.direction)
    }

    getPositionXY():[number,number]{
        return this.positionXY;
    }
}

//-------------

let obstacle1 = new Obstacle([48,50]);

let grid1 = new Grid(100,100,[]);
let grid2 = new Grid(50,50,[])
let grid3 = new Grid(100,100,[obstacle1]);

let robot1 = new Robot([0,0],Direction.SOUTH,grid1);
let robot2 = new Robot([1,1],Direction.NORTH,grid2);
let robot3 = new Robot([50,50],Direction.NORTH,grid3);

robot1.followCommands("fflff");
robot2.followCommands("fflff");
robot3.followCommands("fflffrbb");

let posTuple:[number, number] = robot1.getPositionXY();
console.log("x: " + posTuple[0] + " y: " + posTuple[1] + ", ( x: 2 y: 2)");

let posTuple2:[number, number] = robot2.getPositionXY();
console.log("x: " + posTuple2[0] + " y: " + posTuple2[1] + ", (x: 1 y: 0)");

let posTuple3:[number, number] = robot3.getPositionXY();
console.log("x: " + posTuple3[0] + " y: " + posTuple3[1] + ", (x: 48 y: 49)");

