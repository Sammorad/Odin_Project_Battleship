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
          row.push([i,j])

        }
       this.board.push(row)
      }

   }

  
placeShip(n,i,j, direction){
  //place ships on the board
  let myShip = new ship(n)
  if (direction === "horizontal"){
    if ((j + n-1) >= this.breadth){
      return "invalid cells"
    }
      for (let column = j; column < j +n; column++){
        this.board[i][column] = myShip
      }
return this.board

  }else if (direction === "vertical"){
    if ((i +n-1) >= this.length){
      return  "invalid cells"
    }
    for(let row = i; column < i+ n; column++){
      this.board[row][j] = myShip
    }

  return this.board

  } 
  return "invalid direction"

}


}