// DOM elements
var generateEl = document.querySelector("#generate");
var resultEl = document.getElementById('password');

// Object of generator functions
var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// Generator functions

// Get random lower case letter for password
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// Get random upper case letter for password
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// Get random number for password
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
// Get random special character for password
function getRandomSymbol() {
  var symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~"
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  var length = +length;
  var generatedPassword = '';
  var typesCount = lower + upper + number + symbol;

  // Create array of types with keys from randomFunc object. Then filter out unwanted types to generate password
  var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (
      item => Object.values(item)[0]
    );

  // Check if no types selected and return empty string
  if (typesCount === 0) {
    return '';
  }

  // Loop over length and call generator function for each type
  for (var i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      // get keys of randomFun object
      var funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  // Add final password to password variable, slice by length of types to return correct length
  var finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Event listener to generate button
generateEl.addEventListener('click', () => {

  // Get user input for desired length of password
  var wantLength = prompt("How long would you like you password to be? Please select between 8 and 128 characters.");
  // Validate that the length is a number and is between 8 and 128
  if (isNaN(wantLength) || wantLength < 8 || wantLength > 128) {
    alert("You must input a number must be between 8 and 128.");
    return;
  }

  // Get user input for types of characters desired for password
  var wantLower = confirm("Would you like any lower case letters?");
  var wantUpper = confirm("Would you like any upper case letters?");
  var wantNumber = confirm("Would you like any numbers?");
  var wantSymbol = confirm("Would you like any special characters?");

  //if values are null send alert
  if (!wantLower && !wantUpper && !wantNumber && !wantSymbol) {
    alert("You must choose at least one type of character.")
  }

  // Function to take user input and pass to result element (password text box)
  resultEl.innerText = generatePassword(wantLower, wantUpper, wantNumber, wantSymbol, wantLength);
});
