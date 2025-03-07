const numbers = document.querySelectorAll(".number");
const numDisplay = document.getElementById("numDisplay");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equalSign");
const clearBtn = document.querySelector(".clearBtn");
let previousNum;
let currentNum = 0;
let calculationOperator = "";

const updateDisplay = () => {
  numDisplay.innerText = currentNum;
};

const inputNumber = (number) => {
  if (currentNum === 0) {
    currentNum = number;
  } else {
    currentNum += number;
  }
};
const inputOperator = (operator) => {
  if (currentNum === "") return;
  previousNum = currentNum;
  calculationOperator = operator;
  currentNum = "";
};

const calculate = () => {
  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseInt(previousNum) + parseInt(currentNum);
      break;
    case "-":
      result = parseInt(previousNum) - parseInt(currentNum);
      break;
    case "x":
      result = parseInt(previousNum) * parseInt(currentNum);
      break;
    case ":":
      result = parseInt(previousNum) / parseInt(currentNum);
      break;
    default:
      return;
  }
  currentNum = result;
  calculationOperator = "";
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
