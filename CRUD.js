$(document).ready(function() {

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#task-list").empty(); //clearing current list
    tasks.forEach((task, index) => displayTask(task, index)); 
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function displayTask(task, index) {
    const taskDiv = $(`
         <div class="task" data-index="${index}">
            <div class="task-header">
                <span><strong>${task.title}</strong></span>
                <div>
                    <button class="edit-task">Edit</button>
                    <button class="remove-task">Remove</button>
                </div>
            </div>

            <div class="task-details">${task.details}</div>
        </div>
    `);

    taskDiv.find(".edit-task").on("click", () => editTask(index));
    taskDiv.find(".remove-task").on("click", () => removeTask(index));

    $("#task-list").append(taskDiv);
}      


//add task @Triffy
$("#add-task").on("click", function () {
    const title = $("#task-title").val().trim();
    const details = $("#task-details").val().trim();

    if (!title) {
        alert("Task title cannot be empty!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, details });
    saveTasks(tasks);
    loadTasks();
    $("#task-title").val(""); // Clear title input @Triffy
    $("#task-details").val(""); // Clear details input @Triffy
});

//edit task @Triffy
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks[index];

    const newTitle = prompt("Edit task title:", task.title);
    const newDetails = prompt("Edit task details:", task.details);

    if (newTitle !== null && newTitle.trim() !== "") {
        task.title = newTitle.trim();
    }
    if (newDetails !== null && newDetails.trim() !== "") {
        task.details = newDetails.trim();
    }

    tasks[index] = task;
    saveTasks(tasks);
    loadTasks();
}

// Remove task @Triffy
function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}
    

loadTasks();

});

