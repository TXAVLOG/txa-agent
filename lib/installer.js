/**
 * TXA Agent - Installer Module
 * Copies .agent template into target project with IDE-aware routing
 * Copyright (c) 2025 TXA. All rights reserved.
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { detectIDE, getTargetPath, IDE_MAP } = require('./ide-detector');
const { logStep, showSuccess, showError, showWarning, showIDESelection, createProgressBar, txaGradient } = require('./ui');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

/**
 * Main install function
 */
async function install(options = {}) {
    const projectDir = path.resolve(options.dir || process.cwd());
    const totalSteps = 5;
    let targetIDE = null;
    let targetPath = null;

    // === Step 1: IDE Detection ===
    logStep(1, totalSteps, 'Detecting IDE environment...');

    if (options.ide) {
        // Manual IDE selection
        const ideKey = options.ide.toLowerCase();
        if (!IDE_MAP[ideKey]) {
            showError(`Unknown IDE: "${options.ide}". Supported: cursor, vscode, antigravity, windsurf`);
            process.exit(1);
        }
        targetIDE = ideKey;
        targetPath = getTargetPath(ideKey, projectDir);
    } else {
        // Auto-detect
        const detected = detectIDE(projectDir);

        if (detected.length === 0) {
            console.log(chalk.yellow('  ⚠  No IDE auto-detected.'));

            // Ask user to choose
            const { selectedIDE } = await inquirer.prompt([{
                type: 'list',
                name: 'selectedIDE',
                message: 'Select your target IDE:',
                choices: [
                    { name: `🖱️  Cursor        → .cursor/.agent/`, value: 'cursor' },
                    { name: `💎  VS Code       → .vscode/.agent/`, value: 'vscode' },
                    { name: `🌌  Antigravity   → .agent/`, value: 'antigravity' },
                    { name: `🏄  Windsurf      → .windsurf/.agent/`, value: 'windsurf' },
                    { name: `📁  Root (.agent/)`, value: 'root' },
                ],
            }]);

            if (selectedIDE === 'root') {
                targetPath = path.join(projectDir, '.agent');
            } else {
                targetIDE = selectedIDE;
                targetPath = getTargetPath(selectedIDE, projectDir);
            }
        } else if (detected.length === 1) {
            targetIDE = detected[0];
            targetPath = getTargetPath(detected[0], projectDir);
            const info = IDE_MAP[detected[0]];
            console.log(chalk.green(`  ✓  Auto-detected: ${info.icon} ${chalk.bold(info.name)}`));
        } else {
            // Multiple IDEs detected, ask user
            const choices = detected.map(key => {
                const info = IDE_MAP[key];
                return { name: `${info.icon}  ${info.name} → ${info.targetFolder}/.agent/`, value: key };
            });
            choices.push({ name: `📁  Root (.agent/)`, value: 'root' });

            const { selectedIDE } = await inquirer.prompt([{
                type: 'list',
                name: 'selectedIDE',
                message: 'Multiple IDEs detected. Select target:',
                choices,
            }]);

            if (selectedIDE === 'root') {
                targetPath = path.join(projectDir, '.agent');
            } else {
                targetIDE = selectedIDE;
                targetPath = getTargetPath(selectedIDE, projectDir);
            }
        }
    }

    if (targetIDE) {
        const info = IDE_MAP[targetIDE];
        showIDESelection(targetIDE, info.name, targetPath);
    } else {
        console.log(`  ${chalk.hex('#EC4899')('▸')} Target: ${chalk.cyan(targetPath)}\n`);
    }

    // === Step 2: Check existing ===
    logStep(2, totalSteps, 'Checking target directory...');

    if (fs.existsSync(targetPath)) {
        if (options.force) {
            showWarning('Existing .agent found. --force flag set, overwriting...');
        } else {
            const { overwrite } = await inquirer.prompt([{
                type: 'confirm',
                name: 'overwrite',
                message: chalk.yellow('⚠ .agent already exists! Overwrite?'),
                default: false,
            }]);

            if (!overwrite) {
                console.log(chalk.gray('\n  Installation cancelled.\n'));
                return;
            }
        }
        await fs.remove(targetPath);
        console.log(chalk.green('  ✓  Cleared existing .agent'));
    } else {
        console.log(chalk.green('  ✓  Target directory is clean'));
    }

    // === Step 3: Copy template ===
    logStep(3, totalSteps, 'Installing agent workspace...');

    const spinner = ora({
        text: chalk.gray('Copying files...'),
        color: 'magenta',
        spinner: 'dots12',
    }).start();

    try {
        // Ensure parent directory exists
        await fs.ensureDir(path.dirname(targetPath));

        // Get list of items to copy
        const entries = await fs.readdir(TEMPLATE_DIR);
        // Filter out GEMINI.template.md from direct copy if it's there (we use it for generation)
        const copyEntries = entries.filter(e => e !== 'GEMINI.template.md');
        const totalFiles = copyEntries.length;

        for (let i = 0; i < copyEntries.length; i++) {
            const entry = copyEntries[i];
            const srcPath = path.join(TEMPLATE_DIR, entry);
            const destPath = path.join(targetPath, entry);

            await fs.copy(srcPath, destPath);

            spinner.text = `  ${createProgressBar(i + 1, totalFiles)} ${chalk.gray(entry)}`;
        }

        spinner.succeed(chalk.green('  Agent workspace installed successfully!'));
    } catch (err) {
        spinner.fail(chalk.red('  Failed to copy files'));
        showError(err.message);
        process.exit(1);
    }

    // === Step 4: Generate GEMINI.md template ===
    logStep(4, totalSteps, 'Generating configuration template...');

    try {
        const geminiTemplate = await generateGeminiTemplate(targetIDE);
        const geminiPath = path.join(targetPath, 'GEMINI.md');

        await fs.writeFile(geminiPath, geminiTemplate);
        console.log(chalk.green('  ✓  GEMINI.md configuration generated using template'));
    } catch (err) {
        console.log(chalk.red('  ⚠  Failed to generate GEMINI.md: ' + err.message));
    }

    // === Step 5: Summary ===
    logStep(5, totalSteps, 'Finalizing...');

    // Count installed components
    const countDir = (dir) => {
        const fullPath = path.join(targetPath, dir);
        if (!fs.existsSync(fullPath)) return 0;
        return fs.readdirSync(fullPath).length;
    };

    const installed = {
        agents: countDir('agents'),
        skills: countDir('skills'),
        workflows: countDir('workflows'),
        rules: countDir('rules'),
        shared: countDir('.shared'),
    };

    showSuccess('Installation Complete!', [
        `${chalk.hex('#4F46E5')('🤖')} ${installed.agents} Agents`,
        `${chalk.hex('#7C3AED')('🧠')} ${installed.skills} Skills`,
        `${chalk.hex('#EC4899')('⚡')} ${installed.workflows} Workflows`,
        `${chalk.hex('#F59E0B')('📜')} ${installed.rules} Rules`,
        `${chalk.hex('#10B981')('📚')} ${installed.shared} Shared Modules`,
        '',
        `${chalk.gray('Path:')} ${chalk.cyan(targetPath)}`,
    ]);

    // Show next steps
    console.log(chalk.bold('  📋 Next Steps:\n'));
    console.log(`  ${chalk.white('1.')} Edit ${chalk.cyan('GEMINI.md')} to customize agent identity`);
    console.log(`  ${chalk.white('2.')} Start chatting with your AI in the IDE`);
    console.log(`  ${chalk.white('3.')} Try ${chalk.hex('#EC4899')('/create')}, ${chalk.hex('#7C3AED')('/debug')}, or ${chalk.hex('#4F46E5')('/plan')} workflows`);
    console.log();
    console.log(`  ${txaGradient('Happy coding! 🚀')}`);
    console.log();
}

/**
 * Generate GEMINI.md template for the user by reading GEMINI.template.md
 */
async function generateGeminiTemplate(ideKey) {
    const ideName = ideKey ? IDE_MAP[ideKey].name : 'Your IDE';
    const templatePath = path.join(TEMPLATE_DIR, 'GEMINI.template.md');

    try {
        let content = await fs.readFile(templatePath, 'utf8');
        content = content.replace(/{{IDE_NAME}}/g, ideName);
        content = content.replace(/{{AGENT_NAME}}/g, 'TXAAGENT');
        return content;
    } catch (err) {
        // Fallback if template missing
        return `---
trigger: always_on
---

# GEMINI.md - Agent Configuration
# Generated by TXA Agent CLI (Fallback)

## 🤖 Agent Identity: TXAAGENT
> You are TXAAGENT. A professional, efficient AI development assistant.
> IDE: ${ideName}

## Behavior: FLEXIBLE
**Auto-run commands**: true

---
*Created by TXA Agent*
`;
    }
}

module.exports = { install };
