document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.querySelectorAll('.mine');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restart');
    
    let dangerMines = [];
    let safeMines = [];
    let clicksLeft = 3;
    let clickedMines = [];

    // Initialize the game
    function initGame() {
        message.textContent = "Click on 3 boxes!";
        dangerMines = [];
        safeMines = [];
        clicksLeft = 3;
        clickedMines = [];

        gameBoard.forEach(mine => {
            mine.textContent = '';
            mine.style.backgroundColor = 'yellow';
            mine.style.cursor = 'pointer';
            mine.addEventListener('click', handleClick);
        });

        // Randomly assign 6 danger mines and 3 safe mines
        const allMines = Array.from({ length: 9 }, (_, i) => i);
        while (dangerMines.length < 6) {
            const randomIndex = Math.floor(Math.random() * allMines.length);
            dangerMines.push(allMines.splice(randomIndex, 1)[0]);
        }
        safeMines = allMines;
    }

    // Handle click event
    function handleClick(event) {
        const clickedBox = parseInt(event.target.id.split('-')[1]);

        if (clickedMines.includes(clickedBox) || clicksLeft <= 0) {
            return;
        }

        clickedMines.push(clickedBox);
        clicksLeft--;

        if (dangerMines.includes(clickedBox)) {
            event.target.style.backgroundColor = 'red';
            event.target.textContent = 'X';
            message.textContent = "Game Over! You clicked on a danger mine.";
            gameOver();
        } else {
            event.target.style.backgroundColor = 'green';
            event.target.textContent = '✓';
            if (clicksLeft === 0 && clickedMines.filter(box => safeMines.includes(box)).length === 3) {
                message.textContent = "You win! You found all the safe mines.";
                gameOver();
            } else if (clicksLeft === 0) {
                message.textContent = "Game Over! You ran out of clicks.";
                gameOver();
            }
        }
    }

    // Game over, disable further clicks
    function gameOver() {
        gameBoard.forEach(mine => {
            mine.removeEventListener('click', handleClick);
            mine.style.cursor = 'not-allowed';
        });
    }

    // Restart the game
    restartBtn.addEventListener('click', initGame);

    // Initialize the game on page load
    initGame();
});
