export class ship{
    constructor(length, numberOfHit, sunk){
        this.length = this.length;
        this.numberOfHit = 0;
        this.sunk = false
    }

    hit(){
        if (this.numberOfHit == this.length){
            return (!this.sunk)
        } else{
            return this.sunk
        }
    }
    isSunk(numOfHit, shiplength){
        if (numOfHit === shiplength){
            return `ship is sunk`
        }
        

    }
}

    