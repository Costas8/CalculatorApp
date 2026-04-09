let currentInput = '';
let currentOperation = '';
let previousInput = '';
let justCalculated = false;


function updateDisplay() {
  const display = document.getElementById('numInput');
  const fullEq = `${previousInput} ${currentOperation || ''} ${currentInput}`.trim();

  display.value = fullEq || '0';
}
function appendNumber(number){
  if (justCalculated){
    currentInput = '';
    justCalculated = false;
  }
  if (number === '.') {
    if (currentInput.includes('.')) return; 
    
    if (currentInput === '') {
      currentInput = '0.'; 
    } else {
      currentInput += '.';
    }
  } 
  else {
    if (currentInput === '0') {
      currentInput = number.toString();
    } else {
      currentInput += number.toString();
    }
  }

  document.getElementById('numInput').value =
    `${previousInput} ${currentOperation} ${currentInput}`.trim();
}
  
function appendOperation(operation){
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  currentOperation = operation;
  previousInput = currentInput;
  currentInput = '';
  document.getElementById('numInput').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
  if (previousInput === '' || currentInput === '') return;
  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (currentOperation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert('Cannot divide by zero');
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  result = Math.round(result * 100) / 100;
  justCalculated = true;
  currentInput = result.toString();
  currentOperation = '';
  previousInput = '';
  document.getElementById('numInput').value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  currentOperation = '';
  previousInput = '';
  updateDisplay();
}

function deleteDisplay() {
  const display = document.getElementById('numInput');
  if (currentInput !== ''){
    currentInput = currentInput.slice(0,-1);
  }
  else if (currentOperation !== '') {
    currentOperation = '';
    currentInput = previousInput;
    previousInput = '';
  } 
  else if (previousInput !== '') {
    previousInput = previousInput.slice(0, -1);
  }
  updateDisplay();
}