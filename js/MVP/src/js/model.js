import v4 from "uuid/v4";
import { get, set } from "../services/localStorage";
let links = { linkSave: [] };

export default class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(text) {
    const item = {
      id: v4(),
      text,
      title: "Lorem Ipsum",
      img: "https://placeimg.com/200/150/tech"
    };

    this.items.push(item);

    links.linkSave.push(item);
    set(links.linkSave);
    return item;
  }
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    links.linkSave = links.linkSave.filter(item => item.id !== id);
    set(links.linkSave);
  }
}
