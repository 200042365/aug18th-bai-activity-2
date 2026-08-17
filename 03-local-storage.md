# Local Storage

## What is Local Storage?

Local Storage is a small "database" that lives **inside the user's browser**. It stores data as **key-value pairs** (a name → a value), similar to a dictionary or a labelled box.

- It survives page refreshes and closing the browser.
- It is specific to **one website** (one "origin").
- It is **not** sent to the server automatically.

You can open your browser's Developer Tools (press `F12`), go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox), and click **Local Storage** to see it live.

## How to set an item

Use `setItem(key, value)` to save a value. Local Storage is accessed through a global object called `localStorage`:

```js
// Save a value
localStorage.setItem("username", "Alex");
//           (key)              (value)
```

> **Key = the label**, **Value = the data**. Think of it like a name tag on a box.

> **Important:** Local Storage can only store **strings**. If you save a number, it becomes a string:
>
> ```js
> localStorage.setItem("age", 25);
> console.log(typeof localStorage.getItem("age")); // "string" (not "number"!)
> ```

## How to read an item

Use `getItem(key)` to read a value back:

```js
const name = localStorage.getItem("username");
console.log(name); // "Alex"
```

If the key doesn't exist, `getItem` returns `null`:

```js
console.log(localStorage.getItem("missingKey")); // null (not found)
```

You can also check how many items are stored with the `length` property:

```js
console.log(localStorage.length); // e.g. 3
```

## How to update an item

To update a value, just call `setItem` again with the **same key** and a new value:

```js
localStorage.setItem("username", "Sam");
console.log(localStorage.getItem("username")); // "Sam"
```

## How to delete items

Use `removeItem(key)` to delete one item:

```js
localStorage.removeItem("username");
console.log(localStorage.getItem("username")); // null (not found)
```

Use `clear()` to wipe **everything** for this site:

```js
localStorage.clear();
```

## Working with Objects (JSON)

What if you want to save an object, like a user profile?

```js
const user = {
  name: "Alex",
  age: 30,
  subscribed: true
};
```

You can't store the object directly, so you must convert it to a **string** first. We use `JSON.stringify()` to turn objects into strings, and `JSON.parse()` to turn them back into objects.

```js
// Save an object
const user = { name: "Alex", age: 30, subscribed: true };

// 1. Convert object -> string, then save
localStorage.setItem("user", JSON.stringify(user));

// 2. Read the string, then convert string -> object
const savedUser = JSON.parse(localStorage.getItem("user"));

console.log(savedUser.name); // "Alex"
console.log(savedUser.age);  // 30
```

> **Remember the pair:**
> - Saving → `JSON.stringify()` (object → string)
> - Reading → `JSON.parse()` (string → object)

---

[Next: Cookies →](04-cookies.md)
