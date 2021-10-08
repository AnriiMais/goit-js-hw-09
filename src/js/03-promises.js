import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  inputForm: document.querySelector('.form'),
  firstDelayInput: document.querySelector('input[name="delay"]'),
  stepDelay: document.querySelector('input[name="step"]'),
  amountInp: document.querySelector('input[name="amount"]'),
};

refs.inputForm.addEventListener('submit', onFormSubmit);
function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      }
      rej({ position, delay });
    }, delay);
  });
}
function onFormSubmit(e) {
  e.preventDefault();
  // refs.inputForm.reset();
  const amount = +refs.amountInp.value;
  const step = +refs.stepDelay.value;
  let delay = +refs.firstDelayInput.value;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
        Notify.init({
          useIcon: false,
          fontSize: '16px',
          distance: '30px',
          info: { background: 'green', notiflixIconColor: 'white' },
        });
        Notify.info(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay} ms`);
        Notify.init({
          useIcon: false,
          distance: '30px',
          fontSize: '16px',
          info: { background: 'red', notiflixIconColor: 'white' },
        });
        Notify.info(`❌ Rejected promise ${position} in ${delay} ms`);
      });
    delay += step;
  }
}
