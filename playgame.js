import { ship, Player,gameBoard } from "./battleship.js";
import { createGrid, wireBoardDrop, trayDirection, placeComputerShip, eachShip, playerOneBoard, playerTwoBoard } from "./backbone.js";
//create he board for both the computer and the player 
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
const startButton = document.querySelector(".start")
const triedByComputer = new Set();
let currentTurn = "player"
let gameOver = false



function getComputerMove(){
    //defines how computer randomly selects a cell
    //every selected cell is added to a set of already tried cells
    while (true){
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const key = `${row}${col}`;

        if (!triedByComputer.has(key)){ //check already added cells 
            triedByComputer.add(key); //add cells after selection to set of already tried cells//
            return {row, col}
        }
    }
}

//add eventlistener to the start button to bring up the board on click of the start button// 
function startGame(e){
    e.preventDefault()
    createGrid(playerOneGrid, 10,10)
    createGrid(PlayerTwoGrid, 10, 10)

    const board1Cells = playerOneGrid.querySelectorAll(".cell");
 

    //for the board 2
    const board2Cells = PlayerTwoGrid.querySelectorAll(".cell");
    board2Cells.forEach((cell) => {
        cell.addEventListener("click", (event)=>{
            const row = Number(event.currentTarget.dataset.row)
            const col = Number(event.currentTarget.dataset.col)
            const cellValue = playerTwoBoard.board[row][col];
            if (cellValue === "X" || cellValue === "O")  return;

            playerTwoBoard.receiveAttack(row, col);
            console.log("After:", playerTwoBoard.board[row][col]);
            console.log("Raw PlayertTwo board:", playerTwoBoard.board);

            console.table(
                playerTwoBoard.board.map((r) =>
                r.map((c) => {
                    if(c==="X" ||c === "O") return c;
                    if (c === null) return "."
                    return "S"
                }))
            )
            cell.textContent = playerTwoBoard.board[row][col]

            
        })
    })


    wireBoardDrop(playerOneGrid);
    placeComputerShip(playerTwoBoard)

}

startButton.addEventListener(("click"), startGame,{once: true});