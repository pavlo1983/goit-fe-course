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
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

"use strict";

function createDiv() {
  const div = document.createElement("div");
  div.classList.add("stopwatch");

  const p = document.createElement("p");
  p.classList.add("time");
  p.classList.add("js-time");
  p.textContent = "00:00.0";

  const startBtn = document.createElement("button");
  startBtn.classList.add("btn");
  startBtn.classList.add("js-start");
  startBtn.textContent = "Start";

  const lapBtn = document.createElement("button");
  lapBtn.classList.add("btn");
  lapBtn.classList.add("js-take-lap");
  lapBtn.textContent = "Lap";

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("btn");
  resetBtn.classList.add("js-reset");
  resetBtn.textContent = "Reset";

  div.append(p, startBtn, lapBtn, resetBtn);
  document.body.prepend(div);

  const list = document.createElement("ul");
  list.classList.add("laps");
  list.classList.add("js-laps");
  div.insertAdjacentElement("afterend", list);
}

class StopWatch {
  constructor(parent = document) {
    this.parent = parent;
    this.startBtn = parent.querySelector(".js-start");
    this.lapBtn = parent.querySelector(".js-take-lap");
    this.resetBtn = parent.querySelector(".js-reset");
    this.list = document.querySelector(".js-laps");
    this.clockface = parent.querySelector(".js-time");
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
    this.resetBtn.hidden = false;
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
      this.list.insertAdjacentHTML(
        "afterbegin",
        `<li>
      ${time}</li>`
      );
    } else if (this.startBtn.textContent.toLowerCase() === "continue") {
      const time = this.toTimeString(this.to - this.from);
      this.list.insertAdjacentHTML("afterbegin", `<li> ${time} </li>`);
    }
  }

  resetBtnOnCLick() {
    clearInterval(this.setIntervalId);
    this.clockface.textContent = this.toTimeString(0);
    this.startBtn.textContent = "Start";
    this.list.innerHTML = ``;
    this.resetBtn.hidden = true;
  }

  toTimeString(timeStamp) {
    const date = new Date(timeStamp);
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const min = minutes >= 10 ? minutes : "0" + minutes;
    const sec = seconds >= 10 ? seconds : "0" + seconds;
    const msec = Number.parseInt(date.getMilliseconds() / 100);

    return `${min}:${sec}.${msec}`;
  }

  run() {
    this.startBtn.addEventListener("click", this.startBtnOnCLick.bind(this));
    this.lapBtn.addEventListener("click", this.lapBtnOnCLick.bind(this));
    this.resetBtn.addEventListener("click", this.resetBtnOnCLick.bind(this));
  }
}

function createNeWatch() {
  createDiv();
  let isActive;
  const resetBtn = document.querySelector(".js-reset");
  if (!isActive) {
    resetBtn.hidden = true;
  }
  const stopWatch = new StopWatch(document.querySelector(".stopwatch"));
  stopWatch.run();
}

createNeWatch();

createNeWatch();

createNeWatch();

createNeWatch();
