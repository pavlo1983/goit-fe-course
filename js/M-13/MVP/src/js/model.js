import * as api from './services/api';

export default class Model {
  constructor(items = []) {
    this._items = items;
  }

  getItemById(id) {
    return this._items.find(item => item.id === id);
  }

  getItems() {
    return api.getAllPosts().then(posts => {
      this._items = posts;
      return this._items;
    });
  }

  addItem(item) {
    return api.addPost(item).then(newItem => {
      this._items.push(newItem);
      return newItem;
    });
  }

  deleteItem(id) {
    return api.deletePost(id).then(() => {
      this._items = this._items.filter(item => item.id !== id);
      return id;
    });
  }
}
