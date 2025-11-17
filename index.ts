#!/usr/bin/env node
import {
    label,
    input,
    options
} from './src/tui';
import { puts } from './src/utils';
import chalk from 'chalk';

async function main() {
    label('☘  ' + chalk.bold('Select setup option:'));

    const setupOptionChoices = [
        chalk.blue('Hello World Demo'),
        chalk.green('From EziApp Template'),
        chalk.magenta('From Existing Vite Project')
    ];
    const setupOption = await options(setupOptionChoices, 0);

    label('☘  ' + chalk.bold('Project name:'));

    const projectName = await input('eziapp-project');

    label('☘  ' + chalk.bold('Select framework:'));

    const freamworkChoices = [
        chalk.yellow('Vanilla'),
        chalk.cyan('React'),
        chalk.green('Vue'),
        chalk.redBright('Svelte')
    ];
    const framework = await options(freamworkChoices, 0);

    const languageChoices = [
        chalk.blue('TypeScript'),
        chalk.yellow('JavaScript')
    ];
    label('☘  ' + chalk.bold('Select language:'));
    const language = await options(languageChoices, 0);

    puts(`${setupOption} Creating project "${projectName}" with framework "${framework}"... ${language}\n`);
}

if (require.main === module) {
    main();
}