export default class View {
  constructor() {
    this.refs = {};

    this.refs.postEditor = document.querySelector(".title-editor");
    this.refs.input = this.refs.postEditor.querySelector("input");
    this.refs.postList = document.querySelector(".title-list");
  }

  init(posts) {
    const markup = posts.reduce((string, post) => {
      return string + this.createPostMarkup(post);
    }, "");

    this.refs.postList.insertAdjacentHTML("beforeend", markup);
  }

  addPost(post) {
    const markup = this.createPostMarkup(post);

    this.refs.postList.insertAdjacentHTML("beforeend", markup);
  }

  deletePost(id) {
    const el = this.refs.postList.querySelector(`.post[data-id="${id}"]`);

    el.remove();
  }

  createPostMarkup({ id, title }) {
    return `
      <li class="post" data-id="${id}">
      ${title}
          <button data-action="delete">Удалить</button>
      </li>
    `;
  }
}
