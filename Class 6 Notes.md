# Class 6 Notes

Here are some of the scripts that were used during class (use the updated HTML Boilerplate files from Class 6 to work with these):

### Accessing form node in different ways
```
const form = document.getElementsByTagName('form')[0];

const form = document.getElementById('searchForm');

const form = document.querySelector('form#searchForm');

const form = document.forms["search"];

const form = document.forms.search;
```

### Accessing form input nodes in different ways
```
const inp = document.getElementsByName("searchBox");

const inp = document.getElementById('SearchBox');

const inp = form.elements[0];

const inp = form.elements.searchBox;

const inp = form["searchBox"];
```

### Methods
```
form.submit(); //submits the form
form.reset(); //resets all input data
inp.focus(); // focuses the cursor on that field
```

### Basic event listeners
```
addEventListener( 'focus', function() { 
  console.log( "focused on", this.name );
});


inp.addEventListener( 'blur', function() { 
  console.log( "leaving", this.name );
} );

inp.addEventListener( 'change', function() { 
  console.log( "leaving after changing", this.name ) 
} );

form.addEventListener('submit', function(ev){
  ev.preventDefault();
  console.log("submitting form", this.name);
});
```

### Getting Form data
```
// text field
let inp = form.elements.searchBox.value;

// Password field values:
let input_pass = form.elements.SearchPass.value;

// Checkbox values:
let input_area = form.elements.searchArea;
const form_area_vals = [];
for (i=0; i < input_area.length; i++) {
  if (input_area[i].checked) {
    form_area_vals.push(input_area[i].value);
}};

// alternative for Checkbox
const form_area_vals = Array.from(input_area)
  .filter(function(input_area) { 
  		return input_area.checked
  })
  .map( function(item) { 
    return item.value
  });

// Radio button values:
let input_scope = form.elements.searchScope.value;

// Dropdown values:
let input_type = form.elements.searchType.value;

```

### Validation example
```
// validation example...make class do this.
form.addEventListener("submit", validate);
function validate(e) {
  const inp = form.elements.searchBox.value;
  if (inp === "Enter your search term here") {
      e.preventDefault();
      alert("Your search term cannot be empty!");
  }
}
```

### Nicer validation example
```
form.addEventListener('submit', function(ev){
    ev.preventDefault();
    console.log("submitting form", this.name);

    const inp = document.getElementById('SearchBox');

    if (inp.value == '') {
        // alert('Search box cannot be empty');
        const err = document.createElement('p');
        err.classList.add('error');
        err.innerHTML = 'Search term cannot be empty';
        form.insertBefore(err, inp.nextSibling );
        inp.focus();
    }

    let input_type = form.elements.searchType;
    if (input_type.value == '') {
        err.classList.add('error');
        err.innerHTML = 'Search term cannot be empty';
        form.insertBefore(err, input_type.nextSibling );
        input_type.focus();
    }

    // etc. etc.

});
```
