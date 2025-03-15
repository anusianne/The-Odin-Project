const numbers = document.querySelectorAll(".number");
const numDisplay = document.getElementById("numDisplay");
const historyDisplay = document.getElementById("historyDisplay"); // Nowy wyświetlacz
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equalSign");
const clearBtn = document.querySelector(".clearBtn");
const decimal = document.querySelector(".decimal");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const percent = document.querySelector(".percent");

let previousNum = "";
let currentNum = "0";
let calculationOperator = "";
let shouldResetScreen = false; // Flaga do resetowania ekranu po wpisaniu liczby po wyniku

const updateDisplay = () => {
  numDisplay.innerText = parseFloat(currentNum).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
};

const updateHistory = () => {
  historyDisplay.innerText = previousNum
    ? `${previousNum} ${calculationOperator}`
    : "";
};

const inputNumber = (number) => {
  if (shouldResetScreen) {
    currentNum = number;
    shouldResetScreen = false;
  } else {
    currentNum = currentNum === "0" ? number : currentNum + number;
  }
};

const inputOperator = (operator) => {
  if (currentNum === "") return;
  if (previousNum !== "") {
    calculate();
  }
  previousNum = currentNum;
  calculationOperator = operator;
  shouldResetScreen = true;
  updateHistory();
};

const calculate = () => {
  if (!previousNum || !currentNum || !calculationOperator) return;

  let num1 = parseFloat(previousNum);
  let num2 = parseFloat(currentNum);
  let result = 0;

  switch (calculationOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "÷":
      result = num2 !== 0 ? num1 / num2 : NaN;
      break;
    default:
      return;
  }

  currentNum = result.toString();
  previousNum = "";
  calculationOperator = "";
  updateHistory();
  updateDisplay();
};

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    inputNumber(e.target.value);
    updateDisplay();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    inputOperator(e.target.value);
    updateHistory();
  });
});

equalSign.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  currentNum = "0";
  previousNum = "";
  calculationOperator = "";
  shouldResetScreen = false;
  updateHistory();
  updateDisplay();
});

decimal.addEventListener("click", () => {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    updateDisplay();
  }
});

plusMinusBtn.addEventListener("click", () => {
  currentNum = (parseFloat(currentNum) * -1).toString();
  updateDisplay();
});

percent.addEventListener("click", () => {
  currentNum = (parseFloat(currentNum) / 100).toString();
  updateDisplay();
});
