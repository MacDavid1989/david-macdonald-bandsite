// constant variable to select div with class "comments__cards"
const comments = document.querySelector('.comments__cards'); 

// constant variable to select form element with class "form"
const form = document.querySelector('.form'); 

const newComment = {}; 

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// Method GET to retrieve api key from object returned in response from /register route
const getApiKey = () => {
	axios.get('https://project-1-api.herokuapp.com/register')
	.then(response => {
		return response.data.api_key;		
	})
	.catch(error => console.error(error));
};


// retrieves the comment objects array and then renders the objects to the browser
const renderComments = () => {
	const apiKey = getApiKey();
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
	const apiKey = getApiKey();
	const header = {'Content-Type': 'application/json'};
	axios.post('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey, newComment, header)
	.then( response => {
		renderComments();
	})
	.catch(error => console.error(error));
};

// delete comment 
const deleteComment = (id) => {
	const apiKey = getApiKey();
	axios.delete('https://project-1-api.herokuapp.com/comments/' + id + '?api_key=' + apiKey)
	.then(response => {
		comments.innerHTML = '';
		renderComments();
	})
	.catch(error => console.error(error));
};

// delete comment 
const likeComment = (id) => {
	const apiKey = getApiKey();
	axios.put('https://project-1-api.herokuapp.com/comments/' + id + '/like?api_key=' + apiKey)
	.then(response => {
		comments.innerHTML = '';
		renderComments();
	})
	.catch(error => console.error(error));
};

renderComments();

// function that deals with the form submission generated event object
function formHandler(e) {
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
	 buttonEl.classList.add('button', 'delete');
	 buttonEl.setAttribute('type', 'button');
	 buttonEl.setAttribute('id', comment.id);
	 buttonEl.innerText = 'DELETE';
	 bodyEl.appendChild(buttonEl);

	//  create Like Button
	const likeEl = document.createElement('p');
	likeEl.classList.add('like');
	likeEl.setAttribute('id', comment.id);
	likeEl.innerText = comment.likes;
	bodyEl.appendChild(likeEl);
};


// ### `PUT /comments/:id/like`
// - Increments the like counter of the comment specified by `:id`
//   - swap `:id` for the id of the element you want to like
// - No POST body expected
// - Will return a 404 if no comment with that ID is found.
// - If successful, it will return the `comment` JSON object that you just liked
// - *This endpoint is not required to satisfy the assignment requirements*

// #### Response Body Example
// ```json
// {
//     "name": "Nigel",
//     "comment": "What a cool site",
//     "id": 0,
//     "likes": 1,
//     "timestamp": 1530744795832
// }
// ```


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