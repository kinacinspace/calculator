function add(a, b) {
	return +a + +b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
	return a / b;
};

function operate(a, b, op) {
	let result = 0;
	switch (op) {
		case "add":
			result = add(a, b);
			break;
		case "subtract":
			result = subtract(a, b);
			break;
		case "multiply":
			result = multiply(a, b);
			break;
		case "divide":
			result = divide(a, b);
			break;
		default:
			Error("invalid operator");
			break;
	};
	return result;
};

const States = {
	EMPTY: Symbol("empty"),
	FIRSTNUMBER: Symbol("first number"),
	SECONDNUMBER: Symbol("second number"),
	FIRSTPREFIX: Symbol("first prefix"),
	SECONDPREFIX: Symbol("second prefix"),
	OPERATOR: Symbol("operator"),
	SECONDOPERATOR: Symbol("second operator"),
};

const calculator = {
	firstNumber: "",
	secondNumber: "",
	operator: "",
	nextOperator: "",
	state: States.EMPTY,
	firstNumberNegative: false,
	secondNumberNegative: false,
};

const buttons = document.querySelectorAll("main button")
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const subtractButton = document.querySelector(".subtract")
const equalsButton = document.querySelector(".equals");
const readoutText = document.querySelector(".readout");

let readout = "";

buttons.forEach(element => {
	element.addEventListener("click", (element) => update(element.target));
});


function updateButtons(state) {
	switch (state) {
		case States.EMPTY:
			operatorButtons.forEach(element => element.disabled = true);
			equalsButton.disabled = true;
			subtractButton.disabled = false;
			break;
		case States.FIRSTNUMBER:
			operatorButtons.forEach(element => element.disabled = false);
			break;
		case States.SECONDNUMBER:
			equalsButton.disabled = false;
			break;
		case States.OPERATOR:
			// statements_1
			break;
		case States.SECONDOPERATOR:
			// statements_1
			break;	
	}
};



function update(button) {
	if (button.classList.contains("number")) {
		switch (calculator.state) {
			case States.EMPTY:
			case States.FIRSTNUMBER:
			case States.FIRSTPREFIX:
				calculator.firstNumber += button.dataset.func;
				calculator.state = States.FIRSTNUMBER;
				break;
			case States.OPERATOR:
			case States.SECONDNUMBER:
			case States.SECONDPREFIX:
				calculator.secondNumber += button.dataset.func;
				calculator.state = States.SECONDNUMBER;
				break;
			default:
				// statements_def
				break;
		};
	} else if (button.classList.contains("operator")) {
		switch (calculator.state) {
			case States.EMPTY:
				calculator.firstNumber += operatorToSymbol(button.dataset.func); //this is for negative number input
				calculator.state = States.FIRSTPREFIX;
				break;
			case States.FIRSTNUMBER:
				calculator.operator = button.dataset.func;
				calculator.state = States.OPERATOR;
				break;
			case States.OPERATOR:
				calculator.secondNumber += operatorToSymbol(button.dataset.func); //this is for negative number input
				calculator.state = States.SECONDPREFIX;
				break;
			case States.SECONDNUMBER:
				calculator.nextOperator = button.dataset.func;
				calculator.firstNumber = operate(calculator.firstNumber, calculator.secondNumber, calculator.operator);
				calculator.state = States.SECONDNUMBER;
				calculator.secondNumber = "";
				calculator.operator = calculator.nextOperator;
				break;
			default:
				// statements_def
				break;
		}
	} else if (button.classList.contains("equals")) {
		if (calculator.state == States.SECONDNUMBER) {
			calculator.state = States.FIRSTNUMBER;
			calculator.firstNumber = operate(calculator.firstNumber, calculator.secondNumber, calculator.operator);
			calculator.secondNumber = "";
			calculator.operator = "";
		};
	};
	updateButtons(calculator.state);
	updateReadout();
};

function updateReadout() {
	readoutText.innerText = `${calculator.firstNumber} ${operatorToSymbol(calculator.operator)} ${calculator.secondNumber}`;
};

function operatorToSymbol(op){
	if (op == "") return ""
	switch (op) {
		case "add":
			return "+";
		case "subtract":
			return "-";
		case "multiply":
			return "x";
		case "divide":
			return "/";			
	}
};

updateButtons(calculator.state);


