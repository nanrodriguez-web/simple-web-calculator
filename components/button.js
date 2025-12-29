export function Button({ label, type, onClick }) {
	const button = document.createElement("button");
	button.textContent = label;
	button.classList.add(type);
	button.addEventListener("click", () => onClick(label));
	return button;
}
