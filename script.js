// === IMPORTANT === //
// My mistake was to treat the entire Output as a single string, instead of making Two strings for each operation, somehow I made that mistake and turn this simple Calculator into a whole mess XD
// Thanks to Web Dev SiMplified video https://www.youtube.com/watch?v=j59qQ7YWLxw
// I was able to make this, altough, it's almost the exact same code, I tried my best to simplify it, but it was alredy pretty clean.

// Calculator
class Calculator {
  constructor(prev, current) {
    this.prev = prev;
    this.current = current;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand + number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.prevOperand !== '') this.compute();
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '÷':
        result = Math.floor((prev / current) * 100) / 100;
        break;
      default:
        return '';
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }
    return integerDisplay;
  }

  updateDisplay() {
    this.current.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.prev.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prev.innerText = this.prevOperand;
    }
  }
}

// Elements
const numbers = document.querySelectorAll('.nbr');
const operations = document.querySelectorAll('.oprd');
const eq = document.querySelector('.eq');
const del = document.querySelector('.del');
const clr = document.querySelector('.clr');
const prev = document.querySelector('.prev');
const current = document.querySelector('.current');

// Init
const calculator = new Calculator(prev, current);

// Append number
numbers.forEach(btn =>
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.textContent);
    calculator.updateDisplay();
  })
);

// Operations
operations.forEach(btn =>
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.textContent);
    calculator.updateDisplay();
  })
);

// Equals
eq.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.clear();
});

// Clear
clr.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

// Delete
del.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
