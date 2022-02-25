# Class 4 Notes

Here are some of the scripts that were used during class for reference:

### Object creation, methods and properties
```
// Create a String Object using the Constructor Method:
const new_string = new String('Hello');
const my_date = new Date();
// But we prefer using the literal method
const new_string = 'Hello';
```
Properties:
```
new_string.length;
new_array.length;
```

Methods:
```
new_string.toUpperCase();
new_array.sort();
string3.substring(start_position, end_position);	
```

### Built-in Object: Date
```
const the_date = new Date(); // actual stored value: 1550010843008
const the_date1 = new Date("31 January 2014");
```
Date Methods:
```
the_date.getDate()
the_date.getDay()
the_date.getFullYear()
the_date.toDateString()
the_date.toLocaleDateString('en-US')
```

### Custon Objects crestion
```
const person = {
  firstName: "John",
  lastName: "Parsons",
  citiesLived: ["New York", "Boston", "Vien"],
  ["Alias" + Math.random() + "Name"]: "Johnny",
  "Wealth": (return_amount > 10**6) ? true : false,
  sayHello() {
    console.log("My name is " + person.firstName + " " + person.lastName);
  }
};
```
Looping though all the items:
// using Object entries gives access to each key/value pair in a array of 2 items
for( const item of Object.entries( person ) ) {
    console.log( `${item[0]}'s value is ${item[1]}` );
}
// simpliying the above using destructuring that array 
for( const [ a, b ] of Object.entries( person ) ) {
    console.log( a + "'s value is " + b ); 
    console.log( `${a}'s value is ${b}` ); // same as above but cleaner using the template literal expression
}
```

Objects within Objects:
```
const family = {
  dad: { realName: "John Denver" },
  mom: { realName: "Katie McGraw" },
  son: { "full Name":  "Lawrence Holly" }
}
```

### Accessing and updating properties
```
// Accessing:
person.firstName;
// OR
person["firstName"];

// Updating:
person.firstName = "Abraham";
```

### Obects are created by reference, so copying wont work as expected:
```
const person = { 
  name: 'Thor',
  weapon: "Axe"
};
const clonePerson = person;
clonePerson.name = Sif;
person.name; // returns Sif, not Thor

// a way around by cloning:
const obj = {};
Object.assign(obj, person);
```
