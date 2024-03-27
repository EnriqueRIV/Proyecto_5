import { prompMessage } from '../../components/prompMessage/prompMessage';
import './memory.css';
import { removePromp } from '../../utils/removePromp';

const images = [
  {
    name: 'fresa',
    img: 'images/fresa.png'
  },
  {
    name: 'mango',
    img: 'images/mango.png'
  },
  {
    name: 'manzana',
    img: 'images/manzana.png'
  },
  {
    name: 'naranja',
    img: 'images/naranja.png'
  },
  {
    name: 'palta',
    img: 'images/palta.png'
  },
  {
    name: 'papaya',
    img: 'images/papaya.png'
  },
  {
    name: 'platano',
    img: 'images/platano.png'
  },
  {
    name: 'sandia',
    img: 'images/sandia.png'
  }
];

let cardsSelected = [];
let cardsSelectedId = [];
let score = '';

const cardsData = images.map((image) => ({ image, isFlipped: false }));
const pairedCards = [...cardsData, ...cardsData];

const title = document.createElement('h1');
title.textContent = 'MEMORY GAME';
title.className = 'titleMemory';
const titleSpanish = document.createElement('h3');
titleSpanish.textContent = '(Juego de Memoria)';
titleSpanish.className = 'titleMemorySpanish';

export const newBoardM = () => {
  score = 0;
  document.querySelector('main').innerHTML = ``;

  const scoreContainerM = document.createElement('h2');
  scoreContainerM.className = 'scoreContainerM';
  scoreContainerM.textContent = `Score: ${score}`;
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainerMemory';
  const divBoard = document.createElement('div');
  divBoard.className = 'boardMemory';

  newCards(divBoard);

  boardContainer.appendChild(divBoard);
  document.querySelector('main').appendChild(title);
  document.querySelector('main').appendChild(titleSpanish);
  document.querySelector('main').appendChild(scoreContainerM);
  document.querySelector('main').appendChild(boardContainer);
};

const newCards = (divBoard) => {
  let shuffledCards = pairedCards.sort(() => Math.random() - 0.5);
  for (let i = 0; i < pairedCards.length; i++) {
    const divCard = document.createElement('div');
    const divCardInner = document.createElement('div');
    const divCardFront = document.createElement('div');
    const newCard = document.createElement('img');
    const divCardBack = document.createElement('div');
    const divCardBackText = document.createElement('p');

    divCard.classList.add('divCard');
    divCardInner.classList.add('divCardInner');
    divCardFront.classList.add('divCardFront');
    divCardBack.classList.add('divCardBack');
    divCardBack.classList.add(i);
    newCard.classList.add(`box_${i}`);
    newCard.classList.add(i);
    newCard.classList.add('case_1');

    newCard.src = shuffledCards[i].image.img;
    divCardBackText.textContent = 'MEMORY GAME';

    divCard.addEventListener('click', flipCard);

    divCardFront.appendChild(newCard);
    divCardBack.appendChild(divCardBackText);
    divCardInner.appendChild(divCardFront);
    divCardInner.appendChild(divCardBack);
    divCard.appendChild(divCardInner);
    divBoard.appendChild(divCard);
  }
};

const flipCard = (e) => {
  if (e.target.parentNode.parentNode.classList[1] === 'flipCard') {
    prompMessage();
    document.querySelector('.textGameOver').innerText =
      "You don't click the same! Click another image!";
    const rePlayButton = document.querySelector('.rePlayButton');
    rePlayButton.addEventListener('click', continuePlay);
    rePlayButton.innerText = 'NEXT!🤪';
  } else {
    let cardId = e.target.parentNode.classList[1];
    cardsSelected.push(pairedCards[cardId].image.name);
    cardsSelectedId.push(cardId);
    e.target.parentNode.parentNode.classList.add('flipCard');
    if (cardsSelected.length === 2) {
      setTimeout(checkMatch, 500);
      document.querySelectorAll('.divCard').forEach((element) => {
        element.removeEventListener('click', flipCard);
      });
    }
  }
};

const checkMatch = () => {
  const choiceOneId = cardsSelectedId[0];
  const choiceTwoId = cardsSelectedId[1];

  const temporalFlippedCards = pairedCards.filter(
    (card) => card.isFlipped === 'true'
  );

  if (
    cardsSelected[0] === cardsSelected[1] &&
    pairedCards.length - 2 > temporalFlippedCards.length
  ) {
    pairedCards[choiceOneId].isFlipped = 'true';
    pairedCards[choiceTwoId].isFlipped = 'true';
    score = score + 1;
    setTimeout(() => {
      prompMessage();
      document.querySelector('.textGameOver').innerText =
        'Great! You found a match!';
      const rePlayButton = document.querySelector('.rePlayButton');
      rePlayButton.addEventListener('click', continuePlay);
      rePlayButton.innerText = 'NEXT!🤪';
    }, 300);
  } else if (
    cardsSelected[0] === cardsSelected[1] &&
    pairedCards.length - 2 === temporalFlippedCards.length
  ) {
    pairedCards[choiceOneId].isFlipped = 'true';
    pairedCards[choiceTwoId].isFlipped = 'true';
    score = score + 1;
  } else {
    score = score - 1;
    setTimeout(() => {
      prompMessage();
      document.querySelector('.textGameOver').innerText = 'Try again!';
      const rePlayButton = document.querySelector('.rePlayButton');
      rePlayButton.addEventListener('click', continuePlay);
      rePlayButton.innerText = 'NEXT!🤪';
    }, 700);
    setTimeout(() => {
      document
        .querySelector(`.box_${choiceOneId}`)
        .parentNode.parentNode.classList.remove('flipCard');
      document
        .querySelector(`.box_${choiceTwoId}`)
        .parentNode.parentNode.classList.remove('flipCard');
    }, 500);
  }
  document.querySelector('.scoreContainerM').innerText = `Score: ${score}`;

  cardsSelected = [];
  cardsSelectedId = [];
  const flippedCards = pairedCards.filter((card) => card.isFlipped === 'true');
  if (pairedCards.length === flippedCards.length) {
    setTimeout(() => {
      prompMessage();
      document.querySelector(
        '.textGameOver'
      ).innerText = `FANTASTIC!!! You found all pairs!🏆🏆 Your score is: "${score}"`;
      const rePlayButton = document.querySelector('.rePlayButton');
      rePlayButton.addEventListener('click', playAgain);
    }, 300);
  }
};

const continuePlay = () => {
  removePromp('divGameOver');
  document.querySelectorAll('.divCard').forEach((element) => {
    element.addEventListener('click', flipCard);
  });
};

const playAgain = () => {
  pairedCards.forEach((flipped) => (flipped.isFlipped = 'false'));
  removePromp('divGameOver');
  document
    .querySelectorAll('.divCardInner')
    .forEach((element) => element.classList.remove('flipCard'));
  setTimeout(() => {
    newBoardM();
  }, 400);
};
