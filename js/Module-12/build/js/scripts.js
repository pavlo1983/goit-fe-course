/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/
"use strict";

var set = function set(value) {
  localStorage.setItem("url-search", JSON.stringify(value));
};

var get = function get() {
  var data = localStorage.getItem("url-search");
  return data ? JSON.parse(data) : null;
};

var form = document.querySelector(".js-form");
var listUrl = document.querySelector(".js-url-list");
var input = document.querySelector(".js-form-input");
var formButton = document.querySelector(".js-button");
var links = {
  linkSave: []
};
var savedLocal = get();
var source = document.querySelector("#bookmark-item").innerHTML.trim();
var template = Handlebars.compile(source);

if (savedLocal) {
  links.linkSave = savedLocal;
  create();
}

function onSubmit() {
  var pattern = /^(https?:\/\/)?([\da-zа-яё0-9\.:-]+)\.([a-zа-яё\.]{2,6})([\/\w \.\/_|?!%@=&#:-]*)*\/?$/gi;

  if (input.value.match(pattern)) {
    if (!links.linkSave.includes(input.value)) {
      links.linkSave.unshift(input.value);
      set(links.linkSave);
    } else {
      alert("This Url is in list");
    }

    create();
    form.reset();
  } else {
    alert("Invalid Url");
  }
}

formButton.addEventListener("click", onSubmit);

function onDelete(e) {
  var target = e.target;
  if (target.nodeName !== "BUTTON") return;
  e.preventDefault();
  var bookmarkItem = target.parentNode;
  bookmarkItem.remove();
  var itemUrl = bookmarkItem.querySelector(".link");
  var textItemUrl = itemUrl.textContent;
  var updateStorage = links.linkSave.filter(function (el) {
    return el !== textItemUrl;
  });
  links.linkSave = updateStorage;
  set(updateStorage);
}

document.querySelectorAll(".js-delBtn").forEach(function (el) {
  el.addEventListener("click", onDelete);
});

function create() {
  var markup = links.linkSave.reduce(function (acc, item) {
    return acc + template({
      link: item
    });
  }, "");
  listUrl.innerHTML = markup;
}