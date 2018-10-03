/*
  Создайте функцию createPostCard(), которая 
  создает и возвращает DOM-узел карточки поста.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/

/* <div class="post">
    <img class="post__image" src="http://via.placeholder.com/400x150" alt="post image">
    <h2 class="post__title">Lorem ipsum dolor</h2>
    <p class="post__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus
      voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi
      nesciunt veritatis distinctio rem!</p>
    <a class="button" href="#">Read more</a>
  </div> */

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

"use strict";

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-1.com"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-2.com"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-3.com"
  }
];

function createPostCard({ img, title, text, link }) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const postImage = document.createElement("img");
  postImage.classList.add("post__image");
  postImage.setAttribute("src", img);
  postImage.setAttribute("alt", "post image");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title");
  postTitle.textContent = title;

  const postText = document.createElement("p");
  postText.classList.add("post__text");
  postText.textContent = text;

  const postButton = document.createElement("a");
  postButton.classList.add("button");
  postButton.setAttribute("href", link);
  postButton.textContent = "Read more";

  postDiv.append(postImage, postTitle, postText, postButton);

  return postDiv;
}

function createCards(posts) {
  const elements = [];
  posts.forEach(posts => {
    const el = createPostCard(posts);
    elements.push(el);
  });
  return elements;
}

const finalPosts = createCards(posts);

document.body.prepend(...finalPosts);
