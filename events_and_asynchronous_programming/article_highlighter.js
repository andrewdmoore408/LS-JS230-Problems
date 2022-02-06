// NOTE: My implementation here iterates through all elements which could be highlighted and removes the 'highlight' class from them.
// A much better approach to keep in mind in the future is what the LS solution does: use the class name to querySelector to retrieve
// the (first, but there should be only one anyway) element that has that class.

// Remember that querySelector can use any CSS selectors!

function traverseTree(element, callback) {
  if (element) {
    callback(element);
  }
  
  for (let i = 0; i < element.children.length; i += 1) {
    traverseTree(element.children[i], callback);
  }
}

function clearHighlights() {
  traverseTree(document.querySelector('main'), (element) => {
    element.classList.remove('highlight');
  });
};

document.querySelector('ul').addEventListener('click', event => {
  event.stopPropagation();
  
  clearHighlights();
  const articleHref = event.target.href;
  const articleId = articleHref.slice(articleHref.lastIndexOf('#') + 1);
  document.getElementById(articleId).classList.add('highlight');

});

document.body.addEventListener('click', event => {
  event.stopPropagation();
  
  clearHighlights();
  document.querySelector('main').classList.add('highlight');
});

[...document.querySelectorAll('article')].forEach(article => {
  article.addEventListener('click', event => {
    event.stopPropagation();
  
    clearHighlights();
    event.currentTarget.classList.add('highlight');
  });
});
