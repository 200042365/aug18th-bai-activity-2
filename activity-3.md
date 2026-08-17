# Activity 3: Notes with Title and Date

In this activity, you will build a notes app step by step in VS Code, using separate HTML and JavaScript files. Each note has a title, some text, and a date that is added automatically when you create it. The notes are saved to Local Storage so they survive a refresh.

If you have not already done so, fork and clone the repository first (see Activity 1, Step 1).

## What you'll build

- A title input box
- A note input area
- An **Add Note** button
- A list of notes, each showing its title, date, and text
- A button to delete notes
- The date is added **automatically** when a note is created
- Everything **saved to Local Storage** automatically

Each saved note is an object with three pieces of data: a title, the note text, and a date.

## Files you'll create

Inside the cloned repository, create a folder called `activity-3`, and add these two files inside it:

```
activity-3/
├── index.html   (the page structure + link to JS)
└── script.js    (all the JavaScript logic)
```

---

## Step 1: Check the repository is open

VS Code should still be open with the cloned repository from Activity 1. You should see the repository files in the Explorer panel, including the `activity-1` and `activity-2` folders from the previous activities.

---

## Step 2: Create the `activity-3` folder and `index.html`

1. In VS Code's Explorer panel, create a new folder named **`activity-3`**.
2. Inside the `activity-3` folder, create a new file and save it as **`index.html`**.
3. Paste the code below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Notes</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      max-width: 500px;
      margin: auto;
    }
    input {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      margin-bottom: 8px;
    }
    textarea {
      padding: 10px;
      font-size: 16px;
      width: 100%;
      height: 80px;
      margin-bottom: 8px;
      font-family: sans-serif;
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
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .note-title { font-weight: bold; }
    .note-date { color: #666; font-size: 0.85em; margin-top: 4px; }
    .note-text { margin-top: 6px; }
    .delete { cursor: pointer; color: red; }
  </style>
</head>
<body>
  <h1>My Notes</h1>
  <p><small>Each note saves its title, text, and the date it was added.</small></p>

  <input id="titleInput" type="text" placeholder="Note title" />
  <textarea id="noteInput" placeholder="Write your note..."></textarea>
  <button id="addBtn">Add Note</button>

  <ul id="noteList"></ul>

  <!-- This is the important line: it links our JavaScript file -->
  <script src="script.js"></script>
</body>
</html>
```

> **Why the `<script src="script.js">` tag matters:** Instead of writing JavaScript inside the HTML, we tell the browser to load a **separate file** called `script.js`. It must be placed at the **bottom of `<body>`** so the HTML elements exist before the script runs.

---

## Step 3: Create `script.js`

1. Inside the `activity-3` folder, create another new file and save it as **`script.js`**.
2. We'll build the logic **piece by piece**. Each part below says where to place it in `script.js`. Type each part and read the comments.

### 3a. Grab the elements from the page

Place these lines at the **top** of `script.js`:

```js
// Find the inputs, button, and list in the HTML so we can use them
const titleInput = document.getElementById("titleInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("noteList");
```

### 3b. Load saved notes from Local Storage

Add this **below** the elements from 3a:

```js
// Read saved notes. If there are none, start with an empty array []
let notes = JSON.parse(localStorage.getItem("notes")) || [];
```

> `JSON.parse(...)` turns the saved **string** back into a real JavaScript **array**. The `|| []` means "if there's nothing saved, use an empty array".

Each item in the array will be an object with a title, note text, and date:

```js
{ title: "Shopping", note: "Buy milk and bread", date: "15/03/2025" }
```

### 3c. Write the `saveNotes()` function

Add this function **below** the `notes` array:

```js
// Turn the notes array into a string and save it to Local Storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
```

### 3d. Write the `render()` function (draws the list)

Add this function **below** the `saveNotes()` function:

```js
// Draw every note on the screen from the notes array
function render() {
  list.innerHTML = ""; // Clear the list first

  // Loop through each note by index
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("li"); // Make a new <li>

    const header = document.createElement("div");
    header.className = "note-header";

    const titleEl = document.createElement("span");
    titleEl.className = "note-title";
    titleEl.textContent = note.title; // Put the title inside

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete"; // The delete button
    deleteBtn.title = "Delete";

    // When Delete is clicked: remove the note, save, and redraw
    deleteBtn.addEventListener("click", () => {
      notes.splice(i, 1); // Remove 1 item at this index
      saveNotes();        // Save the new array
      render();           // Redraw the screen
    });

    header.appendChild(titleEl);
    header.appendChild(deleteBtn);

    const dateEl = document.createElement("div");
    dateEl.className = "note-date";
    dateEl.textContent = note.date; // Show the saved date

    const textEl = document.createElement("div");
    textEl.className = "note-text";
    textEl.textContent = note.note; // Show the note text

    li.appendChild(header);
    li.appendChild(dateEl);
    li.appendChild(textEl);
    list.appendChild(li);
  }
}
```

### 3e. Make the **Add Note** button work

Add this **below** the `render()` function:

```js
// When the button is clicked, add a new note to the array
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim(); // Get the title, trim spaces
  const note = noteInput.value.trim();   // Get the note text, trim spaces

  if (title === "" || note === "") return; // Do nothing if either box is empty

  // Add the date automatically
  const date = new Date().toLocaleDateString();

  notes.push({ title: title, note: note, date: date }); // Add an object to the array
  saveNotes();                                         // Save to Local Storage
  render();                                            // Redraw the screen
  titleInput.value = "";                               // Clear the title box
  noteInput.value = "";                                // Clear the note box
});
```

### 3f. Show saved notes when the page loads

Add this line at the **very bottom** of `script.js`:

```js
// Call render() once at the end so saved notes appear
render();
```

---

## Step 4: Check your full `script.js`

Your finished `script.js` should look like this (all the parts put together):

```js
const titleInput = document.getElementById("titleInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("noteList");

// Load saved notes (or start empty)
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Save the notes array to Local Storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Draw all notes on the screen
function render() {
  list.innerHTML = ""; // Clear the list

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.className = "note-header";

    const titleEl = document.createElement("span");
    titleEl.className = "note-title";
    titleEl.textContent = note.title;

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.title = "Delete";

    deleteBtn.addEventListener("click", () => {
      notes.splice(i, 1);
      saveNotes();
      render();
    });

    header.appendChild(titleEl);
    header.appendChild(deleteBtn);

    const dateEl = document.createElement("div");
    dateEl.className = "note-date";
    dateEl.textContent = note.date;

    const textEl = document.createElement("div");
    textEl.className = "note-text";
    textEl.textContent = note.note;

    li.appendChild(header);
    li.appendChild(dateEl);
    li.appendChild(textEl);
    list.appendChild(li);
  }
}

// Add a new note
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const note = noteInput.value.trim();

  if (title === "" || note === "") return;

  const date = new Date().toLocaleDateString();

  notes.push({ title: title, note: note, date: date });
  saveNotes();
  render();
  titleInput.value = "";
  noteInput.value = "";
});

// Show saved notes when the page loads
render();
```

---

## Step 5: Run it in the browser

1. In VS Code, go to the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **"Live Preview"** and install it.
3. Right-click the `index.html` file inside `activity-3` and choose **"Open with Live Preview"**.
4. Live Preview opens the app in your browser, and it refreshes automatically when you save.

---

## Step 6: Test your work

1. Type a title and a note, then click **Add Note**.
2. Add a few more notes and check that each one shows today's date.
3. Click the Delete button next to a note to remove it.
4. **Refresh the page** (`F5`).
5. **Close the tab and reopen it.**

Your notes should still be there.

---

## Step 7: Challenges (extend your app)

Try these on your own once it's working:

1. **Clear all button**: add a button that empties the whole list and clears Local Storage (`localStorage.clear()` or `removeItem("notes")`).
2. **Search notes**: add an input that filters the notes by title as you type.
3. **Sort by date**: show the newest notes first.
4. **Move the CSS**: create a `style.css` file, move the `<style>` rules into it, and link it with `<link rel="stylesheet" href="style.css" />` in the `<head>`.

---

## Step 8: Commit and push your work

When you're happy with your project, save your files, then commit and push them using VS Code's Source Control panel:

1. Click the **Source Control** icon in the left Activity Bar (or press `Ctrl+Shift+G`).
2. You should see your changes (the `activity-3` folder) listed under **Changes**.
3. Type a commit message in the message box at the top, for example: `Build notes app`.
4. Click the **Commit** button (the checkmark). If VS Code asks whether to stage all changes, click **Yes**.
5. Click **Sync Changes** to send the commit to your fork on GitHub.
6. Go to **your fork on GitHub** and confirm the `activity-3` folder is now in the repository.

> If this is your first commit, VS Code may ask you to sign in to GitHub or configure your name and email. Follow the prompts.

---

## What's happening under the hood

1. `JSON.parse(localStorage.getItem("notes")) || []`: read saved notes (an array of objects), or use an empty array if there are none.
2. Each note is an object with three properties: `title`, `note`, and `date`.
3. `new Date().toLocaleDateString()` adds the date automatically when a note is created.
4. `saveNotes()` writes the array to Local Storage with `JSON.stringify`, and `render()` draws it on the screen.
