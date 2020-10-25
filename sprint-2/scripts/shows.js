// constant variable to contain div with class "shows__cards"
const shows = document.querySelector('.shows__cards');

// default shows list as an array of objects
const defaultShows = [
    {
        date: 'Mon Dec 17 2018', 
        venue: 'Ronald Lane',
        location: 'San Francisco, CA',
    },
    {
        date: 'Tue Jul 18 2019', 
        venue: 'Pier 3 East',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Jul 22 2019', 
        venue: 'View Lounge',
        location: 'San Francisco, CA',
    },
    {
        date: 'Sat Aug 12 2019', 
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Sep 05 2019', 
        venue: 'Moscow Center',
        location: 'San Francisco, CA',
    },
    {
        date: 'Wed Aug 11 2019', 
        venue: 'Pres Club',
        location: 'San Francisco, CA',
    },  
];

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
    const dateLabelEl = document.createElement('h5');
    dateLabelEl.classList.add('card__label', 'card__label--margin');
    dateLabelEl.innerText = 'DATE';
    dateWrapEl.appendChild(dateLabelEl);

    // create Card Date
    const dateEl = document.createElement('h2');
    dateEl.classList.add('card__text-title');
    dateEl.innerText = show.date;
    dateWrapEl.appendChild(dateEl);

    // create Venue Wrapper
    const venueWrapEl = document.createElement('div');
    venueWrapEl.classList.add('venue');
    cardEl.appendChild(venueWrapEl);

    // create Card Venue Label
    const venueLabelEl = document.createElement('h5');
    venueLabelEl.classList.add('card__label');
    venueLabelEl.innerText = 'VENUE';
    venueWrapEl.appendChild(venueLabelEl);

    // create Card Venue
    const venueEl = document.createElement('p');
    venueEl.classList.add('card__text');
    venueEl.innerText = show.venue;
    venueWrapEl.appendChild(venueEl);

    // create Location Wrapper
    const locationWrapEl = document.createElement('div');
    locationWrapEl.classList.add('venue');
    cardEl.appendChild(locationWrapEl);

    // create Card Location Label
    const locationLabelEl = document.createElement('h5');
    locationLabelEl.classList.add('card__label');
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
    // delays section clear and shows list render for 7 seconds
    setTimeout(() => {shows.innerHTML = ''; defaultShows.forEach(show => displayShows(show));}, 7000);
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
    dateEl.classList.add('card__text-title-alt');
    dateEl.innerText = 'TICKETS ARE CURRENTLY UNAVAILABLE. WE APOLOGIZE FOR ANY INCONVENIENCE. YOU WILL BE RE-DIRECTED BACK TO ALL SHOWS SHORTLY.';
    dateWrapEl.appendChild(dateEl);
}

// loop that filters through an array of objects and invokes a function to render shows
defaultShows.forEach(show => displayShows(show));

// event listener that calls buttonHandler function if the element clicked within the shows section has a class of button
shows.addEventListener('click', (e) => {
        if (e.target.className === 'button') {
          buttonHandler();
        }
    }
);