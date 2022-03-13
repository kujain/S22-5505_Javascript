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
          // Make the HTML of our span to be the first and last name of our author
	  span.innerHTML = author.name.first + ' ' +author.name.last; 
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

### An example of embedded callbacks
```
let button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

function getUserData() {
  const url = 'https://randomuser.me/api/?results=1';
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
      if (xhr.status === 200) {
      const author = JSON.parse(xhr.responseText); // Getresults
      const name = author.results[0].id.name;
      const coords = author.results[0].location.coordinates;
      document.getElementById("Output").innerHTML = `${name} is located at ${coords.latitude} / ${coords.longitude} `;

      // check next call - this can only happen after the first request
      const xhr1 = new XMLHttpRequest();
      const url = 'http://api.open-notify.org/iss-now.json';
      xhr1.onload = function() {
        const iss = JSON.parse(xhr1.responseText);
        if (xhr1.status === 200) {
          document.getElementById("Output").innerHTML += `<br>ISS position is: ${iss.iss_position.latitude} / ${iss.iss_position.longitude}`;
          //calculate difference
          const dist = distance( coords.latitude, coords.longitude, iss.iss_position.latitude, iss.iss_position.longitude);
          document.getElementById("Output").innerHTML += `<br>Current distance between the two  is: ${dist} miles`;

        } else {
          document.getElementById("Output").innerHTML = "There was an error" + xhr1.error;
        }
      }
      xhr1.open('GET', url, true);
      xhr1.setRequestHeader("Accept", 'application/json');
      xhr1.send(null);

    } else {
      document.getElementById("Output").innerHTML = "There was an error" + xhr1.error;
    }
  }
  xhr.open('GET', url, true);
  xhr.send(null);
}
```

### Rwwork AJAX in a promise
```
function xhrRequest( url ) {
	return new Promise( function(resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					resolve(response);
			} else {
					const error = xhr.statusText || 'The reason is mysterious. Call Yoda!';
					reject(error);
			}
		}

	}
)};

let coords;
const button = document.getElementById('GetUsers');

button.addEventListener("click", function() {
	xhrRequest('https://randomuser.me/api/?results=1')
		.then(function(resp) {
			let name = resp.results[0].id.name;
			coords = resp.results[0].location.coordinates;
			document.getElementById("Output").innerHTML = `${name} is located at ${coords.latitude} / ${coords.longitude} `;
			return xhrRequest('http://api.open-notify.org/iss-now.json')
		})
		.then( function(resp) {
			let iss = resp.iss_position;
			document.getElementById("Output").innerHTML += `<br>ISS position is: ${iss.latitude} / ${iss.longitude}`;
			 let dist = distance( coords.latitude, coords.longitude, iss.latitude, iss.longitude);
			document.getElementById("Output").innerHTML += `<br>Current distance between the two  is: ${dist} miles`;
		})
		.catch(function(error){
				document.getElementById("Output").innerHTML = "There was an error in the api: " + error;
		});
});

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		let radlat1 = Math.PI * lat1/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = lon1-lon2;
		let radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
```

### Fetch GET
```
let button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

function getUserData() {
  let url = "https://reqres.in/api/users";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(resp) {
        console.log(resp);
        document.getElementById("Output").innerHTML = JSON.stringify(resp.data);
      })
      .catch(function(resp) {
        document.getElementById("Output").innerHTML = "There was an error";
      });
}
```

### Fetch POST
```
const form = document.getElementById('createUser')
form.addEventListener("submit", saveUserData);

function saveUserData(e) {
	e.preventDefault();

	const url = "https://reqres.in/api/users";
	const FD  = new FormData(form);
	FD.append("name",form.first_name.value + ' ' + form.last_name.value);
	let jsonObject = {};
	for (let pair  of FD.entries()) {
			jsonObject[pair[0]] = pair[1];
	}
	console.log(jsonObject);
	//console.log(req);
	fetch(url, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(jsonObject)
	})
		.then(function(response) {
				console.log(response.json());
				return response.json();
		})
		.then(function(data) {
				console.log('raw data',data);
				document.getElementById("Output").innerHTML = "Successfully created id: "+data.id;
		})
		.catch(function(error) {
				document.getElementById("Output").innerHTML = "Th1ere was an error "+error;
		});
}
```

### CLeaning up callback hell with Fetch
```
let button = document.getElementById('GetUsers');

button.addEventListener("click", getUserData);

function getUserData(e) {
  e.preventDefault();

  const url = "https://randomuser.me/api/?results=1";
  const url2 = "http://api.open-notify.org/iss-now.json";

  fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then( function(data) {
        console.log('raw data',data);
        document.getElementById("Output").innerHTML = JSON.stringify(data.results[0]);
        coords = data.results[0].location.coordinates;

       return fetch(url2);
    } )
    .then( function(response) {
        return response.json();
    })
    .then(function(resp) {
        console.log('raw data',resp);
        let iss = resp.iss_position;
        document.getElementById("Output").innerHTML += `<br>ISS position is: ${iss.latitude} / ${iss.longitude}`;
        let dist = distance( coords.latitude, coords.longitude, iss.latitude, iss.longitude);
        document.getElementById("Output").innerHTML += `<br>Current distance between the two  is: ${dist} miles`;
    })
    .catch(function(error) {
        document.getElementById("Output").innerHTML = "There was an error "+error;
    });
}
```

### Reworking the class exercise using Fetch
```
const button = document.getElementById('GetUsers');
button.addEventListener("click", getUserData);

function getUserData(e) {
  e.preventDefault();

  const url = 'https://randomuser.me/api/?results=10';
  const ul = document.createElement('ul');

  fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then( function(data) {
        console.log('raw data',data);

        let authors = data.results; // Getresults
        for (author of authors) { // loop through theresults
            console.log(author);
            let li = document.createElement('li'); //  Create theelements we need
            let img = document.createElement('img');
            let span = document.createElement('span');

            img.src = author.picture.medium;  // Add the source ofthe image to be the src of the img element
            span.innerHTML = author.name.first + ' ' +author.name.last; // Make the HTML of our span to be the firstand last name of our author
            li.appendChild(img); // Append img element back tocontaining li
            li.appendChild(span); // Append span element back tocontaining li
            ul.appendChild(li); // Append li element back tocontaining ul
            document.body.append(ul); //Append the new ul to body
        }

    } )
    .catch(function(error) {
        document.getElementById("Output").innerHTML = "There was an error "+error;
    });
}
```

### Using Async Await - flattens all calls within the same scope:
```

function xhrRequest( url ) {
	return new Promise( function(resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				 console.log(url);
				 const response = JSON.parse(xhr.responseText);
					resolve(response);
			} else {
					const error = xhr.statusText || 'The reason is mysterious. Call Yoda!';
					reject(error);
			}
		}

	}
)};

const button = document.getElementById('GetUsers');
button.addEventListener("click", processCall);

async function processCall() {
	// 1st step
	const first_resp = await xhrRequest('https://randomuser.me/api/?results=1');
	const name = first_resp.results[0].id.name;
	const coords = first_resp.results[0].location.coordinates;
	document.getElementById("Output").innerHTML = `${name} is located at ${coords.latitude} / ${coords.longitude} `;

	// 2nd step
	const second_resp = await xhrRequest('http://api.open-notify.org/iss-now.json');
	const iss = second_resp.iss_position;
	document.getElementById("Output").innerHTML += `<br>ISS position is: ${iss.latitude} / ${iss.longitude}`;
	const dist = distance( coords.latitude, coords.longitude, iss.latitude, iss.longitude);
	document.getElementById("Output").innerHTML += `<br>Current distance between the two  is: ${dist} miles`;
}
```

