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
  const checkWinner = function 

  const getGameBoard = function () {
    return gameBoard;
  };

  // This game will start as a user vers user game
}
