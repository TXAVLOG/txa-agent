
console.log('TERM_PROGRAM:', process.env.TERM_PROGRAM);
console.log('VSCODE_PID:', process.env.VSCODE_PID);
console.log('CURSOR_CHANNEL:', process.env.CURSOR_CHANNEL);
console.log('ANTIGRAVITY_HOME:', process.env.ANTIGRAVITY_HOME);
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Unset');
console.log('All Env Keys:', Object.keys(process.env).filter(k => k.includes('VS') || k.includes('CURSOR') || k.includes('ANTIGRAVITY') || k.includes('GEMINI') || k.includes('WINDSURF') || k.includes('TERM')));
