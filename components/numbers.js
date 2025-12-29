import { numbers } from "../constants.js";
import { Button } from "./button.js";

let shuffledNumbers = [];

/**
 * Renders a container with buttons representing numbers 0-9 and a decimal point.
 *
 * If initialize is true, the numbers are shuffled.
 *
 * @param {Element} container - The container to render the buttons in.
 * @param {function} handleClick - The function to call when a button is clicked.
 * @param {boolean} initialize - Whether to shuffle the numbers or not.
 */
export function NumberButtons(container, handleClick, initialize = false) {
	if (initialize) {
		shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
	}

	container.innerHTML = "";

	shuffledNumbers.forEach((num) => {
		container.appendChild(
			Button({ label: num, type: "number", onClick: handleClick })
		);
	});

	container.appendChild(
		Button({ label: ".", type: "number", onClick: handleClick })
	);
}
