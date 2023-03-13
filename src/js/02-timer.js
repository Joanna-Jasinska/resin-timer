import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
let timer = null;
let countdownDate = new Date();
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdownDate = selectedDates[0];
    if (validateDate(countdownDate)) {
      resetTimer();
    } else {
      if (timer) {
        clearInterval(timer);
        btnStart.innerText = 'Start';
        timer = null;
      }
      window.alert('Please choose a date in the future');
    }
    update();
  },
});

const validateDate = date => {
  const now = new Date();
  let valid = Number(date) > Number(now);
  btnStart.disabled = !valid;
  return valid;
};
const setTimer = e => {
  if (timer) {
    clearInterval(timer);
    btnStart.innerText = 'Start';
    timer = null;
  } else {
    timer = setInterval(update, 1000);
    btnStart.innerText = 'Stop';
  }
};
const resetTimer = () => {
  if (timer) {
    clearInterval(timer);
    btnStart.innerText = 'Start';
    timer = null;
  }
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
const update = () => {
  //   console.log('updating');
  let timeDifference = Number(countdownDate) - Number(new Date());
  let countdown = convertMs(timeDifference);
  daysDisplay.innerHTML = countdown.days;
  hoursDisplay.innerHTML = countdown.hours;
  minutesDisplay.innerHTML = countdown.minutes;
  secondsDisplay.innerHTML = countdown.seconds;
};
btnStart.addEventListener('click', setTimer);
// fp.destroy();
