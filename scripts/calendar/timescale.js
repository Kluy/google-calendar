import { createNumbersArray } from '../common/createNumbersArray.js';

const calendarTimeScale = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const timeScale = createNumbersArray(1, 24)
  .map((elem) => {
    elem = `<div class='time-scale'>${elem.toString().padStart(2,0)}:00</div>`;
    return elem;
  })
  .join('');

  calendarTimeScale.innerHTML = timeScale;
};