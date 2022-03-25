# Class 8 Notes

Here are some of the scripts that were used during class (use the updated HTML Boilerplate files from Class 7). Though most of the code is already in the PDF, I am reattaching them here:

### Create an object - literal approach
```
const john_object = {};
john_object.firstName = "John"; 
john_object.lastName = "Doe";

john_object.greet = function() {
  alert("My name is " + this.firstName + " " + this.lastName);
};

john_object.greet();
```

### Create an object - Constructor approach 1
```
createPerson(first_name, last_name) {
  const obj = {
    first_name: first_name,
    last_name: last_name, 
    getFullName: function() {
      return this.first_name + " " + this.last_name 
    },
    greet: function(person) {
      alert("Hello, " + person.getFullName() + ". I'm " + this.getFullName());
    } 
  };
  return obj;
}
const john_doe = createPerson("John", "Doe"); 
const jane_doe = createPerson("Jane", "Doe");
john_doe.greet(jane_doe);
```

### Create an object - Constructor approach 2
```
function Person(first_name, last_name) { 
    this.first_name = first_name; 
    this.last_name = last_name;
    this.getFullName = function() {
      return this.first_name + " " + this.last_name ;
    }
    this.greet = function(person) {
      console.log("Hello, " + this.getFullName() + ". I'm " + this.getFullName());
  	}
}

const john_doe = new Person("John", "Doe"); 
const jane_doe = new Person("Hannah", "Doe"); 
jane_doe.greet();
john_doe.getFullName();
john_doe.greet();
```

### Create an object - Prototype Pattern
```
// add properties to constructor function
function Person(first_name, last_name) { 
  this.first_name = first_name; 
  this.last_name = last_name;
}

// add methods to protptype
Person.prototype.getFullName = function() {
  return this.first_name + " " + this.last_name ;
};
Person.prototype.greet = function(person) {
  alert("Hello, " + this.getFullName() + ". I'm " + this.getFullName());
};

const john_doe = new Person("John", "Doe"); 
const jane_doe = new Person("Jane", "Doe");
```

### Prototype is Live
```
Person.prototype.sayHi = function(person) {
  alert("Hello, " + this.getFullName());
};

jane_doe.sayHi();
john_doe.sayHi();

```

### Inheritance and extending objects through Prototype 
```
function Person(first_name, last_name) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.sayHi = function() {
    return console.log("Hi, " + this.getFullName());
  };
}

Person.prototype.getFullName = function() {
  return this.first_name + " " + this.last_name ;
};
Person.prototype.greet = function(person) {
  console.log("Hello, " + this.getFullName() + ". I'm " + this.getFullName());
};

function Student(status, first_name, last_name) {
    Person.call(this, first_name, last_name)
    this.status = status;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.getState = function() {
     console.log("Student " + this.first_name + "'s status is " + this.status);
};

const student1 = new Student( "Genius", "Stephen", "Hawkins" );
student1.getState();
student1.getFullName();

```

### Javascript OOP Standardized in ES6
```
class Person {
    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;

    }
    greet() {
        console.log( "Hi, my name is " + this.getName() );
    }
    getFullName() {
     	console.log( `${this.first_name} ${this.last_name}` );
    }
}

const me = new Person('bill', 'bryson');
me.getFullName();
me.greet();

```

### Javascript OOP - Extending and Inheritance in ES6
```
class Student extends Person {
    constructor(status, first_name, last_name ) {
		  super(first_name, last_name);            
      this.status = status;
    }
    getState() {
      console.log("Student " + this.first_name + "'s status is " + this.status);
    }
}

const student1 = new Student("Genius", "Stephen", "Hawkins");
student1.getState();
student1.getFullName();

```

### Modifying built in Objects through prototype
```
Number.prototype.isEven = function() {
  return this%2 === 0;
}
Number.prototype.isOdd = function() {
  return this%2 === 1;
}

Array.prototype.first = function() {
   return this[0];
}
Array.prototype.last = function() {
  return this[this.length -1];
}

```


### ERRORS
```
console.log("This is code inside the try clause");
const xx = x + 2;
console.log("Moving on...");
```

### Using try...catch
```
try {
  console.log("This is code inside the try clause");
  const xx = x + 2;
} catch (exception) {
  console.log(exception);
  console.log("The error is " + exception.message);
}
console.log("Moving on...");
```

### Converting the Ajax code to use OOP
```
const button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

// main process
function getUserData() {
    let url = "https://randomuser.me/api/?results=10";
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(resp) {
            document.getElementById("Output").innerHTML = JSON.stringify(resp.results);
            buildUserData( resp.results );
        })
        .catch(function(error) {
            document.getElementById("Output").innerHTML = "There was an error "+error;
        });
}

// handlers
function buildUserData(data) {
  for( item of data ) {
    const person = new Person(item);
    const p_el = document.createElement('p');
    p_el.innerHTML = person.render();
    document.body.appendChild(p_el);
  }
}

// Person model
Person = function(item) {
  this.first_name = item.name.first;
  this.last_name = item.name.last;
  this.image = item.picture.thumbnail;
  this.getName = function() {
    return this.first_name + " " + this.last_name;
  }
  this.getPicture = function() {
    return this.image;
  }
  this.render = function() {
    return `<a href=""><img src="${this.getPicture()}" /><br>${this.getName()}</a><br>`;
  }
}
```
