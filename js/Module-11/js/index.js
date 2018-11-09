/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

"use strict";

const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

/*const source = document.querySelector("#notebook-card").innerHTML.trim();

console.log(source);
const template = Handlebars.compile(source);

const markup = laptops.reduce((acc, laptop) => acc + template(laptop), "");
//console.log(markup);

//document.body.insertAdjacentHTML("afterend", markup);*/

const filter = { size: [], color: [], release_date: [] };

const submit = document.querySelector('button[type="submit"]');
const reset = document.querySelector('button[type="reset"]');

const form = document.querySelector("js-form");
const inputs = document.querySelectorAll("input");
const container = document.querySelector(".container");

submit.addEventListener("click", onCheck);
reset.addEventListener("click", onReset);

//const getSize = Array.from(document.querySelectorAll('input[name="size"]'));
//const getColor = Array.from(document.querySelectorAll('input[name="color"]'));
/*const getDate = Array.from(
  document.querySelectorAll('input[name="release_date"]')
);*/

function onCheck(e) {
  e.preventDefault();
  if (!this.isActive) {
    this.isActive = true;

    const allInputs = [...inputs]
      .filter(e => e.checked)
      .map(e => (e.name === "color" ? e.value : +e.value));

    const checked = laptops
      .filter(e => allInputs.includes(e.size))
      .filter(e => allInputs.includes(e.color))
      .filter(e => allInputs.includes(e.release_date));

    if (checked.length === 0) {
      toDisplay(laptops);
      return;
    }
    toDisplay(checked);

    /*this.isActive = true;

    const getAllSizes = getSize.filter(getSize => getSize.checked);
    console.log(getAllSizes);

    /* const sizes = getAllSizes.map(el => {
      const arr = [];
      
        arr.push(Number(el.value));
        console.log(arr);
      
      return arr;
    });*/
    /*function sizeValues() {
      const arr = [];
      for (let i = 0; i < getAllSizes.length; i += 1) {
        arr.push(Number(getAllSizes[i].value));
      }
      return arr;
    }

    const sizes = sizeValues();
    console.log(sizes);

 
   

    const num = sizes.reduce((acc, val) => {
      if (sizes.length > 0) {
        return acc + 1
      }
    }
    
    );

    console.log(num);
    const color = getColor[0].value;
    const date = Number(getDate[0].value);

    function getBySize(num) {
      return laptops.filter(laptop => laptop.size === num);
    }

    function getByColor(color) {
      return laptops.filter(laptop => laptop.color === color);
    }

    function getByDate(date) {
      return laptops.filter(laptop => laptop.release_date === date);
    }

    filter.size.push(getBySize(num));
    filter.color.push(getByColor(color));
    filter.release_date.push(getByDate(date));

    console.log(filter);
    //document.body.insertAdjacentHTML("afterend", markup);*/
  }
}

function toDisplay(arr) {
  const source = document.querySelector("#laptop-card").innerHTML.trim();
  const template = Handlebars.compile(source);
  const markup = arr.reduce((acc, laptop) => acc + template(laptop), "");
  container.innerHTML = markup;
}

toDisplay(laptops);


function onReset(e) {
  e.preventDefault();
  toDisplay(laptops);
}
