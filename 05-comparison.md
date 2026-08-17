# Local Storage vs Cookies: Comparison

| Feature | Local Storage | Cookies |
|---|---|---|
| **Size** | ~5–10 MB | ~4 KB each |
| **Sent to server** | No | Yes, on every request |
| **Expiration** | Never (manual) | Can be set (expires/max-age) |
| **Data type** | Strings only (use JSON) | Strings only |
| **Access from JS** | Easy (`localStorage.getItem`) | Awkward (`document.cookie` string) |
| **Best for** | Preferences, drafts, app data | Logins, sessions, tracking |
| **Cleared by** | You / user clears data | You / expiry / user clears data |

---

[Next: Key Terms Cheat Sheet →](06-cheat-sheet.md)
