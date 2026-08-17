# Activity 1: Working with Arrays

In this activity, you will build a simple to-do list app to practice JavaScript arrays. You will add tasks to an array, display them, and delete them. This activity does not use Local Storage yet, so the list resets when you refresh the page.

## What you'll build

- An input box to type a task
- An **Add** button
- A list that shows the tasks
- A button to delete tasks
- A counter that shows how many tasks are in the list

## Files you'll create

Inside the cloned repository, create a folder called `activity-1`, and add these two files inside it:

```
activity-1/
├── index.html   (the page structure + link to JS)
└── script.js    (all the JavaScript logic)
```

---

## Step 1: Fork and clone the repository

1. Open this repository's page on **GitHub**.
2. Click the **Fork** button (top-right) to create your own copy under your account.
3. On **your fork's page**, click the green **Code** button and copy the URL.
4. Open **VS Code**.
5. Open the **Source Control** panel by clicking the Source Control icon in the left Activity Bar, or press `Ctrl+Shift+G`.
6. Click **Clone Repository**.
7. Paste your fork's URL and choose a folder on your computer to save it to.
8. When VS Code asks, click **Open** to open the cloned repository.

You should now see the repository files in VS Code's Explorer panel. Next, we'll add the project files.

---

## Step 2: Create the `activity-1` folder and `index.html`

1. In VS Code's Explorer panel, create a new folder named **`activity-1`**.
2. Inside the `activity-1` folder, create a new file and save it as **`index.html`**.
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
  <p><small>Add tasks to practice using a JavaScript array.</small></p>

  <input id="taskInput" type="text" placeholder="Enter a task..." />
  <button id="addBtn">Add</button>

  <p id="count">0 tasks</p>

  <ul id="taskList"></ul>

  <!-- This is the important line: it links our JavaScript file -->
  <script src="script.js"></script>
</body>
</html>
```

> **Why the `<script src="script.js">` tag matters:** Instead of writing JavaScript inside the HTML, we tell the browser to load a **separate file** called `script.js`. It must be placed at the **bottom of `<body>`** so the HTML elements exist before the script runs.

---

## Step 3: Create `script.js`

1. Inside the `activity-1` folder, create another new file and save it as **`script.js`**.
2. We'll build the logic **piece by piece**. Each part below says where to place it in `script.js`. Type each part and read the comments.

### 3a. Grab the elements from the page

Place these lines at the **top** of `script.js`:

```js
// Find the input, button, list, and counter in the HTML so we can use them
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");
```

### 3b. Create the tasks array

Add this **below** the elements from 3a:

```js
// An empty array to hold all the tasks
const tasks = [];
```

### 3c. Write the `render()` function (draws the list)

Add this function **below** the `tasks` array:

```js
// Draw every task on the screen from the tasks array
function render() {
  taskList.innerHTML = ""; // Clear the list first

  // Loop through each task by index
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li"); // Make a new <li>

    const taskText = document.createElement("span");
    taskText.textContent = task; // Put the task text inside

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "Delete"; // The delete button
    deleteBtn.title = "Delete";

    // When Delete is clicked: remove the task and redraw
    deleteBtn.addEventListener("click", () => {
      tasks.splice(i, 1); // Remove 1 task at this index
      render();           // Redraw the screen
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Update the counter with the current length
  count.textContent = tasks.length + " tasks";
}
```

### 3d. Make the **Add** button work

Add this **below** the `render()` function:

```js
// When the button is clicked, add the typed task to the array
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim(); // Get the text, trim spaces

  if (task === "") return; // Do nothing if the box is empty

  tasks.push(task);        // Add the new task to the end of the array
  render();                // Redraw the screen
  taskInput.value = "";    // Clear the input box
});
```

### 3e. Let the Enter key add a task

Add this **below** the Add button code:

```js
// Pressing Enter in the input box clicks the Add button for us
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addBtn.click();
});
```

### 3f. Show the list when the page loads

Add this line at the **very bottom** of `script.js`:

```js
// Call render() once at the end so the counter and list appear
render();
```

---

## Step 4: Check your full `script.js`

Your finished `script.js` should look like this (all the parts put together):

```js
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

// An empty array to hold all the tasks
const tasks = [];

// Draw every task on the screen from the tasks array
function render() {
  taskList.innerHTML = ""; // Clear the list first

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
      render();
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  count.textContent = tasks.length + " tasks";
}

// Add a new task
addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();

  if (task === "") return;

  tasks.push(task);
  render();
  taskInput.value = "";
});

// Press Enter to add
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addBtn.click();
});

// Show the list when the page loads
render();
```

---

## Step 5: Run it in the browser

1. In VS Code, go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **"Live Preview"** and install it.
3. Right-click the `index.html` file inside `activity-1` and choose **"Open with Live Preview"**.
4. Live Preview opens the app in your browser, and it refreshes automatically when you save.

---

## Step 6: Test your work

1. Type a task and click **Add** (or press **Enter**).
2. Add a few more tasks and watch the counter go up.
3. Click the Delete button next to a task and watch the counter go down.
4. **Refresh the page** (`F5`).

The list resets because this activity uses an array in memory only. In the next activity, you will add Local Storage so the tasks survive a refresh.

---

## Step 7: Challenges (extend your app)

Try these on your own once it's working:

1. **Remove last task**: add a button that removes the last task using `pop()`.
2. **Show first and last**: display the first task (`tasks[0]`) and the last task (`tasks[tasks.length - 1]`).
3. **Prevent duplicates**: before adding, check if the task already exists using `tasks.includes(task)`.
4. **Move the CSS**: create a `style.css` file, move the `<style>` rules into it, and link it with `<link rel="stylesheet" href="style.css" />` in the `<head>`.

---

## Step 8: Commit and push your work

When you're happy with your project, save your files, then commit and push them using VS Code's Source Control panel:

1. Click the **Source Control** icon in the left Activity Bar (or press `Ctrl+Shift+G`).
2. You should see your changes (the `activity-1` folder) listed under **Changes**.
3. Type a commit message in the message box at the top, for example: `Build array to-do list`.
4. Click the **Commit** button (the checkmark). If VS Code asks whether to stage all changes, click **Yes**.
5. Click **Sync Changes** to send the commit to your fork on GitHub.
6. Go to **your fork on GitHub** and confirm the `activity-1` folder is now in the repository.

> If this is your first commit, VS Code may ask you to sign in to GitHub or configure your name and email. Follow the prompts.

---

## What's happening under the hood

1. `const tasks = []` creates an empty array.
2. `tasks.push(task)` adds a task to the end of the array.
3. `tasks.splice(index, 1)` removes one task at a specific position.
4. A `for` loop draws the list, and `tasks.length` shows the count.

---

[Next: Activity 2: Persistent To-do List →](activity-2.md)
