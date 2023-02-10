window.addEventListener('DOMContentLoaded', () => {

    // convert an array-like obj into actual arrays
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';  // holds current player
    let isGameActive = true;  // true until someone wins

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    // decide if there is a winner
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // decide wether the user wants to perform a valid action or not
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
    
        return true;
    };

    // receive an index as a parameter and set the corresponding element in the board array to be the sign of our current player.
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);   // change current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';          // become either playerX or playerO depending on the current player
        playerDisplay.innerText = currentPlayer;                    // change value of user
        playerDisplay.classList.add(`player${currentPlayer}`);      // add back current player back into list
    };

    // announce winner announcer is hidden by default until the game ends
    const announce = (type) => {
        switch(type){
           case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
           case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
           case TIE:
                announcer.innerText = 'Tie';
            }
        announcer.classList.remove('hide');
    };

    // we'll loop through winConditions array and check the board for each winning condition
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
          if (a === "" || b === "" || c === "") {
            continue;
          }
          // If all the fields are equal then there is a winner, so set the roundWon to true and break the for loop
          if (a === b && b === c) {
            roundWon = true;
            break;
          }
        }
        
        // if it is true announce a winner and set the game to inactive
        if (roundWon) {
          announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
          isGameActive = false;
          return;
        }
      
        // If there is no winner, check if there is empty tiles on the board and if there is no winner and there are no empty tiles left, announce a tie.
        if (!board.includes("")) announce(TIE);
    }

    // whenever clicks this function is called
    // check if it is a valid action or not and we'll also check if the game is active currently or not.
    // if both true, update innerText, add corresponding class and update the board array
    // check whether the game hase ended or not so call handleResultValidation()
    // call change player to switch
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
          tile.innerText = currentPlayer;
          tile.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
        }
    };

    //  looping through the array of tiles and add an event listener for each
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // set the board to consist of nine empty strings, set the game to active, remove the announcer and change the player back to X
    // loop through the tiles and set the innerText back to an empty string, and remove any player specific classes from the tiles.
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer(); // switches player
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX'); 
            tile.classList.remove('playerO');
        });
    };

    // register this function as a click event handler for the reset button
    resetButton.addEventListener('click', resetBoard);
});