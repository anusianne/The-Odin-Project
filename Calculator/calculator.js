const numbers = document.querySelectorAll(".number");
const numDisplay = document.getElementById("numDisplay");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equalSign");
const clearBtn = document.querySelector(".clearBtn");
const decimal = document.querySelector(".decimal");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const percent = document.querySelector(".percent");
let previousNum;
let currentNum = 0;
let calculationOperator = "";

const updateDisplay = () => {
  numDisplay.innerText = parseFloat(currentNum).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
};

const inputNumber = (number) => {
  if (currentNum === "0" || currentNum === 0) {
    currentNum = number;
  } else {
    currentNum = currentNum.toString() + number;
  }
};

const inputOperator = (operator) => {
  if (currentNum === "") return;

  if (previousNum !== "") {
    calculate();
  }

  previousNum = currentNum;
  calculationOperator = operator;
  currentNum = "";
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
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        result = NaN;
      }
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
    numDisplay.innerText = `${e.target.value}`;
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
  currentNum = parseFloat(currentNum) / 100;
  updateDisplay();
});
