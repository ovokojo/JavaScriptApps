const form = document.getElementById('task-form');
const task = document.getElementById('task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){

  // Add tasks
  form.addEventListener('submit', addTask);
}

function addTask(e){

   e.preventDefault();

  if (task.value === "") {
    alert("enter something!");
  } else {
    // create list item
    const taskItem = document.createTextNode(task.value);

    const li = document.createElement("li");
    li.className = 'collection-item';
    li.appendChild(taskItem);

    //Add remove icons
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = ('<i class="fa fa-remove"></i>');
    li.appendChild(link);

    //Add list item to taskList
    taskList.appendChild(li);
    task.value = "";
  }
}

// Delete Tasks








