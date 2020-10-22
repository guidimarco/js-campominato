
// <1-fold START --- VAR ASSIGNMENT
// 16-BOMBS
var bombs = [];
// FLOWERS
var n; // user-number
var flowers = [];

// </1-fold END --- VAR ASSIGNMENT

// <1-fold START --- 16-BOMBS

bombs = get16Bombs(1, 100);
console.log("Bombe: " + bombs);

// </1-fold END --- 16-BOMBS

// <1-fold START --- GAME ALGORITHM

// GAME ALGORITHM
do {
    n = askNumber(); // ask a number to the user

    // if (cond) PUSH INTO FLOWERS
    if (!gameOver(n, bombs) && !isFlower(n, flowers)) {
        // its not a bomb and its not a flower
        flowers.push(n);
    }
} while (!gameOver(n, bombs) && !userWin(bombs, flowers));

console.log("Fiori: " + flowers);

// FINAL OUTPUT
if (gameOver(n, bombs)) {
    console.log("Hai perso!");
    console.log("Hai totalizzato: " + flowers.length + " punti");
} else {
    console.log("Hai vinto!");
}

// </1-fold END --- GAME ALGORITHM

// <1-fold START --- ALL FUNCTION
// generate 16 numbers from 1 to 100
function get16Bombs(min, max) {
    var n; // number from min to max
    var numbers = []; // 16 numbers

    do {
        // GENERATE RANDOM NUMBER FROM MIN TO MAX
        n = Math.floor(Math.random() * (max - min) ) + min;

        // if it's not includes --> push in numbers
        if (!numbers.includes(n)) {
            numbers.push(n);
        }
    } while (numbers.length <= 16);
    numbers = numbers.sort(function(a, b){return a-b});
    return numbers;
}

// ask a number 1 to 100
function askNumber() {
    var userNumber;
    do {
        userNumber = parseInt(prompt("Inserisci un numero da 1 a 100"));
    } while (isNaN(userNumber) || userNumber < 1 || userNumber > 100);
    return userNumber;
}


// verify if number is includes into the array --> function for FLOWERS (already chosen)
function isFlower(number, array) {
    return array.includes(number);
}

// return "true" if user loose --> users choose a bomb
function gameOver(number, array) {
    return array.includes(number);
}

// return "true" if user-win: numbers of flower + number of bombs is 100
function userWin(array1, array2) {
    var sentinel = false; // default value
    if (array1.length + array2.length == 100) {
        sentinel = true;
    }
    return sentinel;
}

// </1-fold END --- ALL FUNCTION
