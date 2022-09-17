import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений

  // eventFormElem.children.description.value = '';
  // eventFormElem.children.title.value = '';
  // eventFormElem.children[1].children.date.value = '';
  // eventFormElem.children[1].children.end.value = '';
  // eventFormElem.children[1].children.start.value = '';
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

  const formData = [...new FormData(eventFormElem)];

  formData.forEach((elem) => {
    newEvent[elem[0]] = elem[1];
  });

  newEvent.start = new Date(newEvent.date.split('-').concat(newEvent.start));

  newEvent.end = new Date(newEvent.date.split('-').concat(newEvent.end));

  delete newEvent.date;

  if (event.target.type === 'submit') {
    events.push(newEvent);
    setItem('events', events);
    onCloseEventForm();
    renderEvents();
  }
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  eventFormElem.addEventListener('click', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
