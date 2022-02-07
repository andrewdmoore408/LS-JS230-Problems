const tracker = (() => {
  const list = [];
  
  function notInList(newEvent) {
    return !(list.some(listEvent => listEvent.type === newEvent.type && listEvent.target === newEvent.target));
  }
  
  return {
    add(event) {
      if (notInList(event)) {
        list.push(event);
      }
    },
    
    clear() {
      list.length = 0;
      return list.length;
    },
    
    elements() {
      return list.map(({ target }) => target);
    },
    
    list() {
      return list.slice();
    },
  };
})();

function track(callback) {
  return event => {
    tracker.add(event);
    callback(event);
  };
}

const divRed = document.getElementById('red');
const divBlue = document.getElementById('blue');
const divOrange = document.getElementById('orange');
const divGreen = document.getElementById('green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));
