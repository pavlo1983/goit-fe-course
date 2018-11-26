import  './scss/style.scss';
import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

const model = new Model();
const view = new View();

new Controller(view, model);

// Model + API
model.getItems().then(all => console.log(all));
// model.addItem({"title": "Hello from index.js"}).then(i => console.log(i));
// model.deleteItem('OM_Lvis').then(i => console.log('Deleted post with id = ' + i));

// View
// model.addItem({"title": "Hello from index.js"}).then(i => view.addPost(i));
// model.getItems().then(all =>  view.init(all));