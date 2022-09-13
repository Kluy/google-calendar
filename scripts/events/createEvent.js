import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  eventFormElem.children.description.value = '';
  eventFormElem.children.title.value = '';
  eventFormElem.children[1].children.date.value = '';
  eventFormElem.children[1].children.endTime.value = '';
  eventFormElem.children[1].children.startTime.value = '';
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  clearEventForm();
  closeModal();
}

function onCreateEvent(event) {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
  event.preventDefault();

  const events = getItem('events');
  const newEvent = {
    id: Math.random(), // id понадобится для работы с событиями
  };

  if(event.target.type === 'submit'){
    newEvent.title = eventFormElem.children.title.value;
    newEvent.description = eventFormElem.children.description.value;
    newEvent.date = eventFormElem.children[1].children.date.value;
    newEvent.endTime = eventFormElem.children[1].children.endTime.value;
    newEvent.startTime = eventFormElem.children[1].children.startTime.value;
    events.push(newEvent);
    setItem('events', events);
  }

  // const eventExample = {
  //   id: 0.7520027086457333, // id понадобится для работы с событиями
  //   title: 'Title',
  //   description: 'Some description',
  //   start: new Date('2020-03-17T01:10:00.000Z'),
  //   end: new Date('2020-03-17T04:30:00.000Z'),
  // };

  renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  eventFormElem.addEventListener('click', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
