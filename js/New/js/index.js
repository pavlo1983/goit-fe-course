"use strict";
let bookmarksList = [];
const bookmarks = document.querySelector(".bookmarks");
const loader = document.querySelector(".loader");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
const source = document.querySelector("#template").innerHTML.trim();
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
  const formInput = document.querySelector(".form__input");
  const url = formInput.value;
  validateUrl(url);
  form.reset();
}

function validateUrl(url) {
  const pattern = /^(https?:\/\/)?([\da-zа-яё0-9\.:-]+)\.([a-zа-яё\.]{2,6})([\/\w \.\/_|?!%@=&#:-]*)*\/?$/gi;
  if (!pattern.test(url)) {
    modalError("Invalid url", "img/invalid.svg", "invalid url", "2rem");
    return;
  }
  linkpreview(url);
}

function modalError(text, src, alt, sizeIcon) {
  modal.style.top = "50%";
  const errorText = document.querySelector(".modal__text");
  const errorIcon = document.querySelector(".modal__icon");
  errorText.textContent = text;
  errorIcon.setAttribute("src", src);
  errorIcon.setAttribute("alt", alt);
  errorIcon.style.width = sizeIcon;
  errorIcon.style.height = sizeIcon;
  setTimeout(() => {
    modal.style.top = "-100%";
  }, 3000);
}

function removeHidden() {
  bookmarks.style.opacity = 0.3;
  form.style.opacity = 0.3;
  loader.classList.remove("hidden");
}

function addHidden() {
  bookmarks.style.opacity = 1;
  form.style.opacity = 1;
  loader.classList.add("hidden");
}

function linkpreview(url) {
  const key = "5bb920a205cea06f38e7909709a72b521a4a9d1c05841";
  removeHidden();

  axios
    .get(`https://api.linkpreview.net/?key=${key}&q=${url}`)
    .then(response => {
      console.log("response: ", response);
      const urlInfo = response.data;
      makeBookmarks(urlInfo);
    })
    .catch(error => {
      console.log(error);
      if (error.message === "Request failed with status code 424") {
        const pattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;
        let host = pattern.exec(url);
        host = host[1];
        const urlInfo = {
          url: url,
          title: host
        };
        makeBookmarks(urlInfo);
      }
    });
}

// create bookmark
function makeBookmarks(urlInfo) {
  const double = bookmarksList.filter(bookmark => bookmark.url === urlInfo.url);
  if (double.length) {
    addHidden();
    setTimeout(() => {
      modalError(
        "This url is already set in bookmarks!",
        "img/copy.svg",
        "copy url",
        "5rem"
      );
    }, 100);
    return;
  }
  bookmarksList.unshift(urlInfo);
  makeMarkup(bookmarksList);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  addHidden();
}

// delete bookmark
const deleteBtn = document.querySelector(".delete");
bookmarks.addEventListener("click", handleButtonDelete);
function handleButtonDelete(event) {
  const target = event.target;
  if (target.nodeName !== "BUTTON") return;
  event.preventDefault();
  const bookmarkItem = target.parentNode;
  const bookmarkItemUrl = bookmarkItem.querySelector(".bookmark__link");
  const urlBookmark = bookmarkItemUrl.textContent;
  const deleteBookmark = bookmarksList.filter(
    bookmark => bookmark.url !== urlBookmark
    
  );
  bookmarksList = deleteBookmark;
  makeMarkup(deleteBookmark);
  localStorage.setItem("bookmarks", JSON.stringify(deleteBookmark));
}