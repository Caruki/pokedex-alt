import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import { createSearchInput, createSearchResults } from './components/search';
import Logo from './assets/logo.svg';

const cardList = ['Nissa', 'Ajani', 'Archon', 'Eidolon'];

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const title = createTitle('MagicDex', { className: 'title' });
  // const searchValueInput = sessionStorage.getItem('searchValue');
  const searchInput = createSearchInput(sessionStorage.getItem('searchValue'));
  const logo = createElement('img', { src: Logo, className: 'logo' });
  let magicCards = createSearchResults(cardList);

  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, magicCards]);

  searchInput.addEventListener('input', event => {
    main.removeChild(magicCards);
    const searchValue = event.target.value;
    const lowerCaseSearchValue = event.target.value.toLowerCase();
    const filteredCards = cardList.filter(card => {
      if (searchValue.length > 0) {
        return card.toLowerCase().includes(lowerCaseSearchValue);
      }
    });
    magicCards = createSearchResults(filteredCards);
    appendContent(main, magicCards);
    sessionStorage.setItem('searchValue', searchValue);
    // console.log(sessionStorage.getItem('searchValue'));
  });

  return [header, main];
}
