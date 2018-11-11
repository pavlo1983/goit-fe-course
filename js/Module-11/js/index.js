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
const filter = { size: [], color: [], release_date: [] };
const submit = document.querySelector('button[type="submit"]');
const reset = document.querySelector('button[type="reset"]');

const inputs = document.querySelectorAll("input");
const list = document.querySelector(".js-list");

submit.addEventListener("click", onCheck);
reset.addEventListener("click", onReset);

function toDisplay(arr) {
  const source = document.querySelector("#laptop-card").innerHTML.trim();
  const template = Handlebars.compile(source);
  const markup = arr.reduce((acc, laptop) => acc + template(laptop), "");
  list.innerHTML = markup;
}

function onCheck(e) {
  e.preventDefault();

  const allInputs = [...inputs]
    .filter(el => el.checked)
    .map(el => (el.name === "color" ? el.value : +el.value));

  const selected = function() {
    filter.size.push(laptops.filter(el => allInputs.includes(el.size)));
    filter.color.push(laptops.filter(el => allInputs.includes(el.color)));
    filter.release_date.push(
      laptops.filter(el => allInputs.includes(el.release_date))
    );
    return filter;
  };
  selected();
  console.log(filter);

  
  const checked = laptops.filter(
    laptop => {
      const matchedSize = filter.size.length !== 0 ?
        filter.size.includes(String(laptop.size)) :
        true;
      const matchedColor = filter.color.length !== 0 ?
        filter.color.includes(laptop.color) :
        true;
      const matchedReleaseDate = filter.release_date.length !== 0 ?
        filter.release_date.includes(String(laptop.releaseDate)) :
        true;
      return matchedSize && matchedColor && matchedReleaseDate;
    });



  
  /*const checked = laptops
    .filter(el => laptops.includes(filter.size))
    .filter(el => laptops.includes(filter.color))
    .filter(el => laptops.includes(filter.release_date));

  //const checked = filter.size.
  //console.log(checked)
  /*const checked = laptops
    .filter(el => filter.includes(el.size))
    .filter(el => filter.includes(el.color))
    .filter(el => filter.includes(el.release_date));*/

  /*const checkedBySize = laptops.filter(el => allInputs.includes(el.size));
  const checkedByColor = laptops.filter(el => allInputs.includes(el.color));
  const checkedByDate = laptops.filter(el =>
    allInputs.includes(el.release_date)
  );

  console.log(checkedBySize);

  const checked = function() {
    return checkedBySize;
  };*/

  /*const checkedBySize = laptops
  .filter(el => allInputs.includes(el.size))
  const checkedByColor = laptops
  .filter(el => allInputs.includes(el.color))
  const checkedByDate = laptops
  .filter(el => allInputs.includes(el.release_date));

  console.log(checkedBySize.size)
  console.log(checkedByColor)
  console.log(checkedByDate)*/

  /*const checked = laptops
    .filter(el => allInputs.includes(el.size))
    .filter(el => allInputs.includes(el.color))
    .filter(el => allInputs.includes(el.release_date))
  


  /*const checked = laptops
    .filter(el => allInputs.includes(el.size))
    .filter(el => allInputs.includes(el.color))
    .filter(el => allInputs.includes(el.release_date));*/

  console.log(checked);
  if (checked.length === 0) {
    toDisplay(laptops);
    return;
  }
  toDisplay(checked);
}

function onReset(e) {
  e.preventDefault();
  toDisplay(laptops);
  inputs.forEach(el => (el.checked = false));
}

toDisplay(laptops);
