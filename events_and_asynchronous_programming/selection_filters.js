const ANIMALS = {
  Classifications:['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  Vertebrate:     ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: 	      ['Bear', 'Whale'],
  Bird: 	        ['Ostrich'],
};

const CLASSIFICATIONS = {
  Animals:    ['Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  Bear: 	    ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: 	  ['Vertebrate', 'Cold-blooded'],
  Whale: 	    ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmon: 	  ['Vertebrate', 'Cold-blooded'],
  Ostrich: 	  ['Vertebrate', 'Warm-blooded', 'Bird'],
};

function clearDropdowns() {
  [...document.querySelectorAll('select')].forEach(select => {
    select.selectedIndex = 0;
    
    [...select.children].forEach(option => {
      option.removeAttribute('hidden');
    });
  });  
}

function displayCorrectAnimals(classification) {
  const animalsToDisplay = ANIMALS[classification];
  
  [...document.getElementById('animals').children].forEach(option => {
    if (animalsToDisplay.includes(option.value)) {
      option.removeAttribute('hidden');
    } else {
      option.setAttribute('hidden', "");
    }
  });
}

function displayCorrectClassifications(animal) {
  const classificationsToDisplay = CLASSIFICATIONS[animal];
  
  [...document.getElementById('animal-classifications').children].forEach(option => {
    if (classificationsToDisplay.includes(option.value)) {
      option.removeAttribute('hidden');
    } else {
      option.setAttribute('hidden', "");
    }
  });
}

document.querySelector('button').addEventListener('click', event => {
  event.preventDefault();
  clearDropdowns();
});

[...document.querySelectorAll('select')].forEach(select => {
  select.addEventListener('change', event => {
    if (select.id === 'animal-classifications') {
      displayCorrectAnimals(select.value);
    } else {
      displayCorrectClassifications(select.value);
    }
  });
});
