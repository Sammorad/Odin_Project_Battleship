import { ship, Player,gameBoard } from "./battleship.js";


const Grid_Size = 10
const shipRegistry = new Map()
const rotateIcon = "./images/rotate.png"


const container = document.querySelector(".full_content")
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
let playerOne = new Player("playerOne")
let playerOneBoard = new playerOne.myBoard(10, 10)
let playerTwo = new Player("playerTwo")
let playerTwoBoard = new playerTwo.myBoard(10,10)

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
            const direction = shipTray.dataset.direction || "horizontal";


            for (let offset = 0; offset < shipLength; offset++){
                const row = direction === "vertical"?  startRow + offset : startRow;
                const col = direction === "horizontal"? startCol + offset : startCol;
                
                if (row >= Grid_Size || col >= Grid_Size) return; //longer than the breadth of the board
                const target = boardE1.querySelector(
                    '.cell[data-row="' + row +'"][data-col = "' + col + '"]'

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
                shipTray.remove();
        })
        
    });
    
}

const shipsArray = document.createElement("div") // a container below the grid for all ship samples
shipsArray.classList.add("shipsArray")
container.appendChild(shipsArray)
function trayDirection(e){
    e.preventDefault();
    e.stopPropagation();
    const next = shipTray.dataset.direction === "horizontal"? "vertical":
    'horizontal';
    shipTray.dataset.direction =next;
    shipTray.classList.toggle("vertical", next === "vertical")

}
function eachShip(length){
    const shipTray = document.createElement("div");
    shipTray.classList.add("shipTray");
    shipTray.draggable = true;

    const shipId = "ship-" + crypto.randomUUID();
    shipTray.dataset.shipId = shipId;
    shipTray.dataset.length = String(length);
    shipTray.dataset.direction = "horizontal";

    const rotateBtn = document.createElement("button");
    rotateBtn.type = "button";
    rotateBtn.classList.add("rotateBtn");

    const rotateImg = document.createElement("img");
    rotateImg.src = rotateIcon;
    rotateImg.alt = "Rotate Ship";
    rotateImg.classList.add("rotateImg");
    rotateBtn.appendChild(rotateImg);

    const shipSegments = document.createElement("div");
    shipSegments.classList.add("shipSegments");

    rotateBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const next = shipTray.dataset.direction === "horizontal" ? "vertical" : "horizontal";
        shipTray.dataset.direction = next;
        shipTray.classList.toggle("vertical", next === "vertical");
    });

    shipRegistry.set(shipId, shipTray);
    shipsArray.appendChild(shipTray);

    shipTray.appendChild(rotateBtn);
    shipTray.appendChild(shipSegments);

    for (let i = 0; i < length; i++){
        const cell = document.createElement("div");
        cell.classList.add("shipcells");
        shipSegments.appendChild(cell);
    }

    shipTray.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text/ship_id", shipId);
    });
}


   


createGrid(playerOneGrid, 10,10)
createGrid(PlayerTwoGrid, 10, 10) 

wireBoardDrop(playerOneGrid)
eachShip(5)
eachShip(4)
eachShip(4)
eachShip(3)
eachShip(3)
eachShip(3)
eachShip(2)
eachShip(2)
eachShip(2)
eachShip(2)






