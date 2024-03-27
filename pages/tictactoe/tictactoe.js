import './tictactoe.css';
import { prompMessage } from '../../components/prompMessage/prompMessage';
import { removePromp } from '../../utils/removePromp';

const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'TIC - TAC - TOE';
const titleSpanish = document.createElement('h3');
titleSpanish.className = 'titleSpanish';
titleSpanish.textContent = '(Tres en Raya)';

let board = ['', '', '', '', '', '', '', '', ''];
let SELECTED = '';

export const newBoardT = () => {
  document.querySelector('main').innerHTML = ``;

  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  const divBoard = document.createElement('div');
  divBoard.className = 'board';

  boardContainer.appendChild(divBoard);
  document.querySelector('main').appendChild(title);
  document.querySelector('main').appendChild(titleSpanish);
  document.querySelector('main').appendChild(boardContainer);

  playerChoice();
  newBoxes(divBoard);
};

const playerChoice = () => {
  const choiceContainer = document.createElement('div');
  choiceContainer.className = 'choiceContainer';
  const textChoice = document.createElement('h3');
  textChoice.innerText = 'Do you start playing? choose your chip!';
  const choices = document.createElement('div');
  choices.className = 'questions';
  const choiceX = document.createElement('div');
  choiceX.className = 'choiceX';
  choiceX.innerText = 'Play with "X"';
  const choiceO = document.createElement('div');
  choiceO.className = 'choiceO';
  choiceO.innerText = 'Play with "O"';

  choiceX.addEventListener('click', (e) => selected(e, 'x'));
  choiceO.addEventListener('click', (e) => selected(e, 'o'));

  choices.appendChild(choiceX);
  choices.appendChild(choiceO);
  choiceContainer.appendChild(textChoice);
  choiceContainer.appendChild(choices);

  document
    .querySelector('main')
    .insertBefore(choiceContainer, document.querySelector('.boardContainer'));
};

const newBoxes = (divBoard) => {
  for (let i = 0; i < board.length; i++) {
    const newBox = document.createElement('div');

    newBox.classList.add(`box${i}`);
    newBox.classList.add(i);
    newBox.classList.add('case');

    newBox.addEventListener('click', choice);

    divBoard.appendChild(newBox);
  }
};

const selected = (e, player) => {
  SELECTED = player;
  e.target.parentElement.remove();
  document.querySelector('.choiceContainer').remove();
  nowPlay(player);
  continuePlay();
};

const choice = (e) => {
  if (SELECTED === '') {
    document
      .querySelectorAll('.case')
      .forEach((element) => element.removeEventListener('click', choice));
    prompMessage();
    document.querySelector('.textGameOver').innerText =
      'Select a chip to start!';
    const rePlayButton = document.querySelector('.rePlayButton');
    rePlayButton.addEventListener('click', continuePlay);
    rePlayButton.innerText = 'NEXT!🤪';
    // return alert('Select a chip to start!');
  } else if (e.target.textContent === '') {
    showOnBoard(e);
    document
      .querySelectorAll('.case')
      .forEach((element) => element.addEventListener('click', choice));
  }

  checkToWin();
};

const showOnBoard = (e) => {
  e.target.textContent = SELECTED;
  board[parseInt(e.target.classList[1][0])] = SELECTED;
  SELECTED = SELECTED === 'x' ? 'o' : 'x';
  removePromp('nowPlay');
  document
    .querySelectorAll('.case')
    .forEach((element) => element.addEventListener('click', choice));
  nowPlay(SELECTED);
  render();
};

const render = () => {
  setTimeout(() => {
    let x = Math.floor(Math.random() * board.length);
    let valor = board[x];
    if (valor === '' && winner === '') {
      valor = SELECTED;
      board[x] = SELECTED;
      document.querySelector(`.box${x}`).innerText = SELECTED;
      SELECTED = SELECTED === 'x' ? 'o' : 'x';
      checkToWin();
      if (document.getElementById('nowPlay')) {
        document.querySelector('.nowPlay').remove();
        nowPlay(SELECTED);
      }
    } else if (valor !== '' && winner === '' && !tie) {
      render();
    }
  }, 500);
};

const nowPlay = (toPlay) => {
  const nowPlayContainer = document.createElement('div');
  nowPlayContainer.className = 'nowPlay';
  nowPlayContainer.id = 'nowPlay';
  const textNowPlay = document.createElement('h3');
  textNowPlay.innerText = `Now play ${toPlay}`;
  nowPlayContainer.appendChild(textNowPlay);

  document.querySelector('.board').appendChild(nowPlayContainer);
};

let winner = '';
let tie = false;
const checkToWin = () => {
  const lastValue = SELECTED === 'x' ? 'o' : 'x';

  for (let i = 0; i < board.length; i = i + 3) {
    if (
      board[i] === lastValue &&
      board[i + 1] === lastValue &&
      board[i + 2] === lastValue
    ) {
      winner = lastValue;
    }
  }

  for (let i = 0; i < board.length / 3; i++) {
    if (
      board[i] === lastValue &&
      board[i + 3] === lastValue &&
      board[i + 6] === lastValue
    ) {
      winner = lastValue;
    }
  }

  if (
    (board[0] === lastValue &&
      board[4] === lastValue &&
      board[8] === lastValue) ||
    (board[2] === lastValue && board[4] === lastValue && board[6] === lastValue)
  ) {
    winner = lastValue;
  }

  if (!board.some((box) => box === '')) {
    tie = true;
  } else {
    tie = false;
  }

  if (tie && winner === '') {
    removePromp('nowPlay');
    document
      .querySelectorAll('.case')
      .forEach((element) => element.removeEventListener('click', choice));
    setTimeout(() => {
      prompMessage();
      document.querySelector('.textGameOver').innerText = 'TIE!';
      const rePlayButton = document.querySelector('.rePlayButton');
      rePlayButton.addEventListener('click', playAgain);
      rePlayButton.innerText = 'PLAY AGAIN!🤪';
    }, 300);
  }

  if (winner !== '') {
    removePromp('nowPlay');
    document
      .querySelectorAll('.case')
      .forEach((element) => element.removeEventListener('click', choice));
    setTimeout(() => {
      prompMessage();
      document.querySelector('.textGameOver').innerText = `Win "${winner}"!!🏆`;
      const rePlayButton = document.querySelector('.rePlayButton');
      rePlayButton.addEventListener('click', playAgain);
      rePlayButton.innerText = 'PLAY AGAIN!🤪';
    }, 300);
  }
};

const playAgain = () => {
  removePromp('divGameOver');
  SELECTED = '';
  newBoardT();
  board = ['', '', '', '', '', '', '', '', ''];
  winner = '';
  tie = false;
};

const continuePlay = () => {
  removePromp('divGameOver');
  document
    .querySelectorAll('.case')
    .forEach((element) => element.addEventListener('click', choice));
};
