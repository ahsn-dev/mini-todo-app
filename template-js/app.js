"use strict";

const userNameForm = document.querySelector("#form");
const ul = document.querySelector("#ul");
const btnSort = document.querySelector("#sort");
let state = [];
let isEditing = false;
let selectedId;

ul.addEventListener("click", (e) => {
  e.target.dataset.delete == "delete" && handleDelete(e.target);
  e.target.dataset.update == "update" && handleUpdate(e.target);
});

userNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = e.target.elements.username;
  if (!isEditing) {
    state.push({
      id: crypto.randomUUID(),
      value: input.value,
    });
    render(state);
    setItemLocalStorage(state);
    userNameForm.reset();
  }
  if (isEditing) {
    state = state.map((item) => {
      if (item.id === selectedId) {
        item.value = input.value;
      }
      return item;
    });
    render(state);
    setItemLocalStorage(state);
    isEditing = false;
    userNameForm.reset();
  }
  console.log(state);
});

btnSort.addEventListener("click", (e) => {
  state.sort((a, b) =>
    a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
  );
  render(state);
  setItemLocalStorage(state);
});

const render = (state) => {
  ul.innerHTML = "";
  state.map((li) => {
    ul.innerHTML += `
    <li id=${li.id}>
    <span>${li.value}</span>
    <button data-delete="delete" >del</button>
    <button data-update="update" >update</button>
    </li>
    `;
  });
};
const handleDelete = (el) => {
  const id = el.parentElement.id;
  const filteredState = state.filter((item) => item.id !== id);
  state = filteredState;
  render(filteredState);
  setItemLocalStorage(filteredState);
};

const handleUpdate = (element) => {
  const id = element.parentElement.id;
  selectedId = id;
  console.log(state);
  const selectValue = state.find((item) => item.id == id).value;

  userNameForm.childNodes.item(1).value = selectValue;
  isEditing = true;
};

const setItemLocalStorage = (items) =>
  localStorage.setItem("items", JSON.stringify(items));

const getItemLocalStorage = () => {
  const firstItems = localStorage.getItem("items");
  if (firstItems) {
    const parsedItems = JSON.parse(firstItems);
    render(parsedItems);
    state = parsedItems;
  }
};
getItemLocalStorage();
