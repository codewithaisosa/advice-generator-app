"use strict";

const rootElem = document.querySelector('html');
const adviceBtn = document.querySelector('.advice-btn');
let adviceText = document.querySelector('.advice-text');
let adviceId = document.querySelector('.advice-id');

// Loading...
const loader = () => {
  adviceText.textContent = 'Advice Loading...'
  adviceId.textContent = '--'
}

// Handle Click Event
const handleClick = (e) => {
  if (e.target.className === 'advice-btn') {
    randomAdvice();
  } else {
    return;
  }
}

rootElem.addEventListener('click', handleClick);

const randomAdvice = async () => {
  adviceBtn.classList.add('disabled-btn');
  loader();
  try {
    const response = await fetch('https://api.adviceslip.com/advice', {
      "Cache-Control": "no-store"
    });
    const data = await response.json();
    setTimeout(() => {
      adviceText.textContent = `${data.slip.advice}`;
      adviceId.textContent = `#${data.slip.id}`;
      adviceBtn.classList.remove('disabled-btn');
    }, 3000);
    console.log(data);
  } catch (error) {
    console.log(error.message);
    adviceText.textContent = `${error.message}`;
    adviceId.textContent = `--`;
    adviceText.style.color = 'red';
    adviceId.style.color = 'red';
    adviceBtn.classList.remove('disabled-btn');
  }
}
randomAdvice();
