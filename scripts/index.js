//свторили пустий масив в яки будемо додавати дані з інпута
let todos = [];
let currentFilter = 'all';

const inputElement = document.getElementById('inputData');

const todoBody = document.getElementById("listInput");
const todoItem = document.getElementsByClassName('todo__item');
const todoCount = document.getElementById('counter')

const filterButtons = document.getElementsByClassName('js-filter');
const clearCompletedButton = document.getElementById('clearCompleted');

const storageKey = 'todos';

//функція динамічно додає елементи, на onclick змінює статус checked || unchecked
function createTodoHTML(todo, index) {
  return `<li class="todo__item ${todo.completed && 'checked'}">
    <input
      onclick="updateStatus(${index})"
      type="checkbox" ${todo.completed && 'checked'}
      id="todo-${index}"
    >
    <label for="todo-${index}">${todo.name}</label>
  </li>`
}


//функція що змінює статус елементів якщо статус completed || !completed
function updateStatus(index) {
  todos[index].completed = !todos[index].completed;
  writeToStorage(todos);
  renderTodos(todos);
  updatesCount();
}


//Відтворює todo items
function renderTodos(todoList) {
  todoBody.innerHTML = '';

  todoList.forEach((item, index) => {
    todoBody.innerHTML += createTodoHTML(item, index)
  })
}

//ф-я показує скільки елементів, який треба виконати залишилось
function updatesCount() {
  const incompletedTasks = todos.filter(todos => !todos.completed).length;
  todoCount.innerHTML = `${incompletedTasks} items left`
}

//подія на клік, що видаляє завершені завдання
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  writeToStorage(todos);
  renderTodos(todos);
  updatesCount();
}

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

// при натисненні на Enter додаються нові елементи, якщо інпут пустий,
inputElement.addEventListener("keyup", (e) => {
  if ((e.key === 'Enter' || e.keyCode === 13) && e.target.value.trim() !== '') {
    const todo = {
      name: e.target.value,
      completed: false
    }


    //додаємо об'єкти в масив todos
    todos.push(todo);
    writeToStorage(todos);
    renderTodos(todos);
    updatesCount();
    //очистили поле інтупа після натиснення ентер
    e.target.value = '';
  }
});

// Initialize todo list from local storage
function init() {
  todos = JSON.parse(localStorage.getItem(storageKey)) || [];
  renderTodos(todos);
}

init();

