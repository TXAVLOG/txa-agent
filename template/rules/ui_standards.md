# UI & UX Standards for TXA Streaming

## ✨ Overview
To maintain a high-end, premium aesthetic for the TXA Streaming platform, developers MUST use custom UI components instead of native browser overrides.

## 🧱 Mandatory Custom Classes

### 1. `txamodal` (Global Modal System)
- **NEVER** use `window.confirm()`, `window.alert()`, or `window.prompt()`.
- **Use**: `txamodal.confirm(title, message, onConfirmCallback)` for confirmations.
- **Use**: `txamodal.alert(title, message)` for simple notifications.
- **Why**: Native dialogs are non-stylable and pause execution in undesirable ways. `txamodal` provides blur effects, scaled animations, and dark mode support.

### 2. `txatoastfy` & `showToast` (Notification System)
- **NEVER** use `alert()` for feedback.
- **Use**: `txatoastfy.success(msg)`, `txatoastfy.error(msg)`, `txatoastfy.warning(msg)`, or `txatoastfy.info(msg)`.
- **Backend Usage**: When returning a redirect, flash session keys: `success`, `error`, or `error_toast`.

### 3. `txatooltip` (Contextual Help)
- **Usage**: Add `data-txa-tooltip="Message"` to any element.
- **Why**: Native `title` attributes are slow to appear and inconsistent across browsers.

## 🚀 Performance & Flow
- **SPA Navigation**: Use `spa.js` (loadPage) to maintain smooth transitions and persistent audio/session state.
- **Progress Tracking**: Ensure the scroll progress bar (top of page) is always functional.

## 🔒 Security & Session Logic
- **Account Locking**: If a user is locked (`is_active = false`), the system must immediately invalidate their session and redirect with an `error_toast`.
- **Auth Attempts**: Always check `is_active` status during login (including OAuth) before creating a session.
