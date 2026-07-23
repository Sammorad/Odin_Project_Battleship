# Battleship

A browser-based Battleship project built as part of The Odin Project. The app renders two 10x10 boards, lets the player place a fleet with drag and drop, and then plays turns against a computer opponent.

## Features

- Drag-and-drop ship placement for the player board
- Ship rotation before placement
- Random computer ship placement
- Turn-based attacks between player and computer
- Jest tests for the core Battleship classes

## Project Files

- `index.html` sets up the page structure
- `style.css` handles the layout and board styling
- `backbone.js` builds the grids and ship-placement UI
- `playgame.js` controls turns, attacks, and win detection
- `battleship.js` contains the core `ship`, `gameBoard`, and `Player` classes
- `battle.test.js` contains the test suite

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the test suite if you want to verify the logic layer:

```bash
npm test
```

3. Open `index.html` in a browser to play the game.

If you prefer a local server instead of opening the file directly, you can also serve the folder with any simple static server.

## How To Play

1. Open the page and click the `Start` button.
2. Drag ships from the tray onto Player One's board.
3. Use the rotate button on each ship before dropping it if you want vertical placement.
4. After placing your ships, click cells on Player Two's board to attack.
5. The computer takes its turn after your miss.

## Important Placement Note

When placing a ship, the cell under your mouse becomes the first cell of that ship.

That means you must move the mouse onto the exact cell you want to use as the ship's starting position, then drop/select it there. If you are placing a horizontal ship, choose the leftmost starting cell. If you are placing a vertical ship, choose the top starting cell.

## Test Command

```bash
npm test
```

## Current Stack

- JavaScript
- HTML
- CSS
- Jest
- Babel preset env