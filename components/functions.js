import { functions } from "../constants.js";
import { Button } from "./button.js";

export function FunctionButtons(container, handleClick) {
	functions.forEach((func) => {
		container.appendChild(
			Button({ label: func, type: "function", onClick: handleClick })
		);
	});
}
