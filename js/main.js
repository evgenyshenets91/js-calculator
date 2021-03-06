const decimalBtn = document.getElementsByTagName('button').decimal;
const clearBtn = document.getElementsByTagName('button').clear;
const backspaceBtn = document.getElementsByTagName('button').backspace;
const resultBtn = document.getElementsByTagName('button').result;


const output = document.getElementById('outputResult');
const outputHistory = document.querySelector('.calculator__display-area_history')


const calcNumBtn = document.getElementsByClassName('calc-num');
const calcOperatorBtn = document.getElementsByClassName('calc-operator');

let displayVal = '0',
    pandingVal, // Первый операнд. значение которое хранится в памяти, если мы вводим второй 
    result,
    operator,
    arrHistory = [];

const updateVal = (clickObj) => {
  let btn = clickObj.target.innerText;

  if (displayVal === '0')
    displayVal = '';

    displayVal += btn;
    output.innerText = displayVal;

  onTextCharge();
}

function resultOperation(clickObj) {
  operator = clickObj.target.innerText;
  pandingVal = displayVal;
  displayVal = '';

  arrHistory.push(pandingVal);
  arrHistory.push(operator);
  let arrToStr = arrHistory.slice(0, 2).join(' ');

  outputHistory.innerText = arrToStr;
}

// Функция изменения размера текста
function onTextCharge() {
  if (displayVal.length > 9 || displayVal.toString().length > 9) {
    output.style.fontSize = "30px"
  } else {
    output.style.fontSize = "50px"
  }
}

// Циклы для отлова событий на кнопках 
for (let i = 0; i < calcNumBtn.length; i++) {
  calcNumBtn[i].addEventListener('click', updateVal, false)
}

for (let i = 0; i < calcOperatorBtn.length; i++) {
  calcOperatorBtn[i].addEventListener('click', resultOperation, false)
}

resultBtn.addEventListener('click', () => {

  arrHistory = [];
  outputHistory.innerText = '';

  switch (operator) {
    case "+":
      result = parseFloat(pandingVal) + parseFloat(displayVal)

      break;

    case '−':
      result = parseFloat(pandingVal) - parseFloat(displayVal)

      break;

    case '×':
      result = parseFloat(pandingVal) * parseFloat(displayVal)

      break;

    case '÷':
      result = parseFloat(pandingVal) / parseFloat(displayVal)

      break;

  }

  output.innerText = result;
  pandingVal = 0;
  displayVal = result;
  onTextCharge();
})

clearBtn.addEventListener('click', () => {
  displayVal = '0';
  pandingVal = undefined;
  arrHistory = [];

  output.innerText = displayVal;
  outputHistory.innerText = '';

  onTextCharge();
})

backspaceBtn.addEventListener('click', () => {

  displayVal = displayVal.slice(0, -1);
  if (displayVal === '') {
    displayVal = '0';
  }
  
  output.innerText = displayVal;
  onTextCharge();

})

decimalBtn.addEventListener('click', () => {
  if (!displayVal.includes(".")) {
    displayVal += "."
    output.innerText = displayVal;
  }
})