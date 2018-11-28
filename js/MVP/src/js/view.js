export default class View {
	constructor() {
		this.form = document.querySelector(".js-form");
        this.input = this.form.querySelector(".js-form-input");
        this.itemList = document.querySelector(".js-url-list")

        this.form.addEventListener('submit', this.handleAdd.bind(this))
    }
    handleAdd(e) {
      e.preventDefault();

      if(this.input.value === "") return;
    }
    createNote(note) {
      const li = document.createElement('li');
      li.classList.add('item');
      li.dataset.id = note.id;

      const text = document.createElement('p');
      text.textContent = note.text;
      text.classList.add('text');

      const button = document.createElement('button');
      button.textContent = "Delete";
      button.dataset.action = "Remove"
      button.classList.add('button');


      li.append(text, button);

      this.appendEventListeners(li);

      return li;
    }
    addNote(note) {
      const item = this.createNote(note);
      this.form.reset();
      this.itemList.appendChild(item);
    }


    appendEventListeners(item) {
      const removeBtn = item.querySelector('[data-action="Remove"]');

      removeBtn.addEventListener('click', this.handleRemove.bind(this));
    }

    handleRemove({target}) {
      const item = target.closest('.item');

      this.itemList.removeChild(item);
    }
}


/*<template id="bookmark-item" >
      <li class="item">
        <a href="{{link}}" target="blank" class="link">{{ link }}</a>
        <h1 class="link__title">Lorem ipsum</h1>
        <div class="bookmarks__image">
          <img src="./images/www.jpg" alt="Image" />
        </div>
        <button class="js-delBtn" value="">DELETE</button>
      </li>
    </template>*/

