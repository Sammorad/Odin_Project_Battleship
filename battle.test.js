import{ ship } from "./battleship"

let myShip = new ship(4)


test("check if a ship is not sunk, length > num of hits", ()=> {
    myShip.hit()
    myShip.hit()
    expect(myShip.isSunk()).toBe("not sink")
})

test('check if a ship is sunk, length = num of hits ', ()=>{
    myShip.hit()
    myShip.hit()
    myShip.hit()
    myShip.hit()
    expect(myShip.isSunk()) .toBe("sink")
})