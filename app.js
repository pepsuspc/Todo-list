const STORAGE_KEY = "todo-app.items";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(title) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    done: false,
  };
}

function render(todos) {
  list.replaceChildren();
  emptyState.classList.toggle("hidden", todos.length > 0);

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = todo.done ? "todo-item done" : "todo-item";
    item.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", `Mark "${todo.title}" complete`);

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    item.append(checkbox, title, deleteBtn);
    list.append(item);
  }
}

function setTodos(todos) {
  saveTodos(todos);
  render(todos);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  const todos = loadTodos();
  todos.unshift(createTodo(title));
  setTodos(todos);

  form.reset();
  input.focus();
});

list.addEventListener("click", (event) => {
  const target = event.target;
  const item = target.closest(".todo-item");
  if (!item) return;

  const todos = loadTodos();
  const index = todos.findIndex((todo) => todo.id === item.dataset.id);
  if (index === -1) return;

  if (target.classList.contains("delete-btn")) {
    todos.splice(index, 1);
    setTodos(todos);
    return;
  }

  if (target.type === "checkbox") {
    todos[index].done = target.checked;
    setTodos(todos);
  }
});

setTodos(loadTodos());
