export class ship{
    constructor(length){
      this.size = new Array(length)
        this.hits = 0;
        this.cells = [];
        


      
        
    }
  

    hit(){
        //count the number of hits to my ship 
      if(this.hits < this.size.length){
        this.hits = this.hits + 1
      }
      else {
        this.hits
      }
      return this.hits
    }
    isSunk(){
        //check if my ship sinks 
       if (this.hits  === this.size.length){
        return "sink"
       }return "not sink"

    }
}

export class gameBoard{
  //game board class for placing ships and recieving attacks 

  constructor(length,breadth){
    this.length = length;
    this.breadth = breadth;
    this.board = []
    this.fleet = [];
    this.sunkFleet = new Set();
      //construct gameboard with cordinates 
       for(let i =0; i < this.length; i++){
        let row = [];
        for(let j = 0; j < this.breadth; j++){
          row.push(null)

        }
       this.board.push(row)
      }

   }

  
placeShip(n,i,j, direction){
  //place ships on the board
  let myShip = new ship(n)
  if (direction === "horizontal"){//check direction to place the ship
    if ((j + n-1) >= this.breadth){
      return "invalid cells"
    }
      for (let col = j; col < j +n; col++){
        if (this.board[i][col] !== null) return "ship exist"
        this.board[i][col] = myShip
        myShip.cells.push({row:i, col:col})
      }
  this.fleet.push(myShip);
  return this.board }
    else if (direction === "vertical"){
    if ((i + n-1) >= this.length){
      return  "invalid cells"
    }
    for(let row = i; row < i+ n; row++){
      if (this.board[row][j] !== null) return "ship exist"
      this.board[row][j] = myShip
      myShip.cells.push({row:row, col:j})
    }
  this.fleet.push(myShip)

  return this.board

  } 
  return "invalid direction"

}

receiveAttack(i,j){
  //determines if the attack hits a ship
  let cell = this.board[i][j];
  if (cell==="X" || cell === "O"){
    return {status: "already-attacked"}
  }
  if (cell === null) {
    this.board[i][j] = "O"
    return {status: "miss"};
  }
  cell.hit();
  this.board[i][j] = "X";

  if (cell.isSunk() === "sink"){
    this.sunkFleet.add(cell)
    return { status: "sunk",sunkShip: cell, sunkCount: this.sunkFleet.size, totalShips: this.fleet.length}
  }
  return { status: "hit", sunkCount: this.sunkFleet.size, totalShips: this.fleet.length}

}

}

export class Player {
  constructor(name){
    this.name = name;
    this.myBoard = gameBoard;
  }
}