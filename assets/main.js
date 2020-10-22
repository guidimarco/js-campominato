
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

// <1-fold START --- FLOWERS GENERATOR (with prompt)
n = askNumber();
console.log("Numero utente: " + n);




// </1-fold END --- FLOWERS GENERATOR

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
        userNumber = prompt("Inserisci un numero da 1 a 100")
    } while (isNaN(userNumber) || userNumber < 1 || userNumber > 100);
    return userNumber;
}

// </1-fold END --- ALL FUNCTION
