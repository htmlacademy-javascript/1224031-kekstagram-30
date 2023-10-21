const getStringLength = (string, maxLength) => string.length <= maxLength;
//Вызов функции чтобы линтер не ругался
getStringLength('проверяемая строка', 20);

const palindromeCheck = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return Array.from(string).toString() === Array.from(string).reverse().toString();
};
//Вызов функции чтобы линтер не ругался
palindromeCheck('топот');

const getNumberFromString = (string) => {
  let numbers = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (!isNaN(Number(string[i]))) {
      numbers += string[i];
    }
  }

  numbers = numbers.replaceAll(' ', '');

  return parseInt(numbers, 10);
};

//Вызов функции чтобы линтер не ругался
getNumberFromString('2023 год');

//Решение задачи "Делу время"
const timeInMinutes = (array) => (parseInt(array[0], 10) * 60) + (parseInt(array[1], 10));

const isMeetingTimeCorrect = (workDayStart, workDayEnd, meetingStart, meetingTime) => {
  const workDayStartInMinutes = timeInMinutes(workDayStart.split(':'));
  const workDayEndInMinutes = timeInMinutes(workDayEnd.split(':'));
  const meetingStartInMinutes = timeInMinutes(meetingStart.split(':'));
};

//console.log(isMeetingTimeCorrect('08:00', '17:30', '14:00', 90)) // true
// console.log(isMeetingTimeCorrect('8:0', '10:0', '8:0', 120))     // true
// console.log(isMeetingTimeCorrect('08:00', '14:30', '14:00', 90)) // false
// console.log(isMeetingTimeCorrect('14:00', '17:30', '08:0', 90))  // false
// console.log(isMeetingTimeCorrect('8:00', '17:30', '08:00', 900)) // false
