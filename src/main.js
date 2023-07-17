import { emojis } from "./utils/emoji";
import { generateRandomNumber } from "./utils/randomNumber";

import "./style/global.css";

// selections
const userNameForm = document.querySelector("#form");
const ul = document.querySelector("#ul");
const radios = document.querySelectorAll("input[name=sort-option]");

let state = [];
let isEditing = false;
let selectedId;

// form submit
userNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = e.target.elements.username;
  if (input.value == "") return;
  if (!isEditing) {
    state.push({
      id: crypto.randomUUID(),
      value: input.value,
      emoji: emojis[generateRandomNumber(0, 1520)],
    });
    renderListItem(state);
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
    renderListItem(state);
    setItemLocalStorage(state);
    isEditing = false;
    userNameForm.reset();
  }
});

// render li to html
const renderListItem = (state) => {
  ul.innerHTML = "";
  state.map((li) => {
    ul.innerHTML += ` <li  class="mb-2" >
    <div class="relative pb-2">
      <span
        class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
        aria-hidden="true"
        id="line"
      ></span>
      <div class="relative flex space-x-3 items-baseline">
        <div>
          <span
            class="h-8 w-8 rounded-full bg-brand-secondary flex items-center justify-center ring-4 ring-white"

          >
            ${li.emoji}
          </span>
        </div>
        <div
          class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4"
        >
          <div class="max-w-xs ">
            <p class="text-brand-text text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap" title=${li.value} >${li.value}</p>
          </div>
          <div
            class="text-right text-sm  text-gray-500"
            id=${li.id}
          >
          <button data-delete="delete" class="[&_*]:pointer-events-none"  ><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>
          <button data-update="update"  class="[&_*]:pointer-events-none" ><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        </button>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  });
};

// event delegation
ul.addEventListener("click", (e) => {
  e.target.dataset.delete == "delete" && handleDelete(e.target);
  e.target.dataset.update == "update" && handleUpdate(e.target);
});

// delete
const handleDelete = (el) => {
  const id = el.parentElement.id;
  const filteredState = state.filter((item) => item.id !== id);
  state = filteredState;
  renderListItem(filteredState);
  setItemLocalStorage(filteredState);
};

// update
const handleUpdate = (element) => {
  const id = element.parentElement.id;
  selectedId = id;
  const selectValue = state.find((item) => item.id == id).value;

  userNameForm.childNodes.item(1).value = selectValue;
  isEditing = true;
};

// localStorage
const setItemLocalStorage = (items) =>
  localStorage.setItem("items", JSON.stringify(items));

const getItemLocalStorage = () => {
  const firstItems = localStorage.getItem("items");
  if (firstItems) {
    const parsedItems = JSON.parse(firstItems);
    renderListItem(parsedItems);
    state = parsedItems;
  }
};
getItemLocalStorage();

// sort
radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    const checked = document.querySelector(
      "input[name=sort-option]:checked"
    ).value;
    sortBy(checked);
  });
});

function sortBy(type) {
  const originalState = [...state];
  let sortedState;
  if (type === "1") {
    sortedState = [...state].sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
    );
  } else if (type === "2") {
    sortedState = [...state].reverse();
  } else if (type === "3") {
    sortedState = originalState;
  }
  renderListItem(sortedState);
  setItemLocalStorage(sortedState);
}

// class TodoApp {
//   constructor() {
//     this.userNameForm = document.querySelector('#form');
//     this.ul = document.querySelector('#ul');
//     this.radios = document.querySelectorAll('input[name=sort-option]');
//     this.state = [];
//     this.isEditing = false;
//     this.selectedId;
//     this.userNameForm.addEventListener('submit', e => {
//       e.preventDefault();
//       const input = e.target.elements.username;
//       if (input.value == '') return;
//       if (!this.isEditing) {
//         this.state.push({
//           id: crypto.randomUUID(),
//           value: input.value,
//           emoji: emojis[generateRandomNumber(0, 1520)],
//         });
//         this.renderListItem(this.state);
//         this.setItemLocalStorage(this.state);
//         this.userNameForm.reset();
//       }
//       if (this.isEditing) {
//         this.state = this.state.map(item => {
//           if (item.id === this.selectedId) {
//             item.value = input.value;
//           }
//           return item;
//         });
//         this.renderListItem(this.state);
//         this.setItemLocalStorage(this.state);
//         this.isEditing = false;
//         this.userNameForm.reset();
//       }
//     });
//     this.ul.addEventListener('click', e => {
//       e.target.dataset.delete == 'delete' && this.handleDelete(e.target);
//       e.target.dataset.update == 'update' && this.handleUpdate(e.target);
//     });
//     this.radios.forEach(radio => {
//       radio.addEventListener('click', () => {
//         const checked = document.querySelector(
//           'input[name=sort-option]:checked'
//         ).value;
//         this.sortBy(checked);
//       });
//     });
//   }
//   renderListItem(state) {
//     this.ul.innerHTML = '';
//     state.map(li => {
//       this.ul.innerHTML += ` <li  class="mb-2" >
//       <div class="relative pb-2">
//         <span
//           class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
//           aria-hidden="true"
//           id="line"
//         ></span>
//         <div class="relative flex space-x-3 items-baseline">
//           <div>
//             <span
//               class="h-8 w-8 rounded-full bg-brand-secondary flex items-center justify-center ring-4 ring-white"

//             >
//               ${li.emoji}
//             </span>
//           </div>
//           <div
//             class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4"
//           >
//             <div class="max-w-xs ">
//               <p class="text-brand-text text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap" title=${li.value} >${li.value}</p>
//             </div>
//             <div
//               class="text-right text-sm  text-gray-500"
//               id=${li.id}
//             >
//             <button data-delete="delete" class="[&_*]:pointer-events-none"  ><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//           </svg>
//           </button>
//             <button data-update="update"  class="[&_*]:pointer-events-none" ><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//           </svg>
//           </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>`;
//     });
//   }
//   handleDelete(el) {
//     const id = el.parentElement.id;
//     const filteredState = this.state.filter(item => item.id !== id);
//     this.state = filteredState;
//     this.renderListItem(filteredState);
//     this.setItemLocalStorage(filteredState);
//   }
//   handleUpdate(element) {
//     const id = element.parentElement.id;
//     this.selectedId = id;
//     const selectValue = this.state.find(item => item.id == id).value;
//     this.userNameForm.childNodes.item(1).value = selectValue;
//     this.isEditing = true;
//   }
//   setItemLocalStorage(items) {
//     localStorage.setItem('items', JSON.stringify(items));
//   }

//   getItemLocalStorage() {
//     const firstItems = localStorage.getItem('items');
//     if (firstItems) {
//       const parsedItems = JSON.parse(firstItems);
//       this.renderListItem(parsedItems);
//       this.state = parsedItems;
//     }
//   }
//   sortBy(type) {
//     const originalState = [...this.state];
//     let sortedState;
//     if (type === '1') {
//       sortedState = [...this.state].sort((a, b) =>
//         a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
//       );
//     } else if (type === '2') {
//       sortedState = [...this.state].reverse();
//     } else if (type === '3') {
//       sortedState = originalState;
//     }
//     this.renderListItem(sortedState);
//     this.setItemLocalStorage(sortedState);
//   }
// }

// const App = new TodoApp();

// App.getItemLocalStorage();

// const makeUser = function (name, age) {
//   const user = {};

//   user.name = name;
//   user.age = age;
//   user.score = 0;
//   user.increase = function () {
//     user.score++;
//   };

//   return user;
// };

//  oop

//  functionality  // data

// user
// score()

// const userFunctionality = {
//   increase: function () {
//     this.score++;
//   },
// };

// function makeUser(name, age) {
//   const user = Object.create(userFunctionality);
//   user.name = name;
//   user.age = age;
//   user.score = 0;

//   return user;
// }

// const user = makeUser('hitler', '2'); // {}
// const user1 = makeUser('mamad', '.5');
// console.log(user);
// user.increase();
// console.log(user);

// new  object.create(this)// return object

// function makeUser(name, age) {
//   this.name = name;
//   this.age = age;
//   this.score = 0;
// }

// makeUser.prototype.increase = function () {
//   this.score++;
// };

// const user = new makeUser('hitler', '2'); // {}
// const user1 = new makeUser('mamad', '.5');
// console.log(user);
// user.increase();
// console.log(user);

// class User {
//   score = 30;
//   #password = 10;
//   constructor(name, age) {
//     this.name = name;
//     this.age = 20;
//   }
//   increase() {
//     this.score = this.#password;
//   }
//   decrease() {
//     this.score--;
//   }
//   get getAge() {
//     return this.age;
//   }
//   getAge() {
//     return this.age;
//   }
//   set getAge(age) {
//     this.age = age;
//     return this.age;
//   }

//   static sayHello(name) {
//     return name + this.score;
//   }
// }

// class UserLogin extends User {
//   constructor(name, age) {
//     super(name, age);
//   }
//   loginUser() {
//     console.log(`welcome ${this.name} , ${this.score}`);
//   }
// }

// const user = new User('hitler', '2');
// const login = new UserLogin('hitler', '2');

// login.loginUser();
