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
let gameActive = false;

const changePlayer = function () {
	currentScoreNodes[activePlayer].textContent = 0;
	players[activePlayer].classList.remove('player--active');

	activePlayer ^= 1;
	players[activePlayer].classList.add('player--active');
};

const resetGame = function () {
	players[activePlayer].classList.remove('player--winner');

	activePlayer = 1;
	gameActive = true;
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
	if (!gameActive) return;

	const diceVal = Math.floor(Math.random() * 6) + 1;
	diceImg.classList.remove('hidden');
	diceImg.src = `images/dice-${diceVal}.png`;

	if (diceVal === 1) {
		currentScore = 0;
		changePlayer();
	} else {
		currentScore += diceVal;
		currentScoreNodes[activePlayer].textContent = currentScore;
	}
});

holdDice.addEventListener('click', function () {
	if (!gameActive) return;

	totalScores[activePlayer] += currentScore;
	currentScore = 0;
	currentScoreNodes[activePlayer].textContent = 0;
	totalScoreNodes[activePlayer].textContent = totalScores[activePlayer];

	if (totalScores[activePlayer] < 10) changePlayer();
	else {
		gameActive = false;
		diceImg.classList.add('hidden');
		players[activePlayer].classList.remove('player--active');
		players[activePlayer].classList.add('player--winner');
	}
});

newGame.addEventListener('click', resetGame);
