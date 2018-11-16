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

/*const set = value => {
  localStorage.setItem("url-search", JSON.stringify(value));
};

const get = () => {
  const data = localStorage.getItem("url-search");

  return data ? JSON.parse(data) : null;
};*/
let bookmarksList = [];
const form = document.querySelector(".js-form");
const bookmarks = document.querySelector(".js-url-list");
const input = document.querySelector(".js-form-input");
const formButton = document.querySelector(".js-button");
//const links = { linkSave: [] };
//let savedLocal = get();
const source = document.querySelector("#bookmark-item").innerHTML.trim();
const template = Handlebars.compile(source);
const bookmarksFromLocalStorage = JSON.parse(localStorage.getItem("bookmarks"));

if (bookmarksFromLocalStorage) {
  bookmarksList = bookmarksFromLocalStorage;
  makeMarkup(bookmarksFromLocalStorage);
}

function makeMarkup(array) {
  const markup = array.reduce(
    (acc, item) =>
      acc +
      template({
        link: item
      }),
    ""
  );
  bookmarks.innerHTML = markup;
}
/*if (savedLocal) {
  links.linkSave = savedLocal;
  create();
}*/

formButton.addEventListener("submit", handleButtonAddUrl);

function handleButtonAddUrl(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "FORM") return;
  const formInput = document.querySelector(".js-form-input");
  const url = formInput.value;
  form.reset();
}


/*function onSubmit(e) {
  //e.preventDefault();
 // if (!savedLocal.includes(input.value)){
    links.linkSave.unshift(input.value);
    set(links.linkSave);
  /*} else {
    alert("This Url is in list");
  }
  //addNew();
  create();
  form.reset();
}*/

//formButton.addEventListener("click", onSubmit);

function onDelete(e) {
  e.preventDefault();
  let listItem = e.target.parentElement;
  let target = e.target;
  if (target.nodeName !== "BUTTON") return;
  let bookmarkItem = target.parentNode;
  let bookmarkItemUrl = bookmarkItem.querySelector(".link");
  let urlBookmark = bookmarkItemUrl.textContent;
  let deleteBookmark = savedLocal.filter(bookmark =>
    bookmark.textContent !== urlBookmark)
  savedLocal = deleteBookmark;
  create(deleteBookmark);
  set(deleteBookmark);
  //listUrl.innerHTML = "";
  //let updateStorage = get().filter(el => {
    ;
    
    //return el !== document.querySelector('.link').innerHTML.trim();
  //});
 // localStorage.clear();
  listItem.remove();
  //set(updateStorage);
}


document.querySelectorAll(".js-delBtn").forEach(el => {
  el.addEventListener("click", onDelete);
});


