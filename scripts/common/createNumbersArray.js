export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  const arr = [];
  for(from; from <= to; from++)
  arr.push(from);
  return arr;
}