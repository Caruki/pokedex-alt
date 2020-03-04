import './search.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchInput(startValue) {
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...',
    value: startValue
  });
  return element;
}

export function createSearchResults(cardList) {
  const container = createElement('div', { className: 'listContainer' });
  cardList.forEach(cardItem => {
    const element = createElement('div', {
      innerText: cardItem,
      className: 'resultItem'
    });

    appendContent(container, element);
  });
  return container;
}
