#!/usr/bin/env node
import {
    label,
    options
} from './src/tui';
import {
    FromHelloWorld,
    FromTemplate,
    FromViteProject
} from './src/creator';
import { puts } from './src/utils';
import chalk from 'chalk';

async function main() {
    label('☘  ' + chalk.bold('Select setup option:'));
    const setupOption = await options([
        chalk.blue('Hello World Demo'),
        chalk.green('From EziApp Template'),
        chalk.magenta('From Existing Vite Project')
    ], 0);

    switch (setupOption) {
        case 'Hello World Demo':
            await FromHelloWorld();
            break;
        case 'From EziApp Template':
            await FromTemplate();
            break;
        case 'From Existing Vite Project':
            await FromViteProject();
            break;
        default:
            puts(chalk.red('Unknown option selected.'));
            break;
    }
}

if (require.main === module) {
    main();
}