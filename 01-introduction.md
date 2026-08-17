# Introduction

## Why do websites need to remember things?

Normally, a web page "forgets" everything when you close the tab. Each time you visit, it's like meeting someone for the first time. But sometimes we want websites to remember:

- Your dark-mode / light-mode preference
- Items in a shopping cart
- Your login state ("Remember me")
- Form drafts (so you don't lose what you typed)

The browser gives us **two built-in storage tools** to do this: **Local Storage** and **Cookies**.

## Two ways to remember

| | Local Storage | Cookies |
|---|---|---|
| What it's good for | Saving data for the user's convenience | Small pieces of data, often for the server |
| Size limit | ~5–10 MB | ~4 KB |
| Sent to server? | No (stays in the browser) | Yes (sent with every request) |
| Expires? | Never (until manually cleared) | Can be set to expire |
| Ease of use | Very easy | Slightly trickier |

**Rule of thumb:** If the browser just needs to remember something for the user's experience, use **Local Storage**. If the server needs to know about it too (like a login session), use **Cookies**.

---

[Next: Arrays →](02-arrays.md)
