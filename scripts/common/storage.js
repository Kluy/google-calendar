let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
};

export const setItem = (key, value) => {
  // ф-ция должна устанавливать значения в объект storage
  storage[key] = value;

  // localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => {
  // ф-ция должна возвращать по ключу значения из объекта storage
  return storage[key];

  // const response = JSON.parse(localStorage.getItem(key));
  // if (key === 'displayedWeekStart') return new Date(JSON.parse(localStorage.getItem(key)));
  // return response;
};

// пример объекта события
const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};
