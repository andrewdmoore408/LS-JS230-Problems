const todos = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Groceries' },
  { id: 3, title: 'Calling Mom and Pops' },
  { id: 4, title: 'Coffee with Ivan' }
];

document.addEventListener('DOMContentLoaded', () => {
  class App {
    #idToDelete;
    #confirmModal;

    constructor() {
      this.#confirmModal = document.querySelector('dialog');
      this.#setUpHandlebars();
      this.#renderTodos();
      this.#bindEvents();
    }

    #bindEvents() {
      this.#confirmModal.addEventListener('click', this.#handleModalClick.bind(this));

      [...document.querySelectorAll('a')].forEach(a => a.addEventListener('click', this.#handleInitialDeleteClick.bind(this)));
    }

    #handleInitialDeleteClick(event) {
      this.#idToDelete = event.currentTarget.getAttribute('data-id');
      this.#confirmModal.showModal();
    }

    #handleModalClick(event) {
      if (event.target.value === 'confirmDelete') {
        document.querySelector(`p[data-id="${this.#idToDelete}"]`).remove();
      }

      event.currentTarget.close();
    }

    #renderTodos() {
      document.querySelector('#todos').innerHTML = this.todosTemplate({todos: todos});
    }

    #setUpHandlebars() {
      this.todosTemplate = Handlebars.compile(document.querySelector('#todosTemplate').innerHTML);
    }
  }

  new App();
});