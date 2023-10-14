// Constants to represent the game state
const EMPTY = "";
const X = "X";
const O = "O";

let currentPlayer = X; // Start with player X
let board = Array(9).fill(EMPTY); // Use Array.fill to initialize the board
let gameover = false;

const cells = document.querySelectorAll('.cell');
const scores = document.querySelectorAll('.scores h3');
const popup = document.querySelector('.popup');
const popupMessage = popup.querySelector('h2');
const replayBtn = popup.querySelector('.rply-btn');
const resetBtn = document.querySelector('.rst-btn');

// Initialize scores
let winsX = 0;
let winsO = 0;
popup.style.display = "none";
// Function to handle a player's move
function handleCellClick(index) {
    if (!gameover && board[index] === EMPTY) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer === X ? 'x' : 'o');

        if (checkWinner(currentPlayer)) {
            popupMessage.textContent = `Player ${currentPlayer} wins! 😎`;
            if (currentPlayer === X) {
                winsX++;
            } else {
                winsO++;
            }
            scores[0].textContent = `Win  ${winsX}`;
            scores[1].textContent = `Loose  ${winsO}`;
            gameover = true;
            popup.style.display = "flex";
        } else if (!board.includes(EMPTY)) {
            popupMessage.textContent = "It's a draw! 💰";
            gameover = true;
            popup.style.display = "flex";
        } else {
            currentPlayer = currentPlayer === X ? O : X;
        }
    }
}

// Function to check if a player has won
function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combination => combination.every(index => board[index] === player));
}

// Event listeners for cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

// Event listener for replay button
replayBtn.addEventListener('click', () => {
    resetGame();
    popup.style.display = "none";
});

// Event listener for reset button
resetBtn.addEventListener('click', () => {
    resetGame();
});

// Function to reset the game
function resetGame() {
    board = Array(9).fill(EMPTY);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });
    gameover = false;
    currentPlayer = X;
}
