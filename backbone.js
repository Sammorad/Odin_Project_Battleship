import { ship, Player,gameBoard } from "./battleship.js";


const Grid_Size = 10
const shipRegistry = new Map()
const rotateIcon = "./images/rotate.png"


const container = document.querySelector(".full_content")
const playerOneGrid = document.querySelector(".playerOne .gameboard")
const PlayerTwoGrid = document.querySelector(".playerTwo .gameboard")
let playerOne = new Player("playerOne")
export let playerOneBoard = new playerOne.myBoard(10, 10)
let playerTwo = new Player("playerTwo")
export let playerTwoBoard = new playerTwo.myBoard(10,10)

export function createGrid(boardE1, length, breadth){
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


export function wireBoardDrop(boardE1){
    const cells = boardE1.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("dragover", function(e){
            e.preventDefault();

        })
        cell.addEventListener("drop", function(e){
            e.preventDefault();
            //check for id for each ship and check if ship tray is found 
            const shipId = e.dataTransfer.getData("text/ship_id");
            const shipTray = shipRegistry.get(shipId);
            if (!shipTray) return;

            const shipLength = Number(shipTray.dataset.length)
            const startRow = Number(cell.dataset.row)
            const startCol = Number(cell.dataset.col);

            const placementCells = []
            const direction = shipTray.dataset.direction || "horizontal";
            const modelPlacement = playerOneBoard.placeShip(
                shipLength,
                startRow,
                startCol,
                direction
            );
            if (modelPlacement === "invalid cells"  || modelPlacement === "ship exist"){
                return;
            }
            console.log("Model placeship result", modelPlacement)
            
            for (let offset = 0; offset < shipLength; offset++){
                const row = direction === "vertical"?  startRow + offset : startRow;
                const col = direction === "horizontal"? startCol + offset : startCol;
                
                if (row >= Grid_Size || col >= Grid_Size) return; //longer than the breadth of the board
                const target = boardE1.querySelector(
                    '.cell[data-row="' + row +'"][data-col ="' + col + '"]'

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
                console.log("DOM painted cells", placementCells.map(c => ({
                row: c.dataset.row,
                col: c.dataset.col
                })));
                shipTray.remove(); //remove ship tray once placed on grid//
        })
        
    });
    
}

const shipsArray = document.createElement("div") // a container below the grid for all ship samples
shipsArray.classList.add("shipsArray")
container.appendChild(shipsArray)
export function trayDirection(e){
    e.preventDefault();
    e.stopPropagation();
    const next = shipTray.dataset.direction === "horizontal"? "vertical":
    'horizontal';
    shipTray.dataset.direction =next;
    shipTray.classList.toggle("vertical", next === "vertical")

}

const computerShips =[5,4,4,3,3,3,2,2,2,2]; //computer ships in an array for random selection//

export function placeComputerShip(board){
    //placing of ships on board of computer and on the dom
    for (let len of computerShips){
        let placed = false;
    while(!placed){
        //generate random index for row and column 
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const dir = Math.random() < 0.5 ? "horizontal": "vertical";
        const result = board.placeShip(len, row, col, dir);
        placed = result !== "invalid cells" && result !== "ship exist";
        if (placed) {
            for (let offset = 0; offset < len; offset++) {
                const r = dir === "vertical" ? row + offset : row;
                const c = dir === "horizontal" ? col + offset : col;
                    
                const cell = PlayerTwoGrid.querySelector(
                    `.cell[data-row="${r}"][data-col="${c}"]`
                    );
                    
                if (cell) {
                cell.dataset.occupied = "1";
                
                    }
                }
            }
    }
    }
        

}
export function eachShip(length){
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
