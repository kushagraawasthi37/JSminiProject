document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-button");
  const todoList = document.getElementById("todo-list");

  //Local stroage se string milti hai usko array mai convert karo
  let tasks = JSON.parse(localStorage.getItem("keyyy")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", function (e) {
    const tasktext = todoInput.value.trim();

    if (tasktext === "") {
      return;
    }

    //Prepare Task
    const newTask = {
      id: JSON.stringify(Date.now()), //Convert the Date into string
      text: tasktext,
      isCompleted: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    //when task is added now clean the Input for Next task
    todoInput.value = "";
  });

  //Matlab jab reload hoga tab work karega
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.isCompleted) li.classList.add("isCompleted");
    li.innerHTML = `
     <span> ${task.text}</span>
     <button> Delete </button>
     `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("isCompleted");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //Li bala event listener mat chalao
      tasks = tasks.filter((t) => {
        return t.id !== task.id;
      });

      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  //Handeling Local storage

  function saveTasks() {
    //This key is necesaary for gettting the item from local storage
    localStorage.setItem("keyyy", JSON.stringify(tasks));
  }

  //Handeling the delete button
});
