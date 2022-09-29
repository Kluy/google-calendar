import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  if (event.target.parentElement.id !== '' || event.target.id !== '') {
    openPopup(event.x, event.y);
    setItem('eventIdToDelete', event.target.parentElement.id || event.target.id);
  }
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
  const oldEvents = document.querySelectorAll('.event');
  oldEvents.forEach(elem => (elem.outerHTML = ''));
}

const createEventElement = event => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
  const newEvent = document.createElement('div');
  newEvent.classList.add('event');
  newEvent.id = `${event.id}`;
  newEvent.dataset.event = 'event';
  newEvent.innerHTML = `<div class='event__title'>${event.title}</div>
  <div class='event__time'>${event.start.getHours()}:${String(event.start.getMinutes()).padStart(
    2,
    0,
  )} - ${event.end.getHours()}:${String(event.end.getMinutes()).padStart(2, 0)}</div>
  <div class='event__description'>${event.description}</div>`;
  newEvent.style.top = `${event.start.getMinutes()}px`;
  return newEvent;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых

  removeEventsFromCalendar();
  const events = getItem('events');
  const monday = getItem('displayedWeekStart');
  const arr = events.filter(
    elem => elem.start >= monday && elem.start < shmoment(monday).add('days', 7).result(),
  );
  arr.forEach(elem => {
    const day = document.querySelector(`[data-day="${elem.start.getDate()}"]`);
    const timeSlot = day.children[elem.start.getHours()];
    timeSlot.innerHTML = createEventElement(elem).outerHTML;
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  const events = getItem('events').filter(
    elem => elem.id.toString() !== getItem('eventIdToDelete'),
  );
  setItem('events', events);
  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick, true);
