//свторили пустий масив в яки будемо додавати дані з інпута
let todos = [];

const inputElement = document.getElementById('inputData');

const todoBody = document.getElementById("listInput");
const todoItem = document.getElementsByClassName('todo__item');
const todoCount = document.getElementById('counter')

const filterButtons = document.getElementsByClassName('js-filter');
const clearCompletedButton = document.getElementById('clearCompleted');

const storageKey = 'todos';


//function dynamically adds elements onclick and change status: checked || unchecked
function createTodoHTML(todo, index) {
  return `<li class="todo__item ${todo.completed && 'checked'}">
    <input
      class="todo__checkbox"
      onclick="updateStatus(${index})"
      type="checkbox" ${todo.completed && 'checked'}
      id="todo-${index}"
    >
    <label for="todo-${index}">${todo.name}</label>
    <button class="delete-btn" onclick="deleteItem(${index})">
      <svg xmlns="http://www.w3.org/2000/svg" id="svgDelete" data-name="Isolation Mode" viewBox="0 0 24 24"
      width="20" height="20"><polygon points="19.061 7.061 16.939 4.939 12 9.879 7.061 4.939
      4.939 7.061 9.879 12 4.939 16.939 7.061 19.061 12 14.121 16.939 19.061 19.061 16.939 14.121 12 19.061 7.061"/>
      </svg>
    </button>
  </li>`
}

function updateTodos(todoList){
  writeToStorage(todoList);
  renderTodos(todoList);
  updatesCount();
}

//changing status of list if it's completed || !completed
function updateStatus(index) {
  todos[index].completed = !todos[index].completed;
  updateTodos(todos);
}

// Remove elements with splice method(by index)
function deleteItem(index) {
  todos.splice(index, 1);
  updateTodos(todos);
}

//rendering to to items
function renderTodos(todoList) {
  todoBody.innerHTML = '';

  todoList.forEach((item, index) => {
    todoBody.innerHTML += createTodoHTML(item, index)
  })
}

//function show us how many tasks left to do
function updatesCount() {
  const incompletedTasks = todos.filter(todos => !todos.completed).length;
  todoCount.innerHTML = `${incompletedTasks} tasks left`
}

//onclick event that delete completed tasks
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  updateTodos(todos);
}
//add functionality to our filter buttons(completed, active, all)
function filterTodos(e) {
  const action = e.target.dataset.action;
  let filteredTodos;

  switch (action) {
    case 'all':
      filteredTodos = todos;
      break;
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
  }

  renderTodos(filteredTodos);
}

function writeToStorage(todoList) {
  localStorage.setItem(storageKey, JSON.stringify(todoList));
}

// Attach event listeners

clearCompletedButton.addEventListener('click', clearCompleted);

[...filterButtons].forEach((button => button.addEventListener('click', filterTodos)));

// pressing "Enter" key adds new elements if the input is empty
inputElement.addEventListener("keyup", (e) => {
  if ((e.key === 'Enter' || e.keyCode === 13) && e.target.value.trim() !== '') {
    const todo = {
      name: e.target.value,
      completed: false
    }


    todos.push(todo);
    updateTodos(todos);
    //clearing input field
    e.target.value = '';
  }
});

// Initialize todo list from local storage
function init() {
  todos = JSON.parse(localStorage.getItem(storageKey)) || [];
  renderTodos(todos);
  updatesCount();
}

init();


