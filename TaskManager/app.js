const form = document.getElementById('task-form');
const task = document.getElementById('task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');

loadEventListeners();


function loadEventListeners(){

  // Add tasks
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  filter.addEventListener('keyup', filterTasks);
  taskList.addEventListener('click', removeTask);
  clearTasks.addEventListener('click', clearAllTasks);
}


function addTask(e){

   e.preventDefault();

  if (task.value === "") {
    alert("enter something!");
  } else {
    // create list item
    const li = document.createElement("li");
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task.value));

    //Add remove icons
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = ('<i class="fa fa-remove"></i>');
    li.appendChild(link);

    //Add list item to taskList
    taskList.appendChild(li);

    //add to LS
    addTaskToLocalStorage(task.value);
    task.value = "";
  }
}

function addTaskToLocalStorage(task){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement("li");
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    //Add remove icons
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = ('<i class="fa fa-remove"></i>');
    li.appendChild(link);

    //Add list item to taskList
    taskList.appendChild(li);
  });
}

//filter tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  const allTasks = document.querySelectorAll('.collection-item');
  allTasks.forEach(function(task){
    const item = task.firstChild.textContent;
    //show task if it matches filter params
    if(item.toLowerCase().indexOf(text) != -1){
     task.style.display = "block";
    } else {
    //hide task if it doesn't
      task.style.display = "none";
    }
  });
}

// Delete Each Task

function removeTask(e){
  removeItem = document.querySelector('.fa-remove');
  if (e.target === removeItem){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      // remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}
//Delete from LS
function removeTaskFromLS(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete all tasks

function clearAllTasks(e){
  if (e.target.classList.contains('clear-tasks')) {
    if(confirm('Are you sure??')){
      localStorage.clear();
      const allTasks = document.querySelectorAll('.collection-item');
      allTasks.forEach(function(task){
        task.remove();
      });
    }
  }
 //  *faster method*
 //   while(taskList.firstChild){
 //  taskList.removeChild(taskList.firstChild);
 // }
}











