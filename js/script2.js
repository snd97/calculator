
let calcKeys = document.querySelector(".buttons"); //div for calculator buttons
let calculateText = document.querySelector(".calculateText"); //user input text display - will hold the visual equation for user
let calculator = document.querySelector(".container") //div for overall calculator container
let equationResult = document.querySelector(".answerText"); //holds the result of the evaluated equation to display to user on screen
let buttons = document.querySelectorAll("button"); //select all buttons from HTML



let equalsPressed = false; //initially the equals button default to false
let equation = 0; //declare the equation as 0 initially

//operate function evaluates the equation based on two numbers and the operator
function operate(firstNumber, operator, secondNumber) {

	firstNumber = Number(firstNumber); //convert to numbers
	secondNumber = Number(secondNumber);

    if (operator === '+') return firstNumber + secondNumber; //add
    if (operator === '-') return firstNumber - secondNumber; //subtract
    if (operator === 'x') return firstNumber * secondNumber; //multiply
    if (operator === '/') return firstNumber / secondNumber; //divide
    if (operator === '%') return firstNumber % secondNumber; //remainder
    if (operator === '^') return firstNumber ** secondNumber; //exponentiation
}

//evaluateEquation is sent the equation based on user input
function evaluateEquation(equation) {
//use split function to create an array called equation, split items by any space " "
	equation = equation.split(" ");
//create an array for all operators which will be used 
	const operators = ['/', 'x', '%', '+', '-', '^'];
	let firstNumber;
	let secondNumber;
	let operator;
	let operatorIndex;
	let result;


	for (let i = 0; i < operators.length; i++) {
		while (equation.includes(operators[i])) {
//findIndex loops through 'equation' array, each one is defined as 'item' - returns the first index where the item equals one of the operators - store result in operatorIndex
			operatorIndex = equation.findIndex(item => item === operators[i]);    
//find the first number to add to equaltion, which will include all numbers before the operator symbol        
			firstNumber = equation[operatorIndex-1];
			operator = equation[operatorIndex];
//find the second number to add to equation, which will include all numbers after the operator symbol     
			secondNumber = equation[operatorIndex+1];
//use newly found numbers and send them through to the operate function, store in result variable
			result = operate(firstNumber, operator, secondNumber);
//
			equation.splice(operatorIndex - 1, 3, result);
		}
	}

	return result;
}

//add event listener for when a user clicks a button in the calcKeys area
calcKeys.addEventListener('click', (event) => {
//if the click occured on any part of the area other than a button, exit function.
    if(!event.target.closest('button')){
        return;
    }
//buttonPressed stores where the click occured i.e. on which button
    const buttonPressed = event.target;
//keyValue stores the id of the button which was pressed
	const keyValue = buttonPressed.id;
//let inputDisplay equal the text content for the equation input by user
	let inputDisplay = calculateText.textContent;
//store the class name of the button pressed into a variable called buttonType - which differentiates operators, numbers, clear button and delete button
    const buttonType = buttonPressed.className;
    const previousButtonType = calculator.className.previousButtonType;

//detect which type of button was pressed while equals has not been pressed
    if(buttonType === 'number' && !equalsPressed) {
	
        if (inputDisplay === '0') {
            calculateText.textContent = (previousButtonType === 'operator') ? inputDisplay + keyValue : keyValue;
            equation = (previousButtonType === 'operator') ? equation + keyValue : keyValue;
        }else {
            calculateText.textContent = calculateText.textContent.includes('N') ? 'NaN' : 
                    calculateText.textContent.includes('I') ? 'Infinity' : inputDisplay + keyValue;
                    equation = equation + keyValue;
        }
    }

    if (buttonType === 'operator' && previousButtonType !== 'operator'
            && !equalsPressed && !inputDisplay.includes('Infinity')) {
            calculateText.textContent = inputDisplay + ' ' + keyValue + ' ';
            equation = equation + ' ' + keyValue + ' ';

        }
    if (( buttonType === 'delete' || buttonType === 'reset') && inputDisplay !== '0') {
        if (buttonType === 'delete' && !equalsPressed) {
            calculateText.textContent = inputDisplay.substring(0, inputDisplay.length - 1);
            equation = equation.substring(0, equation.length - 1);
 
        } else {
            inputDisplay = '0';
            calculateText.textContent = inputDisplay;
            equationResult.innerHTML = '&nbsp;';
            equalsPressed = false;
            equation = '';
            }
    
    }
//when the equals button has been pressed, evaluate the equation and print out the answer to the calculator display
    if (buttonType === 'equals') {
        equalsPressed = true;
        const finalResult = evaluateEquation(equation);
            
        if (finalResult || finalResult === 0) {
            equationResult.textContent = (!Number.isInteger(finalResult)) ? finalResult.toFixed(2) : 
                     (finalResult.toString().length >= 16) ? finalResult.toExponential(2) : finalResult ;
        }else{
            equationResult.textContent = 'Math Error';
        }
            
    }     
    calculator.className.previousButtonType = buttonType;   

})


