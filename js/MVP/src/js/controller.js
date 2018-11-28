export default class Controller {
  constructor(view, model) {
    this.model = model;
    this.view = view;
  }

  addNote(text) {
    const item = this.model.addItem(text);

    this.view.addNote(item);
  }

  removeNote(id) {
    this.model.removeItem(id);
  }
}
