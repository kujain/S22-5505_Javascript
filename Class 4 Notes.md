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
```
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

### Using objects as function params to provide better flexibility and cleanliness
```
// traditional approach
function greet(weapon, name ) {
  return `My name is ${name} and I wield the ${weapon}`;
}

greet( "hulk", "fist");

// using object approach
function greet( person_param ) {
  return `My name is ${person_param.name} and I wield the ${person_param.weapon}`;
}

greet( { weapon: "fist" , name: "hulk", } );
```

### Creating new objects by using templates -> Constructors:
```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.greet = function () {
        console.log("I am a " + this.make + " " + this.model);
    }
}
const car1 = new Car('Nissan', '300ZX', 1992);
const car2 = new Car('Mazda', 'Miata', 1990);
car1.greet();
car2.greet();
```

### Creating new objects by using templates -> Constructors (alternative but more tedious):
```
function createPerson(firstName, lastName) {
  const obj = {
    firstName: first_name,
    lastName: lastName,
    getFullName: function() {
      return this.firstName + " " + this.lastName
    },
    greet: function(person) {
      console.log("Hello, I'm " + this.getFullName());
    }
  };
  return obj;
}

const person1 = createPerson("John", "Parsons");
const person2 = createPerson("Jane", "Wright");
person1.greet();
```

### Creating new objects by using class -> the modern semantic standard ES6 approach:
```
class Person {
  constructor(firstName = "", lastName = "") {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getFullName() { 
    return this.firstName + " " + this.lastName
  }
};

//create a new Person
const person1 = new Person('Bentley', 'VW');
const person2 = new Person('Range Rover', 'Tata');
person1.getFullName();
person2.getFullName();
```


