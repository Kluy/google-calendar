import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const calendarHeader = document.querySelector('.calendar__header');

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка

  const weekStart = getItem('displayedWeekStart');
  // console.log(weekStart);
  const headerOfWeek = generateWeekRange(weekStart)
    .map((elem) => {
      return (elem = `<div class='calendar__day'><div class='day-of-week'>${
        daysOfWeek[elem.getDay()]
      }</div><div class='date'>${elem.getDate()}</div></div>`);
    })
    .join('');
  // console.log(arrLayout);

  calendarHeader.innerHTML = headerOfWeek;
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
const createEventBtn = document.querySelector('.create-event-btn');
createEventBtn.addEventListener('click', openModal);
