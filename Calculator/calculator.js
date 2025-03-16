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
let shouldResetScreen = false;

const updateDisplay = () => {
  numDisplay.innerText = currentNum;

  let length = currentNum.replace(/[^0-9]/g, "").length;

  if (length > 10) {
    numDisplay.style.fontSize = "36px";
  }
  if (length > 15) {
    numDisplay.style.fontSize = "28px";
  }
  if (length > 20) {
    numDisplay.style.fontSize = "20px";
  }
  if (length <= 10) {
    numDisplay.style.fontSize = "48px";
  }
};

const MAX_DIGITS = 25;

const inputNumber = (number) => {
  if (shouldResetScreen) {
    currentNum = number;
    shouldResetScreen = false;
  } else {
    if (currentNum.replace(/[^0-9]/g, "").length >= MAX_DIGITS) return;
    currentNum = currentNum === "0" ? number : currentNum + number;
  }
  updateDisplay();
};

const inputOperator = (operator) => {
  if (currentNum === "") return;
  if (previousNum !== "") {
    calculate();
  }
  previousNum = currentNum;
  calculationOperator = operator;
  shouldResetScreen = true;
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
  });
});

equalSign.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.querySelector(".clearBtn");

  clearBtn.addEventListener("click", () => {
    currentNum = "0";
    previousNum = "";
    calculationOperator = "";
    shouldResetScreen = false;
    updateDisplay();
  });
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
