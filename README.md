<p align="center">
  <img src="https://img.shields.io/badge/TXA-Agent-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMiAyMGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04IDh6Ii8+PC9zdmc+" alt="TXA Agent">
  <br/>
  <strong>🚀 AI-Powered Development Workspace Toolkit</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/txa-agent?color=%234F46E5&style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/agents-23-blueviolet?style=flat-square" alt="agents">
  <img src="https://img.shields.io/badge/skills-11-purple?style=flat-square" alt="skills">
  <img src="https://img.shields.io/badge/workflows-22-pink?style=flat-square" alt="workflows">
</p>

---

## ✨ What is TXA Agent?

**TXA Agent** is a comprehensive AI agent configuration toolkit that supercharges your IDE's AI capabilities. It provides:

- 🤖 **23 Specialist Agents** — From backend to security, every role covered
- 🧠 **11 Master Skills** — Covering 550+ development patterns
- ⚡ **22 Workflows** — Slash commands for common tasks (`/create`, `/debug`, `/plan`...)
- 📜 **17 Rules** — Guardrails for security, quality, and best practices
- 📚 **17 Shared Modules** — Reusable design systems, API standards, testing patterns

## 🎯 Supported IDEs

| IDE | Auto-Detect | Target Folder |
|-----|:-----------:|---------------|
| 🖱️ **Cursor** | ✅ | `.cursor/.agent/` |
| 💎 **VS Code** | ✅ | `.vscode/.agent/` |
| 🌌 **Antigravity** | ✅ | `.agent/` |
| 🏄 **Windsurf** | ✅ | `.windsurf/.agent/` |

## 🚀 Quick Start

### Install globally

```bash
npm install -g txa-agent
```

### Or use directly with npx

```bash
npx txa-agent init
```

### Commands

```bash
# Install agent workspace (auto-detects IDE)
txa-agent init

# Install for specific IDE
txa-agent init --ide cursor
txa-agent init --ide vscode
txa-agent init --ide antigravity
txa-agent init --ide windsurf

# Detect current IDE
txa-agent detect

# Show package info
txa-agent info

# Force overwrite existing
txa-agent init --force
```

## 📦 What Gets Installed

```
.agent/
├── agents/          # 23 Specialist Agent definitions
│   ├── orchestrator.md
│   ├── frontend-specialist.md
│   ├── backend-specialist.md
│   ├── security-auditor.md
│   └── ... (19 more)
├── skills/          # 11 Master Skills
│   ├── frontend-design/
│   ├── modern-web-architect/
│   ├── game-development/
│   └── ... (8 more)
├── workflows/       # 22 Slash Commands
│   ├── create.md
│   ├── debug.md
│   ├── plan.md
│   └── ... (19 more)
├── rules/           # 17 Behavioral Rules
├── .shared/         # 17 Shared Modules
├── core/            # Core personality & archetypes
├── scripts/         # Automation scripts
├── GEMINI.md        # Agent configuration (customizable)
├── ARCHITECTURE.md  # System architecture docs
└── START_HERE.md    # Getting started guide
```

## 🔄 PDCA Management Cycle

TXA Agent follows a strict quality management framework:

1. **📋 PLAN** — `project-planner` defines strategy & MVP
2. **⚙️ DO** — Worker agents build features
3. **🔍 CHECK** — `quality-inspector` validates output
4. **🎯 ACT** — `orchestrator` refines & deploys

## 🎨 Design Philosophy

- **Glassmorphism** — Modern, premium UI patterns
- **Dark Mode First** — Optimized for developer comfort
- **Micro-Animations** — Subtle, delightful interactions
- **Responsive** — Works on all screen sizes

## 🛡️ Security

Built-in security guardrails:
- No hardcoded secrets
- SQL injection prevention
- XSS protection
- Dependency auditing
- Malware protection

## 📄 License

MIT © [TXA](https://github.com/txa-dev)

---

<p align="center">
  <sub>Built with 💜 by <strong>TXA</strong> — Powered by Antigravity</sub>
</p>
