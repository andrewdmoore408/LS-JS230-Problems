document.addEventListener('DOMContentLoaded', () => {
  const quizData = (() => {
    return {
      questions: [
        {
          id: 1,
          description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
          options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
        },
        {
          id: 2,
          description: 'Which of the following numbers is the answer to Life, the \
                        Universe and Everything?',
          options: ['66', '13', '111', '42'],
        },
        {
          id: 3,
          description: 'What is Pan Galactic Gargle Blaster?',
          options: ['A drink', 'A machine', 'A creature', 'None of the above'],
        },
        {
          id: 4,
          description: 'Which star system does Ford Prefect belong to?',
          options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
        },
      ],

      answerKey: { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' },
    };
  })();

  const form = document.querySelector('form');

  class Display {
    static renderQuiz() {
      const questionsContainer = document.createElement('div');
      questionsContainer.setAttribute('id', 'questionsContainer');

      quizData.questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.innerHTML = `${question.id}. ${question.description}`;
        questionDiv.append(questionText);

        const questionChoices = [];

        question.options.forEach(choice => {
          const choiceLabel = document.createElement('label');
          choiceLabel.textContent = choice;

          const choiceRadio = document.createElement('input');
          choiceRadio.setAttribute('type', 'radio');
          choiceRadio.setAttribute('value', choice);
          choiceRadio.setAttribute('name', question.id);

          choiceLabel.insertAdjacentElement('afterbegin', choiceRadio);
          questionChoices.push(choiceLabel);
        });

        questionDiv.append(...questionChoices);
        const messageSpan = document.createElement('span');
        messageSpan.setAttribute('id', `questionMessage${question.id}`);
        messageSpan.classList.add('questionMessage');
        messageSpan.classList.add('invisible');

        const messageContainer = document.createElement('p');
        messageContainer.append(messageSpan);

        questionDiv.append(messageContainer);

        questionsContainer.append(questionDiv);
      });

      form.insertBefore(questionsContainer, form.querySelector('button[type="submit"]'));
    }

    static reset() {
      const classesToRemove = ['correctAnswer', 'incorrectAnswer', 'noAnswer'];
      const submitButton = document.querySelector('#submitBtn');
      submitButton.classList.remove('inactive');
      submitButton.removeAttribute('disabled');

      [...document.querySelectorAll('input[type="radio"]')].forEach(radio => {
        radio.checked = false;
      });
      [...document.querySelectorAll('span.questionMessage')].forEach(questionMessage => {
        questionMessage.textContent = '';
        questionMessage.classList.remove(...classesToRemove);
        questionMessage.classList.add('invisible');
      });
    }

    static showResults(results) {
      const MESSAGES_INFO = {
        'correct': {
          text: 'Correct!',
          class: 'correctAnswer',
        },
        'incorrect': {
          text: 'Incorrect. The correct answer is:',
          class: 'incorrectAnswer',
        },
        'no answer': {
          text: 'No response. The correct answer is:',
          class: 'noAnswer',
        }
      };

      for (let questionID in results) {
        const messageInfo = MESSAGES_INFO[results[questionID].response];
        const questionMessage = document.querySelector(`#questionMessage${questionID}`);

        questionMessage.textContent = `${messageInfo.text} ${results[questionID].correctAnswer ? results[questionID].correctAnswer : ''}`;
        questionMessage.classList.add(messageInfo.class);
        questionMessage.classList.remove('invisible');
      }
    }
  }

  class ValidateQuiz {
    static getQuizResults() {
      const formData = new FormData(form);
      const answers = Object.entries(quizData.answerKey);

      const quizResults = answers.reduce((results, [ questionID, answer ]) => {
        const userResponse = formData.get(questionID);

        if (userResponse) {
          if (userResponse === answer) {
            results[questionID] = {response: 'correct'};
          } else {
            results[questionID] = {
              response: 'incorrect',
              correctAnswer: answer,
            };
          }
        } else {
          results[questionID] = {
            response: 'no answer',
            correctAnswer: answer,
          };
        }

        return results;
      }, {});

      return quizResults;
    }
  }

  Display.renderQuiz();

  form.addEventListener('submit', event => {
    event.preventDefault();

    const submitButton = document.querySelector('#submitBtn');
    submitButton.classList.add('inactive');
    submitButton.setAttribute('disabled', '');

    const quizResults = ValidateQuiz.getQuizResults();
    console.log(quizResults);
    Display.showResults(quizResults);
  });

  document.querySelector('#resetBtn').addEventListener('click', event => {
    Display.reset();
  });
});