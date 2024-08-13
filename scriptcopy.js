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

  const placeMarker = function (position, marker) {
    if (gameBoard[position] === 0) {
      gameBoard[position] = marker;
    }
    if (gameBoard[position] !== 0) {
      console.log("This position is already taken");
      return false;
    }
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
  game = createGameBoard();

  const startGame = () => {
    console.log("New game started");
    console.log("Current board:");
    console.log(game.getGameBoard());
  };

  // function to switch players or turns
  const switchPlayer = function (currentPlayer) {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    console.log(currentPlayer);
  };

  // function to play game
  const playTurn = function (position) {
    const movePosition = prompt("Enter move: 0 - 8");
    if (game.placeMarker(movePosition, currentPlayer.marker)) {
      if (game.checkWinner()) {
        console.log(`${currentPlayer.name} wins!`);
        return true;
      }
      switchPlayer();
    }
    return false;
  };

  return {
    playTurn,
    switchPlayer,
    startGame,
  };
  //function to start or restart game
}

function main() {
  const player1 = Player();
  const gameControl = gameController(player1);
  const board = createGameBoard();
  gameControl.startGame();

  let gameOver = false;

  // while game is not over, get current player move, update board, check for win and switch players
  while (!gameOver) {
    gameOver = gameControl.playTurn();
    gameControl.switchPlayer();
    console.log(board.getGameBoard());
  }
  console.log("Game over!");
}

main();
