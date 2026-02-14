/**
 * TXA Agent - IDE Auto-Detector
 * Detects: Cursor, VS Code, Antigravity (Gemini), Windsurf
 * Copyright (c) 2025 TXA. All rights reserved.
 */

const fs = require('fs');
const path = require('path');

const IDE_MAP = {
    antigravity: {
        name: 'Antigravity (Gemini)',
        icon: '🌌',
        color: '#8B5CF6',
        markers: ['.gemini', '.antigravity'],
        envKeys: ['ANTIGRAVITY_HOME', 'GEMINI_API_KEY', 'ANTIGRAVITY_EDITOR_APP_ROOT', 'G_ENV'],
        targetFolder: '.',
        configName: 'GEMINI',
        priority: 100, // Higher priority
    },
    cursor: {
        name: 'Cursor',
        icon: '🖱️',
        color: '#00D4AA',
        markers: ['.cursor', '.cursorignore', '.cursorrules'],
        envKeys: ['CURSOR_TRACE_DIR', 'CURSOR_CHANNEL'],
        targetFolder: '.cursor',
        configName: 'rules',
        priority: 90,
    },
    windsurf: {
        name: 'Windsurf',
        icon: '🏄',
        color: '#06B6D4',
        markers: ['.windsurf', '.windsurfrules'],
        envKeys: ['WINDSURF_HOME'],
        targetFolder: '.windsurf',
        configName: 'rules',
        priority: 90,
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
        priority: 10, // Lowest priority, often a fallback
    },
};

/**
 * Detect which IDE(s) are active in the given directory
 * @param {string} projectDir - Project root directory
 * @returns {string[]} Array of detected IDE keys
 */
function detectIDE(projectDir) {
    let matches = [];

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
            matches.push({ key, priority: ide.priority });
        }
    }

    if (matches.length === 0) return [];

    // Sort by priority descending
    matches.sort((a, b) => b.priority - a.priority);

    const highestPriority = matches[0].priority;

    // If the highest priority is a specialized IDE (like Antigravity or Cursor),
    // and we also detected a generic one (like VS Code), we filter out the generic one.
    if (highestPriority > 10) {
        return matches
            .filter(m => m.priority === highestPriority)
            .map(m => m.key);
    }

    return matches.map(m => m.key);
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
