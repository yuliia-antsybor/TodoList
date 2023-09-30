const todoBody = document.getElementById("listInput");
const todos = []; //свторили пустий масив в яки будемо додавати дані з інпута
const inputElement = document.getElementById('inputData');//доступились до плейсхолдера за айді і вивели в змінну
const newElements = document.getElementById('list') // доступились по айді до списку  вивели в змінну
const filterCompleted = document.getElementById('todo__item--completed');

function createTodoHTML(todo, index) {
  return `<li class="todo__item" data-key="${index}">
    <input type="checkbox" What needs to be here? id="todo-${index}">
    <label for="todo-${index}">${todo.name}</label>
    <button class="custom-button"> delete </button>
  </li>`
}

function renderTodos() {
  todoBody.innerHTML = '';

  todos.forEach((item, index) => {
    todoBody.innerHTML += createTodoHTML(item, index)
  })
}

inputElement.addEventListener("keyup", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    const todo = {
      name: e.target.value,
      completed: false
    }

    //додаємо об'єкти в масив todos
    todos.push(todo);
    renderTodos();
    //очистили поле інтупа після натиснення ентер
    e.target.value = " ";
  }
});

todoBody.addEventListener('click', (e) => {
  const target = e.target;
  const parent = target.parentNode;

  if (parent.className !== 'todo__item') return;

  if (target.tagName === 'INPUT') {
    console.log(parent.dataset.key, todos[parent.dataset.key])
  }


})




