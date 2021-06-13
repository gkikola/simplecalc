const keys = {
  mC: document.querySelector('#mc'),
  mR: document.querySelector('#mr'),
  mMinus: document.querySelector('#m-minus'),
  mPlus: document.querySelector('#m-plus'),
  clear: document.querySelector('#clear'),
  plusMinus: document.querySelector('#plus-minus'),
  percent: document.querySelector('#percent'),
  sqrt: document.querySelector('#sqrt'),
  num1: document.querySelector('#num-1'),
  num2: document.querySelector('#num-2'),
  num3: document.querySelector('#num-3'),
  num4: document.querySelector('#num-4'),
  num5: document.querySelector('#num-5'),
  num6: document.querySelector('#num-6'),
  num7: document.querySelector('#num-7'),
  num8: document.querySelector('#num-8'),
  num9: document.querySelector('#num-9'),
  num0: document.querySelector('#num-0'),
  decimalPoint: document.querySelector('#decimal-point'),
  equals: document.querySelector('#equals'),
  add: document.querySelector('#add'),
  subtract: document.querySelector('#subtract'),
  multiply: document.querySelector('#multiply'),
  divide: document.querySelector('#divide'),
};

const calculator = {
  displayedNumber: 0,
  constantOperand: 0,
  runningTotal: 0,
  currentOperator: null,
  lastOperator: null,

  // The custom stored value used by the memory buttons
  memory: 0,

  currentEntry: {
    input: '',
    isNegative: false,
    hasDecimalPoint: false,
    isError: false,
  },

  /* True if the clear button should clear the entire expression (instead of
   * just the current value). */
  clearAll: false,

  /* Holds keys that the user is typing on the keyboard. This is needed for
   * the square root and mem keyboard commands. */
  keyboardSequence: [],
}

const MAX_DIGITS = 10;

init();

function init() {
  for (key in keys) {
    const buttonElement = keys[key];
    const button = getButtonText(buttonElement);
    buttonElement.addEventListener('mousedown', () => highlightButton(button));
    buttonElement.addEventListener('click', () => pressButton(button));
  }

  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('keyup', releaseButton);
  document.addEventListener('mouseup', releaseButton);

  clearEntry();
  displayCurrentEntry();
}

function handleKeyPress(event) {
  switch (event.key) {
  default:
    calculator.keyboardSequence = [];
    return;
  case 'Shift':
    break;
  case 'm': // Could be start of a mem command
  case 's': // Could be start of sqrt command
    calculator.keyboardSequence = [event.key];
    break;
  case 'q': case 'r': case 't':
    calculator.keyboardSequence.push(event.key);
    if (calculator.keyboardSequence.join('') === 'sqrt') {
      pressButton('sqrt');
      highlightButton('sqrt');
    } else if (calculator.keyboardSequence.join('') === 'mr') {
      pressButton('MR');
      highlightButton('MR');
    }
    break;
  case 'n':
    pressButton('+-');
    highlightButton('+-');
    break;
  case 'c':
    calculator.keyboardSequence.push(event.key);
    if (calculator.keyboardSequence.join('') === 'mc') {
      pressButton('MC');
      highlightButton('MC');
    }
    break;
  case '+':
  case '-':
    calculator.keyboardSequence.push(event.key);
    if (calculator.keyboardSequence.join('') === 'm+') {
      pressButton('M+');
      highlightButton('M+');
    } else if (calculator.keyboardSequence.join('') === 'm-') {
      pressButton('M-');
      highlightButton('M-');
    } else {
      pressButton(event.key);
      highlightButton(event.key);
    }
    break;
  case '%':
  case '*':
  case '/':
  case '.':
  case '=':
  case '0': case '1': case '2': case '3': case '4':
  case '5': case '6': case '7': case '8': case '9':
    pressButton(event.key);
    highlightButton(event.key);
    break;
  case 'Enter':
    pressButton('=');
    highlightButton('=');
    break;
  case 'Escape':
    pressButton('C');
    highlightButton('C');
    break;
  }
  event.preventDefault();
}

function getButtonElement(button) {
  switch (button) {
  case 'MC':
    return keys.mC;
  case 'MR':
    return keys.mR;
  case 'M-':
    return keys.mMinus;
  case 'M+':
    return keys.mPlus;
  case 'C':
    return keys.clear;
  case '+-':
    return keys.plusMinus;
  case '%':
    return keys.percent;
  case 'sqrt':
    return keys.sqrt;
  case '1':
    return keys.num1;
  case '2':
    return keys.num2;
  case '3':
    return keys.num3;
  case '4':
    return keys.num4;
  case '5':
    return keys.num5;
  case '6':
    return keys.num6;
  case '7':
    return keys.num7;
  case '8':
    return keys.num8;
  case '9':
    return keys.num9;
  case '0':
    return keys.num0;
  case '.':
    return keys.decimalPoint;
  case '=':
    return keys.equals;
  case '+':
    return keys.add;
  case '-':
    return keys.subtract;
  case '*':
    return keys.multiply;
  case '/':
    return keys.divide;
  default:
    return null;
  }
}

function getButtonText(buttonElement) {
  switch (buttonElement) {
  case keys.mC:
    return 'MC';
  case keys.mR:
    return 'MR';
  case keys.mMinus:
    return 'M-';
  case keys.mPlus:
    return 'M+';
  case keys.clear:
    return 'C';
  case keys.plusMinus:
    return '+-';
  case keys.percent:
    return '%';
  case keys.sqrt:
    return 'sqrt';
  case keys.num1:
    return '1';
  case keys.num2:
    return '2';
  case keys.num3:
    return '3';
  case keys.num4:
    return '4';
  case keys.num5:
    return '5';
  case keys.num6:
    return '6';
  case keys.num7:
    return '7';
  case keys.num8:
    return '8';
  case keys.num9:
    return '9';
  case keys.num0:
    return '0';
  case keys.decimalPoint:
    return '.';
  case keys.equals:
    return '=';
  case keys.add:
    return '+';
  case keys.subtract:
    return '-';
  case keys.multiply:
    return '*';
  case keys.divide:
    return '/';
  default:
    return null;
  }
}

function pressButton(button) {
  calculator.keyboardSequence = [];
  releaseButton();

  if (button !== 'C')
    calculator.clearAll = false;

  switch (button) {
  case 'C':
    if (calculator.clearAll) {
      clearAll();
    } else {
      calculator.clearAll = true;
      clearEntry();
    }
    displayCurrentEntry();
    break;
  case '0': case '1': case '2': case '3': case '4':
  case '5': case '6': case '7': case '8': case '9':
    pushDigit(button);
    break;
  case '.':
    pushDecimalPoint();
    break;
  case '+-':
    toggleSign();
    break;
  case '+': case '-':
  case '*': case '/':
    pushOperator(button);
    break;
  case '=':
    pushEquals();
    break;
  }
}

function highlightButton(button) {
  const classes = getButtonElement(button).classList;

  if (classes.contains('num-key'))
    classes.add('num-key-pressed');
  else if (classes.contains('mem-key'))
    classes.add('mem-key-pressed');
  else if (classes.contains('op-key'))
    classes.add('op-key-pressed');
  else if (classes.contains('special-key'))
    classes.add('special-key-pressed');
}

function releaseButton() {
  for (key in keys) {
    keys[key].classList.remove('num-key-pressed');
    keys[key].classList.remove('mem-key-pressed');
    keys[key].classList.remove('op-key-pressed');
    keys[key].classList.remove('special-key-pressed');
  }
}

function setDisplay(string) {
  const display = document.querySelector('#display');

  display.textContent = string;
}

function displayCurrentEntry() {
  const entry = calculator.currentEntry;

  if (entry.isError) {
    calculator.displayedNumber = Number.NaN;
    setDisplay('ERROR');
  } else {
    let output = '';

    if (entry.isNegative)
      output += '-';

    if (entry.input.length === 0)
      output += '0';
    else
      output += entry.input;

    if (!entry.hasDecimalPoint)
      output += '.';

    calculator.displayedNumber = Number(output);
    setDisplay(insertCommas(output));
  }
}

function displayResult(number) {
  calculator.displayedNumber = number;

  if (Number.isFinite(number)) {
    let output = insertCommas(number.toString());

    if (output.indexOf('.') < 0)
      output += '.';

    setDisplay(output);
  } else {
    setDisplay('ERROR');
  }
}

function insertCommas(numberString) {
  const decPointIndex = numberString.indexOf('.');

  const sign = numberString.charAt(0) === '-' ? '-' : '';
  let integerPart;
  let fractionPart;
  if (decPointIndex < 0) {
    integerPart = numberString.slice(sign.length);
    fractionPart = '';
  } else {
    integerPart = numberString.slice(sign.length, decPointIndex);
    fractionPart = numberString.slice(decPointIndex);
  }

  const length = integerPart.length;
  let digitArray = [];
  for (let position = length - 1; position >= 0; position--) {
    digitArray.unshift(integerPart.charAt(position));
    if ((length - position) % 3 === 0 && position > 0)
      digitArray.unshift(',');
  }

  return sign + digitArray.join('') + fractionPart;
}

function clearEntry() {
  const entry = calculator.currentEntry;
  entry.input = '';
  entry.isNegative = false;
  entry.hasDecimalPoint = false;
  entry.isError = false;
}

function clearAll() {
  calculator.displayedNumber = 0;
  calculator.constantOperand = 0;
  calculator.runningTotal = 0;
  calculator.currentOperator = null;
  calculator.lastOperator = null;
  calculator.clearAll = false;

  clearEntry();
}

function pushDigit(digit) {
  const entry = calculator.currentEntry;

  // Don't want to insert extra zeroes before decimal point
  if (digit !== '0' || entry.input.length > 0) {
    const maxInputLength = entry.hasDecimalPoint ? MAX_DIGITS + 1 : MAX_DIGITS;

    // Too many digits = error, unless after the decimal point
    if (entry.input.length < maxInputLength)
      entry.input += digit;
    else
      entry.isError ||= !entry.hasDecimalPoint;
  }

  displayCurrentEntry();
}

function pushDecimalPoint() {
  const entry = calculator.currentEntry;

  if (!entry.hasDecimalPoint) {
    if (entry.input.length === 0)
      entry.input = '0';

    entry.input += '.';
    entry.hasDecimalPoint = true;
  }

  displayCurrentEntry();
}

function toggleSign() {
  const entry = calculator.currentEntry;
  entry.isNegative = !entry.isNegative;
  displayCurrentEntry();
}

function compute() {
  switch (calculator.currentOperator) {
  case '+':
    calculator.runningTotal += calculator.displayedNumber;
    calculator.constantOperand = calculator.displayedNumber;
    displayResult(calculator.runningTotal);
    break;
  case '-':
    calculator.runningTotal -= calculator.displayedNumber;
    calculator.constantOperand = calculator.displayedNumber;
    displayResult(calculator.runningTotal);
    break;
  case '*':
    calculator.constantOperand = calculator.runningTotal;
    calculator.runningTotal *= calculator.displayedNumber;
    displayResult(calculator.runningTotal);
    break;
  case '/':
    calculator.runningTotal /= calculator.displayedNumber;
    calculator.constantOperand = calculator.displayedNumber;
    displayResult(calculator.runningTotal);
    break;
  }
}

function pushOperator(op) {
  if (calculator.currentOperator === null)
    calculator.runningTotal = calculator.displayedNumber;
  else if (calculator.currentEntry.input.length > 0)
    compute();

  clearEntry();
  calculator.currentOperator = op;
  calculator.lastOperator = op;
}

function pushEquals() {
  if (calculator.currentOperator === null) {
    if (calculator.lastOperator === null) {
      calculator.runningTotal = calculator.displayedNumber;
    } else { // Handle constant operations
      switch (calculator.lastOperator) {
      case '+':
        calculator.runningTotal = calculator.displayedNumber
          + calculator.constantOperand;
        displayResult(calculator.runningTotal);
        break;
      case '-':
        calculator.runningTotal = calculator.displayedNumber
          - calculator.constantOperand;
        displayResult(calculator.runningTotal);
        break;
      case '*':
        calculator.runningTotal = calculator.displayedNumber
          * calculator.constantOperand;
        displayResult(calculator.runningTotal);
        break;
      case '/':
        calculator.runningTotal = calculator.displayNumber
          / calculator.constantOperand;
        displayResult(calculator.runningTotal);
        break;
      }
    }
  } else {
    compute();
  }

  clearEntry();
  calculator.currentOperator = null;
}
