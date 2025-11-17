
export function stripAnsiCodes(str: string) {
    return str.replace(
        /\x1b\[[0-9;]*m/g,
        ''
    );
}

export function puts(text: string) {
    process.stdout.write(text);
}