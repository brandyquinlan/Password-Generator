// Assignment Code
var generateBtn = document.querySelector("#generate");
var resultEl = document.getElementById('password');


var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}


//console.log(randomFunc);


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
  var symbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  return symbols[Math.floor(Math.random() * symbols.length)];
}


//Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  var length = +length;
  var generatedPassword = '';
  var typesCount = lower + upper + number + symbol;

  //console.log(typesCount);

  // filter out unwanted types
  var typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  //console.log(typesArr);

	// Doesn't have a selected type
	if (typesCount === 0) {
		return '';
	}

	// create a loop
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
      var funcName = Object.keys(type)[0];

      //console.log(funcName);

      generatedPassword += randomFunc[funcName]();


    });
    //console.log(generatedPassword);
	}

  var finalPassword = generatedPassword.slice(0, length);

  //console.log(finalPassword);

	return finalPassword;
}



// Add event listener to generate button
generateBtn.addEventListener('click', () => {
  var wantLength = prompt("How long would you like you password to be? Please select between 8 and 128 characters.");
  if (wantLength < 8 || wantLength > 128){
    alert("Number must be between 8 and 128.");
  }
  else {
  var wantLower = confirm("Would you like any lower case letters?");
  var wantUpper = confirm("Would you like any upper case letters?");
  var wantNumber = confirm("Would you like any numbers?");
  var wantSymbol = confirm("Would you like any special characters?");
  }
  //console.log(wantLower, wantUpper, wantNumber, wantSymbol, wantLength);

  resultEl.innerText = generatePassword(wantLower, wantUpper, wantNumber, wantSymbol, wantLength);
  //resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
/*
  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");


    passwordText.value = password;

  }
  */
