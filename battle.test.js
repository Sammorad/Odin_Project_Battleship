import{ ship } from "./battleship"


test("determine if a ship is sunck", () =>{
    const myShip = new ship(4)
    expect (myShip.isSunk(4,4)) .tobe(`ship is sunk`)
})
