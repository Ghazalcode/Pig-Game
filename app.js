/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

//variable declaration 
var score, roundScore, activePlayer, gamePlaying, dicePrevious, diceStateFirst, diceCurrent, winningScore,diceStateSecond;
dicePrevious = 0;
diceCurrent = 1;
diceStateFirst = [0,0];
diceStateSecond = [0,0];
winningScore = 100;
// winningScore = document.querySelector('.winning-score').textContent.value;

init();

//Event listener for roll btn
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. get random dice from 1 - 6
        var diceRollFirst, diceRollSecond;
        diceRollFirst = Math.floor(Math.random() * 6) + 1;//2
        diceRollSecond = Math.floor(Math.random() * 6) + 1;//2
        diceStateFirst[diceCurrent] = diceRollFirst; // [6,6]
        diceStateSecond[diceCurrent] = diceRollSecond; // [6,6]
        //2. set display the roll dice 
        var diceDOMFirst = document.querySelector('.dice-0');
        var diceDOMSecond = document.querySelector('.dice-1');
        //set the image src to current dice image
        diceDOMFirst.style.display = 'block';
        diceDOMSecond.style.display = 'block';
        diceDOMFirst.src = 'dice-' + diceRollFirst + '.png';
        diceDOMSecond.src = 'dice-' + diceRollSecond + '.png';

        //loose ENTIRE score IF row two 6 in a row

        if((diceStateFirst[dicePrevious] === 6 && diceStateFirst[diceCurrent] === 6) || (diceStateSecond[dicePrevious] === 6 && diceStateSecond[diceCurrent] === 6)){
            document.querySelector('#score-' + activePlayer).textContent = '0';
            document.getElementById('current-'+ activePlayer).textContent = '0';
            diceStateFirst[diceCurrent] = '0';
            diceStateFirst[dicePrevious] = '0';
            diceStateSecond[diceCurrent] = '0';
            diceStateSecond[dicePrevious] = '0';
            nextPlayer();
        }else {
            diceStateFirst[dicePrevious] = diceStateFirst[diceCurrent]; //[2,2] 
            diceStateSecond[dicePrevious] = diceStateSecond[diceCurrent]; //[2,2] 
        }
        
        //3. IF score is NOT a 1 add it to roundScore 
        if((diceRollFirst !== 1) || (diceRollSecond !== 1)){
            //add to round score
          
            roundScore = diceRollFirst + diceRollSecond + roundScore;
            document.getElementById('current-'+ activePlayer).textContent = roundScore;
           
           
        }else{
            //switch to next player
            nextPlayer();
        }
    }
});

//Event listener for hold btn
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add the score to global SCORE
        score[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        //update the UI

        //check if active player has won
        if(score[activePlayer] >= winningScore){
            //declare the current player as the winner
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.btn-new').textContent = 'Replay';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //switch player
            nextPlayer();
        }
    }
});

//Event listener for hold btn
document.querySelector('.btn-new').addEventListener('click', init);

//function to UPDATE UI
function nextPlayer(){
    //switch to next player
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    //reset roundScore back to zero
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //switch active class to active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  
    //hide dice image when the application start 
    document.querySelector('.dice-0').style.display = 'none';  
    document.querySelector('.dice-1').style.display = 'none';     
}

//Initialization of the game
function init(){
    score = [0,0];//default score for both players 
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
   
    //hide dice image when the application start 
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.pop-up').style.display = 'none';
    // document.querySelector('.saved-pop-box').style.display = 'none';

    //set all the score to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-new').textContent = 'NEW GAME';
}

//Event listener for set preffered score
document.querySelector('.btn-winning').addEventListener('click', function(){
    document.querySelector('.pop-up').style.display = 'block';
});

//Event listener for saving preffered score
document.querySelector('#btn-save').addEventListener('click',function(){
    //read the value of win-reset
    var winReset = document.querySelector('.win-reset').value;

    //update the GLOBAL score for PREFERRED SCORE
    winningScore = winReset;
    init();
    document.querySelector('.pop-up').style.display = 'none';
});

// .setTimeout(() => {
//     document.querySelector('.saved-pop-box').style.display = 'block';
// }, 2000)
