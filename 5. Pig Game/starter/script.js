'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    activePlayer = activePlayer === 0 ? 1 : 0 ;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// Rolling Dice Functionality
btnRoll.addEventListener('click', function(){
  if(playing){
    // 1. Generating a Random Dice roll
    // Math.trunc to remove the Decimal Point
    // Math.random di kali 6 untuk memunculkan angka 0 sampe 5 
    // kalo ditambah 1 berarti biar angka 6 masuk karna desimal dimulai dari 0
    // karna dadu angkanya 1 sampe 6

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    // 3. Check for rolled: if true, 
    if(dice !== 1){
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        //switch to next player
        switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function(){
 if(playing){
    // 1. Add current score to active player`s score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player`s score already 100
    if (scores[activePlayer] >= 10){
        playing = false;
        diceEl.classList.add('hidden');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
        
    } else {
    // finish the game

    // Switch to next player
    switchPlayer();
    }
 }
});

btnNew.addEventListener('click', init);