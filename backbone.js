import { ship, Player,gameBoard } from "./battleship.js";

const Grid_Size = 7
const shipRegistry = new Map()

const container = document.querySelector(".full_content")
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
let playerOne = new Player("playerOne")
let playerOneBoard = new playerOne.myBoard(7, 7)
let playerTwo = new Player("playerTwo")
let playerTwoBoard = new playerTwo.myBoard(7,7)

function createGrid(boardE1, length, breadth){
    //create a grid board with required number of cells
    boardE1.innerHTML = ""
    for (let i = 0; i < (length * breadth); i++){
        const cell = document.createElement("div")
        cell.innerHTML = ""
        cell.classList.add("cell")
        const row = Math.floor(i/breadth);
        const col = i % breadth;

        cell.dataset.index = i;
        cell.dataset.row = row;
        cell.dataset.col = col;

        boardE1.appendChild(cell)
    }
    return boardE1
}

function wireBoardDrop(boardE1){
    const cells = boardE1.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("dragover", function(e){
            e.preventDefault();

        })
        cell.addEventListener("drop", function(e){
            e.preventDefault();

            const shipId = e.dataTransfer.getData("text/ship_id");
            const shipTray = shipRegistry.get(shipId);
            if (!shipTray) return;

            const shipLength = Number(shipTray.dataset.length)
            const startRow = Number(cell.dataset.row)
            const startCol = Number(cell.dataset.col);

            const placementCells = []

            for (let offset = 0; offset < shipLength; offset++){
                const col = startCol + offset
                if (col >= Grid_Size) return; //longer than the breadth of the board
                const target = boardE1.querySelector(
                    '.cell[data-row="' + startRow +'"][data-col = "' + col + '"]'

                )
                if (!target || target.dataset.occupied  === "1") return
                placementCells.push(target);

                


                

            }

            //let us mark occupied cells 
                placementCells.forEach((c) => {
                c.dataset.occupied = "1";
                c.dataset.shipId = shipId;
                c.classList.add("occupied");

                })
        })
        
    });
    
}

const shipsArray = document.createElement("div") // a container below the grid for all ship samples
shipsArray.classList.add("shipsArray")
container.appendChild(shipsArray)
function eachShip(length){
    //building each ship and attaching them below the grids 
    const shipTray =document.createElement("div")//individual ships containing cells
    shipTray.classList.add("shipTray")
    shipTray.draggable = true
    const shipId = "ship-" + crypto.randomUUID();
    shipTray.dataset.shipId  = shipId;
    shipTray.dataset.length = String(length)
    shipRegistry.set(shipId, shipTray);
    shipsArray.appendChild(shipTray)
    for (let i = 0; i < length; i++){
        const cell = document.createElement("div") ;
        cell.innerHTML = ""
        cell.classList.add("shipcells")

        
    shipTray.appendChild(cell)
}
    shipTray.addEventListener("dragstart", function(e){
            e.dataTransfer.setData("text/ship_id", shipId)
            
        })


   
}

createGrid(playerOneGrid, 7,7)
createGrid(PlayerTwoGrid, 7, 7) 

wireBoardDrop(playerOneGrid)
eachShip(5)
eachShip(4)
eachShip(3)
eachShip(2)






