// Constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// DOM elements
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

// Variable to keep track of whose turn it is (O's or X's)
let oTurn; 

// Start the game when the page loads or when the restart button is clicked
startGame();
restartButton.addEventListener('click', startGame);

// Function to start the game and set up the initial state
function startGame() {
  oTurn = false; // X starts the game
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

// Function to handle the click event on a cell
function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// Function to end the game and show the winning message or draw message
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

// Function to check if the game is a draw (all cells are filled)
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

// Function to place the mark (X or O) on the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Function to swap turns between O and X
function swapTurns() {
  oTurn = !oTurn;
}

// Function to set the hover class on the board based on whose turn it is
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// Function to check if the current player has won the game
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combinations => {
    return combinations.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
