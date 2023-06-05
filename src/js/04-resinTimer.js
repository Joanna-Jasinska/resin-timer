import 'flatpickr/dist/flatpickr.min.css';
// import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const RESIN_MS = 8 * 60 * 1000;
const RESIN_MS_DAILY_DELAY = 5 * 60 * 1000; //-5min
const DATE_DISPLAY_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}; //weekday: 'long',

const resinInput = document.querySelector('#resin');
const resin = () => parseInt(resinInput.value) || 0;

const saving = () => document.querySelector('#save').checked;

const next20 = document.querySelector('[data-20]');
const next40 = document.querySelector('[data-40]');
const next60 = document.querySelector('[data-60]');
const fullAt = document.querySelector('[data-date]');
const add20 = document.querySelector('[data-plus]');
const remove20 = document.querySelector('[data-minus]');
const warningFull = document.querySelector('[data-warningFull]');
const saveCheckbox = document.querySelector('#save');

let initNow = 0; //Number(new Date() - RESIN_MS_DAILY_DELAY); //.getTime();

let lastData = {
  date: Number(new Date() - RESIN_MS_DAILY_DELAY),
  resin: resin(),
  saving: true,
};
const saveData = () => {
  if (saving()) {
    const settings = {
      date: Number(new Date() - RESIN_MS_DAILY_DELAY),
      resin: resin(),
      saving: true,
    };
    console.log(settings);
    localStorage.setItem('save', JSON.stringify(settings));
    Notify.success('Saving data.');
  }
};
const updateData = () => {
  if (!lastData) {
    lastData = {
      date: Number(new Date() - RESIN_MS_DAILY_DELAY),
      resin: resin(),
      saving: false,
    };
  }
  initNow = Number(new Date() - RESIN_MS_DAILY_DELAY);
  const betweenSavedTime = initNow - lastData.date;
  const addedResin = Math.floor(betweenSavedTime / RESIN_MS) - 0;
  const newResin = 0 + Number(lastData.resin + addedResin);
  // Notify.failure(
  //   `resin previously:${lastData.resin} resin to be added: ${addedResin} newResin =${newResin}`
  // );
  if (lastData.resin != newResin) {
    Notify.warning(
      'Updated ' +
        lastData.resin +
        ' -> ' +
        newResin +
        ' (time= ' +
        betweenSavedTime +
        ' )'
    );
    // Notify.warning('Updated');
  }
  resinInput.value = newResin;
};
const loadData = () => {
  lastData = JSON.parse(localStorage.getItem('save'));
  updateData();
  document.querySelector('#save').checked = JSON.parse(lastData.saving);
  // resinInput.value = lastData.resin;
  if (saving()) Notify.warning('Data loaded.');
};
loadData();
const onSaveCheckbox = () => {
  if (saving()) {
    saveData();
  } else {
    Notify.failure('Deleting data from local storage.');
    lastData = {
      date: Number(new Date() - RESIN_MS_DAILY_DELAY),
      resin: resin(),
      saving: false,
    };
    localStorage.setItem('save', '');
  }
};

let timer = null;
let singleResinTimer = null;
let SRTInterval = 0;

const SRTTick = () => {
  console.log('tick: got one resin more');
  resinInput.value = Number(resin()) + 1;
  saveData();
  Notify.info(`Resin increased to ${resinInput.value}`);
};

const getMSToNearestResin = () => {
  const now = new Date();
  const todayMS =
    now.getHours() * 60 * 60 * 1000 +
    now.getMinutes() * 60 * 1000 +
    now.getSeconds() * 1000 +
    now.getMilliseconds() -
    RESIN_MS_DAILY_DELAY;

  const nextRMS = RESIN_MS - (todayMS % RESIN_MS);
  const nextRMins = Math.floor(nextRMS / 60000) - 0;
  const nextRSecs = Math.floor((nextRMS - nextRMins * 60 * 1000) / 1000) - 0;
  Notify.info(`Resin incease in ${nextRMins}m  ${nextRSecs - 1}s`);
  return nextRMS;
};

function objectifyMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = String(Math.floor(ms / day)).padStart(2, 0);
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, 0);
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    0
  );
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, 0);
  return { days, hours, minutes, seconds };
}
const resinToMSec = r => r * RESIN_MS + initNow;
const getGoalDateByResin = (resin, neededResin) => {
  const diff = neededResin - (resin % neededResin);
  return resinToMSec(diff);
};
const DateObjToStr = (d, format = 'date') => {
  // formats: 'date' or 'countdown'
  // date time when finish / hours minutes to the end
  return format == 'date'
    ? `date `
    : `${d.hours}h  ${d.minutes}min ${d.seconds}s`;
};
const dateToStr = d => {
  // const month
  return ``;
};
const updateR = () => {
  const filledMS = getGoalDateByResin(resin(), 160);
  const filledDate = new Date(filledMS);
  let timeDifference = Number(filledMS) - Number(new Date());
  let countdown = objectifyMs(timeDifference);
  next20.innerHTML = DateObjToStr(
    objectifyMs(Number(getGoalDateByResin(resin(), 20)) - Number(new Date())),
    'countdown'
  );
  next40.innerHTML = DateObjToStr(
    objectifyMs(Number(getGoalDateByResin(resin(), 40)) - Number(new Date())),
    'countdown'
  );
  const d60 = new Date(
    Number(getGoalDateByResin(resin(), 60))
  ).toLocaleDateString('pl-PL', DATE_DISPLAY_OPTIONS);
  next60.innerHTML = d60;
  fullAt.innerHTML = new Date(
    Number(getGoalDateByResin(resin(), 160))
  ).toLocaleDateString('pl-PL', DATE_DISPLAY_OPTIONS);
  // Notify.failure(filledDate.getHours());
  warningFull.innerHTML =
    Number(filledDate.getDay()) == Number(new Date().getDay())
      ? ' Dzisiaj'
      : filledDate.getHours() < 9
      ? 'Rano'
      : ' ';
  // daysDisplay.innerHTML = countdown.days;
  // hoursDisplay.innerHTML = countdown.hours;
  // minutesDisplay.innerHTML = countdown.minutes;
  // secondsDisplay.innerHTML = countdown.seconds;
};
const setRTimer = () => {
  updateR();
  timer = setInterval(updateR, 1000);
};
const onInputResinChange = () => {
  saveData();
};
// --------------------------------------
// --------------------------------------
add20.addEventListener('click', () => {
  if (resin() + 20 <= 160) {
    resinInput.value = Number(resinInput.value) + 20;
    saveData();
  } else {
    resinInput.value = 160;
  }
});
remove20.addEventListener('click', () => {
  if (resin() - 20 >= 0) {
    resinInput.value = Number(resinInput.value) - 20;
    saveData();
  } else {
    resinInput.value = 0;
  }
});
resinInput.addEventListener('change', onInputResinChange);
saveCheckbox.addEventListener('change', onSaveCheckbox);
let countdownDate = getGoalDateByResin(resin(), 160); // =new Date();
setRTimer();
// SRTInterval=getMSToNearestResin();
singleResinTimer = setInterval(() => {
  // SRTInterval=RESIN_MS;
  clearInterval(singleResinTimer);
  SRTTick();
  singleResinTimer = setInterval(SRTTick, RESIN_MS);
}, getMSToNearestResin());
// --------------------------------------
// --------------------------------------
