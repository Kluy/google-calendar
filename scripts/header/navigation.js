import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');

const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  displayedMonthElem.textContent = getDisplayedMonth(getItem('displayedWeekStart'));
  displayedMonthElem.textContent = getDisplayedMonth(getItem('displayedWeekStart'));
}

const onChangeWeek = event => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  const direction = event.target.dataset.direction;
  let date;
  if (direction === 'next') {
    date = shmoment(getItem('displayedWeekStart').getTime()).add('days', 7).result();
  } else if (direction === 'prev') {
    date = shmoment(getItem('displayedWeekStart').getTime()).subtract('days', 7).result();
  } else if (direction === 'today') {
    date = new Date();
  }
  setItem('displayedWeekStart', getStartOfWeek(new Date(date)));
  renderHeader();
  renderWeek();
  renderCurrentMonth();
  renderEvents();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
