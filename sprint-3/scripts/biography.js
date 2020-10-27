// constant variable to select div with class "comments__cards"
const comments = document.querySelector('.comments__cards'); 

// constant variable to select form element with class "form"
const form = document.querySelector('.form'); 

const deleteComment = (el, id) => {
	axios.delete('https://project-1-api.herokuapp.com/comments/#{id}?api_key=' + apiKey)
	.then(response => {
		console.log(`DELETE: user is removed`, id);
		// remove elem from DOM
		el.remove();
	})
	.catch(error => console.error(error));
};


// 
const header = {
	'Content-Type': 'application/json'
};

// anonymous function to retrieve an api key and store it in a variable 
const getApiKey = () => {
	axios.get('https://project-1-api.herokuapp.com/register')
	.then(response => {
		return response.data.api_key;		
	})
};

// contains the returned value of the invoked anonymous promise function
const apiKey = getApiKey();

// retrieves the comment objects array and then renders the objects to the browser
const renderComments = () => {
	axios.get('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey)
	.then(response => {
		console.log(response.data);
		return response.data;
	})	
	.then(comments => {
		comments.forEach(object => displayComments(object));
		const button = document.querySelector('.card');
		console.log(button);
		button.onclick = (e) => {
			e.stopPropagation();
			deleteComment(e, e.target.id);
		}
	});
};

// renders comments when page loads
renderComments();

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// function that deals with the form submission generated event object
function formHandler(e) {
	// declares new comment object
	const newComment = {}; 

    // prevents page reload upon submission
    e.preventDefault(); 

    // creates name object key and sets it to the given value of the input element
    newComment.name = e.target.userName.value; 

    // creates comment object key and sets it to the given value of the textarea element
    newComment.comment = e.target.userComment.value; 

    // clear input field
    document.getElementById('name').value = '';

    // clear comment textarea 
    document.getElementById('comment').value = ''; 

    // clear comments list
	comments.innerHTML = '';

	// post new comment object to server
	axios.post('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey, newComment, header)
	.then( (response) => {
		console.log(response);
	renderComments();
	});
};

// function that creates comment section cards
function displayComments (comment) {
    
	// create Card
	const cardEl = document.createElement('div');
	cardEl.classList.add('card');
	cardEl.setAttribute('id', comment.id);
	comments.prepend(cardEl);

	// create Card Image
	const imageEl = document.createElement('div');
	imageEl.classList.add('card__image');
	cardEl.appendChild(imageEl);

	// create Card Body
	const bodyEl = document.createElement('div');
	bodyEl.classList.add('card__body');
	cardEl.appendChild(bodyEl);

	// create Card Header
	const headerEl = document.createElement('div');
	headerEl.classList.add('card__heading');
	bodyEl.appendChild(headerEl);

	// create Card Comment
	const paragraphEl = document.createElement('p');
	paragraphEl.classList.add('card__text');
	paragraphEl.innerText = comment.comment;
	bodyEl.appendChild(paragraphEl);

	// create Card Name
	const nameEl = document.createElement('h2');
	nameEl.classList.add('card__text-title');
	nameEl.innerText = comment.name;
	headerEl.appendChild(nameEl);

	// create Card Date
	const dateEl = document.createElement('h5');
	dateEl.classList.add('card__label');
	dateEl.innerText = convertTime(comment.timestamp);
	headerEl.appendChild(dateEl);

	 // create Card Button
	 const buttonEl = document.createElement('button');
	 buttonEl.classList.add('button');
	 buttonEl.setAttribute('type', 'button');
	 buttonEl.innerText = 'DELETE';
	 cardEl.appendChild(buttonEl);
};

// returns a string stating how long since the comment was first submitted
function convertTime(timestamp) {
  // variable with the current time in milliseconds since the epoch
  const currentTime = new Date().getTime();
  // variable with the difference
  const time = (currentTime - timestamp)/1000;

  // checks if total milliseconds are greater than the equivalent of at least 1 year
  if ((time/31536000) > 1) {
    return Math.floor(time/31536000) + " years ago";
  
    // checks if total milliseconds are greater than the equivalent of at least 1 month
  } else if ((time/2592000) > 1) {
    return Math.floor(time/2592000) + " months ago";
  
    // checks if total milliseconds are greater than the equivalent of at least 1 day
  } else if ((time/86400) > 1) {
    return Math.floor(time/86400) + " days ago";
  
    // checks if total milliseconds are greater than the equivalent of at least 1 hour
  } else if ((time/3600) > 1) {
    return Math.floor(time/3600) + " hours ago";
  
    // checks if total milliseconds are greater than the equivalent of at least 60 minutes
  } else if ((time/60) > 1) {
    return Math.floor(time/60) + " minutes ago";
  
  } else {
    // returns string with time rounded to the nearest second
  return Math.floor(time) + " seconds ago";
  }
};