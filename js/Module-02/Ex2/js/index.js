'use strict';

const taba = 6;
const sharm = 15;
const hurgada = 25;

const pity = ('Нам очень жаль, приходите еще!');

const quantity = prompt('Введите количество мест');

const inputQuantity = Number(quantity);

if (quantity !== null && quantity >=1 && !Number.isNaN(inputQuantity) && Number.isInteger(inputQuantity)) 
{let compare;
    if (quantity <= taba) {
        const compare = confirm('Есть места в группе Таба, согласны ли Вы быть в этой группе?');{
            if (compare === true) {alert('Приятного путешествия в группе Таба');}
            else if (compare === false) {alert(pity);}                                                                                                                                                                                                                    
    
        }
} 
    else if (quantity > taba && quantity <= sharm ) {
        const compare = confirm('Есть места в группе Шарм, согласны ли Вы быть в этой группе?');{
            if (compare === true) {alert('Приятного путешествия в группе Шарм');}
            else if (compare === false) {alert(pity);}                                                                                                                                                                                                                    

    }
}
    else if (quantity > sharm && quantity <= hurgada ) {
        const compare = confirm('Есть места в группе Хургада, согласны ли Вы быть в этой группе?');{
            if (compare === true) {alert('Приятного путешествия в группе Хургада');}
            else if (compare === false) {alert(pity);}                                                                                                                                                                                                                    
}
}
    else {
        const compare = alert('Извините, столько мест нет ни в одной группе!');                                                                                                                                                                                                                            
}
} 
else {
    alert ('Ошибка ввода')}


