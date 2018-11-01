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
const id = document.querySelector("#searchId").value;
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

function getUserById(id) {
  return fetch(`https://test-users-api.herokuapp.com/users/${id}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(users => users.data)
    .catch(error => console.log(error));
}

//getUserById(id).then(data => console.log(data))

const createUserById = () => {
  if (getUserById(id) !== false) {
    alert("unrecognized ID");
  } else {
    getUserById(id).then(data => console.log(data));
  }
};

const updateUserById = id => {
  allUsers.innerHTML = createUserById(id);
};

function finalUserId() {
  getUserById(id).then(updateUserById());
}

idSubmit.addEventListener("click", finalUserId);

//console.log(idInput.value);

//console.log(id);

/*
function addUser(name, age) {
  fetch("https://test-users-api.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify({ name: `${name}`, age: `${age}` }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

function removeUser(id) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: "DELETE"
  })
    .then(() => console.log("success"))
    .catch(error => console.log("ERROR" + error));
}

function updateUser(id, name, age) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name: `${name}`, age: `${age}` }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(data => console.log(data))
    .catch(error => console.log("ERROR" + error));
}



//updateUser("5bd97fc20de5640014e2ed26", "John", "23");*/
