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

  if (numbers.length === 0) {
    return NaN;
  }

  return numbers;
};
//Вызов функции чтобы линтер не ругался
getNumberFromString('2023 год');
