
// <1-fold START --- MINEFIELD

// #2-fold START --- VAR ASSIGNMENT
// LEVEL: difficult level from 0 to 2
var level;

// FIELD
var fieldDimension; // level 0 ==> 100 to level 2 ==> 50
var field = []; // all possible user-choise

// BOMBS
var bombs = []; // 16-bombs from 1 to fieldDimension

// POINT
var userN; // user-number
var points = []; // all the no-bombs user choise
var possibleChoise = []; // array difference: field[] - points[] --> are the user-remain-choise

// #/2-fold END --- VAR ASSIGNMENT

// #2-fold START --- LEVEL
level = askNumber(0, 2, "Inserisci il livello da 0 (facile) a 2 (difficile)");
// #/2-fold END --- LEVEL

// #2-fold START --- FIELD
// FIELD-DIMENSION: from level 0 (fieldDimension --> 100) to level 2 (fieldDimension --> 50)
if (level == 0) {
    fieldDimension = 100;
} else if (level == 1) {
    fieldDimension = 80;
} else {
    fieldDimension = 50;
}

// FIELD-GENERATOR: create all field-single-unit
field = generateField(fieldDimension);

// stamp
console.log("Livello: " + level + ", campo composto da: " + fieldDimension + " unità");
console.log("Field: " + field);

// #/2-fold END --- FIELD

// #2-fold START --- RANDOM-BOMBS
// BOMBS-GENERATOR: generate 16 bombs from 1 to max (fieldDimension)
bombs = getBombs(16, fieldDimension);

// stamp
console.log("Bombe: " + bombs);

// #/2-fold END --- RANDOM-BOMBS

// #2-fold START --- GAME!!!
// GAME CYCLE: ask a number and verify
do {
    // calculate remaining-choise
    possibleChoise = field.filter(x => !points.includes(x));
    // stamp
    console.log("Giocate disponibili: " + possibleChoise);

    // ask a number
    userN = askNumber(1, fieldDimension, "Inserisci un numero che compare fra le tue giocate disponibili!");

    // check and push (eventually)
    if (!gameOver(userN, bombs) && !isAlreadyTaken(userN, points)) {
        points.push(userN);
    }

    // if it's not game over and user does not win --> cycle again
} while (!gameOver(userN, bombs) && !userWin(bombs, points, fieldDimension));

// END GAME --> STAMP
if (userWin(bombs, points, fieldDimension)) {
    console.log("Congratulazioni, hai vinto!");
} else {
    console.log("Hai perso, punti fatti: " + points.length);
}


// #/2-fold END --- GAME!!!

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
function generateField(max) { // max is a number
    var array = [];
    for (var i = 1; i <= max; i++) {
        array.push(i);
    }
    return array;
}

// GENERATE BOMBS: generate n numbers from 1 to max
function getBombs(n, max) {
    var number; // number from 1 to max
    var numbers = []; // random-numbers

    do {
        // GENERATE RANDOM NUMBER FROM 1 TO MAX
        number = Math.floor(Math.random() * max) + 1;

        // if it's not includes --> push in numbers
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    } while (numbers.length < n);
    numbers = numbers.sort(function(a, b){return a-b});
    return numbers;
}

// return "true" if user loose --> users choose a bomb
function gameOver(number, array) {
    return array.includes(number);
}

// return "true" if user choose a taken-number
function isAlreadyTaken(number, array) {
    return array.includes(number);
}

// return "true" if user-win: numbers of point + number of bombs is fieldDimension
function userWin(array1, array2, max) {
    var sentinel = false; // default value
    if (array1.length + array2.length == max) {
        sentinel = true;
    }
    return sentinel;
}

// </1-fold END --- ALL FUNCTION
