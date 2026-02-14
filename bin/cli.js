#!/usr/bin/env node

/**
 * TXA Agent CLI - AI-Powered Development Workspace Toolkit
 * Copyright (c) 2025 TXA. All rights reserved.
 */

const { Command } = require('commander');
const { showBanner, showInfo } = require('../lib/ui');
const { detectIDE, IDE_MAP } = require('../lib/ide-detector');
const { install } = require('../lib/installer');
const pkg = require('../package.json');

const program = new Command();

program
    .name('txa-agent')
    .description('🚀 TXA Agent - AI-Powered Development Workspace Toolkit')
    .version(pkg.version);

// === INIT COMMAND ===
program
    .command('init')
    .description('Install .agent workspace into your project')
    .option('-i, --ide <name>', 'Target IDE (cursor, vscode, antigravity, windsurf)')
    .option('-d, --dir <path>', 'Target directory (default: current directory)')
    .option('-f, --force', 'Overwrite existing .agent folder')
    .action(async (options) => {
        await showBanner();
        await install(options);
    });

// === DETECT COMMAND ===
program
    .command('detect')
    .description('Auto-detect current IDE environment')
    .action(async () => {
        await showBanner();
        const detected = detectIDE(process.cwd());
        const chalk = require('chalk');

        if (detected.length === 0) {
            console.log(chalk.yellow('\n  ⚠  No IDE detected in current directory.'));
            console.log(chalk.gray('  Run inside a project opened in VS Code, Cursor, Windsurf, or Antigravity.\n'));
        } else {
            console.log(chalk.bold('\n  🔍 Detected IDE(s):\n'));
            detected.forEach(ide => {
                const info = IDE_MAP[ide];
                console.log(`  ${info.icon}  ${chalk.bold.hex(info.color)(info.name)}`);
                console.log(`     └─ Target: ${chalk.cyan(info.targetFolder)}\n`);
            });
        }
    });

// === INFO COMMAND ===
program
    .command('info')
    .description('Show package statistics and capabilities')
    .action(async () => {
        await showBanner();
        showInfo();
    });

program.parse();
