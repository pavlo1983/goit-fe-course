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

const allUsersBtn = document.querySelector(".js-getUsers");
const usersList = document.querySelector(".js-usersList");
const idSubmit = document.querySelector(".js-idSubmit");
const listById = document.querySelector(".js-listById");
const userCreate = document.querySelector(".js-userCreate");
const userDelete = document.querySelector(".js-userDelete");
const userUpdate = document.querySelector(".js-userUpdate");

const elemId = document.querySelector("#searchId");
const elemName = document.querySelector("#searchName");
const elemAge = document.querySelector("#searchAge");
const elemDel = document.querySelector("#delId");
const updateId = document.querySelector("#updateById");
const updateName = document.querySelector("#updateName");
const updateAge = document.querySelector("#updateAge");

/*=======================================get all users ====================================================*/

function getAllUsers() {
  return fetch("https://test-users-api.herokuapp.com/users/")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(users => users.data)
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

/* =================================================== get user by Id ==============================================*/

function getUserById(e) {
  e.preventDefault();

  if (elemId.value === "") {
    alert("Empty");
    return;
  }
  fetch(`https://test-users-api.herokuapp.com/users/${elemId.value}`)
    .then(response => {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
      throw new Error("Error fetching data");
    })
    .then(users => users.data)
    .then(
      data =>
        (listById.innerHTML = `<li> id: ${data.id}, name: ${data.name}, age: ${
          data.age
        }</li>`)
    )
    .catch(error => {
      alert("Incorrect Id");
      console.log(error);
    });
}
idSubmit.addEventListener("click", getUserById);

/* =================================================== add User ====================================================*/

function addUser(e) {
  e.preventDefault();
  if (
    elemAge.value === "" ||
    isNaN(elemAge.value) ||
    elemName.value === "" ||
    !isNaN(elemName.value)
  ) {
    alert("Incorrect input");
    return;
  } else {
    fetch("https://test-users-api.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: `${elemName.value}`,
        age: `${elemAge.value}`
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Error fetching data");
      })
      .then(() => alert("User added"))
      .catch(error => console.log("ERROR" + error));
  }
}
userCreate.addEventListener("click", addUser);

/* =================================================== remove User ============================================== */

function removeUser(e) {
  e.preventDefault();
  if (elemDel.value === "") {
    alert("Empty");
    return;
  }
  fetch(`https://test-users-api.herokuapp.com/users/${elemDel.value}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
      throw new Error("Error fetching data");
    })
    .then(users => users.data.id)
    .then(() => alert("User deleted"))
    .catch(error => {
      console.log("ERROR" + error);
      alert("Incorrect Id");
    });
}
userDelete.addEventListener("click", removeUser);

/* ==================================================== update User ================================================= */

function updateUser(e) {
  e.preventDefault();
  if (
    updateAge.value === "" ||
    isNaN(updateAge.value) ||
    updateName.value === "" ||
    !isNaN(updateName.value)
  ) {
    alert("Incorrect input");
    return;
  }
  fetch(`https://test-users-api.herokuapp.com/users/${updateId.value}`, {
    method: "PUT",
    body: JSON.stringify({
      name: `${updateName.value}`,
      age: `${updateAge.value}`
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(users => users.data.id)
    .then(() => alert("User modified"))
    .catch(error => {
      console.log("ERROR" + error);
      alert("Incorrect Id");
    });
}

userUpdate.addEventListener("click", updateUser);
