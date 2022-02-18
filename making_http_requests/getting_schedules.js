document.addEventListener('DOMContentLoaded', () => {
  const method = 'GET';
  const path = '/api/schedules';

  const request = new XMLHttpRequest();
  request.open(method, path);
  request.timeout = 5000;

  request.addEventListener('load', event => {
    const schedules = JSON.parse(request.response).filter(schedule => schedule.student_email === null);

    const div = document.body.appendChild(document.createElement('div'));

    if (schedules.length === 0) {
      div.textContent = 'There are no available schedules at the moment.';
    } else {
      const availableStaff = schedules.reduce((memo, schedule) => {
        if (memo[schedule.staff_id]) {
          memo[schedule.staff_id] += 1;
        } else {
          memo[schedule.staff_id] = 1;
        }

        return memo;
      }, {});

      const ul = div.appendChild(document.createElement('ul'));

      for (let staffID in availableStaff) {
        const li = ul.appendChild(document.createElement('li'));
        li.textContent = `staff ${staffID}: ${availableStaff[staffID]}`;
      }
    }
  });

  request.addEventListener('timeout', event => {
    document.body.appendChild(document.createElement('p')).textContent = 'The request timed out. Please try again.';
  });

  request.addEventListener('loadend', event => {
    document.body.appendChild(document.createElement('p')).textContent = 'This request has completed.';
  });

  request.send();
});
