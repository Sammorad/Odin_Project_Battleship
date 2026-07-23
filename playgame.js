import { ship, Player,gameBoard } from "./battleship.js";
import { createGrid, wireBoardDrop, trayDirection, placeComputerShip, eachShip, playerOneBoard, playerTwoBoard } from "./backbone.js";
//create he board for both the computer and the player 
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
const startButton = document.querySelector(".start")
const triedByComputer = new Set();
let currentTurn = "player"
let gameOver = false

function colorSunkShip(grid, sunkShip) {
  sunkShip.cells.forEach(({row, col}) => {
    const cell = grid.querySelector('.cell[data-row="'+ row +'"][data-col="' + col +'"]');
    if (cell) {
        cell.classList.add("sunk")
    }
    
        ;
})
}
function showWinner(message){
    const headerTitle = document.querySelector("header h1");
    if (headerTitle){
        headerTitle.textContent = message;
    }
}

function handleAttack(board, grid, row, col, label){
    const result = board.receiveAttack(row,col);
    const cell = grid.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (cell){
        cell.textContent = board.board[row][col];
    }

    console.log(label,result)
    return result;
}

function getComputerMove(){
    //defines how computer randomly selects a cell
    //every selected cell is added to a set of already tried cells
    while (true){
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const key = `${row}-${col}`;

        if (!triedByComputer.has(key)){ //check already added cells 
            triedByComputer.add(key); //add cells after selection to set of already tried cells//
            return {row, col}
        }
    }
}

function computerTurn(){
    if (gameOver) return 
    while (currentTurn === "computer" && !gameOver){
        const move = getComputerMove();
        const result = handleAttack(playerOneBoard, playerOneGrid, move.row, move.col, "COMPUTER");

        if (result.status === "sunk"){
            colorSunkShip(playerOneGrid, result.sunkShip)
        }

        if (playerOneBoard.sunkFleet.size === playerOneBoard.fleet.length  && playerOneBoard.fleet.length > 0){
            gameOver = true;
            showWinner("Game over: Computer Wins")
            console.log("Game over: Computer wins")
            return;
        }

        if (result.status === "miss"){
            currentTurn = "player"
        }
    }
}

function playerAttack(row, col){
    if (gameOver || currentTurn !== "player") return 
    const result = handleAttack(playerTwoBoard, PlayerTwoGrid, row, col, "PLAYER")
    if (result.status === "already-attacked") return;
    if (result.status === "sunk"){
        colorSunkShip( PlayerTwoGrid, result.sunkShip)
    }

    if (playerTwoBoard.sunkFleet.size === playerTwoBoard.fleet.length && playerTwoBoard.fleet.length > 0){
        gameOver = true;
        showWinner("Game over: Player wins")
        console.log("Game Over: Player wins")
        return;
    }
    if (result.status === "miss"){
        currentTurn = "computer";
        computerTurn();
    }

}

//add eventlistener to the start button to bring up the board on click of the start button// 
function startGame(e){
    e.preventDefault()
    createGrid(playerOneGrid, 10,10)
    createGrid(PlayerTwoGrid, 10, 10)
    //for the board 2
    const board2Cells = PlayerTwoGrid.querySelectorAll(".cell");
    board2Cells.forEach((cell) => {
        cell.addEventListener("click", (event)=>{
            const row = Number(event.currentTarget.dataset.row)
            const col = Number(event.currentTarget.dataset.col)
            playerAttack(row, col)
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
            

            
        })
    })


    wireBoardDrop(playerOneGrid);
    placeComputerShip(playerTwoBoard)

}

startButton.addEventListener(("click"), startGame,{once: true});