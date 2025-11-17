import {
    label,
    input,
    options
} from './tui';
import { puts } from './utils';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const invalidProjectNameChars = /[\s\\/:"*?<>|]+/;
const excludeDirs = ['node_modules', '.git', 'dist', 'build', 'temp'];


function copyDirSync(srcDir: string, destDir: string, excludeDirs: string[] = []) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of entries) {
        if (excludeDirs.includes(entry.name)) {
            continue;
        }
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath, excludeDirs);
        } else if (entry.isSymbolicLink()) {
            const link = fs.readlinkSync(srcPath);
            fs.symlinkSync(link, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}


function isDirectoryEmpty(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
}

function getTemplatePath(templateName: string) {
    const templatePaths = [
        path.join(__dirname, '..', '..', 'templates', templateName),
        path.join(__dirname, '..', 'templates', templateName)
    ];
    for (const templatePath of templatePaths) {
        if (fs.existsSync(templatePath)) {
            return templatePath;
        }
    }
    puts(chalk.red(`✖  Template "${templateName}" not found.\n`));
    process.exit(1);
}

export async function FromHelloWorld() {
    label(chalk.green('☘  ') + chalk.bold('Project name:'));
    const projectName = await input('eziapp-project', invalidProjectNameChars);
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath) && !isDirectoryEmpty(projectPath)) {
        label(chalk.yellow('⚠  ') + chalk.bold('The directory is not empty. Do you want to delete existing files?'));
        const removeFiles = await options([
            chalk.green('No, cancel setup'),
            chalk.red('Yes, delete and continue')
        ], 0);
        if (removeFiles === 'No, cancel setup') {
            puts(chalk.yellow('✖  Setup cancelled. Please choose an empty directory or a different project name.\n'));
            return;
        } else if (removeFiles === 'Yes, delete and continue') {
            fs.rmSync(projectPath, { recursive: true, force: true });
            puts(chalk.green('✔  Existing files deleted.\n'));
        }
    }

    const HelloWorldTemplatePath = getTemplatePath('helloworld');
    copyDirSync(HelloWorldTemplatePath, projectPath, excludeDirs);

    puts(chalk.green('✔  Hello World project setup is complete!\n\n'));
    puts(('Next steps:\n\n'));
    puts((`    cd ${projectName}\n`));
    puts(('    npm install\n'));
    puts(('    npm run dev\n\n'));

}

export async function FromTemplate() {
    label(chalk.green('☘  ') + chalk.bold('Project name:'));
    const projectName = await input('eziapp-project', invalidProjectNameChars);

    label(chalk.green('☘  ') + chalk.bold('Select framework:'));
    const framework = await options([
        chalk.yellow('Vanilla'),
        chalk.cyan('React'),
        chalk.green('Vue'),
        chalk.redBright('Svelte')
    ], 0);

    label(chalk.green('☘  ') + chalk.bold('Select language:'));
    const language = await options([
        chalk.blue('TypeScript'),
        chalk.yellow('JavaScript')
    ], 0);

    puts(chalk.yellow('⚠  This feature is under development. Stay tuned!\n'));
}

export async function FromViteProject() {
    puts(chalk.yellow('⚠  This feature is under development. Stay tuned!\n'));
}