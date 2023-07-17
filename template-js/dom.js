'use strict';

// const userNameForm = document.querySelector('form');
// const ul = document.querySelector('#ul');
// const btnSort = document.querySelector('#sort');

// let state = [];
// let isEditing = false;
// let selectedId;

// userNameForm.addEventListener('submit', e => {
//   e.preventDefault();
//   const input = e.target.elements.username;
//   if (!isEditing) {
//     state.push({
//       id: crypto.randomUUID(),
//       value: input.value,
//     });
//     render(state);
//     setItemLocalStorage(state);
//     userNameForm.reset();
//   }
//   if (isEditing) {
//     state = state.map(item => {
//       if (item.id === selectedId) {
//         item.value = input.value;
//       }
//       return item;
//     });
//     render(state);
//     setItemLocalStorage(state);
//     isEditing = false;
//     userNameForm.reset();
//   }
// });

// btnSort.addEventListener('click', e => {
//   state.sort((a, b) =>
//     a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
//   );
//   render(state);
//   setItemLocalStorage(state);
// });

// const render = state => {
//   ul.innerHTML = '';
//   state.map(li => {
//     ul.innerHTML += `
//     <li id=${li.id}>
//     <span>${li.value}</span>
//     <button onClick="handleDelete(this)">del</button>
//     <button onClick="handleUpdate(this)">update</button>
//     </li>
//     `;
//   });
// };
// const handleDelete = el => {
//   const id = el.parentElement.id;
//   const filteredState = state.filter(item => item.id !== id);
//   state = filteredState;
//   render(filteredState);
//   setItemLocalStorage(filteredState);
// };

// const handleUpdate = element => {
//   const id = element.parentElement.id;
//   selectedId = id;
//   console.log(state);
//   const selectValue = state.find(item => item.id == id).value;

//   userNameForm.childNodes.item(1).value = selectValue;
//   isEditing = true;
// };

// const setItemLocalStorage = items =>
//   localStorage.setItem('items', JSON.stringify(items));

// const getItemLocalStorage = () => {
//   const firstItems = localStorage.getItem('items');
//   if (firstItems) {
//     const parsedItems = JSON.parse(firstItems);
//     render(parsedItems);
//     state = parsedItems;
//   }
// };
// getItemLocalStorage();

// let num = 0;

// const myInterval = setInterval(
//   msg => {
//     num++;

//   },
//   1000,
//   'mamad'
// );

// num === 10 && clearInterval(myInterval);
// console.log(num);

// const myTimeOut = setTimeout(
//   num => {
//     console.log(num);
//   },
//   3000,
//   2
// );

// const alarm = {
//   remind(aMessage) {
//     alert(aMessage);
//     this.timeoutID = undefined;
//   },

//   setup() {
//     if (typeof this.timeoutID === 'number') {
//       this.cancel();
//     }
//     console.log(this);

//     this.timeoutID = setTimeout(
//       msg => {
//         this.remind(msg);
//       },
//       1000,
//       'Wake up!'
//     );
//   },

//   cancel() {
//     clearTimeout(this.timeoutID);
//   },
// };
// window.addEventListener('click', () => alarm.setup());
