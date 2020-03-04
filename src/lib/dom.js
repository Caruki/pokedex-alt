export function createElement(tagName, elementProperties = {}) {
  const element = document.createElement(tagName);
  Object.keys(elementProperties).forEach(propertyKey => {
    element[propertyKey] = elementProperties[propertyKey];
  });
  return element;
}

export function appendContent(parent, content) {
  if (Array.isArray(content)) {
    content.forEach(element => {
      parent.appendChild(element);
    });
  } else {
    parent.appendChild(content);
  }
}
