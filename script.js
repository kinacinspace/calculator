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
	return result.toString();
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
};

const buttons = document.querySelectorAll("main button")
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const subtractButton = document.querySelector(".subtract")
const equalsButton = document.querySelector(".equals");
const readoutText = document.querySelector(".readout");
document.addEventListener("keydown", (event) => hotkeyButtons(event.key))

let readout = "";

buttons.forEach(element => {
	element.addEventListener("click", (element) => update(element.target));
});

function hotkeyButtons(key){
	buttons.forEach(element => {
		if (element.dataset.hotkey == key) {
			element.click()
		}
	});
};


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
				if (calculator.firstNumber == "0") calculator.firstNumber = "";
				calculator.firstNumber += button.dataset.func;
				calculator.state = States.FIRSTNUMBER;
				break;
			case States.OPERATOR:
			case States.SECONDNUMBER:
			case States.SECONDPREFIX:
				if (calculator.secondNumber == "0") calculator.secondNumber = "";
				calculator.secondNumber += button.dataset.func;
				calculator.state = States.SECONDNUMBER;
				break;
		};
	} else if (button.classList.contains("operator")) {
		switch (calculator.state) {
			case States.EMPTY:
				if (button.classList.contains("subtract")) {
					calculator.firstNumber += operatorToSymbol(button.dataset.func); //this is for negative number input
					calculator.state = States.FIRSTPREFIX;
				};
				break;
			case States.FIRSTNUMBER:
				calculator.operator = button.dataset.func;
				calculator.state = States.OPERATOR;
				break;
			case States.OPERATOR:
				if (button.classList.contains("subtract")) {
					calculator.secondNumber += operatorToSymbol(button.dataset.func); //this is for negative number input
					calculator.state = States.SECONDPREFIX;
				};
				break;
			case States.SECONDNUMBER:
				calculator.nextOperator = button.dataset.func;
				calculator.firstNumber = operate(calculator.firstNumber, calculator.secondNumber, calculator.operator);
				calculator.state = States.OPERATOR;
				calculator.secondNumber = "";
				calculator.operator = calculator.nextOperator;
				break;
		}
	} else if (button.classList.contains("equals")) {
		if (calculator.state == States.SECONDNUMBER) {
			calculator.state = States.FIRSTNUMBER;
			calculator.firstNumber = operate(calculator.firstNumber, calculator.secondNumber, calculator.operator);
			calculator.secondNumber = "";
			calculator.operator = "";
		};
	} else if (button.classList.contains("backspace")) {
		switch (calculator.state) {
			case States.OPERATOR:
				calculator.operator = "";
				calculator.state = States.FIRSTNUMBER;
				break;
			case States.FIRSTNUMBER:
				calculator.firstNumber = backspaceString(calculator.firstNumber);
				if (calculator.firstNumber == "") {
					calculator.state = States.EMPTY;
				};
				break;
			case States.SECONDNUMBER:
				calculator.secondNumber = backspaceString(calculator.secondNumber);
				if (calculator.secondNumber == "") {
					calculator.state = States.OPERATOR;
				};
				break;
		};
	} else if (button.classList.contains("clear")) {
		reset();
	} else if (button.classList.contains("decimal")) {
		switch (calculator.state) {
			case States.FIRSTNUMBER:
				if (isNumberValidForDecimal(calculator.firstNumber)) {
					calculator.firstNumber += "."
				}
				break;
			case States.SECONDNUMBER:
				if (isNumberValidForDecimal(calculator.secondNumber)) {
					calculator.secondNumber += "."
				}
				break;
		}
	}
	// updateButtons(calculator.state);
	updateReadout();
};


function isNumberValidForDecimal(num) {
	if (num.includes(".") || num == "") {
		return false;
	};
	return true;
}

function reset() {
	calculator.firstNumber = "";
	calculator.secondNumber = "";
	calculator.operator = "";
	calculator.nextOperator = "";
	calculator.state = States.EMPTY;
};

function backspaceString(str) {
	return str.substring(0, str.length -1);
};

function updateReadout() {
	readoutText.innerText = `${calculator.firstNumber}${operatorToSymbol(calculator.operator)}${calculator.secondNumber}`;
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

// updateButtons(calculator.state);


