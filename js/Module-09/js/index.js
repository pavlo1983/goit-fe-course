/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

"use strict";

const stopwatch = document.querySelector(".stopwatch");
const initTime = stopwatch.querySelector(".js-time");
const btn = stopwatch.querySelectorAll(".btn");
const startBtn = stopwatch.querySelector(".js-start");
const lapBtn = stopwatch.querySelector(".js-take-lap");
const resetBtn = stopwatch.querySelector(".js-reset");
const laps = document.querySelector(".js-laps");

let timerId = null;

let startTime = Date.now();
let deltaTime = 0;
let isActive;

if (!isActive) {
  resetBtn.hidden = true;
}
startBtn.addEventListener("click", handleStart);
resetBtn.addEventListener("click", handleReset);
//startBtn.addEventListener("click", handlePause);

function handleStart() {
  if (!timerId) {
    timerId = setInterval(() => {
      const currentTime = Date.now();
      deltaTime = currentTime - startTime;
      const time = new Date(deltaTime);

      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

      const min = minutes > 10 ? minutes : "0" + minutes;
      const sec = seconds > 10 ? seconds : "0" + seconds;
      const msec = Number.parseInt(time.getMilliseconds() / 100);

      initTime.textContent = `${min}:${sec}.${msec}`;
    }, 100);
  }
}

/*function handlePause () {
 if (!isActive) {
    clearInterval(timerId);
    startBtn.textContent = "Pause";
    resetBtn.hidden = false;
  } 
}*/

function handleReset() {
  clearInterval(timerId);
  initTime.textContent = "00:00.0";
  startBtn.textContent = "Start";
  resetBtn.hidden = true;
  return handleStart;
}
