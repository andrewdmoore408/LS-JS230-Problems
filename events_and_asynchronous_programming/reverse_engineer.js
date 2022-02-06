document.querySelector('html').addEventListener('click', () => {
  if (event.target.id === 'container') return;
  // NOTE: The line above works only if the element itself is clicked, but wouldn't work for any children of #container. LS's implementation uses Node.contains(), which is a better way to go since it will include descendants as well
      
  document.querySelector('#container').style = 'display: none';
});
