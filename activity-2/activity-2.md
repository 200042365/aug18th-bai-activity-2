# Activity 2: Persistent To-do List

In this activity, you will take the to-do list you built in Activity 1 and add Local Storage so the tasks survive a refresh. Most of the code stays the same, and you will add a few lines to save and load the data.

If you have not already done so, fork and clone the repository first (see Activity 1, Step 1).

## What you'll build

- The same to-do list from Activity 1
- Tasks that are **saved to Local Storage** automatically
- Tasks that are still there after you refresh or close the browser

## Files you'll create

Inside the cloned repository, create a folder called `activity-2`, and copy the two files from `activity-1` into it:

```
activity-2/
├── index.html   (copied from activity-1, with one small change)
└── script.js    (copied from activity-1, then updated)
```

---

## Step 1: Check the repository is open

VS Code should still be open with the cloned repository from Activity 1. You should see the repository files in the Explorer panel, including the `activity-1` folder from the previous activity.

---

## Step 2: Copy the `activity-1` folder to `activity-2`

You will start from the app you built in Activity 1.

1. In VS Code's Explorer panel, right-click the `activity-1` folder and choose **Copy**.
2. Right-click on the repository root in the Explorer panel and choose **Paste**.
3. Right-click the newly pasted folder, choose **Rename**, and name it **`activity-2`**.

You now have a copy of Activity 1 inside `activity-2`.

4. Open `activity-2/index.html` and update the small text so it says:

```html
<p><small>Add tasks and refresh the page, and they will still be here.</small></p>
```

---

## Step 3: Add Local Storage to `script.js`

Open `activity-2/script.js` and make the changes below.

### 3a. Load saved tasks instead of always starting empty

Find this line:

```js
const tasks = [];
```

Replace it with:

```js
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

> `JSON.parse(...)` turns the saved **string** back into a JavaScript **array**. The `|| []` means "if there's nothing saved, use an empty array".

### 3b. Add the `saveTasks()` function

Add this function right after the `tasks` array:

```js
// Turn the tasks array into a string and save it to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

### 3c. Save when a task is deleted

In the `render()` function, find the delete button's click handler and add `saveTasks()` after `tasks.splice(i, 1);`:

```js
deleteBtn.addEventListener("click", () => {
  tasks.splice(i, 1); // Remove 1 task at this index
  saveTasks();        // Save the new array
  render();           // Redraw the screen
});
```

### 3d. Save when a task is added

In the Add button's click handler, add `saveTasks()` after `tasks.push(task);`:

```js
tasks.push(task); // Add the new task to the end of the array
saveTasks();      // Save to Local Storage
render();         // Redraw the screen
taskInput.value = ""; // Clear the input box
```

---

## Step 4: Check your full `script.js`

Your finished `script.js` should look like this (all the parts put together):

```js
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

// Load saved tasks from Local Storage (or start empty)
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save the tasks array to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

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
      tasks.splice(i, 1); // Remove 1 task at this index
      saveTasks();        // Save the new array
      render();           // Redraw the screen
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

  tasks.push(task); // Add the new task to the end of the array
  saveTasks();      // Save to Local Storage
  render();         // Redraw the screen
  taskInput.value = ""; // Clear the input box
});

// Press Enter to add
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addBtn.click();
});

// Show saved tasks when the page loads
render();
```

---

## Step 5: Run it in the browser

1. In VS Code, go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **"Live Preview"** and install it.
3. Right-click the `index.html` file inside `activity-2` and choose **"Open with Live Preview"**.
4. Live Preview opens the app in your browser, and it refreshes automatically when you save.

---

## Step 6: Test your work

1. Type a task and click **Add** (or press **Enter**).
2. Add a few more tasks.
3. Click the Delete button next to a task.
4. **Refresh the page** (`F5`).
5. **Close the tab and reopen it.**

Your tasks should still be there.

---

## Step 7: Challenges (extend your app)

Try these on your own once it's working:

1. **Clear all button**: add a button that empties the whole list and clears Local Storage (`localStorage.clear()` or `removeItem("tasks")`).
2. **Mark as done**: clicking a task could strike through the text and save that state.
3. **Clear completed**: add a button that removes only the tasks marked as done.
4. **Move the CSS**: create a `style.css` file, move the `<style>` rules into it, and link it with `<link rel="stylesheet" href="style.css" />` in the `<head>`.

---

## Step 8: Commit and push your work

When you're happy with your project, save your files, then commit and push them using VS Code's Source Control panel:

1. Click the **Source Control** icon in the left Activity Bar (or press `Ctrl+Shift+G`).
2. You should see your changes (the `activity-2` folder) listed under **Changes**.
3. Type a commit message in the message box at the top, for example: `Add Local Storage to to-do list`.
4. Click the **Commit** button (the checkmark). If VS Code asks whether to stage all changes, click **Yes**.
5. Click **Sync Changes** to send the commit to your fork on GitHub.
6. Go to **your fork on GitHub** and confirm the `activity-2` folder is now in the repository.

> If this is your first commit, VS Code may ask you to sign in to GitHub or configure your name and email. Follow the prompts.

---

## What's happening under the hood

1. `JSON.parse(localStorage.getItem("tasks")) || []`: read saved tasks, or use an empty array if there are none.
2. `saveTasks()`: every change is written to Local Storage with `JSON.stringify`.
3. Both adding and deleting call `saveTasks()` before `render()`, so the array and Local Storage always stay in sync.
4. `render()`: the screen is always drawn **from the array**, so the array is the "single source of truth".

---

[Next: Activity 3: Notes with Title and Date →](activity-3.md)
