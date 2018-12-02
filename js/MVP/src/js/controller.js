import { get, set } from '../services/localStorage';

export default class Controller {
  constructor(view, model) {
    this.model = model;
    this.view = view;

    view.on('add', this.addBookmark.bind(this));
    view.on('remove', this.removeBookmark.bind(this))
  }

  addBookmark(link) {
    
    
    const item = this.model.addItem(link);

    this.view.addBookmark(item);
  }

  removeBookmark(id) {
    this.model.removeItem(id);
    this.view.removeBookmark(id);
  }
}
