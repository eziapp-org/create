import {
    label,
    input,
    options
} from './tui';
import { puts } from './utils';
import chalk from 'chalk';

const invalidProjectNameChars = /[\s\\/:"*?<>|]+/;


export async function FromHelloWorld() {
    label('☘  ' + chalk.bold('Project name:'));
    const projectName = await input('eziapp-project', invalidProjectNameChars);
}

export async function FromTemplate() {
    label('☘  ' + chalk.bold('Project name:'));
    const projectName = await input('eziapp-project', invalidProjectNameChars);

    label('☘  ' + chalk.bold('Select framework:'));
    const framework = await options([
        chalk.yellow('Vanilla'),
        chalk.cyan('React'),
        chalk.green('Vue'),
        chalk.redBright('Svelte')
    ], 0);

    label('☘  ' + chalk.bold('Select language:'));
    const language = await options([
        chalk.blue('TypeScript'),
        chalk.yellow('JavaScript')
    ], 0);

    puts(chalk.yellow('⚠  This feature is under development. Stay tuned!\n'));
}

export async function FromViteProject() {
    puts(chalk.yellow('⚠  This feature is under development. Stay tuned!\n'));
}