import './favourites.scss';
import { createElement, appendContent } from '../lib/dom';

export function createFavouriteList(props) {
  const container = createElement('div', {
    className: 'favouriteListContainer'
  });

  props.items.forEach(item => {
    const favourite = createElement('div', {
      innerText: item,
      className: 'favouriteCard'
    });
    appendContent(container, favourite);
  });

  return container;
}

export function addToFavourites(item) {
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
  return favourites;
}
