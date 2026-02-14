/**
 * TXA Agent - Premium Terminal UI
 * Beautiful CLI interface with gradients, spinners, and animations
 * Copyright (c) 2025 TXA. All rights reserved.
 */

const chalk = require('chalk');
const gradient = require('gradient-string');
const figlet = require('figlet');

// === Custom Gradient Themes ===
const txaGradient = gradient(['#4F46E5', '#7C3AED', '#EC4899']);
const successGradient = gradient(['#10B981', '#34D399', '#6EE7B7']);
const infoGradient = gradient(['#3B82F6', '#60A5FA', '#93C5FD']);
const warnGradient = gradient(['#F59E0B', '#FBBF24', '#FDE68A']);

// === ASCII Art Banner ===
function showBanner() {
    const data = figlet.textSync('TXA Agent', {
        font: 'ANSI Shadow',
        horizontalLayout: 'fitted',
    });
    console.log(txaGradient.multiline(data));
    console.log();
    console.log(chalk.gray('  ─'.repeat(35)));
    console.log(`  ${chalk.hex('#4F46E5').bold('T')}${chalk.white.bold('XA')} ${chalk.hex('#EC4899').bold('Agent')} ${chalk.gray('v' + require('../package.json').version)} ${chalk.gray('│')} ${chalk.gray('AI-Powered Dev Workspace')}`);
    console.log(chalk.gray('  ─'.repeat(35)));
    console.log();
}

// === Progress Bar ===
function createProgressBar(current, total, width = 30) {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;

    const gradientChars = '█'.repeat(filled);
    const emptyChars = chalk.gray('░'.repeat(empty));

    const coloredBar = txaGradient(gradientChars);
    return `  ${coloredBar}${emptyChars} ${chalk.bold.white(percentage + '%')}`;
}

// === Stats Table ===
function showInfo() {
    const fs = require('fs');
    const path = require('path');

    const templateDir = path.join(__dirname, '..', 'template');
    const stats = {};

    const countDir = (dir) => {
        const fullPath = path.join(templateDir, dir);
        if (!fs.existsSync(fullPath)) return 0;
        return fs.readdirSync(fullPath).length;
    };

    stats.agents = countDir('agents');
    stats.skills = countDir('skills');
    stats.workflows = countDir('workflows');
    stats.rules = countDir('rules');
    stats.shared = countDir('.shared');
    stats.scripts = countDir('scripts');

    const boxWidth = 50;
    const hr = chalk.gray('  ┈'.repeat(Math.floor(boxWidth / 2)));

    console.log(chalk.bold('  📊 Package Statistics\n'));
    console.log(`  ${chalk.hex('#4F46E5')('┌' + '─'.repeat(boxWidth) + '┐')}`);

    const rows = [
        ['🤖 Specialist Agents', stats.agents, '#4F46E5'],
        ['🧠 Master Skills', stats.skills, '#7C3AED'],
        ['⚡ Workflows', stats.workflows, '#EC4899'],
        ['📜 Rules', stats.rules, '#F59E0B'],
        ['📚 Shared Modules', stats.shared, '#10B981'],
        ['🔧 Scripts', stats.scripts, '#3B82F6'],
    ];

    rows.forEach(([label, count, color]) => {
        const labelStr = `  ${label}`;
        const countStr = chalk.bold.hex(color)(String(count).padStart(3));
        const padding = boxWidth - stripAnsi(labelStr).length - stripAnsi(countStr).length;
        console.log(`  ${chalk.hex(color)('│')}${labelStr}${' '.repeat(Math.max(1, padding))}${countStr}${chalk.hex(color)(' │')}`);
    });

    console.log(`  ${chalk.hex('#EC4899')('└' + '─'.repeat(boxWidth) + '┘')}`);

    console.log();
    console.log('  ' + infoGradient('Supported IDEs:'));
    console.log(`  ${chalk.hex('#00D4AA')('● Cursor')}  ${chalk.hex('#007ACC')('● VS Code')}  ${chalk.hex('#8B5CF6')('● Antigravity')}  ${chalk.hex('#06B6D4')('● Windsurf')}`);
    console.log();
}

// === Success Box ===
function showSuccess(message, details = []) {
    console.log();
    console.log(`  ${successGradient('╔' + '═'.repeat(52) + '╗')}`);
    console.log(`  ${successGradient('║')}  ${chalk.bold.green('✅ ' + message)}${' '.repeat(Math.max(1, 49 - message.length))}${successGradient('║')}`);
    if (details.length > 0) {
        console.log(`  ${successGradient('╟' + '─'.repeat(52) + '╢')}`);
        details.forEach(d => {
            const line = `  ${d}`;
            const pad = 50 - stripAnsi(line).length;
            console.log(`  ${successGradient('║')}${line}${' '.repeat(Math.max(1, pad))}${successGradient('║')}`);
        });
    }
    console.log(`  ${successGradient('╚' + '═'.repeat(52) + '╝')}`);
    console.log();
}

// === Error Box ===
function showError(message) {
    console.log();
    console.log(chalk.red(`  ╔${'═'.repeat(52)}╗`));
    console.log(chalk.red(`  ║  ❌ ${message}${' '.repeat(Math.max(1, 47 - message.length))}║`));
    console.log(chalk.red(`  ╚${'═'.repeat(52)}╝`));
    console.log();
}

// === Warning Message ===
function showWarning(message) {
    console.log(`  ${warnGradient('⚠')}  ${chalk.yellow(message)}`);
}

// === Step Logger ===
function logStep(step, total, message) {
    const stepStr = chalk.hex('#7C3AED').bold(`[${step}/${total}]`);
    console.log(`  ${stepStr} ${message}`);
}

// === IDE Selection Display ===
function showIDESelection(ideKey, ideName, targetPath) {
    console.log(`  ${chalk.hex('#EC4899')('▸')} IDE: ${chalk.bold(ideName)}`);
    console.log(`  ${chalk.hex('#EC4899')('▸')} Target: ${chalk.cyan(targetPath)}`);
    console.log();
}

// === Helper: Strip ANSI codes for padding calculations ===
function stripAnsi(str) {
    return str.replace(/\u001B\[[0-9;]*m/g, '');
}

module.exports = {
    showBanner,
    createProgressBar,
    showInfo,
    showSuccess,
    showError,
    showWarning,
    logStep,
    showIDESelection,
    txaGradient,
    successGradient,
    infoGradient,
};
