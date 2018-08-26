'use strict';

const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const delUser = 'Отменено пользователем!';
const deniedUser = 'Доступ запрещен!';
const agreedUser = 'Добро пожаловать!';

const inputLogin = prompt('Login');

if (inputLogin === adminLogin) {
  
  const inputPassword = prompt('Password');

  if (inputPassword === null) {
  alert(delUser);
}
  else if (inputPassword === adminPassword) {
  alert(agreedUser);
}
  else {
  alert(deniedUser);
} 


} else if (inputLogin === null) {
  alert(delUser);
}
else {
  alert(deniedUser);
} 


