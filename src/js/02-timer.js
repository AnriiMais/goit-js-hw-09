import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerSeconds = document.querySelector('span[data-seconds]');
const timerMinutes = document.querySelector('span[data-minutes]');
const inputDate = document.querySelector('#date-selector');
const BtnStartCountdown = document.querySelector('button[data-start]');
const BtnStopCountdown = document.querySelector('button[data-stop]');

BtnStartCountdown.disabled = true;
let saveDate;
let intervalId;
let isRunInterval = false;
let currentTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    saveDate = selectedDates[0];
    if (Date.now() < selectedDates[0].valueOf()) {
      BtnStartCountdown.removeAttribute('disabled');
    } else BtnStartCountdown.disabled = true;
  },
  onClose(selectedDates) {
    saveDate = selectedDates[0];
    if (Date.now() > selectedDates[0].valueOf()) {
      alert('Please choose a date in the future');
    } else {
      BtnStartCountdown.disabled = false;
    }
  },
};
flatpickr(inputDate, options);
BtnStartCountdown.addEventListener('click', onCountdownStart);
BtnStopCountdown.addEventListener('click', onBtnStop);

function onCountdownStart(e) {
  if (!isRunInterval) {
    isRunInterval = true;
    intervalId = setInterval(() => {
      currentTime = Date.now();
      const deltaTime = saveDate.getTime() - currentTime;
      if (deltaTime <= 0) {
        clearInterval(intervalId);
        return false;
      }
      const getDatePart = convertMs(deltaTime);
      const { days, hours, minutes, seconds } = getDatePart;
      console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);

      timerDays.textContent = days;
      timerHours.textContent = hours;
      timerMinutes.textContent = minutes;
      timerSeconds.textContent = seconds;
    }, 1000);
  }
}

function onBtnStop(e) {
  clearInterval(intervalId);
  isRunInterval = false;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
