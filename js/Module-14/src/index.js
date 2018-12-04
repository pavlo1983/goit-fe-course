import  './scss/style.scss';
import Model from './js/model';
import View from './js/view';
import EventEmitter from './services/event-emitter';
import Controller from './js/controller';


const view = new View();
const model = new Model();



new Controller(view, model);



