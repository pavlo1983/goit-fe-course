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

const clockface = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const lapBtn = document.querySelector(".js-take-lap");
const resetBtn = document.querySelector(".js-reset");

let isActive;

if (!isActive) {
  resetBtn.hidden = true;
}

class Stopwatch {
  constructor({ onTick }) {
    this.isActive = false;
    this.startTime = null;
    this.deltaTime = null;
    this.timerId = null;
    this.onTick = onTick;
    this.to = null;
    this.from = null;
  }
  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();

      this.timerId = setInterval(() => {
        const currentTime = Date.now();
        this.deltaTime = currentTime - this.startTime;
        const time = new Date(this.deltaTime);

        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        const min = minutes >= 10 ? minutes : "0" + minutes;
        const sec = seconds >= 10 ? seconds : "0" + seconds;
        const msec = Number.parseInt(time.getMilliseconds() / 100);

        this.onTick({ min, sec, msec });
      }, 100);
      resetBtn.hidden = false;
    }
  }

  pause() {
    this.to = Date.now();
    clearInterval(this.timerId);
    clockface.textContent = this.to - this.from;
  }

  continue() {
    this.timerId = setInterval(() => {
      clockface.textContent = Date.now() - this.from; 
    })
  }

  startButtonOnClick() {
    if (startBtn.textContent === "Start") {
      this.start();
      startBtn.textContent = "Pause";
      resetBtn.hidden = false;
    } else if (startBtn.textContent === "Pause") {
      this.pause();
      startBtn.textContent = "Continue";
    } else if (startBtn.textContent === "Continue") {
      startBtn.textContent = "Pause";
    }
  }

  stop() {
    this.isActive = false;
    clearInterval(this.timerId);
    this.timerId = null;
    this.startTime = null;
    this.deltaTime = 0;
    this.onTick({ min: "00", sec: "00", msec: "0" });
    resetBtn.hidden = true;
    startBtn.textContent = "Start";
  }
}

const stopwatch = new Stopwatch({
  onTick: updateClockface
});

startBtn.addEventListener("click",stopwatch.startButtonOnClick.bind(stopwatch));
resetBtn.addEventListener("click", stopwatch.stop.bind(stopwatch));

function updateClockface({ min, sec, msec }) {
  clockface.textContent = `${min}:${sec}.${msec}`;
}

/*
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
startBtn.addEventListener("click", btnOnClick);
resetBtn.addEventListener("click", handleReset);

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

function btnOnClick() {
  handleStart();
  if (startBtn.textContent === "Start") {
    startBtn.textContent = "Pause";
    resetBtn.hidden = false;
  } else if (startBtn.textContent === "Pause") {
    startBtn.textContent = "Continue";
  } else if (startBtn.textContent === "Continue") {
    startBtn.textContent = "Pause";
  }
}

function handleReset() {
  if (!isActive) {
    clearInterval(timerId);
    initTime.textContent = '00:00.0';
    startBtn.textContent = "Start";
    resetBtn.hidden = true;
  }
}
*/
