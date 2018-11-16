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
}*/
let bookmarksList = [];
const bookmarks = document.querySelector(".js-bookmarks");
const form = document.querySelector(".js-form");
const source = document.querySelector("#bookmark-item").innerHTML.trim();
const template = Handlebars.compile(source);

const bookmarksFromLocalStorage = JSON.parse(localStorage.getItem("bookmarks"));
if (bookmarksFromLocalStorage) {
  bookmarksList = bookmarksFromLocalStorage;
  makeMarkup(bookmarksFromLocalStorage);
}

function makeMarkup(array) {
  const markup = array.reduce((acc, bookmark) => acc + template(bookmark), "");
  bookmarks.innerHTML = markup;
}

form.addEventListener("submit", handleButtonAddUrl);

function handleButtonAddUrl(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "FORM") return;
  const formInput = document.querySelector(".js-form-input");
  const url = formInput.value;
  form.reset();
}

function makeBookmarks(urlInfo) {
  bookmarksList.unshift(urlInfo);
  makeMarkup(bookmarksList);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
}

const deleteBtn = document.querySelector(".delete");
bookmarks.addEventListener("click", handleButtonDelete);
function handleButtonDelete(event) {
  const target = event.target;
  if (target.nodeName !== "BUTTON") return;
  event.preventDefault();
  const bookmarkItem = target.parentNode;
  const bookmarkItemUrl = bookmarkItem.querySelector(".link");
  const urlBookmark = bookmarkItemUrl.textContent;
  const deleteBookmark = bookmarksList.filter(
    bookmark => bookmark.url !== urlBookmark
  );
  bookmarksList = deleteBookmark;
  makeMarkup(deleteBookmark);
  localStorage.setItem("bookmarks", JSON.stringify(deleteBookmark));
}

/*

formButton.addEventListener("click", onSubmit);

function onDelete(e) {
  let target = e.target;
  if (target.nodeName !== "Button") return;
  e.preventDefault();
  let bookmarkItem = target.parentNode;
  let bookmarkItemUrl = bookmarkItem.querySelector(".link");
  let urlBookmark = bookmarkItemUrl.textContent;
  let deleteBookmark = savedLocal.filter(function (bookmark) {
    return bookmark.url !== urlBookmark;
  })
  savedLocal = deleteBookamrk;
  create(deleteBookmark);
  set(deleteBookmark);
}


/*function onDelete(e) {
  e.preventDefault();
  let listItem = e.target.parentElement;
  //listUrl.innerHTML = "";
  let updateStorage = get().filter(el => {
    return el !== document.querySelector(".link").innerHTML.trim();
  });
  // localStorage.clear();
  listItem.remove();
  set(updateStorage);
}
console.log(get());

document.querySelectorAll(".js-delBtn").forEach(el => {
  el.addEventListener("click", onDelete);
});

function create() {
  const markup = links.linkSave.reduce(
    (acc, item) =>
      acc +
      template({
        link: item
      }),
    ""
  );
  listUrl.innerHTML = markup;
}
*/