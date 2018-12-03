import { get, set } from "../services/localStorage";
import EventEmitter from "../services/event-emitter";

export default class View extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector(".js-form");
    this.input = this.form.querySelector(".js-form-input");
    this.itemList = document.querySelector(".js-url-list");

    this.form.addEventListener("submit", this.handleAdd.bind(this));
  }

  handleAdd(e) {
    e.preventDefault();

    const { value } = this.input;

    const pattern = /^(https?:\/\/)?([\da-zа-яё0-9\.:-]+)\.([a-zа-яё\.]{2,6})([\/\w \.\/_|?!%@=&#:-]*)*\/?$/gi;
    
    if (!value.match(pattern)) {
      alert("Invalid Url");
      this.form.reset();
      return
    } 

    
    /*if (!links.linkSave.includes(value)) {
        links.linkSave.unshift(value);
        set(links.linkSave);
      } else {
        alert("This Url is in list");
        this.form.reset();
        return
      }*/

    this.emit("add", value);
  }
  createBookmark(link) {
    const li = document.createElement("li");
    li.classList.add("item");
    li.dataset.id = link.id;

    const url = document.createElement("a");
    url.textContent = link.text;
    url.setAttribute("href", `${link.text}`);
    url.classList.add("link");

    const title = document.createElement("h1");
    title.textContent = "Lorem ipsum";
    title.classList.add("link_title");

    const image = document.createElement("img");
    image.setAttribute("src", "https://placeimg.com/200/150/tech");
    image.setAttribute("alt", "image");

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.dataset.action = "Remove";
    button.classList.add("button");

    li.append(url, title, image, button);

    this.appendEventListeners(li);

    return li;
  }

  addBookmark(link) {
    const item = this.createBookmark(link);
    this.form.reset();
    this.itemList.prepend(item);
  }

  appendEventListeners(item) {
    const removeBtn = item.querySelector('[data-action="Remove"]');

    removeBtn.addEventListener("click", this.handleRemove.bind(this));
  }

  handleRemove({ target }) {
    
    const parent = target.closest(".item");
    /*const links = { linkSave: [] };
    
    const itemUrl = parent.querySelector(".link");
    const textItemUrl = itemUrl.textContent;
    const updateStorage = get().filter(el => el !== textItemUrl);
    links.linkSave = updateStorage;
    set(updateStorage);*/

    this.emit("remove", parent.dataset.id);
  }

  removeBookmark(id) {
    const item = this.itemList.querySelector(`[data-id = "${id}"]`);

    this.itemList.removeChild(item);
  }
}