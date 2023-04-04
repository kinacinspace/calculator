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


let firstNumber = 0;
let secondNumber = 0;
let operator = "";

const States = {
	EMPTY: Symbol("empty"),
	FIRSTNUMBER: Symbol("first number"),
	SECONDNUMBER: Symbol("second number"),
	OPERATOR: Symbol("operator"),
	SECONDOPERATOR: Symbol("second operator"),
};

function updateButtons(state) {
	switch (state) {
		case States.EMPTY:
			operatorButtons.forEach(element => element.disabled = true);
			equalsButton.disabled = true;
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

let state = States.EMPTY;

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
	switch (state) {
		case States.EMPTY:
			readout += button.dataset.func
			console.log(readout)
			break;
		default:
			// statements_def
			break;
	}
};

updateButtons(state);


