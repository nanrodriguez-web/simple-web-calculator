import { Display } from "./components/display.js";
import { FunctionButtons } from "./components/functions.js";
import { History } from "./components/history.js";
import { NumberButtons } from "./components/numbers.js";
import { OperatorButtons } from "./components/operators.js";

// History Panel Toggle
const toggleBtn = document.getElementById("toggle-history");
const historyPanel = document.querySelector(".history-panel");

toggleBtn.addEventListener("click", () => {
	const isOpen = !historyPanel.classList.contains("hidden");

	historyPanel.classList.toggle("hidden");

	// sync button state
	toggleBtn.classList.toggle("open", !isOpen);
});

// Calculator State
const state = {
	operand1: "",
	operand2: "",
	operator: "",
	isSecondOperand: false,
	history: [],
};

/**
 * Resets the state of the calculator back to its initial state.
 */
function resetState() {
	state.operand1 = "";
	state.operand2 = "";
	state.operator = "";
	state.isSecondOperand = false;
}

/**
 * Returns the currently active operand (either "operand1" or "operand2").
 *
 * @returns {string}
 */
function getActiveOperand() {
	return state.isSecondOperand ? "operand2" : "operand1";
}

/**
 * Handles button clicks for calculator.
 *
 * @param {string} btn - The button clicked (number, operator, C, +/-, %, or =).
 * @returns {void}
 */
function handleClick(btn) {
	/* Numbers & Decimal */
	if (!isNaN(btn) || btn === ".") {
		const target = getActiveOperand();
		const current = state[target];

		// Prevent multiple decimals
		if (btn === "." && current.includes(".")) return;

		// Handle leading zero logic
		if (current === "0" && btn !== ".") {
			state[target] = btn; // replace leading 0
		} else if (current === "" && btn === ".") {
			state[target] = "0."; // start decimal properly
		} else {
			state[target] += btn;
		}

		return render();
	}

	/* Clear */
	if (btn === "C") {
		resetState();
		return render();
	}

	/* Plus / Minus */
	if (btn === "+/-") {
		const target = getActiveOperand();
		state[target] = (-parseFloat(state[target] || 0)).toString();
		return render();
	}

	/* Percent */
	if (btn === "%") {
		const target = getActiveOperand();
		state[target] = (parseFloat(state[target] || 0) / 100).toString();
		return render();
	}

	/* Equals */
	if (btn === "=") {
		if (!state.operand1 || !state.operand2 || !state.operator) return;

		const result = eval(
			`${state.operand1}${state.operator}${state.operand2}`
		);

		state.history.push(
			`${state.operand1} ${state.operator} ${state.operand2} = ${result}`
		);

		state.operand1 = result.toString();
		state.operand2 = "";
		state.operator = "";
		state.isSecondOperand = false;

		return render();
	}

	/* Operators */
	state.operator = btn;
	state.isSecondOperand = true;
	render();
}

/**
 * Renders the current state of the calculator.
 *
 * Updates the display with the current value of either "operand1" or "operand2",
 * depending on whether the second operand is active or not.
 * Also re-renders the number buttons and history panel with the current state.
 */
function render() {
	Display({
		value: (state.isSecondOperand ? state.operand2 : state.operand1) || "0",
	});

	NumberButtons(
		document.getElementById("numbers-container"),
		handleClick,
		false
	);

	History(document.getElementById("history-list"), state.history);
}

/**
 * Initializes the calculator by rendering the number buttons, operator buttons and history panel.
 * Also renders the initial state of the calculator.
 */
function init() {
	FunctionButtons(document.querySelector(".function-container"), handleClick);

	OperatorButtons(document.getElementById("operator-container"), handleClick);

	// shuffle only once
	NumberButtons(
		document.getElementById("numbers-container"),
		handleClick,
		true
	);

	render();
}

init();
