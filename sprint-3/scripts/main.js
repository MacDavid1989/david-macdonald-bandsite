// constant variable to select div with class "comments__cards"
const comments = document.querySelector('.comments__cards'); 

// constant variable to select form element with class "form"
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

// declares an empty array that will store the original values of the time in milliseconds since the document was loaded until each form is submitted; before page refresh
const originalTimeValues = [];

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

// function that deals with the form submission generated event object
function formHandler(e) {

    // prevents page reload upon submission
    e.preventDefault(); 

    // declares new comment object
    const newComment = {}; 
    
    // creates name object key and sets it to the given value of the input element
	newComment.name = e.target.userName.value; 
	
    // creates date object key and sets it to the return value of the function given a value in milliseconds since the form was submitted
    newComment.date = convertTime(e.timeStamp);
    
    // creates comment object key and sets it to the given value of the textarea element
	newComment.comment = e.target.userComment.value; 
	
    // push new comment object to the array of default comment objects
    defaultComments.push(newComment); 
    
    // adds time since document loaded until form submission in milliseconds to the beginning of an array
    originalTimeValues.unshift(e.timeStamp);
    
    // creates an empty array each time the form is submitted
	const commentTime = [];
    
    // calls the currentTime function and searches through each value in the returned array and adds the return from the convertTime function using that value to the empty commentTime array
    currentTime(originalTimeValues, e.timeStamp).forEach(timeStamp => commentTime.unshift(convertTime(timeStamp)));
    
    // clear input field
    document.getElementById('name').value = '';
    
    // clear comment textarea 
    document.getElementById('comment').value = ''; 
    
    // clear comments list
    comments.innerHTML = ''; 
    
	//	invokes a function to switch the time values so comments are updated since form submission
	timeSwitch(defaultComments, commentTime);
	
	// delays the rendering of the comments for 0.5sec to show the section clearing before rendering
    setTimeout(() => defaultComments.forEach(comment => displayComments(comment)), 500);  
};

// takes the difference of each array value compared to the latest timestamp, and adds it to a new array generated for that instance, then returns that array
function currentTime (originalTimeValues, timeStamp) {
	const newTimeValues = [];
	for(let i = 0; i < originalTimeValues.length; i++){
		newTimeValues.push(timeStamp - originalTimeValues[i]);
	}
	return newTimeValues;
}

// returns a string stating how long since the comment was first submitted
function convertTime(time) {
    // checks if total milliseconds are greater than the equivalent of at least 1 year
    if ((time/31536000000) > 1) {
      return Math.round(time/31536000000) + " years ago";
    
      // checks if total milliseconds are greater than the equivalent of at least 1 month
    } else if ((time/2592000000) > 1) {
      return Math.round(time/2592000000) + " months ago";
    
      // checks if total milliseconds are greater than the equivalent of at least 1 day
    } else if ((time/86400000) > 1) {
      return Math.round(time/8640000) + " days ago";
    
      // checks if total milliseconds are greater than the equivalent of at least 1 hour
    } else if ((time/3600000) > 1) {
      return Math.round(time/3600000) + " hours ago";
    
      // checks if total milliseconds are greater than the equivalent of at least 60 minutes
    } else if ((time/60000) > 1) {
      return Math.round(time/60000) + " minutes ago";
    
    } else {
      // returns string with time rounded to the nearest second
    return Math.round(time/1000) + " seconds ago";
    }
}

// function that takes the array of objects and an array of time strings, switches the date key values of the objects in the array of objects to update time since submission 
function timeSwitch (objectArray, timeArray) {
	// begins the assignment of key values at the 4th index in the default array so as to not alter the default comments
    for(i = 3; i < objectArray.length; i++) {
        objectArray[i].date = timeArray[i-3];
	}
};

// loop that filters through an array of objects and invokes a function to render a comment for each object when page initially loads
defaultComments.forEach(comment => displayComments(comment));

// event listener for when the form button is pressed and the info is submitted
form.addEventListener('submit', formHandler);