const todoBody = document.getElementById("listInput");
const todos = []; //свторили пустий масив в яки будемо додавати дані з інпута
const inputElement = document.getElementById('inputData');//доступились до плейсхолдера за айді і вивели в змінну
const newElements = document.getElementById('list'); // доступились по айді до списку  вивели в змінну
const todoItem = document.getElementsByClassName('todo__item');
const todoCount = document.getElementById('counter')
const filtersContainer = document.querySelector('.todo__filters');// для фільтрів

//функція динамічно додає елементи, на onclick змінює статус checked || unchecked
function createTodoHTML(todo, index) {
  return `<li class="todo__item ${todo.completed && 'checked'}" data-key="${index}">
    <input
      onclick="updateStatus(${index})"
      type="checkbox" ${todo.completed && 'checked'}
      id="todo-${index}"
    >
    <label for="todo-${index}">${todo.name}</label>
  </li>`
}

/* <button class="custom-button"> delete</button> */


//функція що змінює статус елементів якщо статус completed || !completed
function updateStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
  updatesCount();
}


//?
function renderTodos() {
  todoBody.innerHTML = '';

  todos.forEach((item, index) => {
    todoBody.innerHTML += createTodoHTML(item, index)
  })
}

// при натисненні на Enter додаються нові елементи, якщо інпут пустий,
inputElement.addEventListener("keyup", (e) => {
  if ((e.key === 'Enter' || e.keyCode === 13) && e.target.value.trim() !== '') {
    const todo = {
      name: e.target.value,
      completed: false
    }


    //додаємо об'єкти в масив todos
    todos.push(todo);
    renderTodos();
    updatesCount();
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
//ф-я показує скільки елементів, який треба виконати залишилось
function updatesCount() {
  const incompletedTasks = todos.filter(todos => !todos.completed).length;
  todoCount.innerHTML = `${incompletedTasks} items left`
  console.log("updatesCount", todoCount);
}


