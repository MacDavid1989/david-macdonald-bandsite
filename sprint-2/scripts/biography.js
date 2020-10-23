const comments = document.querySelector('.comments__cards');
// const card = document.querySelectorAll('.card');
// const cardImage = document.querySelectorAll('.card__image');
// const cardBody = document.querySelectorAll('.card__body');
// const cardHeader = document.querySelectorAll('.card__heading');
// const cardTitle = document.querySelectorAll('.card__text-title');
// const cardDate = document.querySelectorAll('.card__label');
// const cardComment = document.querySelectorAll('.card__text');
const button = document.querySelector('.button');
const form = document.querySelector('.form');
const date = new Date().toLocaleDateString();

// default comment cards as per mockup
const defaultComments = [
    {
        name: 'Theodore Duncan',
        date: '11/15/2018', 
        comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!',
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

// variable for new comments array

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);

// function that deals with the form submission
function formHandler(e) {
    e.preventDefault();
    let newComment = {};
    newComment.name = e.target.userName.value;
    newComment.date = date;
    newComment.comment = e.target.userComment.value;
    defaultComments.push(newComment);
    comments.innerText = '';
    setTimeout(() => defaultComments.forEach(e => renderComments(e.name,e.date,e.comment)),500);
};

// loop that filters through an array of objects and invokes a function to renderComments
defaultComments.forEach(e => renderComments(e.name,e.date,e.comment));

// function that renders comment section cards
function renderComments (name, date, comment) {
    // create Card
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    comments.prepend(cardEl);

    // create Image
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

    // create Card Text
    const paragraphEl = document.createElement('p');
    paragraphEl.classList.add('card__text');
    paragraphEl.innerText = comment; // test for paragraph
    bodyEl.appendChild(paragraphEl);

    // create Card Name
    const nameEl = document.createElement('h2');
    nameEl.classList.add('card__text-title');
    nameEl.innerText = name; // test for name
    headerEl.appendChild(nameEl);

    // create Card Date
    const dateEl = document.createElement('h5');
    dateEl.classList.add('card__label');
    dateEl.innerText = date;
    headerEl.appendChild(dateEl);

    return cardEl;
}