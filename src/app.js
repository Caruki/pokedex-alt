import './app.scss';
import './components/search.scss';
import { createElement } from './lib/dom';
import { title } from './components/title';
import { search } from './components/search';
import { magicCards } from './components/search';

const cardList = ['Nissa', 'Ajani', 'Archon', 'Eidolon'];

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const titleElement = title('MagicDex', { className: 'title' });
  const searchElement = search();

  header.appendChild(titleElement);
  main.appendChild(searchElement);

  const searchResults = createElement('div', {});
  main.appendChild(searchResults);

  searchElement.addEventListener('search', event => {
    searchResults.innerHTML = '';
    const searchValue = event.target.value;

    const filteredCards = cardList.filter(card => {
      return card.startsWith(searchValue);
    });
    const cardItem = magicCards(filteredCards);
    searchResults.appendChild(cardItem);
  });

  return [header, main];
}
