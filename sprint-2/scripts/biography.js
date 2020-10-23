const comments = document.querySelector('.comments__cards');
const card = document.querySelectorAll('.card');
const cardImage = document.querySelectorAll('.card__image');
const cardBody = document.querySelectorAll('.card__body');
const cardHeader = document.querySelectorAll('.card__heading');
const cardTitle = document.querySelectorAll('.card__text-title');
const cardDate = document.querySelectorAll('.card__label');
const cardComment = document.querySelectorAll('.card__text');
const button = document.querySelector('.button');
const form = document.querySelector('.form')

let formArray = [{name: 'Micheal Lyons'},{name: 'Gary Wong'},{name: 'Theodore Duncan'}];

form.addEventListener('submit', formHandler);

function formHandler(e) {
    e.preventDefault();
    console.log(e.target.userName.value);
    console.log(e.target.userComment.value);
};
