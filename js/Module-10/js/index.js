/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/
"use strict";
const allUsers = document.querySelectorAll(".js-allUsers");
const allUsersBtn = document.querySelector(".js-getUsers");
const usersList = document.querySelector(".js-usersList");
const elemId = document.querySelector("#searchId");
const idSubmit = document.querySelector(".js-idSubmit");

function getAllUsers() {
  return fetch("https://test-users-api.herokuapp.com/users/")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(el => el.data)
    .catch(error => console.log(error));
}

const createUserEl = users => {
  console.log(users);
  const el = users.reduce(
    (el, user) =>
      el + `<li> id: ${user.id}, name: ${user.name}, age: ${user.age}</li>`,
    ""
  );
  return el;
};

const updateUsers = users => {
  usersList.innerHTML = createUserEl(users);
};

function finalUsers() {
  getAllUsers().then(updateUsers);
}
allUsersBtn.addEventListener("click", finalUsers);

function getUserById(e) {
  e.preventDefault();
  return fetch(`https://test-users-api.herokuapp.com/users/${elemId.value}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(users => {
      if (users.data.id === elemId.value) {
        return users.data;
      }
      alert("В базе данных нет такого id " + elemId.value);
    })
    .then(
      data =>
        (usersList.innerHTML = `<li> id: ${data.id}, name: ${data.name}, age: ${
          data.age
        }</li>`)
    )
    .catch(error => console.log(error));
}
idSubmit.addEventListener("click", getUserById);
