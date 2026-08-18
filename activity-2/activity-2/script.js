const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

    // Load saved tasks from Local Storage ( or start empty)
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Save the tasks array to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function allTasksDone() {
    localStorage.clear();
}

    //draw every task on the screen from the tasks array
function render() {
    taskList.innerHTML = "";    //Clears list first

        // loops thru each task by index     
    for (let i = 0; i <tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");    //makes new <li>

        const taskText = document.createElement("span");
        taskText.textContent = task.text;    // puts task text inside

            // strike-through if task done
        if (task.done) {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.5";
        }

        const doneBtn = document.createElement("span");
        doneBtn.textContent = task.done ? "UNDO" : "MARK AS DONE";

        doneBtn.addEventListener("click", () => {
            tasks[i].done = !tasks[i].done;
            saveTasks();
            render();
        });

        const deleteBtn = document.createElement("span");   //delete button
        deleteBtn.textContent = "DELETE";

            // when the delete button is clicked: remove the task & redraw    
        deleteBtn.addEventListener("click", () => {
            tasks.splice(i, 1);     //  remove 1 task @ this index
            saveTasks();            // save the new array
            render();              // redraw the screen
        });

        li.appendChild(taskText);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

        // update the counter with the current length
    count.textContent = tasks.length + "tasks";
}

    // Adds a new task - to the array
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim(); 

    if (text === "") return;    // do nothing if box is empty

    tasks.push({text, done: false});        // add new task to end of array
    saveTasks();            // Save to local storage
    render();               // redraw the screen
    taskInput.value = "";   //clear input box
});


    // press 'Enter' to add
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addBtn.click();
}); 


clearBtn.addEventListener("click", () => {
    tasks.length = 0;
    localStorage.removeItem("tasks");
    render();
});

render();   // shows list when page loads