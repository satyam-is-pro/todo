// Abstract class for TodoItemFormatter
class TodoItemFormatter {
  formatTask(task, completed) {
      let formattedTask = task.length > 14 ? task.slice(0, 14) + "..." : task;
      return completed ? `<s>${formattedTask}</s>` : formattedTask;
  }

  formatDueDate(dueDate) {
      return dueDate || "No due date";
  }

  formatStatus(completed) {
      return completed ? "Completed" : "Pending";
  }
}

// Class responsible for managing Todo items
class TodoManager {
  constructor(todoItemFormatter) {
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.todoItemFormatter = todoItemFormatter;
  }

  addTodo(task, dueDate) {
      if (this.isPastDate(dueDate)) {
          uiManager.showAlertMessage("Cannot select a past date", "error");
          return null;
      }

      const newTodo = {
          id: this.getRandomId(),
          task,
          dueDate: this.todoItemFormatter.formatDueDate(dueDate),
          completed: false,
      };
      this.todos.push(newTodo);
      this.saveToLocalStorage();
      return newTodo;
  }

  editTodo(id, newTask) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
          todo.task = newTask;
          this.saveToLocalStorage();
      }
  }

  isPastDate(date) {
      if (!date) return false;
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today;
  }

  toggleTodoStatus(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
          todo.completed = !todo.completed;
          this.saveToLocalStorage();
      }
  }

  deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveToLocalStorage();
  }

  clearAllTodos() {
      this.todos = [];
      this.saveToLocalStorage();
  }

  filterTodos(status) {
      switch (status) {
          case "all":
              return this.todos;
          case "pending":
              return this.todos.filter((todo) => !todo.completed);
          case "completed":
              return this.todos.filter((todo) => todo.completed);
          default:
              return [];
      }
  }

  getRandomId() {
      return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
      );
  }

  saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

// Class responsible for managing the UI and handling events
class UIManager {
  constructor(todoManager, todoItemFormatter) {
      this.todoManager = todoManager;
      this.todoItemFormatter = todoItemFormatter;
      this.taskInput = document.querySelector("input");
      this.dateInput = document.querySelector(".schedule-date");
      this.addBtn = document.querySelector(".add-task-button");
      this.todosListBody = document.querySelector(".todos-list-body");
      this.alertMessage = document.querySelector(".alert-message");
      this.deleteAllBtn = document.querySelector(".delete-all-btn");

      this.setDateRestrictions();
      this.addEventListeners();
      this.showAllTodos();
  }

  setDateRestrictions() {
      const today = new Date().toISOString().split("T")[0];
      this.dateInput.setAttribute("min", today);
  }

  addEventListeners() {
      this.addBtn.addEventListener("click", () => this.handleAddTodo());
      this.taskInput.addEventListener("keyup", (e) => {
          if (e.keyCode === 13 && this.taskInput.value.length > 0) {
              this.handleAddTodo();
          }
      });
      this.deleteAllBtn.addEventListener("click", () => this.handleClearAllTodos());
  }

  handleAddTodo() {
      const task = this.taskInput.value;
      const dueDate = this.dateInput.value;
      if (task === "") {
          this.showAlertMessage("Please enter a task", "error");
          return;
      }
      const newTodo = this.todoManager.addTodo(task, dueDate);
      if (newTodo) {
          this.showAllTodos();
          this.taskInput.value = "";
          this.dateInput.value = "";
          this.showAlertMessage("Task added successfully", "success");
      }
  }

  handleEditTodo(id) {
      const newTask = prompt("Edit your task:");
      if (newTask && newTask.trim() !== "") {
          this.todoManager.editTodo(id, newTask);
          this.showAllTodos();
          this.showAlertMessage("Task updated successfully", "success");
      }
  }

  handleClearAllTodos() {
      this.todoManager.clearAllTodos();
      this.showAllTodos();
      this.showAlertMessage("All todos cleared successfully", "success");
  }

  showAllTodos() {
      const todos = this.todoManager.filterTodos("all");
      this.displayTodos(todos);
  }

  displayTodos(todos) {
      this.todosListBody.innerHTML = "";

      if (todos.length === 0) {
          this.todosListBody.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
          return;
      }

      todos.forEach((todo) => {
          this.todosListBody.innerHTML += 
              `<tr class="todo-item" data-id="${todo.id}">
                  <td>${this.todoItemFormatter.formatTask(todo.task, todo.completed)}</td>
                  <td>${this.todoItemFormatter.formatDueDate(todo.dueDate)}</td>
                  <td>${this.todoItemFormatter.formatStatus(todo.completed)}</td>
                  <td>
                      <button class="btn btn-success btn-sm" onclick="uiManager.handleToggleStatus('${todo.id}')">
                          <i class="bx ${todo.completed ? 'bx-x' : 'bx-check'} bx-xs"></i>
                      </button>
                      <button class="btn btn-warning btn-sm" onclick="uiManager.handleEditTodo('${todo.id}')">
                          <i class="bx bx-edit bx-xs"></i>
                      </button>
                      <button class="btn btn-error btn-sm" onclick="uiManager.handleDeleteTodo('${todo.id}')">
                          <i class="bx bx-trash bx-xs"></i>
                      </button>
                  </td>
              </tr>`;
      });
  }

  handleToggleStatus(id) {
      this.todoManager.toggleTodoStatus(id);
      this.showAllTodos();
  }

  handleDeleteTodo(id) {
      this.todoManager.deleteTodo(id);
      this.showAlertMessage("Todo deleted successfully", "success");
      this.showAllTodos();
  }

  showAlertMessage(message, type) {
      this.alertMessage.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
      setTimeout(() => { this.alertMessage.innerHTML = ""; }, 3000);
  }
}

// Instantiating the classes
const todoItemFormatter = new TodoItemFormatter();
const todoManager = new TodoManager(todoItemFormatter);
const uiManager = new UIManager(todoManager, todoItemFormatter);
