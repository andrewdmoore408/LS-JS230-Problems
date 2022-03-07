const cars = [
  { make: 'Honda', image: './images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: './images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: './images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: './images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: './images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: './images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: './images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

document.addEventListener('DOMContentLoaded', () => {
  class App {
    #carTemplate;
    #optionsTemplate;

    constructor() {
      this.#carTemplate = Handlebars.compile(document.querySelector('#carTemplate').innerHTML);
      this.#optionsTemplate = Handlebars.compile(document.querySelector('#optionsTemplate').innerHTML);

      this.#renderCars();
      this.#setUpFilters();
      this.#bindEvents();
    }

    #bindEvents() {
      document.querySelector('#filterBtn').addEventListener('click', this.#handleFilter.bind(this));
    }

    #currentFilters() {
      return [...document.querySelectorAll('.filter')].reduce((memo, filter) => {
        memo[filter.getAttribute('data-filter')] = filter.value;

        return memo;
      }, {});
    }

    #handleFilter(event) {
      const cars = [...document.querySelectorAll('.car')];
      const filters = this.#currentFilters();

      cars.forEach(car => car.classList.remove('hidden'));

      Object.keys(filters).forEach(attribute => {
        const nonMatchingCars = cars.filter(car => {
          return (filters[attribute] !== 'noFilter' && car.getAttribute(`data-${attribute}`) !== filters[attribute]);
        });

        nonMatchingCars.forEach(nonMatchingCar => nonMatchingCar.classList.add('hidden'));
      });
    }

    #getOptionsLists() {
      const ATTRIBUTES_INDEXES = {
        make: 0,
        model: 1,
        year: 2,
        price: 3,
      };

      const lists = cars.reduce((attributesArrays, car) => {
        Object.keys(ATTRIBUTES_INDEXES).forEach(attr => {
          if (!attributesArrays[ATTRIBUTES_INDEXES[attr]].includes(car[attr])) {
            attributesArrays[ATTRIBUTES_INDEXES[attr]].push(car[attr]);
          }
        });

        return attributesArrays;
      }, [[], [], [], []]);

      return {
        make: lists[ATTRIBUTES_INDEXES.make],
        model: lists[ATTRIBUTES_INDEXES.model],
        year: lists[ATTRIBUTES_INDEXES.year],
        price: lists[ATTRIBUTES_INDEXES.price],
      };
    }

    #renderCars() {
      document.querySelector('#cars').innerHTML = this.#carTemplate({cars: cars});
    }

    #setUpFilters() {
      const optionsLists = this.#getOptionsLists();

      Object.keys(optionsLists).forEach(listName => {
        document.querySelector(`#${listName}Select`).innerHTML = this.#optionsTemplate({options: optionsLists[listName]});
      });
    }
  }

  new App();
});