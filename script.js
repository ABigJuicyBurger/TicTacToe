/* Start with the gameboard */
function createGameBoard() {
  const gameBoard = [null, null, null, null, null, null, null, null, null];

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
    // check for horizontal 3 in a row
    if (
        (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2]) || 
        (gameBaord[3] === gameBoard[4] && gameBoard[4 === gameBoard[5]]) ||
        (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8])
       )
       {
        console.log("There is a winner");
        return true;
       }
  }

  const getGameBoard = function () {
    return gameBoard;
  };

  // This game will start as a user vers user game
}
