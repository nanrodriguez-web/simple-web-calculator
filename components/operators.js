import { operators } from "../constants.js";
import { Button } from "./button.js";

export function OperatorButtons(container, handleClick) {
	operators.forEach((op) => {
		container.appendChild(
			Button({ label: op, type: "operator", onClick: handleClick })
		);
	});
}
