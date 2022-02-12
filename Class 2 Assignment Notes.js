/* 1. Define a number variable (can be random). 
 * Then create a condition to check if that variable  is odd or even.  
 */

let n = Math.floor(12 * Math.random());
if (n%2 ) {
  console.log(n + " is an odd number");
} else {
  console.log(n + " is an even number");
}

/* 2. Conditions/Random:
 * Use the below rolling dice generator to create a random number between 1 and 6. 
 * Then write a condition to check that number and do something for each check eg. return the value back to console using console.log(...). 
 * Consider using the switch operator for it. 
 */

let rolled = Math.ceil( Math.random() * 6 );
console.log(rolled);
switch (rolled) {
  case (1):
  case (2):
  case (3):
  case (4):
    console.log("You rolled a number less than four");
    break;
  case (5):
    console.log("You rolled perfect middle five");
    break;
  case (6):
    console.log("You rolled the max six");
    break;
  default:
    console.log("You rolled a number less than four");
    break;
}

/* 3. Loops:
* Use the same random dice generator as above to generate a number between 1 and 6. 
* Now create a loop that keep rolling until the number generated is more than 3. 
* As soon as you get a number more than three, the loop should end. Output how many times the loop ran before it reached this number. 
* Be careful with this - if you create a loop that has no way to end (due to a faulty check), it will easily crash your browser! 
 */

let low_roll = true;
let count = 0;
while (low_roll === true) {
  count++;
  let rolled = Math.ceil( Math.random() * 6 );
  console.log(rolled);
  if ( rolled > 3 ) {
    console.log('Congrats - you got a number more than 3 in '+count+' tries!');
    low_roll = false;
  } else {
    console.log('Sorry...trying again!');
  }
}


/* 4.  Loops:
 * Find the factorial  of any number using loops. Start with a number (random or fixed) and find its factorial. 
 * A factorial is a number you get by multiplying all the numbers preceding it, 
 * starting with 1 eg. factorial of 5 is 1  * 2 * 3 * 4 * 5 = 1204. 
 */

let num = 10;
let result = 1;

for (let i=1; i <= num; i++) {
  result = result * i;
}
console.log(result);

// using recursive
let num = 10;
function fact(num) {
  if (num > 0) {
    return num * fact(num-1);
  } else {
    return 1;
  }
}
console.log('factorial of ' + num + ' is: ',fact(5));


/* 5. Loops
 * Using loops , create a triangular pattern (using console.log) like this:
 * #
 * ##
 * ###
 * ####
 */

let number = 1;
while (number <= 10) {
  let offset = 10 - number
  console.log(' '.repeat(offset) +  '#'.repeat(number));
  number++;
}


/* 6. Loops and Conditions:
 * Using more loops and conditions, create a chess board using # and space ' '.  
 * You could try using loops inside a loop to create the alternative pattern. 
 * A chess board  has  8 x 8 = 64 squares. 
 */

for (let y=0; y<8; y++) {
var board = '';
  for (let x=0; x <8; x++) {
    if ( (x+y)%2 ) {
      board += '#';
    } else {
      board += '_';
    }
  }
  console.log(board);
}








