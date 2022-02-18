function addForm() {
  const form = document.body.appendChild(document.createElement('form'));

  const fieldset = form.appendChild(document.createElement('fieldset'));

  const emailLabel = fieldset.appendChild(document.createElement('label'));
  const nameLabel = fieldset.appendChild(document.createElement('label'));

  emailLabel.setAttribute('for', 'email');
  emailLabel.textContent = 'Email: ';
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name: ';

  const emailInput = fieldset.insertBefore(document.createElement('input'), nameLabel);
  const nameInput = fieldset.appendChild(document.createElement('input'));

  const emailInputAttributes = {
    name: 'email',
    id: 'email',
    type: 'email',
    value: '',
    placeholder: 'email address',
  };

  const nameInputAttributes = {
    name: 'name',
    id: 'name',
    type: 'text',
    value: '',
    placeholder: 'your name',
  };

  for (let key in emailInputAttributes) {
    emailInput.setAttribute(key, emailInputAttributes[key]);
  }

  for (let key in nameInputAttributes) {
    nameInput.setAttribute(key, nameInputAttributes[key]);
  }

  const submitButton = form.appendChild(document.createElement('button'));
  submitButton.textContent = 'Submit';
  submitButton.setAttribute('type', 'submit');

  return form;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = addForm();

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);

    const request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');

    request.addEventListener('load', () => {
      if (request.status === 201) {
        alert('Successfully created staff with id ' + JSON.parse(request.response).id);
      } else if (request.status.toString()[0] === '4') {
        alert(request.responseText);
      }

      form.reset();
    });

    request.send(formData);
  });
});