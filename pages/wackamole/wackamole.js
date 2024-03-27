import './wackamole.css';
import { prompMessage } from '../../components/prompMessage/prompMessage';
import { removePromp } from '../../utils/removePromp';

let score = '';
let timer = '';

const title = document.createElement('h1');
title.textContent = 'WACK A MOLE';
title.className = 'titleWack';
const titleSpanish = document.createElement('h3');
titleSpanish.textContent = '(Aplasta un Topo)';
titleSpanish.className = 'titleWackSpanish';

export const newBoardWack = () => {
  score = 0;
  timer = 60;
  document.querySelector('main').innerHTML = ``;

  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainerWack';
  const divBoard = document.createElement('div');
  divBoard.className = 'divBoardWack';
  const divDisplay = document.createElement('div');
  divDisplay.className = 'divDisplay';
  const divSet = document.createElement('div');
  divSet.className = 'divSet';
  const divButtonPlay = document.createElement('div');
  divButtonPlay.className = 'divButtonPlay';
  divButtonPlay.setAttribute('id', 'divButtonPlay');
  divButtonPlay.textContent = 'PLAY';
  const scoreContainer = document.createElement('h2');
  scoreContainer.className = 'scoreContainer';
  scoreContainer.textContent = `Score: ${score}`;
  const timerContainer = document.createElement('h2');
  timerContainer.className = 'timerContainer';
  timerContainer.textContent = `Time: ${timer}s`;

  newBoxWack(divBoard);

  divButtonPlay.addEventListener('click', showMole);
  divButtonPlay.addEventListener('click', countdown);
  divButtonPlay.addEventListener('click', removeButtonPlay);

  divSet.appendChild(scoreContainer);
  divSet.appendChild(timerContainer);
  divDisplay.appendChild(divSet);
  divDisplay.appendChild(divButtonPlay);
  boardContainer.appendChild(divBoard);
  document.querySelector('main').appendChild(title);
  document.querySelector('main').appendChild(titleSpanish);
  document.querySelector('main').appendChild(divDisplay);
  document.querySelector('main').appendChild(boardContainer);
};

const newBoxWack = (divBoard) => {
  for (let i = 0; i < 9; i++) {
    const boxWack = document.createElement('div');
    boxWack.classList.add('boxWack');
    boxWack.setAttribute('id', `${i + 1}`);

    divBoard.appendChild(boxWack);
  }
};

let boxMole;
let timeout = 400 + Math.floor(Math.random() * 601);
let timeoutID;
let updateTimer;

const removeButtonPlay = () => {
  document.getElementById('divButtonPlay').remove();
};

const showMole = () => {
  const mole = document.createElement('img');
  mole.className = 'mole';
  mole.src = '/images/mole.png';
  let randomBox = Math.ceil(Math.random() * 9);
  boxMole = document.getElementById(`${randomBox}`);
  boxMole.appendChild(mole);
  boxMole.addEventListener('click', selected);
  timeoutID = setTimeout(removeMole, timeout);
};

const removeMole = () => {
  boxMole.removeChild(boxMole.firstChild);
  boxMole.removeEventListener('click', selected);
  timeoutID = setTimeout(showMole, timeout);
};

const selected = () => {
  console.log(timeoutID);
  clearTimeout(timeoutID);
  score = score + 1;
  document.querySelector('.scoreContainer').innerText = `Score: ${score}`;
  removeMole();
};

const countdown = () => {
  timer = timer - 1;
  document.querySelector('.timerContainer').innerText = `Time: ${timer}s`;
  updateTimer = setTimeout(countdown, 1000);
  if (timer === 0) {
    clearTimeout(updateTimer);
    gameOver();
  }
};

const gameOver = () => {
  clearTimeout(timeoutID);
  boxMole.removeEventListener('click', selected);

  prompMessage();

  document.querySelector(
    '.textGameOver'
  ).innerText = `Time Out!! Your score is "${score}"`;

  const rePlayButton = document.querySelector('.rePlayButton');
  rePlayButton.addEventListener('click', playAgain);
  rePlayButton.addEventListener('click', countdown);
  setTimeout(() => {
    rePlayButton.addEventListener('click', showMole);
  }, 1000);
};

const playAgain = () => {
  clearTimeout(timeoutID);
  clearTimeout(updateTimer);
  boxMole.removeEventListener('click', selected);
  newBoardWack();
  removeButtonPlay();
  removePromp('divGameOver');
};
