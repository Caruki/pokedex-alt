import './search.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchInput(props) {
  const container = createElement('div', { className: 'searchContainer' });
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...',
    value: props.value
  });
  appendContent(container, element);
  return container;
}

function addtoFavourites(item) {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  if (!favourites.includes(item)) {
    favourites.push(item);
  } else {
    let itemIndex = favourites.indexOf(item);
    if (itemIndex > -1) {
      favourites.splice(itemIndex, 1);
    }
  }
  if (favourites.length > 40) {
    favourites = favourites.splice(0, 1);
  }

  localStorage.setItem('favourites', JSON.stringify(favourites));
}

export function createShowAllButton() {
  const element = createElement('button', {
    type: 'button',
    innerHTML: 'Show All',
    className: 'showAllButton'
  });
  return element;
}

export function createSearchResults(props) {
  const container = createElement('div', { className: 'listContainer' });

  props.results.forEach(item => {
    const element = createElement('div', {
      innerText: item,
      className: 'resultItem'
    });
    element.addEventListener('click', () => addtoFavourites(element.innerText));

    appendContent(container, element);
  });
  return container;
}
