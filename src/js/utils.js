const selectDOMElement = (selector) => {
  return document.querySelector(selector);
};

const createDOMElement = (tag) => {
  return document.createElement(tag);
}

export { selectDOMElement, createDOMElement }