# Browser Storage: Local Storage & Cookies

---

## Table of Contents

1. [Why do websites need to remember things?](#why-do-websites-need-to-remember-things)
2. [Two ways to remember: Local Storage vs Cookies](#two-ways-to-remember)
3. [Local Storage](#local-storage)
   - [What is Local Storage?](#what-is-local-storage)
   - [How to set an item](#how-to-set-an-item)
   - [How to read an item](#how-to-read-an-item)
   - [How to update an item](#how-to-update-an-item)
   - [How to delete items](#how-to-delete-items)
   - [Working with Objects (JSON)](#working-with-objects-json)
4. [Cookies](#cookies)
   - [What is a Cookie?](#what-is-a-cookie)
   - [How to set a Cookie](#how-to-set-a-cookie)
   - [How to read Cookies](#how-to-read-cookies)
   - [How to delete a Cookie](#how-to-delete-a-cookie)
   - [Cookie attributes](#cookie-attributes)
5. [Local Storage vs Cookies: Comparison](#local-storage-vs-cookies-comparison)
6. [Key Terms Cheat Sheet](#key-terms-cheat-sheet)
7. [Activity: Persistent To-do List](#activity-persistent-to-do-list)

---

## Why do websites need to remember things?

Normally, a web page "forgets" everything when you close the tab. Each time you visit, it's like meeting someone for the first time. But sometimes we want websites to remember:

- Your dark-mode / light-mode preference
- Items in a shopping cart
- Your login state ("Remember me")
- Form drafts (so you don't lose what you typed)

The browser gives us **two built-in storage tools** to do this: **Local Storage** and **Cookies**.

---

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

## Local Storage

### What is Local Storage?

Local Storage is a small "database" that lives **inside the user's browser**. It stores data as **key-value pairs** (a name → a value), similar to a dictionary or a labelled box.

- It survives page refreshes and closing the browser.
- It is specific to **one website** (one "origin").
- It is **not** sent to the server automatically.

You can open your browser's Developer Tools (press `F12`), go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox), and click **Local Storage** to see it live.

### How to set an item

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

### How to read an item

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

### How to update an item

To update a value, just call `setItem` again with the **same key** and a new value:

```js
localStorage.setItem("username", "Sam");
console.log(localStorage.getItem("username")); // "Sam"
```

### How to delete items

Use `removeItem(key)` to delete one item:

```js
localStorage.removeItem("username");
console.log(localStorage.getItem("username")); // null (not found)
```

Use `clear()` to wipe **everything** for this site:

```js
localStorage.clear();
```

### Working with Objects (JSON)

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

## Cookies

### What is a Cookie?

A cookie is a **tiny piece of text** stored in the browser. Unlike Local Storage, cookies are:

- Sent to the **server** with every HTTP request.
- Limited to about **4 KB** each.
- Often used for sessions, logins, tracking, and "remember me" features.

Cookies are stored as one long string in `document.cookie`.

### How to set a Cookie

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

### How to read Cookies

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

### How to delete a Cookie

To delete a cookie, set it again with an **expiry date in the past**:

```js
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
```

The browser sees the cookie is expired and removes it.

### Cookie attributes

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

## Local Storage vs Cookies: Comparison

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

## Key Terms Cheat Sheet

| Term | Meaning |
|---|---|
| **Key-value pair** | A label (key) and its data (value), like `"username"` → `"Alex"` |
| **Local Storage** | Browser storage that persists and is never sent to the server |
| **Cookie** | Tiny text data, sent to the server, can expire |
| **Origin** | A website's unique address (protocol + domain + port) |
| **`setItem(key, value)`** | Save a value to Local Storage |
| **`getItem(key)`** | Read a value from Local Storage |
| **`removeItem(key)`** | Delete one value from Local Storage |
| **`clear()`** | Delete everything from Local Storage |
| **`document.cookie`** | The property used to read/write cookies |
| **`JSON.stringify(obj)`** | Convert a JS object/array into a string |
| **`JSON.parse(str)`** | Convert a JSON string back into an object/array |
| **`expires` / `max-age`** | Cookie attributes that control lifetime |
| **`encodeURIComponent()`** | Make a string safe to put in a cookie |

---

## Activity: Persistent To-do List

In this activity, you will build a to-do list step by step in VS Code, using separate HTML and JavaScript files. The list will remember your tasks even after you refresh the page or close the browser.

### What you'll build

- An input box to type a task
- An **Add** button
- A list that shows your tasks
- A button to delete tasks
- Everything **saved to Local Storage** automatically

### Files you'll create

```
todo-app/
├── index.html   (the page structure + link to JS)
└── script.js    (all the JavaScript logic)
```

---

### Step 1: Set up the project folder

1. Open **VS Code**.
2. Go to **File → Open Folder…**.
3. Create a new folder called `todo-app` and open it.
4. You should now see an empty workspace. We'll add two files to it.

---

### Step 2: Create `index.html`

1. In VS Code, click the **New File** icon (or press `Ctrl+N` / `Cmd+N`).
2. Save it as **`index.html`** (**File → Save As…**, or `Ctrl+S` / `Cmd+S`).
3. Paste the code below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My To-Do List</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      max-width: 400px;
      margin: auto;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 70%;
    }
    button {
      padding: 10px 16px;
      font-size: 16px;
      cursor: pointer;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
    li span { cursor: pointer; }
    li span:hover { color: red; }
  </style>
</head>
<body>
  <h1>My To-Do List</h1>
  <p><small>Add items and refresh the page, and they will still be here.</small></p>

  <input id="taskInput" type="text" placeholder="Enter a task..." />
  <button id="addBtn">Add</button>

  <ul id="taskList"></ul>

  <!-- This is the important line: it links our JavaScript file -->
  <script src="script.js"></script>
</body>
</html>
```

> **Why the `<script src="script.js">` tag matters:** Instead of writing JavaScript inside the HTML, we tell the browser to load a **separate file** called `script.js`. It must be placed at the **bottom of `<body>`** so the HTML elements exist before the script runs.

---

### Step 3: Create `script.js`

1. Create another new file and save it as **`script.js`** in the **same folder** as `index.html`.
2. We'll build the logic **piece by piece**. Type each part below and read the comments.

#### 3a. Grab the elements from the page

```js
// Find the input, button, and list in the HTML so we can use them
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
```

#### 3b. Load saved tasks from Local Storage

```js
// Read saved tasks. If there are none, start with an empty array []
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

> `JSON.parse(...)` turns the saved **string** back into a real JavaScript **array**. The `|| []` means "if there's nothing saved, use an empty array".

#### 3c. Write the `saveTasks()` function

```js
// Turn the tasks array into a string and save it to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

#### 3d. Write the `render()` function (draws the list)

```js
// Draw every task on the screen from the tasks array
function render() {
  list.innerHTML = ""; // Clear the list first

  // Loop through each task by index
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li"); // Make a new <li>

    const taskText = document.createElement("span");
    taskText.textContent = task; // Put the task text inside

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "Delete"; // The delete button
    deleteBtn.title = "Delete";

    // When Delete is clicked: remove the task, save, and redraw
    deleteBtn.addEventListener("click", () => {
      tasks.splice(i, 1); // Remove 1 item at this index
      saveTasks();        // Save the new array
      render();           // Redraw the screen
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}
```

#### 3e. Make the **Add** button work

```js
// When the button is clicked, add the typed task to the array
addBtn.addEventListener("click", () => {
  const task = input.value.trim(); // Get the text, trim spaces

  if (task === "") return; // Do nothing if the box is empty

  tasks.push(task); // Add the new task to the end of the array
  saveTasks();      // Save to Local Storage
  render();         // Redraw the screen
  input.value = ""; // Clear the input box
});
```

#### 3f. (Bonus) Let the Enter key add a task

```js
// Pressing Enter in the input box clicks the Add button for us
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addBtn.click();
});
```

#### 3g. Show saved tasks when the page loads

```js
// Call render() once at the end so saved tasks appear
render();
```

---

### Step 4: Check your full `script.js`

Your finished `script.js` should look like this (all the parts put together):

```js
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// Load saved tasks (or start empty)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save the tasks array to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Draw all tasks on the screen
function render() {
  list.innerHTML = ""; // Clear the list

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "Delete";
    deleteBtn.title = "Delete";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTasks();
      render();
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}

// Add a new task
addBtn.addEventListener("click", () => {
  const task = input.value.trim();

  if (task === "") return;

  tasks.push(task);
  saveTasks();
  render();
  input.value = "";
});

// Press Enter to add
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addBtn.click();
});

// Show saved tasks when the page loads
render();
```

---

### Step 5: Run it in the browser

**Option A: Live Server (recommended)**

1. In VS Code, go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **"Live Server"** and install it.
3. Right-click your `index.html` file and choose **"Open with Live Server"**.
4. Your browser opens the app at a URL like `http://127.0.0.1:5500`.

**Option B: Without an extension**

1. Simply **double-click `index.html`** in your file explorer.
2. It opens directly in your browser.

> Live Server is better because it refreshes automatically when you save. But either option works for this project.

---

### Step 6: Test your work

1. Type a task and click **Add** (or press **Enter**).
2. Add a few more tasks.
3. Click the Delete button next to a task.
4. **Refresh the page** (`F5`).
5. **Close the tab and reopen it.**

Your tasks should still be there.

**Bonus: see the data yourself**

1. Press `F12` to open **Developer Tools**.
2. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox).
3. Click **Local Storage** → your site (`http://127.0.0.1:5500`).
4. You should see a key called **`tasks`** holding your tasks as a JSON string.

---

### Step 7: Challenges (extend your app)

Try these on your own once it's working:

1. **Clear all button**: add a button that empties the whole list and clears Local Storage (`localStorage.clear()` or `removeItem("tasks")`).
2. **Mark as done**: clicking a task could strike through the text and save that state.
3. **Edit a task**: double-click a task to change its text.
4. **Move the CSS**: create a `style.css` file, move the `<style>` rules into it, and link it with `<link rel="stylesheet" href="style.css" />` in the `<head>`.

---

### What's happening under the hood

1. `JSON.parse(localStorage.getItem("tasks")) || []`: read saved tasks, or use an empty array if there are none.
2. `saveTasks()`: every change is written to Local Storage with `JSON.stringify`.
3. `render()`: the screen is always drawn **from the array**, so the array is the "single source of truth".


