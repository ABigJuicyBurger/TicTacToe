/* Start with the gameboard */
function createGameBoard() {
  const gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getGameBoard = function () {
    return gameBoard;
  };

  //Function to place a marker on the gameboard

  const placeMarker = (position, marker) => {
    const row = Math.floor(position / 3);
    const col = position % 3;

    if (gameBoard[row][col] === 0) {
      gameBoard[row][col] = marker;
      getGameBoard();
      return true;
    }
    return false;
  };
  // Function to check if there is a winner
  const checkWinner = function () {
    // check for horizontal 3 in a row in first, second and third row
    for (let i = 0; i < 3; i += 1) {
      if (
        gameBoard[i][0] !== 0 &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        return "winner";
      }
      // check for vertical 3 in a row in first, second and third column
      if (
        gameBoard[0][i] !== 0 &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        return "winner";
      }
    }
    // check for diagnol 3 in a row;
    if (
      gameBoard[0][0] !== 0 &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      return "winner";
    }
    if (
      gameBoard[0][2] !== 0 &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
    ) {
      return "winner";
    }

    // Check for tie
    if (gameBoard.flat().every((cell) => cell !== 0)) {
      return "tie";
    }

    return null; // Game not over yet
  };

  return {
    getGameBoard,
    placeMarker,
    checkWinner,
  };
}
// Player Factory Function
function Player() {
  const getUserName = () => prompt("Please enter your name");
  const name = getUserName();

  if (name === null) {
    return null;
  }

  const getPlayerMarker = () => {
    const marker = prompt("Select shape");
    if (marker === null) {
      return null;
    } else if (marker.length > 1) {
      console.log("Please enter only one character");
      return getPlayerMarker();
    } else if (marker.length === 0) {
      console.log("Please enter a character");
      return getPlayerMarker();
    } else if (marker.length === 1) {
      return marker;
    }
  };

  const marker = getPlayerMarker();
  if (marker === null) {
    return null;
  }

  return {
    name,
    marker,
  };
}

// function to control the game
function gameController(player1, player2) {
  // function to start game

  // function to keep track of current player and display board
  let currentPlayer = player1;
  gameBoard = createGameBoard();
  let display = displayBoard(gameBoard.getGameBoard());
  let gridCells = display.cells;

  // function to switch players or turns
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const isGameOver = () => {
    return (
      gameBoard.checkWinner() === "winner" || gameBoard.checkWinner() === "tie"
    );
  };

  // function to play a turn
  const playTurn = (board) => {
    gridCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!isGameOver()) {
          const position = parseInt(e.target.dataset.index);

          if (board.placeMarker(position, currentPlayer.marker)) {
            console.log(
              `${currentPlayer.name} placed ${currentPlayer.marker} at position ${position}`
            );
            display.showBoard();
          }
          const winner = gameBoard.checkWinner();
          if (winner === "winner") {
            console.log(`${currentPlayer.name} wins!`);
            const gameWinner = document.createElement("div");
            gameWinner.textContent = `${currentPlayer.name} wins!`;
            document.body.appendChild(gameWinner);
            // stop game
          } else if (winner === "tie") {
            console.log("It's a tie!");
            const gameWinner = document.createElement("div");
            gameWinner.textContent = "It's a tie!";
            document.body.appendChild(gameWinner);
            // stop game
          } else {
            switchPlayer();
          }
        }
      });
    });
  };

  return {
    currentPlayer,
    playTurn: () => playTurn(gameBoard),
    switchPlayer,
    isGameOver,
  };
}

// Function to start the game and run logic
function main() {
  const player1 = Player();
  if (player1 === null) {
    console.log("Game cancelled");
    return;
  }

  const player2 = Player();
  if (player2 === null) {
    console.log("Game cancelled");
    return;
  }

  const gameControl = gameController(player1, player2);
  const currentPlayer = gameControl.currentPlayer;
  const board = createGameBoard();

  let gameResult = gameControl.isGameOver();

  // while game is not over, get current player move, update board, check for win and switch players
  while (gameResult === false) {
    gameResult = gameControl.playTurn();

    // If there isn't a winner, keep playing
    if (gameResult === false) {
      gameControl.switchPlayer();
    }
  }
  if (gameResult === "tie") {
    console.log("It's a tie!");
  } else if (gameResult === undefined) {
    console.log("Game cancelled");
  } else {
    console.log(`${currentPlayer.name} wins!`);
    // end game
  }
}

// Run the game, now will run using an event listener to listen to the button in html

// factory function to display board (in console for now) and render contents to webpage
const displayBoard = (board) => {
  const grid = document.createElement("div");
  grid.classList.add("game-board");
  grid.style.cssText = "width: 300px";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.style.cssText = "width: 100px; height: 100px; font-size: 2em";
    grid.appendChild(cell);
  }

  document.body.appendChild(grid);

  const cells = document.querySelectorAll(".cell");

  const updateBoard = () => {
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      cell.textContent = board[row][col] || "";
    });
  };

  return {
    showBoard: updateBoard,
    cells: cells,
  };
};

const startButton = document.createElement("button");

startButton.style.cssText = "background-color: forestgreen";
startButton.textContent = "Start Tic_Tac_Toe";

const HTMLbutton = document.body.appendChild(startButton);

startButton.addEventListener("click", main);
