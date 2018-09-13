
/*
  Создайте скрипт кассира, который получает список продуктов и деньги, 
  подсчитывает общую стоимость продуктов, и в зависимости от того хватает 
  денег или нет, уведомляет покупателя о результате.
*/

/* Есть база данных товаров, в формате "имя-товара":"цена за одну единицу" */ 


/* 
  Необходимо создать функцию-конструктор Cashier.
  
  Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе): 
    - name - строка, имя кассира, передается при вызове конструктора
    
    - productDatabase - объект база данных продуктов, передается при вызове конструктора
    
    - customerMoney - число, сумма введенная пользователем при запросе денег, всегда начинается с 0 
    
    - getCustomerMoney(value) - метод, получает число, деньги покупателя, и записывает его в поле customerMoney.
    
    - сountTotalPrice(order) - метод, получает объект списока покупок, считает общую стоимость покупок.
      🔔 Ключи объекта order есть в объекте productDatabase. Из order берем количество единиц продукта,
         а из productDatbase цену за одну штуку и умножаем, так получаем цену одного типа продукта в заказе.
         Чтобы посчитать цену для всех продуктов заказа используйте цикл, перебрав все ключи order.
     
    - countChange(totalPrice) - метод, считает сдачу, разницу между общей суммой покупок и деньгами покупателя.
        * Обязательно проверьте что customerMoney не меньше чем значение totalPrice
        * Если денег было передано достаточно, возвращает разницу денег.
        * Если в customerMoney меньше денег чем в totalPrice, возвращает null 
        
    - onSuccess(change) - метод, выводит в консоль строку `Спасибо за покупку, ваша сдача ${change}!`.
    
    - onError() - метод, выводит в консоль строку 'Очень жаль, вам не хватает денег на покупки'   
    
    - reset() - метод, сбрасывает поле customerMoney 0.
*/
'use strict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};


/* Заказ пользователя хранится в виде объекта следующего формата. "имя-продукта":"количество-единиц" */
const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

let value;
let cash = prompt(value);


function Cashier(name, productDatabase) {
  this.name = name,
  this.productDatabase = products,
  this.customerMoney = cash,
 
  this.getCustomerMoney = function getCustomerMoney(value) {
    let getCash = Number(cash);
    let trueCash;
    if (getCash !== null && getCash >=0 && !Number.isNaN(getCash) && Number.isInteger(getCash)) {
      return getCash;
    } 
    this.customerMoney = trueCash; 
  },
  
  this.countTotalPrice = function countTotalPrice(order) {

    const keys = Object.keys(order);
      console.log(keys);
    
    let sum = 0;
    for (const key of keys) {
      sum += products[key] * order[key];
    }
   return sum;    
}
  
  this.countChange = function countChange(totalPrice) {
    let change = 0;
    if(change !== null) {
      return this.onSuccess;
    }
    else { 
      return this.onError  
  }
}; 
  this.onSuccess = function onSuccess(change) {
    console.log(`Спасибо за покупку, ваша сдача ${change}!`)
  }

  this.onError = function onError() {
    console.log('Очень жаль, вам не хватает денег на покупки')
  }

  this.reset = function reset() {
  };  

}

// 🔔 не забывайте о this при обращении к свойствам и методам будущего объекта

/* Пример использования */
const mango = new Cashier('Mango', products);

// Проверяем исходные значения полей

console.log(mango.name); // Mango
console.log(mango.productDatabase); // ссылка на базу данных продуктов (объект products)
console.log(mango.customerMoney); //0 

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая order - список покупок пользователя
const totalPrice = mango.countTotalPrice(order);

// Проверям что посчитали
console.log(totalPrice); // 110

// Вызываем getCustomerMoney для запроса денег покупателя
mango.getCustomerMoney(300);

// Проверяем что в поле с деньгами пользователя
console.log(mango.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
const change = mango.countChange();

// Проверяем что нам вернул countChange
console.log(change); // 190

// Проверяем результат подсчета денег
//if(change !== null) {
                          // При успешном обслуживании вызываем метод onSuccess
//mango.onSuccess(change);  // Спасибо за покупку, ваша сдача 190
//} else { 
                          // При неудачном обслуживании вызываем метод onError   
//mango.onError(); // Очень жаль, вам не хватает денег на покупки
 // }

// Вызываем reset при любом исходе обслуживания
mango.reset();

// Проверяем значения после reset
console.log(mango.customerMoney); //0
