const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameEnded = false;
const boardState = ['', '', '', '', '', '', '', '', ''];

const checkWin = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }

  if (!boardState.includes('')) {
    return 'draw';
  }

  return null;
};

const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell'));

  if (boardState[cellIndex] || gameEnded) {
    return;
  }

  cell.textContent = currentPlayer;
  boardState[cellIndex] = currentPlayer;

  const winner = checkWin();
  if (winner) {
    if (winner === 'draw') {
      message.textContent = "It's a draw!";
    } else {
      message.textContent = `${winner} wins!`;
    }
    gameEnded = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
  currentPlayer = 'X';
  gameEnded = false;
  boardState.fill('');
  message.textContent = '';
  document.querySelectorAll('[data-cell]').forEach(cell => cell.textContent = '');
};

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
