# Cookies

## What is a Cookie?

A cookie is a **tiny piece of text** stored in the browser. Unlike Local Storage, cookies are:

- Sent to the **server** with every HTTP request.
- Limited to about **4 KB** each.
- Often used for sessions, logins, tracking, and "remember me" features.

Cookies are stored as one long string in `document.cookie`.

## How to set a Cookie

```js
// Set a simple cookie
document.cookie = "username=Alex";
```

This cookie lives until the browser session ends (when the browser is closed).

To make it last longer, add an expiry date:

```js
// Set a cookie that lasts 7 days
document.cookie = "username=Alex; expires=" + expiryDate;

// Or use max-age (in seconds). 7 days = 60 * 60 * 24 * 7
document.cookie = "username=Alex; max-age=" + (60 * 60 * 24 * 7);
```

## How to read Cookies

There is no nice `getCookie()` method built in. `document.cookie` returns **all cookies** for the site as one string, separated by `; `:

```js
console.log(document.cookie);
// "username=Alex; theme=dark; cart=3"
```

So we need a small helper function to find one cookie by name:

```js
function getCookie(name) {
  // Split the big string into an array of "key=value" pieces
  const cookies = document.cookie.split("; ");

  // Loop through each piece
  for (let cookie of cookies) {
    // Split "key=value" into [key, value]
    const [key, value] = cookie.split("=");

    // If this is the cookie we're looking for, return its value
    if (key === name) {
      return value;
    }
  }

  // If not found, return null
  return null;
}

// Usage
console.log(getCookie("username")); // "Alex"
```

> Cookie values shouldn't contain spaces or special characters like `;` or `=`. Use `encodeURIComponent()` and `decodeURIComponent()` to be safe:
>
> ```js
> document.cookie = "city=" + encodeURIComponent("New York");
> const city = decodeURIComponent(getCookie("city")); // "New York"
> ```

## How to delete a Cookie

To delete a cookie, set it again with an **expiry date in the past**:

```js
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
```

The browser sees the cookie is expired and removes it.

## Cookie attributes

You can add extra options when setting a cookie:

```js
document.cookie = "username=Alex; max-age=604800; path=/; SameSite=Lax";
```

| Attribute | Meaning |
|---|---|
| `expires=...` | When the cookie should expire (a specific date) |
| `max-age=...` | How many seconds the cookie should live |
| `path=/` | Which pages the cookie applies to (`/` = whole site) |
| `Secure` | Only send over HTTPS (secure connections) |
| `SameSite=Lax` | Extra security; prevents some cross-site attacks |

> For a beginner course, the key ones to remember are **`expires`/`max-age`** and **`path`**.

---

[Next: Comparison →](05-comparison.md)
