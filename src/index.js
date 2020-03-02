function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Pokedex';

  return element;
}

document.body.appendChild(component());
