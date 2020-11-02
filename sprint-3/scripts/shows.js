// Method GET used to retrieve api key from object returned in response from /register route
// const getApiKey = () => {
// 	axios.get('https://project-1-api.herokuapp.com/register')
// 	.then(response => {
// 		console.log(response.data.api_key);
// 	})
// 	.catch(error => console.error(error));
// };

// constant variable to contain div with class "shows__cards"
const shows = document.querySelector('.shows__cards');

// constant variable containing API Key generated through GET request from /register route
const apiKey =  'f8f9d53b-d07d-4b66-b446-e336637dd9fd';

// retrieves the comment objects array and then renders the objects to the browser
const renderShows = () => {
	axios.get('https://project-1-api.herokuapp.com/showdates?api_key=' + apiKey)
	.then(response => {
		return response.data;
	})	
	.then(comments => {
		comments.forEach(object => displayShows(object));
		const button = document.querySelectorAll('.delete');
		button.forEach(element => {
			element.addEventListener('click', (e)=> deleteComment(e.target.id));
		});
	})
	.catch(error => console.error(error));
};

renderShows();

// event listener that calls buttonHandler function if the element clicked within the shows section has a class of button
shows.addEventListener('click', (e) => {
    if (e.target.className === 'button') {
      buttonHandler();
    } else if (e.target.className === 'button-alt') {
        buttonHandlerAlt();
    }
}
);

// function that creates show cards
function displayShows (show) {
    
    // create Card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    shows.appendChild(cardEl);

    // create Date Wrapper
    const dateWrapEl = document.createElement('div');
    dateWrapEl.classList.add('date');
    cardEl.appendChild(dateWrapEl);

    // create Card Date Label
    const dateLabelEl = document.createElement('h3');
    dateLabelEl.classList.add('card__label');
    dateLabelEl.innerText = 'DATE';
    dateWrapEl.appendChild(dateLabelEl);

    // create Card Date
    const dateEl = document.createElement('p');
    dateEl.classList.add('card__text-title');
    dateEl.innerText = show.date;
    dateWrapEl.appendChild(dateEl);

    // create Venue Wrapper
    const venueWrapEl = document.createElement('div');
    venueWrapEl.classList.add('venue');
    cardEl.appendChild(venueWrapEl);

    // create Card Venue Label
    const venueLabelEl = document.createElement('h3');
    venueLabelEl.classList.add('card__label', 'card__label-alt');
    venueLabelEl.innerText = 'VENUE';
    venueWrapEl.appendChild(venueLabelEl);

    // create Card Venue
    const venueEl = document.createElement('p');
    venueEl.classList.add('card__text');
    venueEl.innerText = show.place;
    venueWrapEl.appendChild(venueEl);

    // create Location Wrapper
    const locationWrapEl = document.createElement('div');
    locationWrapEl.classList.add('venue');
    cardEl.appendChild(locationWrapEl);

    // create Card Location Label
    const locationLabelEl = document.createElement('h3');
    locationLabelEl.classList.add('card__label','card__label-alt');
    locationLabelEl.innerText = 'LOCATION';
    locationWrapEl.appendChild(locationLabelEl);

    // create Card Location
    const locationEl = document.createElement('p');
    locationEl.classList.add('card__text');
    locationEl.innerText = show.location;
    locationWrapEl.appendChild(locationEl);

    // create Card Button
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('button');
    buttonEl.setAttribute('type', 'button');
    buttonEl.innerText = 'BUY TICKETS';
    cardEl.appendChild(buttonEl);
};

// function to be invoked when button is clicked
function buttonHandler () {
    // clears the shows section
    shows.innerHTML = '';
    // calls function to render ticket elements
    displayTickets();
};

function buttonHandlerAlt () {
    // clears the shows section
    shows.innerHTML = '';
    // calls function to render shows elements
    renderShows();
};

// creates a card for tickets
function displayTickets() {
    // create Card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    shows.appendChild(cardEl);

    // create Ticket Wrapper
    const dateWrapEl = document.createElement('div');
    dateWrapEl.classList.add('date');
    cardEl.appendChild(dateWrapEl);

    // create Ticket Statement
    const dateEl = document.createElement('h2');
    dateEl.classList.add('card__text-title','card__text-title-alt');
    dateEl.innerText = 'TICKETS ARE CURRENTLY UNAVAILABLE.';
    dateWrapEl.appendChild(dateEl);

    // create Card Button
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('button-alt');
    buttonEl.setAttribute('type', 'button');
    buttonEl.innerText = 'ALL SHOWS';
    cardEl.appendChild(buttonEl);
}