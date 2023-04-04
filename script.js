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
			result = add(a, b)
			break;
		case "subtract":
			result = subtract(a, b)
			break;
		case "multiply":
			result = multiply(a, b)
			break;
		case "divide":
			result = divide(a, b)
			break;
		default:
			Error("invalid operator")
			break;
	}
}


let firstNumber = 0;
let secondNumber = 0;
let operator = "";

