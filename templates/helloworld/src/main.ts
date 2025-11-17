import terminal from '@eziapp-org/bridge/terminal';

terminal.log('Hello from TypeScript!');

const input = document.querySelector('input');
document.querySelector('button')?.addEventListener("click", () => {
    const inputValue = input?.value || "";
    if (inputValue.trim() != "") {
        terminal.log(`User Input: ${inputValue}`);
        alert(`You entered: ${inputValue}`);
    } else {
        terminal.log("No input provided.");
    }
});