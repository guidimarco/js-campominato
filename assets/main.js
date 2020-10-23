
// <1-fold START --- MINEFIELD

// #2-fold START --- VAR ASSIGNMENT
// LEVEL: difficult level from 0 to 2
var level;

// FIELD
var field = []; // all possible user-choise

// BOMBS
var numberOfBombs = 16;
var bombs = []; // numberOfBombs-bombs from 1 to field length

// POINT
var points = []; // all the no-bombs user choise

// USER-WIN?
var winTheGame; // "true" if user win

// #/2-fold END --- VAR ASSIGNMENT

// #2-fold START --- LEVEL
// level from 0 (easy) to 2 (hard)
level = askNumber(0, 2, "Inserisci il livello da 0 (facile) a 2 (difficile)");
// #/2-fold END --- LEVEL

// #2-fold START --- FIELD
// FIELD-GENERATOR: create all field-single-unit
field = generateField(level);

// stamp
console.log("Livello: " + level + ", campo composto da: " + field.length + " unità");
console.log("Field: " + field);

// #/2-fold END --- FIELD

// #2-fold START --- RANDOM-BOMBS
// BOMBS-GENERATOR: generate 16 bombs from 1 to max (field length)
bombs = getBombs(numberOfBombs, field.length);

// stamp
console.log("Bombe: " + bombs);

// #/2-fold END --- RANDOM-BOMBS

// #2-fold START --- GAME!!!
// LET'S PLAY
points = game(field, bombs);

// #/2-fold END --- GAME!!!

// #2-fold START --- STAMP AFTER GAME
winTheGame = userWin(bombs, points, field);

// STAMP
if (winTheGame) {
    console.log("Congratulazioni, hai vinto!");
} else {
    console.log("Hai perso, punti fatti: " + points.length);
}

// #/2-fold END --- STAMP AFTER GAME



// </1-fold END --- MINEFIELD

// <1-fold START --- ALL FUNCTION
// ask a number from min to max (both included)
// testo --> testo prompt
function askNumber(min, max, testo) {
    var userNumber;
    do {
        userNumber = parseInt(prompt(testo));
    } while (isNaN(userNumber) || userNumber < min || userNumber > max);
    return userNumber;
}

// GENERATE THE FIELD: return an array from 1 to max
function generateField(level) { // max is a number
    var level; // number that rapresent the level
    var fieldDimension; // the maximum value of the field
    var field = [];

    // FIELD-DIMENSION: depending of the level
    switch (level) {
        case 0: // level easy
            fieldDimension = 100;
            break;
        case 1:
            fieldDimension = 80;
            break;
        case 2: // level hard
            fieldDimension = 50;
            break;
    }

    // generate number from 1 to field-dimension
    for (var i = 1; i <= fieldDimension; i++) {
        field.push(i);
    }
    return field;
}

// GENERATE BOMBS: generate n numbers from 1 to max
function getBombs(n, max) {
    var bomb; // number from 1 to max
    var bombs = []; // random-numbers

    do {
        // GENERATE RANDOM NUMBER FROM 1 TO MAX
        bomb = Math.floor(Math.random() * max) + 1;

        // if it's not includes --> push in numbers
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    } while (bombs.length < n);
    bombs = bombs.sort(function(a, b){return a-b});
    return bombs;
}

// PLAY FUNCTION: return the array of the user-numbers (not the bomb)
function game(fieldArray, bombsArray) {
    var userNumber; // user-number --> ask to user
    var userNumbers = []; // push all userN in
    var possibleChoise = []; // array with all possible choise for each iteration

    // var-sentinel
    var gameOver; // return "true" if user-number is a bomb
    var isAlreadyTaken; // return "true" if user-number is already taken
    var userWinSentinel = false;

    do {
        // calculate remaining-choise
        possibleChoise = field.filter(x => !userNumbers.includes(x));
        // stamp
        console.log("Giocate disponibili: " + possibleChoise);

        // ask a number --> user-i-number
        userNumber = askNumber(1, fieldArray.length, "Inserisci un numero che compare fra le tue giocate disponibili!");

        // define the var-sentinel
        gameOver = bombsArray.includes(userNumber);
        isAlreadyTaken = userNumbers.includes(userNumber);

        // check and push (eventually)
        if (!gameOver && !isAlreadyTaken) {
            userNumbers.push(userNumber);
        }

        userWinSentinel = userWin(userNumbers, bombsArray, fieldArray);

        // if it's not game over and user does not win --> cycle again
    } while (!gameOver && !userWinSentinel);

    return userNumbers;
}

// USER WIN?? return "true" if points + bombs = field.length
function userWin(pointsArray, bombsArray, fieldArray) {
    var userWinControl = false;
    if (pointsArray.length + bombsArray.length == fieldArray.length) {
        userWinControl = true;
    }
    return userWinControl;
}
// </1-fold END --- ALL FUNCTION
