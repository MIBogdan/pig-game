"use strict";

// let dice = document.querySelector('.dice');
// let player0 = document.querySelector('.player--0');
// let player1 = document.querySelector('.player--1');
// let currentScorePlayer0 = document.getElementById('score--0');
// let currentScorePlayer1 = document.getElementById('score--1');
// let mainScorePlayer0 = document.getElementById('current--0');
// let mainScorePlayer1 = document.getElementById('current--1');
// currentScorePlayer0.textContent = 0
// currentScorePlayer1.textContent = 0

// let newGame = function () {
//   location.reload();
// };
// let mainPlayer0 = 0;
// let mainPlayer1 = 0;
// let scorePlayer0 = 0;
// let scorePlayer1 = 0;

// let buttons = document.querySelectorAll('.btn').forEach(e => {
//   e.addEventListener('click', () => {
//     if (e.classList[1] === 'btn--new') {
//       newGame();
//     } else if (e.classList[1] === 'btn--roll') {
//       let randomNum = Math.trunc(Math.random() * 6) + 1;
//       let score = 0;
//       switch (randomNum) {
//         case 1:
//           dice.src = 'dice-1.png';
//           score = 1;
//           break;
//         case 2:
//           dice.src = 'dice-2.png';
//           score = 2;
//           break;
//         case 3:
//           dice.src = 'dice-3.png';
//           score = 3;
//           break;
//         case 4:
//           dice.src = 'dice-4.png';
//           score = 4;
//           break;
//         case 5:
//           dice.src = 'dice-5.png';
//           score = 5;
//           break;
//         case 6:
//           dice.src = 'dice-6.png';
//           score = 6;
//           break;
//       }

//       if (player0.classList[2] === 'player--active') {
//         scorePlayer0 += score;
//         currentScorePlayer0.textContent = scorePlayer0;
//         mainPlayer0 += score;
//         if (score === 1) {
//             scorePlayer0 = 0;
//             mainPlayer0 = 0;
//             currentScorePlayer0.textContent = scorePlayer0;
//             mainScorePlayer0.textContent = mainPlayer0;
//           player1.classList.toggle('player--active');
//           player0.classList.toggle('player--active');

//         }
//       } else if (player1.classList[2] === 'player--active') {
//         scorePlayer1 += score;
//         currentScorePlayer1.textContent = scorePlayer1;
//         mainPlayer1 += score;

//         if (score === 1) {
//             scorePlayer1 = 0;
//             mainPlayer1 = 0;
//             currentScorePlayer1.textContent = scorePlayer1;
//             mainScorePlayer1.textContent = mainPlayer1;
//           player1.classList.toggle('player--active');
//           player0.classList.toggle('player--active');

//         }
//       }
//     } else if (e.classList[1] === 'btn--hold') {
//       player1.classList.toggle('player--active');
//       player0.classList.toggle('player--active');

//       if (player0.classList[2] === 'player--active') {
//         scorePlayer1 = 0;
//         currentScorePlayer1.textContent = scorePlayer1;
//         mainScorePlayer1.textContent = mainPlayer1;
//       } else if (player1.classList[2] === 'player--active') {
//         scorePlayer0 = 0;
//         currentScorePlayer0.textContent = scorePlayer0;
//         mainScorePlayer0.textContent = mainPlayer0;
//       }
//     }
//   });
// });

let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");
let score0El = document.getElementById("score--0");
let score1El = document.getElementById("score--1");
let diceEl = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let playing = true;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality

btnRoll.addEventListener("click", () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      scores[activePlayer] = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;

      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
});

btnNew.addEventListener("click", () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
});
