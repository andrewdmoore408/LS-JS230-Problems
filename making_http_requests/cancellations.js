document.addEventListener('DOMContentLoaded', event => {
  const cancelScheduleForm = document.querySelector('#cancelScheduleForm');
  const cancelBookingForm = document.querySelector('#cancelBookingForm');

  cancelScheduleForm.addEventListener('submit', event => {
    event.preventDefault();

    const scheduleID = document.querySelector('#scheduleID').value;

    const cancelScheduleRequest = new XMLHttpRequest();
    cancelScheduleRequest.open('DELETE', `api/schedules/${scheduleID}`);

    cancelScheduleRequest.addEventListener('load', event => {
      if (cancelScheduleRequest.status === 204) {
        alert('Schedule has been canceled');
      } else {
        alert(`ERROR: ${cancelScheduleRequest.status} ${cancelScheduleRequest.statusText}\n${cancelScheduleRequest.response}`);
      }
    });

    cancelScheduleRequest.send();
  });

  cancelBookingForm.addEventListener('submit', event => {
    event.preventDefault();

    const bookingID = document.querySelector('#bookingID').value;

    const cancelBookingRequest = new XMLHttpRequest();
    cancelBookingRequest.open('PUT', `api/bookings/${bookingID}`);

    cancelBookingRequest.addEventListener('load', event => {
      if (cancelBookingRequest.status === 204) {
        alert('Booking has been canceled');
      } else {
        alert(`ERROR: ${cancelBookingRequest.status} ${cancelBookingRequest.statusText}\n${cancelBookingRequest.response}`);
      }
    });

    cancelBookingRequest.send();
  });
});