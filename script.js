'use strict';

const players = [document.querySelector('.player--0'), document.querySelector('.player--1')];

const totalScoreNodes = [document.querySelector('#score--0'), document.querySelector('#score--1')];

const currentScoreNodes = [document.querySelector('#current--0'), document.querySelector('#current--1')];

const diceImg = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');

let activePlayer = 0;
let currentScore = 0;
const totalScores = [0, 0];

const changePlayer = function () {
	currentScoreNodes[activePlayer].textContent = 0;
	players[activePlayer].classList.remove('player--active');

	activePlayer ^= 1;
	players[activePlayer].classList.add('player--active');
};

// TODO: winning the game if player scores 100 points
const resetGame = function () {
	activePlayer = 1; // notice 1
	changePlayer();

	currentScore = 0;
	totalScores[0] = 0;
	totalScores[1] = 0;
	totalScoreNodes[0].textContent = 0;
	totalScoreNodes[1].textContent = 0;
	currentScoreNodes[0].textContent = 0;
	currentScoreNodes[0].textContent = 0;
	diceImg.classList.add('hidden');
};

resetGame();

rollDice.addEventListener('click', function () {
	const diceVal = Math.floor(Math.random() * 6) + 1;
	diceImg.classList.remove('hidden');
	diceImg.src = `images/dice-${diceVal}.png`;

	if (diceVal === 1) {
		currentScore = 0;
		// you don't need to make the currentScoreNode text 0
		// as it is automatically handled by changePlayer()
		changePlayer();
	} else {
		currentScore += diceVal;
		currentScoreNodes[activePlayer].textContent = currentScore;
	}
});

holdDice.addEventListener('click', function () {
	totalScores[activePlayer] += currentScore;
	currentScore = 0;
	currentScoreNodes[activePlayer].textContent = 0;
	totalScoreNodes[activePlayer].textContent = totalScores[activePlayer];
	changePlayer();
});

newGame.addEventListener('click', resetGame);
