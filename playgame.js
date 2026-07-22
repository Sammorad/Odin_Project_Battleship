import { ship, Player,gameBoard } from "./battleship.js";
import { createGrid, wireBoardDrop, trayDirection, placeComputerShip, eachShip, playerOneBoard, playerTwoBoard } from "./backbone.js";
//create he board for both the computer and the player 
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
const startButton = document.querySelector(".start")

//add eventlistener to the start button to bring up the board on click of the start button// 
function startGame(e){
    e.preventDefault()
    createGrid(playerOneGrid, 10,10)
    createGrid(PlayerTwoGrid, 10, 10)

    const board1Cells = playerOneGrid.querySelectorAll(".cell");
    board1Cells.forEach((cell) => {
        cell.addEventListener("click", (event)=>{
            const row = Number(event.currentTarget.dataset.row)
            const col = Number(event.currentTarget.dataset.col)
            const cellValue = playerOneBoard.board[row][col];
            if (cellValue === "X" || cellValue === "O")  return;

            playerOneBoard.receiveAttack(row, col);
            cell.textContent = playerOneBoard.board[row][col]

            
        })
    })

    wireBoardDrop(playerOneGrid);
    placeComputerShip(playerTwoBoard)

}

startButton.addEventListener(("click"), startGame,{once: true});