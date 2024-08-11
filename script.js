/* Start with the gameboard */
function createGameBoard() {
  const gameBoard = [null, null, null, null, null, null, null, null, null];

  //Function to place a marker on the gameboard

  const placeMarker = function (position, marker) {
    if (gameBoard[position] === null) {
      gameBoard[position] = marker;
    }
    if (gameBoard[position] !== null) {
      return false;
      console.log("This position is already taken");
    }
  };

  return gameBoard;

  // This game will start as a user vers user game
}
