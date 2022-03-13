# Class 7 Notes

Here are some of the scripts that were used during class (use the updated HTML Boilerplate files from Class 7 to work with these):

### Blocking Sync Code
```
while( 1 ) {
	console.log('a');
} //CAREFUL - DO NOT RUN THIS!!
```
### Non-blocking Async Code
```
console.log('start');

setTimeout( function() {
  console.log('it is now 3 secs later');
  }, 3000);
console.log('end?');
```

### Async behaviour - 3 will print before 2 and 4.
```
console.log("1");
setTimeout(function(){console.log("2");},3000);

console.log("3");
setTimeout(function(){console.log("4");},1000);
```

### Ajax testing with https://reqres.in/ and XMLHttpRequest()
```
let button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

function getUserData() {
	let url = "https://reqres.in/api/users";
	let xhr = new XMLHttpRequest();
	xhr.onerror = function() {
		document.getElementById("Output").innerHTML = "There was an error";
	}

	xhr.onprogress = function(event) {
		console.log(event);
		document.getElementById("Output").innerHTML = "In progress";
	}

	xhr.onload = function() {
		if (xhr.status === 200) {
				let authors = JSON.parse(xhr.responseText); // Getresults
				for (key in authors.results) { // loop through theresults
						let author = authors.results[key]; //assign current row to author var
						console.log(author);
				}
		} else {
			document.getElementById("Output").innerHTML = "There was an error";
		}
	}

	xhr.open("GET", url, true);
	xhr.send();
	console.log(xhr);
}
```

###  Sending data using XMLHttpRequest()
```
const form = document.getElementById('createUser')

form.addEventListener("submit", saveUserData);

function saveUserData(e) {
	e.preventDefault();

	let url = "https://reqres.in/api/users";

	let xhr = new XMLHttpRequest();
	let user = {}; // create an empty object
	user.name = form.first_name.value + ' ' + form.last_name.value;
	console.log(user, JSON.stringify(user));

	xhr.onload = function() {
		if (xhr.status === 200  || xhr.status === 201) {
				let resp = JSON.parse(xhr.response);
				document.getElementById("Output").innerHTML = "Successfully created id: "+resp.id;
		} else {
				document.getElementById("Output").innerHTML = "There was an error";
		}
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(user));
	console.log(xhr);
}
```

### Using formData to send data
```
const form = document.getElementById('createUser')
form.addEventListener("submit", saveUserData);

function saveUserData(e) {
	e.preventDefault();

	let url = "https://reqres.in/api/users";

	let xhr = new XMLHttpRequest();
	
  const FD  = new FormData(form);
	FD.append("name",form.first_name.value + ' ' + form.last_name.value);
	let jsonObject = {};
	for (let pair  of FD.entries()) {
			jsonObject[pair[0]] = pair[1];
	}

	xhr.onload = function() {
		if (xhr.status === 200  || xhr.status === 201) {
				let resp = JSON.parse(xhr.response);
				document.getElementById("Output").innerHTML = "Successfully created id: "+resp.id;
		} else {
				document.getElementById("Output").innerHTML = "There was an error";
		}
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(jsonObject));
	console.log(xhr);
}
```

### Class exercise: use above to get data from reqres and then format in the DOM.
```
let button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

function getUserData() {
    const ul = document.createElement('ul');
    const url = 'https://randomuser.me/api/?results=10';
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200  || xhr.status === 201) {
        let authors = JSON.parse(xhr.responseText); // Get results
        for (key in authors.results) { // loop through the results
          let author = authors.results[key]; //assign current row to author var
          let li = document.createElement('li'), //  Create the elements we need
              img = document.createElement('img'),
              span = document.createElement('span');
          img.src = author.picture.medium;  // Add the source of the image to be the src of the img element
          span.innerHTML = author.name.first + ' ' +author.name.last; // Make the HTML of our span to be the first and last name of our author
          li.appendChild(img); // Append img element back tocontaining li
          li.appendChild(span); // Append span element back tocontaining li
          ul.appendChild(li); // Append li element back tocontaining ul
        }
        document.body.append(ul); //Append the new ul to body
      }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}
```

