import chalk from 'chalk';
import { puts, stripAnsiCodes } from './utils';

function exitOnCtrlCOrEsc(data: Buffer) {
    const str = data.toString();
    if (str === '\u0003' || str === '\u001b') {
        puts(chalk.red('\nOperation cancelled by user.\n'));
        process.exit();
    }
}

async function getLine(defaultValue = '') {
    return new Promise<string>((resolve) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        let value = '';
        function render() {
            puts('\x1b[?25l');
            puts('\r\x1b[K');
            puts('  > ');
            puts(value || (chalk.gray(defaultValue) + '\x1b[5G'));
            puts('\x1b[?25h');
        }

        function onData(data: Buffer) {
            exitOnCtrlCOrEsc(data);
            function cleanup() {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off('data', onData);
            }
            const str = data.toString();
            let isEntered = false;
            if (str === '\r' || str === '\n') {
                value = value || defaultValue;
                isEntered = true;
            } else if (str === '\u0008' || str === '\u007f') {
                value = value.slice(0, -1);
            } else {
                if (str.length !== 1) {
                    return;
                }
                if (str < ' ' || str > '~') {
                    return;
                }
                value += str;
            }
            render();
            if (isEntered) {
                puts('\n\n');
                cleanup();
                resolve(value);
            }
        }
        process.stdin.on('data', onData);
        render();
    });
}

async function getArrowKey() {
    return new Promise<'up' | 'down' | 'enter'>((resolve) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();

        function onData(data: Buffer) {
            function cleanup() {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off('data', onData);
            }
            exitOnCtrlCOrEsc(data);
            const str = data.toString();
            if (str === '\u001b[A') {
                cleanup()
                resolve('up');
            } else if (str === '\u001b[B' || str === '\t') {
                cleanup()
                resolve('down');
            } else if (str === '\r' || str === '\n') {
                cleanup()
                resolve('enter');
            }
        }
        process.stdin.on('data', onData);
    });
}


export function label(text: string) {
    puts(`${text}\n`);
}

export async function input(defaultValue = '') {
    const line = await getLine(defaultValue);
    return line;
}

export async function options(choices: string[], defaultIndex = 0) {
    let selectedIndex = defaultIndex;
    // 隐藏光标
    puts('\x1b[?25l');
    let isEntered = false;
    while (true) {
        for (let i = 0; i < choices.length; i++) {
            if (i === selectedIndex) {
                puts(`  > ${chalk.bold(choices[i])}\n`);
            } else {
                puts(`    ${choices[i]}\n`);
            }
        }
        puts('\n');
        if (isEntered) {
            puts('\x1b[2K');
            break;
        } else {
            puts(chalk.gray(' ↑/↓/Tab to move, Enter to select') + '\r')
        }
        const arrow = await getArrowKey();
        if (arrow === 'up') {
            selectedIndex = (selectedIndex - 1 + choices.length) % choices.length;
        } else if (arrow === 'down') {
            selectedIndex = (selectedIndex + 1) % choices.length;
        } else if (arrow === 'enter') {
            isEntered = true;
        }
        puts('\x1b[' + (choices.length + 1) + 'A');
    }
    // 显示光标
    puts('\x1b[?25h');
    return stripAnsiCodes(choices[selectedIndex]);
}
