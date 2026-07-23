import{ ship, gameBoard } from "./battleship"

let myShip = new ship(4)
let myBoard = new gameBoard(7,7)


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

test("check if the game board is correctly created ", ()=>{

    let myGame = myBoard.board
    let rows = myGame.length
    let columns = myGame[0].length
    
    expect(rows * columns) .toBe(49)
})

test("check the cells for the shp", ()=> {
    expect(myBoard.placeShip(4,2,4, "horizontal")) .toBe("invalid cells")
    expect(myBoard.placeShip(4, 2, 4, "diagonal"))  .toBe("invalid direction")
})

test("check the attack hits a shp", ()=> {
    expect(receiveAttack(2,2)) .toBe("X")
})
test("check the attack miss a ship", ()=> {
    expect(receiveAttack(2,5)) .toBe("O")
})
