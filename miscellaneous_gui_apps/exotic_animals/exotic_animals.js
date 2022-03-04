document.addEventListener('DOMContentLoaded', () => {
  const displayCaptionTimeout = {id: null};

  document.querySelector('#photoGrid').addEventListener('mouseover', event => {
    if (event.target.tagName !== 'IMG') return;

    displayCaptionTimeout.id = setTimeout(() => event.target.nextElementSibling.classList.remove('invisible'), 2000);
  });

  document.querySelector('#photoGrid').addEventListener('mouseout', event => {
    if (event.target.tagName !== 'IMG') return;

    clearTimeout(displayCaptionTimeout.id);
    event.target.nextElementSibling.classList.add('invisible');
  });
});