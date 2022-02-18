document.addEventListener('DOMContentLoaded', event => {
  function getXHRdataPromise(method, path, errorMessage, responseType = null, body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, path);

      if (responseType) {
        xhr.responseType = responseType;
      }

      xhr.addEventListener('load', event => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(`Error ${errorMessage}: ${xhr.status}: ${xhr.statusText}`);
        }
      });

      xhr.send(body);
    });
  }

  const availableSchedulesPromise = getXHRdataPromise('GET', '/api/schedules', 'loading schedules', 'json');

  const staffPromise = getXHRdataPromise('GET', '/api/staff_members', 'loading staff names', 'json');

  Promise.all([availableSchedulesPromise, staffPromise]).then(results => {
    const getStaffName = (({staff_id}, staffList) => {
      return staffList.find(staffPerson => staffPerson.id === staff_id).name;
    });

    const bookingSelect = document.querySelector('#bookingSelect');

    const [ availableSchedules, staff ] = results;

    availableSchedules.filter(schedule => !schedule.student_email).forEach(schedule => {
      const newOption = document.createElement('option');
      newOption.setAttribute('name', 'id');
      newOption.setAttribute('value', schedule.id);
      newOption.textContent = `${getStaffName(schedule, staff)} | ${schedule.date} | ${schedule.time}`;
      bookingSelect.appendChild(newOption);
    });
  });

  const bookingForm = document.querySelector('#bookingForm');
  const registrationForm = document.querySelector('#registrationForm');

  bookingForm.addEventListener('submit', event => {
    event.preventDefault();

    function populateRegistrationForm() {
      registrationForm.querySelector('#newStudentEmail').value = document.querySelector('#bookingEmail').value;

      const bookingSequence = bookingRequest.responseText.match(/\d+/)[0];

      registrationForm.querySelector('#bookingSequence').value = bookingSequence;
    }

    const bookingRequest = new XMLHttpRequest();
    bookingRequest.open('POST', '/api/bookings');
    let formData = new FormData(bookingForm);

    bookingRequest.addEventListener('load', event => {
      if (bookingRequest.status === 204) {
        alert('Booked');
      } else if (bookingRequest.status === 404 && bookingRequest.responseText.includes('booking_sequence')) {
        alert('Student does not exist: register student to book schedule');

        document.querySelector('#newStudentRegistration').removeAttribute('hidden');
        populateRegistrationForm();

        registrationForm.addEventListener('submit', event => {
          event.preventDefault();

          const registrationRequest = new XMLHttpRequest();
          formData = new FormData(registrationForm);
          registrationRequest.open('POST', 'api/students');

          registrationRequest.addEventListener('load', event => {
            if (registrationRequest.status === 201) {
              alert(registrationRequest.responseText);

              const newBookingRequest = new XMLHttpRequest();
              newBookingRequest.open('POST', '/api/bookings');
              formData = new FormData(bookingForm);

              newBookingRequest.addEventListener('load', event => {
                if (newBookingRequest.status === 204) {
                  alert('Booked');
                  bookingForm.reset();
                  registrationForm.reset();
                  document.querySelector('#newStudentRegistration').setAttribute('hidden', '');
                } else {
                  alert(`Error: ${newBookingRequest.status}: ${newBookingRequest.responseText}`);
                }
              });

              newBookingRequest.send(formData);
            } else {
              alert(`Error: ${registrationRequest.status} ${registrationRequest.responseText}`);
            }
          });

          registrationRequest.send(formData);
        });
      } else {
        alert(`Error: ${bookingRequest.status} ${bookingRequest.responseText}`);
      }
    });

    bookingRequest.send(formData);
  });
});