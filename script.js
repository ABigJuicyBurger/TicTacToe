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
        return gameBoard[i][0];
      }
      // check for vertical 3 in a row in first, second and third column
      if (
        gameBoard[0][i] !== 0 &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        return gameBoard[0][i];
      }
    }
    // check for diagnol 3 in a row;
    if (
      gameBoard[0][0] !== 0 &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      return gameBoard[0][0];
    }
    if (
      gameBoard[0][2] !== 0 &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
    ) {
      return gameBoard[0][2];
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
  }
  else if (marker.length > 1) {
    console.log("Please enter only one character");
    return getPlayerMarker();
  }
  else if (marker.length === 0) {
    console.log("Please enter a character");
    return getPlayerMarker();
  }
  else if (marker.length === 1) {
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

  // function to switch players or turns
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  // function to play a turn
  const playTurn = (board) => {
    let validMove = false;
    while (!validMove) {
      const position = prompt(`${currentPlayer.name}, enter a position (0-8):`);
      // allow player to cancel game
      if (position === null) {
        return;
      } else if (board.placeMarker(position, currentPlayer.marker)) {
        validMove = true;
        console.log(
          `${currentPlayer.name} placed ${currentPlayer.marker} at position ${position}`
        );
        display.showBoard();
        return board.checkWinner();
      } else {
        console.log("Invalid move");
      }
    }
  };

  return {
    currentPlayer,
    playTurn: () => playTurn(gameBoard),
    switchPlayer,
  };
}

// factory function to display board (in console for now)
const displayBoard = (board) => {
  const formatGameBoard = (gameState) => {
    return gameState.map((row) => row.join(" | ")).join("\n---------\n");
  };

  return {
    showBoard: () => console.log(formatGameBoard(board)),
  };
};

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

  let gameResult = null;

  // while game is not over, get current player move, update board, check for win and switch players
  while (gameResult === null) {
    gameResult = gameControl.playTurn();

    // If there isn't a winner, keep playing
    if (gameResult === null) {
      gameControl.switchPlayer();
    }
  }
  if (gameResult === "tie") {
    console.log("It's a tie!");
  } else if (gameResult === undefined){
    console.log("Game cancelled");
  } else {
    console.log(`${currentPlayer.name} wins!`);

  }
}

main();
