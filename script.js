function add(a, b) {
	return a + b;
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
	OPERATOR: Symbol("operator"),
	SECONDOPERATOR: Symbol("second operator"),
};

const calculator = {
	firstNumber: "",
	secondNumber: "",
	operator: "",
	nextOperator: "",
	state: States.EMPTY,
};

function updateButtons(state) {
	switch (state) {
		case States.EMPTY:
			// operatorButtons.forEach(element => element.disabled = true);
			// equalsButton.disabled = true;
			break;
		case States.FIRSTNUMBER:

			break;
		case States.SECONDNUMBER:
			// statements_1
			break;
		case States.OPERATOR:
			// statements_1
			break;
		case States.SECONDOPERATOR:
			// statements_1
			break;	
	}
};


const buttons = document.querySelectorAll("main button")
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const readoutText = document.querySelector(".readout");

let readout = "";

buttons.forEach(element => {
	element.addEventListener("click", (element) => update(element.target));
});

function update(button) {
	if (button.classList.contains("number")) {
		switch (calculator.state) {
			case States.EMPTY:
			case States.FIRSTNUMBER:
				calculator.firstNumber += button.dataset.func;
				calculator.state = States.FIRSTNUMBER;
				break;
			case States.SECONDNUMBER:
				calculator.secondNumber += button.dataset.func;
				break;
			default:
				// statements_def
				break;
		};
	} else if (button.classList.contains("operator")) {
		switch (calculator.state) {
			case States.FIRSTNUMBER:
				calculator.operator = button.dataset.func;
				calculator.state = States.SECONDNUMBER;
				break;
			case States.SECONDNUMBER:
				calculator.nextOperator = button.dataset.func;
				calculator.state = States.FIRSTNUMBER;
				calculator.firstNumber = operate(calculator.firstNumber, calculator.secondNumber, calculator.operator);
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
	updateReadout();
};

function updateReadout() {
	readoutText.innerText = `${calculator.firstNumber} ${calculator.operator} ${calculator.secondNumber}`
}

updateButtons(calculator.state);


