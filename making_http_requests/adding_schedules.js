document.addEventListener('DOMContentLoaded', () => {
  const staffInfoPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/staff_members');
    xhr.send();

    xhr.addEventListener('load', event => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(`${xhr.status} ${xhr.statusText}`);
      }
    });
  });

  let staffInfo = [];

  staffInfoPromise.then(response => {
    staffInfo = response.slice();

    const selectStaffElement = document.getElementById('staffname-select');

    response.forEach(staffmember => {
      const newOption = document.createElement('option');
      newOption.setAttribute('value', staffmember.name);
      newOption.textContent = staffmember.name;

      selectStaffElement.appendChild(newOption);
    });
  }).catch(error => alert(`Failed to load staff names: ${error}`));

  const form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formSubmit = new XMLHttpRequest();
    formSubmit.open('post', '/api/schedules');
    formSubmit.setRequestHeader('content-type', 'application/json; charset=utf-8');

    const schedulesData = { schedules: [], };

    let schedule = {};

    [...form.elements].forEach(field => {
      if (field.hasAttribute('name')) {
        if (field.name.includes('staffName')) {
          const id = staffInfo.find(staff => staff.name === field.value).id;
          schedule.staff_id = id;
        } else {
          schedule[field.name.slice(0, -1)] = field.value;
        }

        if (Object.keys(schedule).length === 3) {
          schedulesData.schedules.push(schedule);
          schedule = {};
        }
      }
    });

    formSubmit.send(JSON.stringify(schedulesData));
  });

  const addScheduleButton = document.getElementById('addScheduleButton');

  function walk(node, callback) {
    const children = node.childNodes;

    if (children.length === 0) return;

    for (let i = 0; i < children.length; i += 1) {
      callback(children[i]);
      walk(children[i], callback);
    }
  }

  addScheduleButton.addEventListener('click', event => {
    function incrementIndexNum(node) {
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (node.tagName === 'LEGEND') {
        const thisFormNum = parseInt(node.parentNode.parentNode.getAttribute('id').slice(-1), 10);
        let displayNum = thisFormNum + 1;
        node.textContent = `New Schedule ${displayNum}`;

        return;
      }

      const ATTRIBUTES = ['id', 'for', 'name'];

      if (ATTRIBUTES.every(attribute => !node.hasAttribute(attribute))) return;

      for (let i = 0; i < ATTRIBUTES.length; i += 1) {
        if (!node.hasAttribute(ATTRIBUTES[i])) continue;

        let attributeValue = node.getAttribute(ATTRIBUTES[i]);
        let indexNum = parseInt(attributeValue.slice(-1), 10);

        if (typeof indexNum === 'number' && !Number.isNaN(indexNum)) {
          indexNum += 1;
          attributeValue = attributeValue.slice(0, -1) + indexNum.toString();
          node.setAttribute(ATTRIBUTES[i], attributeValue);
        }
      }
    }

    const schedules = document.querySelectorAll('.scheduleDiv');
    const newScheduleForm = schedules[schedules.length - 1].cloneNode(true);

    incrementIndexNum(newScheduleForm);
    walk(newScheduleForm, incrementIndexNum);

    form.insertBefore(newScheduleForm, form.querySelector('input[type="submit"]'));
  });
});