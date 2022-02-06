(function() {
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');
    
  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };

  function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement) return undefined;
      
    parentElement.addEventListener(eventType, event => {
      function getIntendedTag(selector) {
        const selectorElementIndex = selector.lastIndexOf(' ');
        let intendedTag;

        if (selectorElementIndex === -1) {
          intendedTag = selector;
        } else {
          intendedTag = selector.slice(selectorElementIndex + 1);
        }

        return intendedTag.toUpperCase();
      }     
        
      const intendedTag = getIntendedTag(selector);

      if (event.target.tagName === intendedTag && parentElement.contains(event.target)) {
        callback(event);
      }
    });
      
    return true;
  }
})();
