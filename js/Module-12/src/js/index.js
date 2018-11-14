'use strict'

/*export 
const set = value => {
    localStorage.setItem('url-finder', JSON.stringify(value));
}

//export 
const get = () => {
    const date = localStorage.getItem('url-finder');

    return date ? JSON.parse(date) : null;
}*/



const form = document.querySelector('.js-form');
const listUrl = document.querySelector('.js-url-list');
const input = document.querySelector('.js-form-input');
const formButton = document.querySelector('.js-button');
const links = { linkSave: [] };


formButton.addEventListener('click', onAdd)

function toDisplay(links) {
    const source = document.querySelector(".bookmark-item").innerHTML.trim();
    const template = Handlebars.compile(source);
    const markup = links.reduce((acc, link) => acc + template(link), "");
    listUrl.innerHTML = markup;
  }

  function onAdd(e) {
    e.preventDefault();
    toDisplay(links);
  } 
/*const persisted = storage.get();

if (persisted) {
    links.linkSave = persisted;
    render();
}


function addNew() {
    links.linkSave.push(input.value);
    storage.set(links.linkSave);
}

function handlerSubmit(evt) {
    evt.preventDefault();
    addNew();
    render();
    form.reset();
};

formButton.addEventListener('click', handlerSubmit);

function handlerDel(evt) {
    evt.preventDefault();
    // Делегирование события
    let listItem = evt.target.parentElement;;
    let updateStorage = storage.get().filter((el) => {
        return el != document.querySelector('.link').innerHTML.trim();
    });
    storage.set(updateStorage);
    listItem.remove();
}

document.querySelectorAll('.delBtn').forEach((el) => {
    el.addEventListener('click', handlerDel);
});

function render() {
    const markup = links.linkSave.reduce((acc, item) =>
        acc + template({
            link: item,
        }), '');
    listUrl.innerHTML = markup;
};*/