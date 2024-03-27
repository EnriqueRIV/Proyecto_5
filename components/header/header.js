import './header.css';

const headerTemplate = () => {
  return `
  <nav class="navBar">
  <ul>
  <li><a href="#" class="navLink" id="homeLink" alt="Home" title="Home"><span class="navText">HOME</span><span class="material-symbols-outlined navLinkMobile">home</span></a></li>
  <li><a href="#" class="navLink_1" id="homeLink_1" alt="Home" title="Home"><h1>PLAY FUNNY SHORT GAMES</h1></a></li>
  <li><a href="#" class="navLink" id="homeLink_2" alt="Home" title="Home"><span class="navText">HOME</span><span class="material-symbols-outlined navLinkMobile">home</span></a></li>
  </ul>
  </nav>
  `;
};

export const printTemplateHeader = () => {
  document.querySelector('header').innerHTML = headerTemplate();
};
