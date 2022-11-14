const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const state = {
  players: ['X', '0'],
  currentPlayer: 0, 
  }
  
  // helper functions 
  
  const changeTurn = () => {
      state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  }
  
  const getCurrentPlayer = () => state.players[state.currentPlayer];
  
  const renderGame = () => {
      generatePlayer();
      changeTurn();
  }

  const generatePlayer = () => {
    const text = `It's currently ${getCurrentPlayer()}'s turn!`
    playerTurn.innerText = text;
}
  


// dom selectors  and query selectors grab the css
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const playerTurn = document.getElementById('playerTurn')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

startGame()

restartButton.addEventListener('click', startGame)


// resets state and event listeners 
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')

}

// adds click event to change turns
// scans game board to see if the placed marker ends the game

function handleClick(click) {
  const cell = click.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    renderGame();
  }
}

// tells what to display in the div popup after the game is over
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

// scans for a draw

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

// adds the mark to the board on click
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// ends the current players turn
function swapTurns() {
  circleTurn = !circleTurn
}

// shows the current turn by "ghosting" the next icon to be placed
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

// scans the array of potential combinations for a victory 

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}