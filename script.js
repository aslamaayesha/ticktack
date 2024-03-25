
let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function handleClick(event) {
    const { id } = event.target;
    if (!board[id]) {
        board[id] = currentPlayer;
        event.target.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            alert(`Player ${winner} wins!`);
            resetGame();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setTimeout(computerTurn, 500); // Simulate computer's turn after a delay
    }
}

function computerTurn() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (!cell) acc.push(index);
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerChoice = emptyCells[randomIndex];
    board[computerChoice] = 'O';
    document.getElementById(computerChoice.toString()).textContent = 'O';
    const winner = checkWinner();
    if (winner) {
        alert(`Player ${winner} wins!`);
        resetGame();
        return;
    }
    currentPlayer = 'X';
}

function resetGame() {
    board.fill('');
    document.querySelectorAll('.button').forEach(button => button.textContent = '');
}

document.querySelectorAll('.button').forEach(button => button.addEventListener('click', handleClick));
