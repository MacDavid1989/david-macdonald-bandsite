const comments = document.querySelector('.comments__cards'); // constant variable to contain div with class "comments__cards"
const form = document.querySelector('.form'); // constant variable to contain form element with class "form"
const date = new Date().toLocaleDateString(); // constant variable to contain value returned from Date function as a string 

// default comment cards as objects in an array
const defaultComments = [
    {
        name: 'Theodore Duncan',
        date: '11/15/2018', 
        comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!',
    },
    {
        name: 'Gary Wong',
        date: '12/12/2018', 
        comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!',
    },
    {
        name: 'Micheal Lyons',
        date: '12/18/2018', 
        comment: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
    }
];

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// function that deals with the form submission generated event object
function formHandler(e) {
    e.preventDefault(); // prevents page reload upon submission
    const newComment = {}; // new comment object
    newComment.name = e.target.userName.value; // creates name object key and sets it to the given value of the input element
    newComment.date = date; // creates date object key and sets it to the given value from the constant variable date
    newComment.comment = e.target.userComment.value; // creates comment object key and sets it to the given value of the textarea element
    defaultComments.push(newComment); // push new comment object to existing array
    document.getElementById('name').value = ''; // clear input 
    document.getElementById('comment').value = ''; // clear comment textarea
    comments.innerHTML = ''; // clear comments list
    setTimeout(() => defaultComments.forEach(comment => displayComments(comment)),500); //re-renders new comments list with most recent comment at the top.
};

// loop that filters through an array of objects and invokes a function to render a comment for each object
defaultComments.forEach(comment => displayComments(comment));

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