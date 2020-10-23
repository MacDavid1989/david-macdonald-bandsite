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

let defaultComments = [
    {
        name: 'Micheal Lyons', 
        comment: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
    },
    {
        name: 'Gary Wong',
        comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!',
    },
    {
        name: 'Theodore Duncan',
        comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!',
    }
];

console.log(defaultComments[0].name);

form.addEventListener('submit', formHandler);

function formHandler(e) {
    e.preventDefault();
    console.log(e.target.userName.value);
    console.log(e.target.userComment.value);
};

// function that renders comment section cards
function renderComments (name, comment) {
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
    paragraphEl.innerText = 'hello'; // test for paragraph
    bodyEl.appendChild(paragraphEl);

    // create Card Name
    const nameEl = document.createElement('h2');
    nameEl.classList.add('card__text-title');
    nameEl.innerText = "is it me"; // test for name
    headerEl.appendChild(nameEl);

    // create Card Date
    const dateEl = document.createElement('h5');
    dateEl.classList.add('card__label');
    dateEl.innerText = date;
    headerEl.appendChild(dateEl);

    return cardEl;
}

renderComments();