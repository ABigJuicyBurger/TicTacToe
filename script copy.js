/* Start with the gameboard */
function createGameBoard() {
  const gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  //Function to place a marker on the gameboard

  const placeMarker = function (position, marker) {
    if (gameBoard[position] === null) {
      gameBoard[position] = marker;
    }
    if (gameBoard[position] !== null) {
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
        (
      gameBoard[0][i] !== 0 &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i] 
        ) ||
        // check for diagnol 3 in a row;
        (
      gameBoard[0][0] !== 0 &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
        ) ||
        (
          gameBoard[0][2] !== 0 &&
          gameBoard[0][2] === gameBoard[1][1] &&
          gameBoard[1][1] === gameBoard[2][0]
        )
      )
  
      {
        console.log("There is a winner");
        return true;
      }
    }
  };

  const getGameBoard = function () {
    return gameBoard;
  };

  // This game will start as a user vers user game
}

function GameBoard() {}

function Player(gameBoard) {
  function takeTurn() {}
}

function main() {
  // 1. create game board
  const gameBoard = new GameBoard();

  // 2. create players
  const playerHuman = new Player(gameBoard);
  const playerComputer = new Player(gameBoard);

  // playerHuman goes first

  playerHuman.takeTurn();
}

main();
