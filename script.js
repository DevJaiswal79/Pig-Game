//project3_Pig Game

'use strict';

//modal window

const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnclosemodal = document.querySelector(`.close-modal`);
const btnshowmodal = document.querySelectorAll(`.show-modal`);
console.log(btnshowmodal);

const openModal = function () {
  console.log(`Button clicked`);
  //class list property and its sub-types
  modal.classList.remove(`hidden`); //we dont use dot here
  overlay.classList.remove(`hidden`);
  // modal.style.display = 'block';
};

for (let i = 0; i < btnshowmodal.length; ++i) {
  btnshowmodal[i].addEventListener(`click`, openModal);
}
function closeModal() {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
}
// console.log(btnclosemodal);
btnclosemodal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

document.addEventListener(`keydown`, function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.getElementById('current--1');
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

//starting condition
const init = function () {
  diceEl.classList.add(`hidden`);
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice funtionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `./Assets/dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    //if score[1] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //finish the game'
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--active`);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
