document.addEventListener('DOMContentLoaded', event => {
  function addBookingElements(date) {
    const newDate = document.createElement('li');
    newDate.classList.add('outerDate');
    newDate.textContent = date;

    document.getElementById('bookingsDateList').appendChild(newDate);
  }

  let dates = [];
  let dateBookings = {};

  const datesRequest = new XMLHttpRequest();
  datesRequest.open('GET', 'api/bookings');
  datesRequest.responseType = 'json';
  datesRequest.send();

  datesRequest.addEventListener('load', event => {
    if (datesRequest.status === 200) {
      dates = datesRequest.response;

      dates.forEach(date => {
        const bookingsRequest = new XMLHttpRequest();
        bookingsRequest.open('GET', `/api/bookings/${date}`);
        bookingsRequest.responseType = 'json';
        bookingsRequest.send();

        bookingsRequest.addEventListener('load', event => {
          if (bookingsRequest.status === 200) {
            dateBookings[date] = bookingsRequest.response;

            addBookingElements(date);
          }
        });
      });

      document.getElementById('bookingsDateList').addEventListener('click', event => {
        if (event.target.classList.contains('outerDate')) {
          if (event.target.children.length === 0) {
            const ul = document.createElement('ul');
            event.target.appendChild(ul);

            const date = event.target.textContent;

            dateBookings[date].forEach(booking => {
              const newBooking = document.createElement('li');
              newBooking.textContent = `${booking[0]} | ${booking[1]} | ${booking[2]}`;
              ul.appendChild(newBooking);
            });
          } else {
            event.target.querySelector('ul').toggleAttribute('hidden');
          }
        }
      });
    } else {
      alert(`Error: ${datesRequest.status} ${datesRequest.statusText}`);
    }
  });
});