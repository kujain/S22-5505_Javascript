// Triangle code
let number = 1;
while ( number <= 10 ) {
	// let offset = 10 - number;
	// console.log(' '.repeat(offset) +  '#'.repeat(number));
	console.log( '#'.repeat(number) );
	number++;
}

// convert to a function
function makeTriangle() {
	let number = 1;
	while (number <= 10) {
		console.log( '#'.repeat(number));
		number++;
	}
}

makeTriangle();


// another simple example
let converted_deg;
for (let i=-148; i<=212;i=i+10) {
		converted_deg = (i-32) * 5/9;
		// converted_deg = converted_deg.toFixed(2);
		console.log('The converted temperature of',i,' is', converted_deg);
}

// a new basic function - better
function convertToCelsius(deg_fah) {
	let converted_deg = (deg_fah-32) * 5/9;
	return(converted_deg);
}

let converted_deg;
for (let i=-148; i<=212;i=i+10) {
		converted_deg = convertToCelsius(i);
		// converted_deg = converted_deg.toFixed(2);
		console.log('The converted temperature of',i,' is', converted_deg);
}


// multiple parameters and arguments
let converted_deg;
for (let i=-148; i<=212;i=i+10) {
		converted_deg = convertToCelsius(i,2);
		console.log('The converted temperature of',i,' is', converted_deg);
}

function convertToCelsius(deg_fah,dec_fixed) {
	let converted_deg = (deg_fah-32) * 5/9;
	converted_deg = converted_deg.toFixed(dec_fixed)
	console.log(converted_deg);
	return(converted_deg);
}

// default params new approach
function convertToCelsius(deg_fah = 32) {
	// if (deg_fah === undefined)  deg_fah = 32; // older
	// or deg_fah = deg_fah || 32; // older
	let converted_deg = (deg_fah-32) * 5/9; // new
	return(converted_deg);
}

console.log( convertToCelsius() );
console.log( convertToCelsius(23) );


// function expressions
console.log(convertToCelsius(12)); // error
const convertToCelsius = function templateFunction(deg_fah) {
	let converted_deg = (deg_fah-32) * 5/9;
	return converted_deg;
};
console.log(convertToCelsius(2)); // works

//-- hoisted:
console.log(convertToCelsius(12)); // works
function convertToCelsius(deg_fah) {
	let converted_deg = (deg_fah-32) * 5/9;
	return converted_deg;
};
console.log(convertToCelsius(2)); // works


// callbacks
// you can pass function as a parameter
const convertToCelsius =  function(deg_fah, callback) {
	let converted_deg = (deg_fah-32) * 5/9;
	callback(converted_deg);
};
const displayInConsole = function(value) {
	console.log('The converted temperature is: ', value);
}
const displayInModal = function(value) {
	alert('The converted temperature is: ' + value);
}

//pass function only as var without () as its a reference to the function which is then called inside
convertToCelsius(23,displayInConsole);
convertToCelsius(23,displayInModal);

//without callback:
const convertToCelsius =  function(deg_fah) {
	let converted_deg = (deg_fah-32) * 5/9;
	return (converted_deg);
};
let cel = convertToCelsius(23);
displayInConsole(cel);
displayInModal(cel);


// array iterator example

const my_array =  ["blue", "red", "green"];

// convert to uppercase without iterator
const new_ar = [];
for ( let pos of my_array) {
     new_ar.push( pos.toUpperCase() );
}
console.log(new_ar);

// convert to uppercase with map() iterator
const new_ar = my_array.map( callbackFunction );
function callbackFunction(pos) {
    return pos.toUpperCase();
}
console.log(new_ar);

//OR - more compact
const new_ar = my_array.map( function(val) {
        return p.toUpperCase();
    }
);
console.log(new_ar);

//OR - even more compact
const new_ar = my_array.map( val => val.toUpperCase() );
console.log(new_ar);
