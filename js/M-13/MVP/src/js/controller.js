export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    this._view.refs.postEditor.addEventListener(
      "submit",
      this.handleAddPost.bind(this)
    );

    this._view.refs.postList.addEventListener(
      "click",
      this.handlePostListClick.bind(this)
    );

    this.init();
  }

  init() {
    this._model.getItems().then(items => {
      this._view.init(items);
    });
  }

  handleAddPost(e) {
    e.preventDefault();

    const title = this._view.refs.input.value;

    this._model.addItem({ title }).then(createdItem => {
      this._view.addPost(createdItem);
    });

    this._view.refs.postEditor.reset();
  }

  handlePostListClick({ target }) {
    const nodeName = target.nodeName;

    if (nodeName !== "BUTTON") return;

    const action = target.dataset.action;
    const parentId = target.closest(".post").dataset.id;

    switch (action) {
      case "delete":
        this.deletePost(parentId);
        break;
      default:
        throw new Error("Unknows action type");
    }
  }

  deletePost(id) {
    this._model.deleteItem(id).then(deletedId => {
      this._view.deletePost(deletedId);
    });
  }
}
