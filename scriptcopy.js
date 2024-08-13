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
        return true;
    }
    return false;
};
  // Function to check if there is a winner
  const checkWinner = function () {
    // check for horizontal 3 in a row in first, second and third row
    for (let i = 0; i < 3; i += 1) {
      if (
        (gameBoard[i][0] !== 0 &&
          gameBoard[i][0] === gameBoard[i][1] &&
          gameBoard[i][1] === gameBoard[i][2]) ||
        // check for vertical 3 in a row in first, second and third column
        (gameBoard[0][i] !== 0 &&
          gameBoard[0][i] === gameBoard[1][i] &&
          gameBoard[1][i] === gameBoard[2][i]) ||
        // check for diagnol 3 in a row;
        (gameBoard[0][0] !== 0 &&
          gameBoard[0][0] === gameBoard[1][1] &&
          gameBoard[1][1] === gameBoard[2][2]) ||
        (gameBoard[0][2] !== 0 &&
          gameBoard[0][2] === gameBoard[1][1] &&
          gameBoard[1][1] === gameBoard[2][0])
      ) {
        console.log("There is a winner");
        // return win dialog
        return getGameBoard(); // on event listener click
      } else {
        console.log("It's a tie");
        // return tie dialog
        return getGameBoard(); // on event listener click
      }
    }
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

  const getPlayerMarker = () => prompt("Select shape");
  const marker = getPlayerMarker();

  function takeTurn(marker) {
    gameBoard.placeMarker(marker);
  }

  return {
    name,
    marker,
    takeTurn,
  };
}

// function to control the game
function gameController(player1) {
  // function to start game

  // function to keep track of current player
  let currentPlayer = player1;
  gameBoard = createGameBoard();

  // function to switch players or turns
  const switchPlayer = function (currentPlayer) {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    console.log(currentPlayer);
  };

  // function to play a turn
  const playTurn = (board) => {
    let validMove = false;
    while (!validMove) {
      const position = prompt(`${currentPlayer.name}, enter a position (0-8):`);
      if (board.placeMarker(position, currentPlayer.marker)) {
        validMove = true;
        console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at position ${position}`);
        console.log(board.getGameBoard());
        return board.checkWinner();
      } 
      else {
        console.log("Invalid move");
      }
    }
  };

  
  

  return {
    playTurn: () => playTurn(gameBoard),
    switchPlayer,
  };
  //function to start or restart game
}

function main() {
  const player1 = Player();
  const gameControl = gameController(player1);
  const board = createGameBoard();

  let gameOver = false;

  // while game is not over, get current player move, update board, check for win and switch players
  while (!gameOver) {
    gameOver = gameControl.playTurn();
    gameControl.switchPlayer();
  }
  console.log("Game over!");
}

main();
