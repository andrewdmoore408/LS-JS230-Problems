function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  const duration = callbacks.length * 2;
  
  const delays = (() => {
    const getRandomDelay = () => (Math.floor(Math.random() * duration)) * 1000;
    
    return callbacks.map(_ => getRandomDelay());
  })();
  
  for (let i = 0; i < callbacks.length; i += 1) {
    setTimeout(callbacks[i], delays[i]);
  }
  
  for (let i = 1; i <= duration; i += 1) {
    setTimeout(() => console.log(i), i * 1000);
  }
}
