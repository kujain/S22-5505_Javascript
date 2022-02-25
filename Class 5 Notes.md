# Class 5 Notes

Here are some of the scripts that I used during class, many of which were typed in the console area. Please note that this requires the updated HTML Boilerplate files to work properly):

### Access elements by ID attribute.
```
const title = document.getElementById('title');				// returns node object
```

### Access elements by tagnames.
```
let spans = document.getElementsByTagName( 'span' ); // returns node list/collection
// loop through all
for (let i = 0; i < spans.length; i++) {
  let item = spans[i];
  console.log( item.nodeType );
}
```

A more modern and cleaner way to loop:
```let spans = document.getElementsByTagName( 'span' );
// loop through all
for (let el of spans) {
  console.log( el.nodeType );
}
```

### Using query selectors - note the difference between the selectors last-child and last-of-type
```
//CSS3 selectors work on IE9+ only so we should be fine since no sane person should be using anything older!
const spans = document.querySelector('.primary_table td');	// all tds in table of class primary_table
const last_span = document.querySelector( 'span:last-child' ); 
const last_span = document.querySelector( 'span:last-of-type' ); 

// document.querySelectorAll - similar to how jquery works - no jquery should now be declared dead!
const sp = document.querySelectorAll( 'span' );
sp.forEach( function( e ) { // another way to loop through arraylist and change its elements
  e.style.color ='red';
} );
```

### Modifying text content 
```
const new_para = document.createElement('p');
new_para.textContent = "This is the end.";

//alt - using template literals
new_para.textContent = `This is the "end".
                        Thanks for watching.`;

// Or simply use innerHTML to include actual html markup in the text!
const h1 = document.getElementsByTagName('h1')[0];
h1.innerHTML = "New Title"; 
h1.innerHTML = "Welcome to my <b>Page</b> Now";
```

### Inserting new nodes at different points
```
const new_para = document.createElement('p');
new_para.textContent = "This is the end.";

// insert inside the first h1 tag
hh = document.getElementsByTagName('h1')[0];
hh.appendChild(new_para)

// insert/move inside the first span tag
hh = document.getElementsByTagName('span')[0];
hh.appendChild(new_para);
```

### Event listening the old way
```
<a href="http://parsons.edu" onclick="alert('gotcha'); return false;"><strong>Thanks</strong> for reading!</a>
```
OR
```
var an = document.getElementsByTagName('a')[0];
an.onclick = function() { // better but limited
  alert(hello);
  return false;
};
```

### Event listening the new way - allows multiple event listeners for the same event on the same element
```
const an = document.getElementsByTagName('a')[0];
an.addEventListener("click", callback_function );

function callback_function() {
   alert('xx');
}
```

Simplify using anonymous callback function in one expression
```an.addEventListener("click", function() {
   alert('xx');
} );
```

Keypress example and the event object
```document.addEventListener("keypress", function(e) {
  console.log(e);
});
```

Mouse hover example - toggles the css class
```
const an = document.getElementsByTagName('a')[0];
an.addEventListener("mouseover", highlight);
an.addEventListener("mouseout", highlight);

function highlight(event){
  event.target.classList.toggle("highlight");
}
```

### Prevent default anchor behaviour
```
const an = document.getElementsByTagName('a')[1];
an.addEventListener("click",function(e){
  console.log("click");
  e.preventDefault();
});
```

### Propagation example
```
const an = document.getElementsByTagName('a')[0];
const para = an.parentNode;

an.addEventListener("click", function(e){
  console.log('clicked on: a',e);
  e.preventDefault();
  //e.stopPropagation(); - this will stop the propogation to the para listener coded below
});
para.addEventListener("click", function(e){
  console.log('clicked on: p',e);
  e.preventDefault();
});
```

### Delegation example
```
const ul = document.getElementsByTagName('ul')[0];
function highlight(event){
  event.target.classList.toggle("highlight");
}
ul.addEventListener('click', highlight);
```


## Class 4 Objects Exercise Solution 
Simple solution for the class 4 assignment - enhance it further by adding smarter text checks, pattern matches, case insensitivity etc.:
```
const Ai = {

  data: [
     {q: "how are you", a: "getting better"},
     {q: "what is your name", a: "HAL"},
     {q: "why are you here", a: "sorry...that question needs pondering"}
    ],

  checkAnswer(q) {
    // logic
    for (let set of this.data) {
      console.log('current question set', set, q);

      if (set.q === q) {
        return set.a;
      }
    }

  }
}

let question = "what is your name";
let ans = Ai.checkAnswer(question);
console.log( ans );

// slightly more interactive
let real_question = prompt('Ask your question');
let real_ans      = Ai.checkAnswer(real_question);
console.log( real_ans );
```
