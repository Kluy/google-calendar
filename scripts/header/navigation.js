import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');

const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  // setItem('displayedWeekStart', getStartOfWeek(new Date()));
  displayedMonthElem.textContent = getDisplayedMonth(getItem('displayedWeekStart'));
}

const onChangeWeek = (event) => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  const direction = event.target.dataset.direction;
  console.log(getItem('displayedWeekStart').getTime());
  console.log(getItem('displayedWeekStart'));
  let date;
  if(direction === 'next'){
    date = getItem('displayedWeekStart').getTime() + 604800000;
  } else if (direction === 'prev') {
    date = getItem('displayedWeekStart').getTime() - 604800000;
  } else if (direction === 'today'){
    date = new Date();

  }
  setItem('displayedWeekStart', getStartOfWeek(new Date(date)));
  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
