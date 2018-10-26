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



/*
const clockface = document.querySelector(".js-time");
const startBtn = document.querySelector(".js-start");
const lapBtn = document.querySelector(".js-take-lap");
const resetBtn = document.querySelector(".js-reset");
const list = document.querySelector(".js-laps");

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
    this.onPause = 0;
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
    clearInterval(this.timerId);
    
  }

  continue() {
    this.timerId = setInterval(() => {}, 100);
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
      this.continue();
    }
  }

  lapButtonOnClick() {
    if (startBtn.textContent === "Start") {
      return;
    } else if (startBtn.textContent === "Pause") {
      const timeLap = Date.now() - this.startTime;
      list.insertAdjacentHTML("afterbegin", `<li> ${timeLap} </li>`);
    } else if (startBtn.textContent === "Continue") {
      const timeLap = this.onPause - this.startTime;
      list.insertAdjacentHTML("afterbegin", `<li> ${timeLap} </li>`);
    }
  }

  stopButtonOnClick() {
    this.isActive = false;
    clearInterval(this.timerId);
    this.timerId = null;
    this.startTime = null;
    this.deltaTime = 0;
    this.onTick({ min: "00", sec: "00", msec: "0" });
    resetBtn.hidden = true;
    startBtn.textContent = "Start";
    list.innerHTML = "";
  }
}

const stopwatch = new Stopwatch({
  onTick: updateClockface
});

startBtn.addEventListener(
  "click",
  stopwatch.startButtonOnClick.bind(stopwatch)
);
lapBtn.addEventListener("click", stopwatch.lapButtonOnClick.bind(stopwatch));
resetBtn.addEventListener("click", stopwatch.stopButtonOnClick.bind(stopwatch));

function updateClockface({ min, sec, msec }) {
  clockface.textContent = `${min}:${sec}.${msec}`;
}
*/
"use strict";



class StopWatch {
  constructor(parent = document) {
    this.parent = parent;
    this.startBtn = document.querySelector(".js-start");
    this.lapBtn = document.querySelector(".js-take-lap");
    this.resetBtn = document.querySelector(".js-reset");
    this.list = document.querySelector(".js-laps");
    this.clockface = document.querySelector(".js-time");
    this.setIntervalId = null;
    this.from = null;
    this.to = null;
  }

  startBtnOnCLick() {
    if (this.startBtn.textContent.toLowerCase() === "start") {
      this.start();
      this.startBtn.textContent = "Pause";
    } else if (this.startBtn.textContent.toLowerCase() === "pause") {
      this.startBtn.textContent = "Continue";
      this.pause();
    } else if (this.startBtn.textContent.toLowerCase() === "continue") {
      this.startBtn.textContent = "Pause";
      this.continue();
    }
  }
  pause() {
    this.to = Date.now();
    clearInterval(this.setIntervalId);
    this.clockface.textContent = this.toTimeString(this.to - this.from);
  }

  continue() {
    this.from = Date.now() - (this.to - this.from);
    this.step();
  }

  start() {
    this.from = new Date();
    this.step();
  }

  step() {
    this.setIntervalId = setInterval(() => {
      (this.clockface.textContent = this.toTimeString(Date.now() - this.from)),
        1000 / 60;
    });
  }

  lapBtnOnCLick() {
    if (this.startBtn.textContent.toLowerCase() === "start") {
     return;
    } else if (this.startBtn.textContent.toLowerCase() === "pause") {
      const time = this.toTimeString(Date.now() - this.from);
      this.list.insertAdjacentHTML("afterbegin", `<li> ${time} </li>`)
    } else if (this.startBtn.textContent.toLowerCase() === "continue") {
      const time = this.toTimeString(this.to - this.from);
      this.list.insertAdjacentHTML("afterbegin", `<li> ${time} </li>`)
    }
  }

  resetBtnOnCLick() {
    clearInterval(this.setIntervalId);
    this.clockface.textContent = this.toTimeString(0);
    this.startBtn.textContent = "Start";
    this.list.innerHTML = '';
  }

  toTimeString(timeStamp) {
    const date = new Date(timeStamp);
    const time = date.toUTCString().slice(17, -4);
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const min = minutes >= 10 ? minutes : "0" + minutes;
    const sec = seconds >= 10 ? seconds : "0" + seconds;
    const msec = Number.parseInt(date.getMilliseconds() / 100);

    return `${min}:${sec}.${msec}`;
  }

  run() {
    this.startBtn.addEventListener("click", this.startBtnOnCLick.bind(this));
    this.lapBtn.addEventListener('click', this.lapBtnOnCLick.bind(this));
    this.resetBtn.addEventListener("click", this.resetBtnOnCLick.bind(this));
  }
}

const stopWatch = new StopWatch(document.querySelector(".stopwatch"));
stopWatch.run();



