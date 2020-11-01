// Method GET used to retrieve api key from object returned in response from /register route
// const getApiKey = () => {
// 	axios.get('https://project-1-api.herokuapp.com/register')
// 	.then(response => {
// 		console.log(response.data.api_key);
// 	})
// 	.catch(error => console.error(error));
// };

// constant variable to select div with class "comments__cards"
const comments = document.querySelector('.comments__cards'); 

// constant variable to select form element with class "form"
const form = document.querySelector('.form'); 

// constant variable containing API Key generated through GET request from /register route
const apiKey =  'f8f9d53b-d07d-4b66-b446-e336637dd9fd';

// empty object that will be used to store a new comment
const newComment = {}; 

// retrieves the comment objects array and then renders the objects to the browser
const renderComments = () => {
	axios.get('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey)
	.then(response => {
		return response.data;
	})	
	.then(comments => {
		comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).forEach(object => {
			displayComments(object);
		});
		const button = document.querySelectorAll('.delete');
		button.forEach(element => {
			element.addEventListener('click', (e)=> deleteComment(e.target.id));
		});
		const like = document.querySelectorAll('.like');
		like.forEach(element => {
			element.addEventListener('click', (e)=> likeComment(e.target.id));
		});
	})
	.catch(error => console.error(error));
};

// post new comment object to server
const postNewComment = () => {
	const header = {'Content-Type': 'application/json'};
	axios.post('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey, newComment, header)
	.then( response => {
		renderComments();
	})
	.catch(error => console.error(error));
};

// delete comment 
const deleteComment = (id) => {
	axios.delete('https://project-1-api.herokuapp.com/comments/' + id + '?api_key=' + apiKey)
	.then(response => {
		renderComments();
	})
	.catch(error => console.error(error));
};

// like comment 
const likeComment = (id) => {
	axios.put('https://project-1-api.herokuapp.com/comments/' + id + '/like?api_key=' + apiKey)
	.then(response => {
		renderComments();
	})
	.catch(error => console.error(error));
};

renderComments();

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// function that deals with the form submission generated event object
function formHandler(e) {
	// prevents page reload upon submission
	e.preventDefault(); 

    // creates name object key and sets it to the given value of the input element
    newComment.name = e.target.userName.value; 

    // creates comment object key and sets it to the given value of the textarea element
    newComment.comment = e.target.userComment.value; 

	form.reset();

    // clear comments list
	comments.innerHTML = '';

	postNewComment();
};

// function that creates comment section cards
function displayComments (comment) {

	// create Card
	const cardEl = document.createElement('div');
	cardEl.classList.add('card');
	comments.prepend(cardEl);

	const getKitty = () => {
		axios.get('https://api.thecatapi.com/v1/images/search')
		.then(response => {
			// create Card Image
			const imageEl = document.createElement('img');
			imageEl.classList.add('card__image');
			imageEl.setAttribute('src', response.data[0].url);
			cardEl.prepend(imageEl);
		})
		.catch(error => console.error(error));
	};
	
	getKitty();

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
	const nameEl = document.createElement('p');
	nameEl.classList.add('card__text-title');
	nameEl.innerText = comment.name;
	headerEl.appendChild(nameEl);

	// create Card Date
	const dateEl = document.createElement('p');
	dateEl.classList.add('card__label');
	dateEl.innerText = convertTime(comment.timestamp);
	headerEl.appendChild(dateEl);

	// create Card Buttons Wrapper
	const wrapperEl = document.createElement('div');
	wrapperEl.classList.add('card__button-wrapper');
	bodyEl.appendChild(wrapperEl);

	//  create Like Button
	const likeEl = document.createElement('div');
	likeEl.classList.add('like');
	likeEl.setAttribute('id', comment.id);
	likeEl.innerText = comment.likes;
	wrapperEl.appendChild(likeEl);

	// create Delete Button
	const deleteEl = document.createElement('div');
	deleteEl.classList.add('delete');
	deleteEl.setAttribute('id', comment.id);
	deleteEl.innerText = "Delete"
	wrapperEl.appendChild(deleteEl);
};


// returns a string stating how long since the comment was first submitted
function convertTime(timestamp) {
  // variable with the current time in milliseconds since the epoch
  const currentTime = new Date().getTime();
  // variable with the difference
  const time = Math.abs(currentTime - timestamp)/1000;

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