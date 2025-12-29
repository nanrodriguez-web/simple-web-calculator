export function History(container, history) {
	container.innerHTML = "";

	// if history is empty
	if (history.length === 0) {
		const li = document.createElement("li");
		li.textContent = "No history yet.";
		container.appendChild(li);
		return;
	}

	history
		.slice()
		.reverse()
		.forEach((entry) => {
			const li = document.createElement("li");
			li.textContent = entry;
			container.appendChild(li);
		});
}
