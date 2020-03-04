import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import { createSearchInput, createSearchResults } from './components/search';

const cardList = ['Nissa', 'Ajani', 'Archon', 'Eidolon'];

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const title = createTitle('MagicDex', { className: 'title' });
  const searchInput = createSearchInput();
  let magicCards = createSearchResults(cardList);

  appendContent(header, [title]);
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
