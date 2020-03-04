import './search.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchInput(props) {
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...',
    value: props.value
  });
  return element;
}

function addtoFav(item) {
  //get Array from localStorage to compare
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  //check if item is in Array
  if (!favourites.includes(item)) {
    favourites.push(item);
  } else {
    let itemIndex = favourites.indexOf(item);
    if (itemIndex > -1) {
      favourites.splice(itemIndex, 1);
    }
  }

  //set up Array in localStorage with new item
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

export function createSearchResults(props) {
  const container = createElement('div', { className: 'listContainer' });

  props.results.forEach(item => {
    const element = createElement('div', {
      innerText: item,
      className: 'resultItem'
    });
    element.addEventListener('click', () => addtoFav(element.innerText));

    appendContent(container, element);
  });
  return container;
}
