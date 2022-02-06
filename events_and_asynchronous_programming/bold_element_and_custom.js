function makeBold(element, func) {
  element.style.fontWeight = 'bold';
  
  if (func) func(element);
}

// Further Exploration:
// I didn't look at the hint before my implementation, 
// so I ended up not reusing the original makeBold function.

document.addEventListener('click', event => {
  event.target.style.fontWeight = 'bold';
  event.target.dispatchEvent(bolded);
});

const section = document.querySelector('section');
const bolded = new CustomEvent('bolded', {
  bubbles: true,
});

section.addEventListener('bolded', (event) => {
  event.target.classList.add('smallText');
});
