const add = function(num1, num2) {
	let first = parseInt(num1, 10);
    let second = parseInt(num2, 10);
    let answer = first + second;
   answerText.textContent =  answer;

};

const subtract = function(num1, num2) {
    let first = parseInt(num1, 10);
    let second = parseInt(num2, 10);
	let answer = first - second;

    answerText.textContent =  answer;
};

  
const multiply = function(num1, num2) {
    let first = parseInt(num1, 10);
    let second = parseInt(num2, 10);
    let answer = first * second;

    answerText.textContent =  answer;
};

const divide = function(num1, num2){
    let first = parseInt(num1, 10);
    let second = parseInt(num2, 10);
    let answer = first / second;

    answerText.textContent =  answer;
}
  
let equals = document.querySelector(".equals");
let clear = document.querySelector(".clear");
let calculateText = document.querySelector(".calculateText");
let answerText = document.querySelector(".answerText");

let buttons = document.querySelectorAll("button");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let input = [];
let operatorPressed;
let operatorIndex;
let number1;
let number2;

//WHEN ANY BUTTON IS CLICKED, ADD THAT BUTTON'S id TO AN ARRAY CALLED INPUT
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        input.push(button.id);
   
//print the array as a dynamic string onto the calculator's display
        calculateText.textContent = input.join(" ");
//get first part of equation 

        number1 = input.slice(0, operatorIndex).join("");
        console.log(number1);
        number2 = input.slice(operatorIndex + 1).join("");
        console.log(number2);
 

    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        operatorPressed = input.find(checkOperator);
        operatorIndex = input.findIndex(checkOperator);

    })
})

function checkOperator(operator) {
  return operator === '+' || operator === '-' || operator === '*' || operator === '/';
}

equals.addEventListener('click', () => {
    console.log('Equals...')
    operate(operatorPressed, number1, number2);
})


clear.addEventListener('click', () => {
    calculateText.textContent = "";
    answerText.textContent = "";
    input = [];
})

//function called operate that takes an operator and 2 numbers
function operate(operatorPressed, number1, number2){
    if (operatorPressed === '+'){
        add(number1, number2);
    }
    else if(operatorPressed === '-'){
        subtract(number1, number2);
    }
    else if(operatorPressed === '*'){
        multiply(number1, number2);
    }
    else if(operatorPressed === '/'){
        divide(number1, number2);
    }
}