const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

    // Load saved tasks from Local Storage ( or start empty)
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Save the tasks array to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

    //draw every task on the screen from the tasks array
function render() {
    taskList.innerHTML = "";    //Clears list first

        // loops thru each task by index     
    for (let i = 0; i <tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");    //makes new <li>

        const taskText = document.createElement("span");
        taskText.textContent = task;    // puts task text inside

        const deleteBtn = document.createElement("span");   //delete button
        deleteBtn.textContent = "DELETE";
        // deleteBtn.title = "DELETE";

            // when the delete button is clicked: remove the task & redraw    
        deleteBtn.addEventListener("click", () => {
            tasks.splice(i, 1);     //  remove 1 task @ this index
            saveTasks();            // save the new array
            render();              // redraw the screen
        });

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

        // update the counter with the current length
    count.textContent = tasks.length + "tasks";
}

    // Adds a new task - to the array
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim(); 

    if (task === "") return;    // do nothing if box is empty

    tasks.push(task);        // add new task to end of array
    saveTasks();            // Save to local storage
    render();               // redraw the screen
    taskInput.value = "";   //clear input box
});


    // press 'Enter' to add
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addBtn.click();
}); 


render();   // shows list when page loads