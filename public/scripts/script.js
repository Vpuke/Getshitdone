const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".todos");
const buttons = document.querySelector(".buttons");
let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(event) {
  event.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

// function to add items to the list.

function populateList(todos = [], todoList) {
  todoList.innerHTML = todos
    .map((todo, i) => {
      return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        todo.done ? "checked" : ""
      } />
        <label for ="item${i}">${todo.text}</label>
        </li>
        `;
    })
    .join("");
}

// Event delegation, delegates the click to the parent and skips unless its an input field.

function toggleDone(event) {
  if (!event.target.matches("input")) return;
  const el = event.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleAll(event) {
  const action = event.target.dataset.action;

  switch (action) {
    case "check":
      items.map(item => (item.done = true));
      break;
    case "uncheck":
      items.map(item => (item.done = false));
      break;
    case "clear":
      items = [];
      break;
  }
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
buttons.addEventListener("click", toggleAll);

populateList(items, itemsList);
