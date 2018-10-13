/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

"use strict";

const galleryItems = [
  {
    preview: "img/small_320/rabbits320.jpg",
    fullview: "img/large_1280/rabbits(1280).jpg",
    alt: "alt text 1"
  },
  {
    preview: "img/small_320/elephant320.jpeg",
    fullview: "img/large_1280/elephant(1280).jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/small_320/lemurs320.jpeg",
    fullview: "img/large_1280/lemurs(1280).jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/small_320/monkey320.jpeg",
    fullview: "img/large_1280/monkey(1280).jpeg",
    alt: "alt text 4"
  },
  {
    preview: "img/small_320/tiger320.jpeg",
    fullview: "img/large_1280/tiger(1280).jpeg",
    alt: "alt text 5"
  },
  {
    preview: "img/small_320/zebra320.jpeg",
    fullview: "img/large_1280/zebra(1280).jpeg",
    alt: "alt text 6"
  },
  {
    preview: "img/small_320/sheeps320.jpeg",
    fullview: "img/large_1280/sheeps(1280).jpeg",
    alt: "alt text 7"
  },
  {
    preview: "img/small_320/koalas320.jpeg",
    fullview: "img/large_1280/koalas(1280).jpeg",
    alt: "alt text 8"
  }
];

const fullviewDiv = document.createElement("div");
fullviewDiv.classList.add("fullview");

function createFullview(galleryItems) {
  const img = document.createElement("img");
  img.setAttribute("src", galleryItems[0].fullview);
  img.setAttribute("alt", galleryItems[0].alt);
  return img;
}

const finalFullview = createFullview(galleryItems);

fullviewDiv.append(finalFullview);

const previewUl = document.createElement("ul");
previewUl.classList.add("preview");

function animalGallery({ preview, fullview, alt }) {
  const li = document.createElement("li");
  li.classList.add("animals");

  const img = document.createElement("img");
  img.setAttribute("src", preview);
  img.setAttribute("data-fullview", fullview);
  img.setAttribute("alt", alt);

  previewUl.append(li);
  li.append(img);

  return previewUl;
}

function createGallery(galleryItems) {
  const elements = [];
  galleryItems.forEach(galleryItems => {
    const el = animalGallery(galleryItems);
    elements.push(el);
  });
  return elements;
}

const finalGallery = createGallery(galleryItems);

const gallery = document.querySelector(".js-image-gallery");

gallery.prepend(...finalGallery);

gallery.prepend(fullviewDiv);

previewUl.addEventListener("click", showFullviewImage);

function showFullviewImage() {
  const nodeName = event.target.nodeName;
  if (nodeName !== "IMG") return;
  const img = fullviewDiv.querySelector("img");
  img.src = event.target.dataset.fullview;
  img.alt = event.target.alt;
}

const images = previewUl.querySelectorAll("img");
images[0].classList.add("isActive");

previewUl.addEventListener("click", handleMenuClick);

function handleMenuClick({ target }) {
  const nodeName = target.nodeName;
  if (nodeName !== "IMG") return;
  setActiveAnimals(images, target);
}

function setActiveAnimals(images, target) {
  images.forEach(image => {
    if (image !== target) {
      image.classList.remove("isActive");
    } else {
      image.classList.add("isActive");
    }
  });
}
