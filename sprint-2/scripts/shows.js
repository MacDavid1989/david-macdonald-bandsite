const shows = document.querySelector('.shows__cards');

// default shows list as per mockup
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

// event listener for when the form button is pressed and the info is submitted
// button.addEventListener('click', buttonHandler);

// function that deals with the form submission
// function buttonHandler(e) {
//     e.preventDefault(); // prevents page reload upon submission
//     shows.innerHTML = ''; // clear comments list
//     setTimeout(() => defaultShows.forEach(show => displayShows(show)),500); //re-renders new comments list with most recent comment.
// };

// loop that filters through an array of objects and invokes a function to renderComments
// defaultShows.forEach(show => displayShows(show));

// function that renders comment section cards
function displayShows (show) {
    // create card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    shows.appendChild(cardEl);

    // create date wrapper
    const dateWrapEl = document.createElement('div');
    dateWrapEl.classList.add('date');
    cardEl.appendChild(dateWrapEl);

    // create card Date
    const dateEl = document.createElement('h2');
    dateEl.classList.add('card__text-tile');
    dateEl.innerText = show.date;
    dateWrapEl.appendChild(dateEl);

    // create venue wrapper
    const venueWrapEl = document.createElement('div');
    venueWrapEl.classList.add('venue');
    cardEl.appendChild(venueWrapEl);

    // create card venue
    const venueEl = document.createElement('p');
    venueEl.classList.add('card__text');
    venueEl.innerText = show.venue;
    venueWrapEl.appendChild(venueEl);

    // create location wrapper
    const locationWrapEl = document.createElement('div');
    locationWrapEl.classList.add('venue');
    cardEl.appendChild(locationWrapEl);

    // create card location
    const locationEl = document.createElement('p');
    locationEl.classList.add('card__text');
    locationEl.innerText = show.location;
    locationWrapEl.appendChild(locationEl);

    // create card button
    const buttonEl = document.createElement('a');
    buttonEl.classList.add('button');
    buttonEl.innerText = 'BUY TICKETS';
    cardEl.appendChild(buttonEl);

    return cardEl
}

defaultShows.forEach(comment => displayShows(comment));
