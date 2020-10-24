// constant variable to contain div with class "comments__cards"
const comments = document.querySelector('.comments__cards'); 
// constant variable to contain form element with class "form"
const form = document.querySelector('.form'); 

// default comment cards as objects in an array
const defaultComments = [
    {
        name: 'Theodore Duncan',
        date: '1 years ago', 
        comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!',
    },
    {
        name: 'Gary Wong',
        date: '1 years ago', 
        comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!',
    },
    {
        name: 'Micheal Lyons',
        date: '1 years ago', 
        comment: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
    }
];

const newTime = [];

// function that deals with the form submission generated event object
function formHandler(e) {
    // prevents page reload upon submission
    e.preventDefault(); 
    // new comment object
    const newComment = {}; 
    // creates name object key and sets it to the given value of the input element
    newComment.name = e.target.userName.value; 
    // adds time since submission in milliseconds to the beginning of an array
    newTime.unshift(e.timeStamp);
    // creates an empty array each time the form is submitted
    const timeArray = [];
    // passes each value of an array through a function that converts to a time string and pushes that value to the empty array
    newTime.forEach(timeStamp => timeArray.push(convertTime(timeStamp)));
    // creates date object key and sets it to the return value of the function given a value in milliseconds since the form was submitted
    newComment.date = convertTime(e.timeStamp);
    // creates comment object key and sets it to the given value of the textarea element
    newComment.comment = e.target.userComment.value; 
    // push new comment object to existing array
    defaultComments.push(newComment); 
    // clear input field
    document.getElementById('name').value = '';
    // clear comment textarea 
    document.getElementById('comment').value = ''; 
    // clear comments list
    comments.innerHTML = ''; 
    //invokes a function to switch the time values so comments are updated since form submission then re-renders new comments list with most recent comment at the top.
    setTimeout(() => {
        timeSwitch(defaultComments, timeArray);
        defaultComments.forEach(comment => displayComments(comment),500);
        }
    )    
};

// function that creates comment section cards
function displayComments (comment) {
    // create Card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
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
    dateEl.innerText = comment.date;
    headerEl.appendChild(dateEl);
}

// loop that filters through an array of objects and invokes a function to render a comment for each object
defaultComments.forEach(comment => displayComments(comment));

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// function that returns a string stating how long since the comment was first submitted
function convertTime(stamp) {
    // converts milliseconds to seconds
    let time = stamp / 1000;
    // checks if total seconds is the equivalent of at least 1 year
    if ((time/31536000) > 1) {
      return Math.round(time/31536000) + " years ago";
    // checks if total seconds is the equivalent of at least 1 month
    } else if ((time/2592000) > 1) {
      return Math.round(time/2592000) + " months ago";
    // checks if total seconds is the equivalent of at least 1 day
    } else if ((time/86400) > 1) {
      return Math.round(time/8640) + " days ago";
    // checks if total seconds is the equivalent of at least 1 hour
    } else if ((time/3600) > 1) {
      return Math.round(time/3600) + " hours ago";
    // checks if total seconds is the equivalent of at least 60 minutes
    } else if ((time/60) > 1) {
      return Math.round(time/60) + " minutes ago";
    // returns stamp in seconds
    } else {
    return Math.round(time) + " seconds ago";
    }
}
// function that takes an object of time strings and the array of objects and switches the date key values of the new comments to reflect time since submission 
function timeSwitch (array, timeArray) {
    for(i = 3; i < array.length; i++) {
        array[i].date = timeArray[i-3];
    }
}