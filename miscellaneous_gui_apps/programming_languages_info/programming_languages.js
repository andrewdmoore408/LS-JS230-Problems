document.addEventListener('DOMContentLoaded', () => {
  const languages = [
    {
      name: 'Ruby',
      description: 'Ruby is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, including functional, object-oriented, and imperative. It also has a dynamic type system and automatic memory management.',
    },

    {
      name: 'JavaScript',
      description: 'JavaScript is a high-level, dynamic, untyped, and interpreted programming language. It has been standardized in the ECMAScript language specification. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production; the majority of websites employ it, and all modern Web browsers support it without the need for plug-ins. JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles.',
    },

    {
      name: 'C',
      description: 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions. It has found lasting use in applications previously coded in assembly language. Such applications include operating systems and various application software for computer architectures that range from supercomputers to PLCs and embedded systems.',
    },
    {
      name: 'Lisp',
      description: 'Lisp is a family of languages with a long history and a distinctive, fully parenthesized prefix notation.',
    },
  ];

  class App {
    constructor() {
      this.#setupHandlebarsUtilities();
      this.#renderLanguages();
      this.#bindEvents();
    }

    #bindEvents() {
      [...document.querySelectorAll('button')].forEach(function(button) {
        button.addEventListener('click', function(event) {
          [...this.parentElement.querySelectorAll('span')].forEach(span => {
            span.classList.toggle('remove');
          });

          if (this.textContent === 'Show more') {
            this.textContent = 'Show less';
          } else {
            this.textContent = 'Show more';
          }
        });
      });
    }

    #renderLanguages() {
      document.querySelector('#container').innerHTML = this.languageTemplate({languages: languages});
    }

    #setupHandlebarsUtilities() {
      this.languageTemplate = Handlebars.compile(document.querySelector('#languagesTemplate').innerHTML);

      Handlebars.registerHelper('beginningText', function() {
        return this.description.slice(0, 120);
      });

      Handlebars.registerHelper('remainderText', function() {
        return this.description.slice(120);
      });

      Handlebars.registerHelper('isShortText', function() {
        return this.description.length < 120;
      });
    }
  }

  new App();
});