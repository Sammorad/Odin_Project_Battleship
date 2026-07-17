import { ship, Player,gameBoard } from "./battleship.js";

const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
let playerOne = new Player("playerOne")
let playerOneBoard = new playerOne.myBoard(7, 7)
let playerTwo = new Player("playerTwo")
let playerTwoBoard = new playerTwo.myBoard(7,7)

function createGrid(boardE1, length, breadth){
    //create a grid board with required number of cells
    for (let i = 0; i < (length * breadth); i++){
        const cell = document.createElement("div")
        cell.innerHTML = ""
        cell.classList.add("cell")

        boardE1.appendChild(cell)
    }
    return boardE1
}
createGrid(playerOneGrid, 7,7)
createGrid(PlayerTwoGrid, 7, 7) 
console.log("backbone loaded")


