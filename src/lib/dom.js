export function createElement(tagName, elementProperties) {
  const element = document.createElement(tagName);
  Object.keys(elementProperties).forEach(propertyKey => {
    element[propertyKey] = elementProperties[propertyKey];
  });
  return element;
}
