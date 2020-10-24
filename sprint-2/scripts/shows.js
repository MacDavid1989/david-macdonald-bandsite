const shows = document.querySelector('.shows__cards');

// default shows list as per mockup
const defaultShows = [
    {
        date: 'Wed Aug 11 2019', 
        venue: 'Pres Club',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Sep 05 2019', 
        venue: 'Moscow Center',
        location: 'San Francisco, CA',
    },
    {
        date: 'Sat Aug 12 2019', 
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA',
    },
    {
        date: 'Fri Jul 22 2019', 
        venue: 'View Lounge',
        location: 'San Francisco, CA',
    },
    {
        date: 'Tue Jul 18 2019', 
        venue: 'Pier 3 East',
        location: 'San Francisco, CA',
    },
    {
        date: 'Mon Dec 17 2018', 
        venue: 'Ronald Lane',
        location: 'San Francisco, CA',
    }
];

// event listener for when the form button is pressed and the info is submitted
// button.addEventListener('click', buttonHandler);

// function that deals with the form submission
function buttonHandler(e) {
    e.preventDefault(); // prevents page reload upon submission
    shows.innerHTML = ''; // clear comments list
    setTimeout(() => defaultShows.forEach(show => displayShows(show)),500); //re-renders new comments list with most recent comment.
};

// loop that filters through an array of objects and invokes a function to renderComments
// defaultShows.forEach(show => displayShows(show));

// function that renders comment section cards
function displayShows (show) {
    // create Card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    shows.prepend(cardEl);

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
    paragraphEl.innerText = show.comment;
    bodyEl.appendChild(paragraphEl);

    // create Card Name
    const nameEl = document.createElement('h2');
    nameEl.classList.add('card__text-title');
    nameEl.innerText = show.name;
    headerEl.appendChild(nameEl);

    // create Card Date
    const dateEl = document.createElement('h5');
    dateEl.classList.add('card__label');
    dateEl.innerText = show.date;
    headerEl.appendChild(dateEl);

    return cardEl
}

// console.log(displayShows(defaultShows));