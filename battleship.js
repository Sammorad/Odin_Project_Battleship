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

    