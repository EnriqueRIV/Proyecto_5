import './prompMessage.css';

export const prompMessage = () => {
  const divGameOver = document.createElement('div');
  divGameOver.className = 'divGameOver';
  divGameOver.setAttribute('id', 'divGameOver');
  const textGameOver = document.createElement('div');
  textGameOver.className = 'textGameOver';

  const rePlayButton = document.createElement('div');
  rePlayButton.className = 'rePlayButton';
  rePlayButton.innerText = 'PLAY AGAIN!🤪';
  divGameOver.appendChild(textGameOver);
  divGameOver.appendChild(rePlayButton);
  document.querySelector('main').appendChild(divGameOver);
};
