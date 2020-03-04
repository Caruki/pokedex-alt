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
  const searchInput = createSearchInput();
  const logo = createElement('img', { src: Logo, className: 'logo' });
  let magicCards = createSearchResults(cardList);

  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, magicCards]);

  searchInput.addEventListener('search', event => {
    main.removeChild(magicCards);
    const searchValue = event.target.value;
    const filteredCards = cardList.filter(card => {
      return card.startsWith(searchValue);
    });
    magicCards = createSearchResults(filteredCards);
    appendContent(main, magicCards);
  });

  return [header, main];
}
