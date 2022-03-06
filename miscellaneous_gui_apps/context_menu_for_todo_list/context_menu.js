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
    #contextMenu;
    #todos;

    constructor() {
      this.#confirmModal = document.querySelector('dialog');
      this.#contextMenu = document.querySelector('#contextMenu');
      this.#todos = document.querySelector('#todos');
      this.#setUpHandlebars();
      this.#renderTodos();
      this.#bindEvents();
    }

    #bindEvents() {
      this.#confirmModal.addEventListener('click', this.#handleModalClick.bind(this));

      this.#todos.addEventListener('contextmenu', this.#handleRightClick.bind(this));

      document.body.addEventListener('click', event => {
        this.#contextMenu.classList.add('hidden');
      });

      this.#contextMenu.addEventListener('click', this.#handleClickOnContextMenu.bind(this));
    }

    #handleClickOnContextMenu(event) {
      if (event.target.textContent === 'Delete Todo') {
        this.#confirmModal.showModal();
      }

      this.#contextMenu.classList.add('hidden');
    }

    #handleModalClick(event) {
      if (event.target.tagName !== 'BUTTON') return;

      if (event.target.value === 'confirmDelete') {
        document.querySelector(`p[data-id="${this.#idToDelete}"]`).remove();
      }

      event.currentTarget.close();
    }

    #handleRightClick(event) {
      if (event.target.tagName !== 'SPAN') return;

      event.preventDefault();

      this.#idToDelete = event.target.getAttribute('data-id');

      this.#contextMenu.style.left = `${event.clientX}px`;
      this.#contextMenu.style.top = `${event.clientY}px`;
      this.#contextMenu.classList.remove('hidden');
    }

    #renderTodos() {
      this.#todos.innerHTML = this.todosTemplate({todos: todos});
    }

    #setUpHandlebars() {
      this.todosTemplate = Handlebars.compile(document.querySelector('#todosTemplate').innerHTML);
    }
  }

  new App();
});