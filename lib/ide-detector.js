/**
 * TXA Agent - IDE Auto-Detector
 * Detects: Cursor, VS Code, Antigravity (Gemini), Windsurf
 * Copyright (c) 2025 TXA. All rights reserved.
 */

const fs = require('fs');
const path = require('path');

const IDE_MAP = {
    cursor: {
        name: 'Cursor',
        icon: '🖱️',
        color: '#00D4AA',
        markers: ['.cursor', '.cursorignore', '.cursorrules'],
        envKeys: ['CURSOR_TRACE_DIR', 'CURSOR_CHANNEL'],
        targetFolder: '.cursor',
        configName: 'rules',
    },
    vscode: {
        name: 'VS Code',
        icon: '💎',
        color: '#007ACC',
        markers: ['.vscode'],
        envKeys: ['VSCODE_PID', 'VSCODE_IPC_HOOK', 'TERM_PROGRAM'],
        envValues: { TERM_PROGRAM: 'vscode' },
        targetFolder: '.vscode',
        configName: 'settings',
    },
    antigravity: {
        name: 'Antigravity (Gemini)',
        icon: '🌌',
        color: '#8B5CF6',
        markers: ['.gemini'],
        envKeys: ['ANTIGRAVITY_HOME', 'GEMINI_API_KEY', 'ANTIGRAVITY_EDITOR_APP_ROOT'],
        targetFolder: '.',
        configName: 'GEMINI',
    },
    windsurf: {
        name: 'Windsurf',
        icon: '🏄',
        color: '#06B6D4',
        markers: ['.windsurf', '.windsurfrules'],
        envKeys: ['WINDSURF_HOME'],
        targetFolder: '.windsurf',
        configName: 'rules',
    },
};

/**
 * Detect which IDE(s) are active in the given directory
 * @param {string} projectDir - Project root directory
 * @returns {string[]} Array of detected IDE keys
 */
function detectIDE(projectDir) {
    const detected = [];

    for (const [key, ide] of Object.entries(IDE_MAP)) {
        let found = false;

        // 1. Check marker folders/files
        for (const marker of ide.markers) {
            const markerPath = path.join(projectDir, marker);
            if (fs.existsSync(markerPath)) {
                found = true;
                break;
            }
        }

        // 2. Check environment variables
        if (!found) {
            for (const envKey of ide.envKeys) {
                if (process.env[envKey]) {
                    // Check specific value match if defined
                    if (ide.envValues && ide.envValues[envKey]) {
                        if (process.env[envKey] === ide.envValues[envKey]) {
                            found = true;
                            break;
                        }
                    } else {
                        found = true;
                        break;
                    }
                }
            }
        }

        if (found) {
            detected.push(key);
        }
    }

    return detected;
}

/**
 * Get the target installation path for a specific IDE
 * @param {string} ideKey - IDE key from IDE_MAP
 * @param {string} projectDir - Project root directory
 * @returns {string} Absolute path to install .agent
 */
function getTargetPath(ideKey, projectDir) {
    const ide = IDE_MAP[ideKey];
    if (!ide) return path.join(projectDir, '.agent');

    if (ide.targetFolder === '.') {
        return path.join(projectDir, '.agent');
    }
    return path.join(projectDir, ide.targetFolder, '.agent');
}

module.exports = { detectIDE, getTargetPath, IDE_MAP };
