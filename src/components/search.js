import './search.scss';
import { createElement } from '../lib/dom';

export function search() {
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...'
  });
  return element;
}

export function magicCards(cardList) {
  const container = createElement('div', { className: 'listContainer' });
  cardList.forEach(cardItem => {
    const element = createElement('div', {
      innerText: cardItem,
      className: 'resultCard'
    });

    container.appendChild(element);
  });
  return container;
}
