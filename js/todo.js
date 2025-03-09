const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

toDoInput.classList.add("todo-input");

toDoInput.addEventListener("focus", () => {
  toDoInput.classList.add("todo-input-focus");
});

toDoInput.addEventListener("blur", () => {
  toDoInput.classList.remove("todo-input-focus");
});

const itemCountDisplay = document.createElement("div");
itemCountDisplay.classList.add("item-count-display");
toDoList.parentNode.insertBefore(itemCountDisplay, toDoList.nextSibling);

const TODOS_KEY = "todos";
const TRASH_KEY = "trash";

let toDos = [];
let trash = [];

const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function saveToDos() {
  saveToStorage(TODOS_KEY, toDos);
  saveToStorage(TRASH_KEY, trash);
  updateItemCount();
}

function updateItemCount() {
  const remainingCount = toDos.filter(todo => !todo.completed).length;
  const completedCount = toDos.filter(todo => todo.completed).length;
  const totalCount = toDos.length;
  itemCountDisplay.innerText = `남은 할 일: ${remainingCount}개 / 완료한 일: ${completedCount}개 / 전체 할 일: ${totalCount}개`;
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  const id = parseInt(li.id);
  const deletedToDo = toDos.find(toDo => toDo.id === id);
  
  trash.push(deletedToDo);
  toDos = toDos.filter(toDo => toDo.id !== id);
  li.remove();
  saveToDos();
}

function undoDelete() {
  if (trash.length > 0) {
    const lastDeletedToDo = trash.pop();
    toDos.push(lastDeletedToDo);
    paintToDo(lastDeletedToDo);
    saveToDos();
  }
}

function toggleToDo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const isCompleted = event.target.checked;
  
  span.style.textDecoration = isCompleted ? "line-through" : "none";
  const toDoIndex = toDos.findIndex(toDo => toDo.id === parseInt(li.id));
  toDos[toDoIndex].completed = isCompleted;
  toDos[toDoIndex].completedAt = isCompleted ? new Date().toLocaleString() : null;
  saveToDos();
}

function createToDoElement(type, props = {}) {
  const element = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'style') {
      Object.assign(element.style, value);
    } else if (key === 'classList') {
      element.classList.add(...value);
    } else {
      element[key] = value;
    }
  });
  return element;
}

function paintToDo(newTodo) {
  const li = createToDoElement("li", {
    id: newTodo.id,
    classList: ["todo-item"]
  });

  const checkbox = createToDoElement("input", {
    type: "checkbox",
    checked: newTodo.completed || false
  });
  checkbox.addEventListener("change", toggleToDo);

  const span = createToDoElement("span", {
    innerText: `${newTodo.text} (시작: ${new Date(newTodo.id).toLocaleString()})${newTodo.completed ? ` / 완료: ${newTodo.completedAt}` : ''}`,
    classList: ["todo-text"]
  });

  const deleteBtn = createToDoElement("i", {
    classList: ["fas", "fa-trash", "delete-btn"]
  });
  deleteBtn.addEventListener("click", deleteToDo);

  [checkbox, span, deleteBtn].forEach(element => li.appendChild(element));
  
  const handleHover = (isEnter) => {
    deleteBtn.style.display = isEnter ? "block" : "none";
    deleteBtn.style.opacity = isEnter ? "1" : "0";
  };
  
  li.addEventListener("mouseenter", () => handleHover(true));
  li.addEventListener("mouseleave", () => handleHover(false));

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    completed: false,
    createdAt: new Date().toLocaleString()
  };
  
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    undoDelete();
  }
});

const loadFromStorage = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

const savedToDos = loadFromStorage(TODOS_KEY);
const savedTrash = loadFromStorage(TRASH_KEY);

if (savedToDos !== null) {
  toDos = savedToDos;
  toDos.forEach(paintToDo);
}

if (savedTrash !== null) {
  trash = savedTrash;
}

updateItemCount();
