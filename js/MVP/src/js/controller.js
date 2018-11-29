export default class Controller {
  constructor(view, model) {
    this.model = model;
    this.view = view;

    view.on('add', this.addNote.bind(this));
    view.on('remove', this.removeNote.bind(this))
  }

  addNote(text) {
    const item = this.model.addItem(text);

    this.view.addNote(item);
  }

  removeNote(id) {
    this.model.removeItem(id);
    this.view.removeNote(id);
  }
}
