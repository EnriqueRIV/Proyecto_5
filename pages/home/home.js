import './home.css';
import { newBoardT as TicTacToe } from '../tictactoe/tictactoe';
import { newBoardM as Memory } from '../memory/memory';
import { newBoardWack as WackAMole } from '../wackamole/wackamole';
import { linkPages } from '../../utils/linkPages';
import { removePromp } from '../../utils/removePromp';

const homeTemplate = () => {
  return `
  <div class="gamesContainer">
  <div class="gameOne game" id="gameOne"><a href="#" title="Tic Tac Toe"><img src="/images/TtT.png" alt="TicTacToe"/></a></div>
  <div class="gameTwo game"><a href="#" id="gameTwo" title="Memory"><img src="/images/Memory.png" alt="Memory"/></a></div>
  <div class="gameThree game"><a href="#" title="Wack a Mole"><img src="/images/WaM.png" id="gameThree" alt="WackaMole"/></a></div>
  </div>
  `;
};

export const printTemplateHome = () => {
  document.querySelector('main').innerHTML = homeTemplate();
  linkPages('#homeLink', printTemplateHome);
  linkPages('#homeLink_1', printTemplateHome);
  linkPages('#homeLink_2', printTemplateHome);
  linkPages('#gameOne', TicTacToe);
  linkPages('#gameTwo', Memory);
  linkPages('#gameThree', WackAMole);
  removePromp('divGameOver');
};
