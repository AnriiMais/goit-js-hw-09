function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);

let idInterval;
function changeColorBody() {
  const colorBody = document.querySelector('body');
  colorBody.style.backgroundColor = getRandomHexColor();
}
function onBtnStart(e) {
  idInterval = setInterval(changeColorBody, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}
refs.stopBtn.disabled = true;
function onBtnStop() {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  clearInterval(idInterval);
}
