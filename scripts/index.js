const todoBody = document.getElementById("listInput");
const todos = []; //свторили пустий масив в яки будемо додавати дані з інпута
const inputElement = document.getElementById('inputData');//доступились до плейсхолдера за айді і вивели в змінну
const newElements = document.getElementById('list') // доступились по айді до списку  вивели в змінну

inputElement.addEventListener("keyup", (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log(e.target.value);
    //через івент лісенер додали подію
    //на клік по клавіші Enter в поле інпута.

    const todo = {
      name: e.target.value,
      completed: false
    }  // створили об'єкт в який будуть виводитись дані

    todoBody.innerHTML += `
  <li class="todo__item">
    <input type="checkbox" id="item1">
    <label for="item1">${todo.name}</label>
  </li>`;

    todos.push(todo);  //додаємо об'єкти в масив todos
    console.log(todos);
    e.target.value = " "; //очистили поле інтупа після натиснення ентер
  }

});



