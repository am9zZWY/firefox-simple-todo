document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  // Load todos from local storage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      addTodoToDOM(todo, index);
    });
  }

  // Add a todo to the DOM
  function addTodoToDOM(todo, index) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo}</span>
      <button data-index="${index}">Delete</button>
    `;
    todoList.appendChild(li);
  }

  function addTodo(todoText) {
    if (todoText) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.push(todoText);
      localStorage.setItem("todos", JSON.stringify(todos));
      loadTodos();
      todoInput.value = "";
    }
  }

  // Add a new todo
  addBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    addTodo(todoText);
  });

  todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const todoText = todoInput.value.trim();
      addTodo(todoText);
    }
  });

  // Delete a todo
  todoList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      loadTodos();
    }
  });

  // Load todos when the popup is opened
  loadTodos();
});
