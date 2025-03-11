function getFormattedData() {
    const now = new Date()
    const options = { weekday: "long", day: "numeric", month: "long" };
    return now.toLocaleDateString("en-Us", options);
}
const title = document.querySelector(".main-header")
const subTitle = document.querySelector(".header-group__sub-header");
const [weekday, day, month] = getFormattedData().split(" ")

title.textContent = weekday;
subTitle.textContent = `${day} ${month}`







document.addEventListener("DOMContentLoaded", () => {
  const floatButton = document.getElementById("float-button");
  const createForm = document.getElementById("create-form");
    const closeFormBtn = document.getElementById("close-form");
    const overlay = document.getElementById("overlay");
  const descriptionInput = document.getElementById("description");
  const dateInput = document.getElementById("startDate");
    const todoList = document.querySelector(".todo-list");
    const toggleCheckbox = document.getElementById("toggle-checkbox");
    


    toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
      console.log("Перемикач увімкнено!");
    } else {
      console.log("Перемикач вимкнено!");
    }
  });


  // Показати форму
  floatButton.addEventListener("click", () => {
      createForm.classList.add("show");
      overlay.classList.add("show");
  });

  // Закрити форму
  closeFormBtn.addEventListener("click", () => {
      createForm.classList.remove("show");
      overlay.classList.remove("show");
  });
    
    overlay.addEventListener("click", () => {
      createForm.classList.remove("show");
      overlay.classList.remove("show");
    });

  // Отримання завдань із localStorage
  function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }

  // Збереження у localStorage
  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Видалення завдання
  function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
  }

  // Додавання нового завдання у початок списку
  function addTodo(description, startDate) {
    const todos = getTodos();
    const newTodo = {
      description: description,
      startDate: new Date(startDate).toISOString(),
      done: false,
    };

    todos.unshift(newTodo); // Додаємо на початок масиву
    saveTodos(todos);
    renderTodos();
  }

  // Рендеринг списку завдань
  function renderTodos() {
    todoList.innerHTML = "";
    const todos = getTodos();

    todos.forEach((todo, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("todo-block");

      const formattedDate = new Date(todo.startDate)
        .toLocaleString("en-US", {
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).replace(" at ", ", ");

      listItem.innerHTML = `
        <label class="checkbox">
          <input type="checkbox" ${
            todo.done ? "checked" : ""
          } data-index="${index}">
          <span class="material-symbols-rounded checkbox__check-icon">check</span>
        </label>
        <div class="todo-block__data">
          <p class="todo-block__date">${formattedDate}</p>
          <h3 class="todo-block__title">${todo.description}</h3>
        </div>
        <button class="delete-button" data-index="${index}">
         <img class="img" src="./img/close.svg" alt="close">
        </button>
      `;

      todoList.appendChild(listItem);
    });
  }

  // Обробник додавання завдання
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const startDate = dateInput.value;

    if (description && startDate) {
      addTodo(description, startDate);
      createForm.reset();
      createForm.classList.remove("show"); // Ховаємо форму після додавання
    }
  });

  // Видалення та зміна стану (checkbox)
  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const index = e.target.getAttribute("data-index");
      deleteTodo(index);
    }

    if (e.target.type === "checkbox") {
      const index = e.target.getAttribute("data-index");
      const todos = getTodos();
      todos[index].done = e.target.checked;
      saveTodos(todos);
    }
  });

  // Відобразити список завдань при завантаженні сторінки
  renderTodos();
});

const splitButtonClickHandler = (target) => {
  const splitButton = document.querySelector(".split-button");
  [...splitButton.children].forEach((element) =>
    element.classList.remove("split-button__button--active")
  );
  splitButton.children[target.id].classList.toggle(
    "split-button__button--active"
  );
};

