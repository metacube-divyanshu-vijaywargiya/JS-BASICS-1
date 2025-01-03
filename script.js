function startGame() {
    const numberToGuess = Math.floor(Math.random() * 100) + 1;
    let turnsLeft = 10;
    const previousGuesses = [];
    const gameDiv = document.getElementById('game');
    console.log(numberToGuess);

    gameDiv.innerHTML = `
        <p>I have chosen a number between 1 and 100.</p>
        <p>You have ${turnsLeft} turns to guess it.</p>
        <input type="number" id="guessInput" placeholder="Enter your guess" />
        <button id="guessButton">Guess</button>
        <p id="result"></p>
        <p id="previousGuesses"></p>
    `;

    const guessButton = document.getElementById('guessButton');
    const guessInput = document.getElementById('guessInput');
    const resultText = document.getElementById('result');
    const previousGuessesText = document.getElementById('previousGuesses');

    // Function to handle the guessing logic
    function handleGuess() {
        const playerGuess = parseInt(guessInput.value);

        if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
            resultText.innerHTML = "Please enter a valid number between 1 and 100.";
            resultText.style.color = "red";
            return; 
        }

        previousGuesses.push(playerGuess);
        turnsLeft--;
        
        if (playerGuess === numberToGuess) {
            resultText.innerHTML = `Congratulations! You guessed the number ${numberToGuess} correctly!`;
            guessInput.style.display = 'none';
            guessButton.style.display = 'none';
            resultText.style.color = "green"; 
            previousGuessesText.innerHTML = `You have ${turnsLeft} turns left. Your previous guesses: ${previousGuesses.join(', ')}`;
            askToPlayAgain();
        } else if (playerGuess < numberToGuess) {
            resultText.innerHTML = "Your guess is too low.";
            resultText.style.color = "red";
        } else {
            resultText.innerHTML = "Your guess is too high.";
            resultText.style.color = "red";
        }
        
        if (turnsLeft > 0) {
            previousGuessesText.innerHTML = `You have ${turnsLeft} turns left. Your previous guesses: ${previousGuesses.join(', ')}`;
        } else {
            resultText.innerHTML = `Sorry, you've run out of turns. The number was ${numberToGuess}.`;
            previousGuessesText.style.display = 'none';
            guessInput.style.display = 'none';
            guessButton.style.display = 'none';
            askToPlayAgain();
        }
    }

    // Event listener for the Guess button
    guessButton.addEventListener('click', handleGuess);

    // Event listener for the Enter key in the input field
    guessInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });
}


function askToPlayAgain() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML += `
        <p>Do you want to play again? <button id="playAgainButton">Yes</button> <button id="exitButton">No</button></p>
    `;

    document.getElementById('playAgainButton').addEventListener('click', function() {
        startGame();
    });

    document.getElementById('exitButton').addEventListener('click', function() {
        document.getElementById('game').innerHTML = "<p>Thank you for playing!</p>";
    });
}

// Start the game when the page loads
startGame();
