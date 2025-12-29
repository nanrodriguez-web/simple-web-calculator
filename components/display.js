export function Display({ value }) {
	const display = document.getElementById("display");
	display.value = value || "";
}
