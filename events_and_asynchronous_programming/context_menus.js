document.querySelector('main').addEventListener('contextmenu', event => {
  event.preventDefault();
  alert('main!');
});

document.getElementById('sub').addEventListener('contextmenu', event => {
  event.stopPropagation();
  event.preventDefault();
  alert('sub!');
});
