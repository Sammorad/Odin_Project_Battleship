export class ship{
    constructor(length){
      this.size = new Array(length)
        this.hits = 0  
        
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
      for (let column = j; column < j +n; column++){
        if (this.board[i][column] !== null) return "ship exist"
        this.board[i][column] = myShip
      }
  return this.board }
    else if (direction === "vertical"){
    if ((i + n-1) >= this.length){
      return  "invalid cells"
    }
    for(let row = i; row < i+ n; row++){
      if (this.board[row][j] !== null) return "ship exist"
      this.board[row][j] = myShip
    }

  return this.board

  } 
  return "invalid direction"

}

recieveAttack(i,j){
  //determines if the attack hits a ship
  let cell = this.board[i][j];
  if (cell === null) {
    this.board[i][j] = "O"
    return "O"
  }
  else{
  let ShipName = this.board[i][j] // identify the ship that was hit
  cell.hit()
  this.board[i][j] = "X" 
  return ShipName
  }

}

}

export class Player {
  constructor(name){
    this.name = name;
    this.myBoard = gameBoard;
  }
}