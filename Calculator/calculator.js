const numbers = document.querySelectorAll(".number");
const numDisplay = document.getElementById("numDisplay");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equalSign");
const clearBtn = document.querySelector(".clearBtn");
const decimal = document.querySelector(".decimal");
let previousNum;
let currentNum = 0;
let calculationOperator = "";

const updateDisplay = () => {
  numDisplay.innerText = currentNum;
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
  if (!previousNum || !currentNum) return;

  let num1 = parseFloat(previousNum);
  let num2 = parseFloat(currentNum);
  let result;

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
      if (num2 === 0) {
        console.log("err");
        numDisplay.innerText = "bleee";
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }
  currentNum = result.toString();
  calculationOperator = "";
  previousNum = "";
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
  numDisplay.innerText = `0.${currentNum}`;
  console.log(currentNum);
});
