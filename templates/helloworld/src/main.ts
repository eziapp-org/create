import terminal from '@eziapp-org/bridge/terminal';

terminal.log('Hello from TypeScript!');

const input = document.querySelector('input');
document.querySelector('button')?.addEventListener("click", () => {
    if (!input) {
        return terminal.error("Input element not found.");
    };
    const value = input.value.trim() || "";
    if (value === "") {
        return terminal.log("No input provided.");
    }
    terminal.log(`User Input: ${value}`);
    alert(`You entered: ${value}`);
    input.value = "";
});