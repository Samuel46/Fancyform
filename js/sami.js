// Questions Array
const questions = [
  {
    question: 'Enter Your First Name'
  },
  {
    question: 'Enter Your Last Name'
  },
  {
    question: 'Enter Your Email',
    pattern: /\s+@\s+\.\s+/
  },
  {
    question: 'Create A Password',
    type: 'password'
  }
];

// Transtion Times
const shakeTime = 100;
const switchTime = 200;

// Init Position At First Question
let position = 0;

// Init Dom Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

// Get Question On Dom Load

document.addEventListener('DOMContentLoaded', getQuestion);

// Nextbutton click
nextBtn.addEventListener('.click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Diplay question to diplay to the user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}
// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform To Create Shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // Make sure pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  //   repeat shake motion
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
  }

  setTimeout(transform, shakeTime * 6, 0, 0);
  inputField.focus();
}

// Feild Input Pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 1, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // store answ in array
  question[position].answer = inputField.value;

  // Increment Position
  position++;

  // If new question, hide current and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';
    // Form Complete
    formcomplete();
  }
}

// All field complete - show h1 end
function formComplete() {
  console.log(questions);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        question[0].answer
      } You are registered and will get an email shortly`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
