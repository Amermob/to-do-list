const add = document.querySelector(".btn");
const input = document.querySelector("input");
const taskBox = document.querySelector(".tasks");

let arrTasks = [];

update();

if (localStorage.getItem("task")) {
  arrTasks = JSON.parse(localStorage.getItem("task"));
}

taskBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    removeLocal(e.target.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});

add.addEventListener("click", () => {
  if (input.value !== "") {
    taskText(input);
    input.value = "";
  }
});

function taskText(task) {
  const taskObj = {
    id: Date.now(),
    title: task.value,
  };

  arrTasks.push(taskObj);

  taskToPage(arrTasks);
  localSFun(arrTasks);
}

function taskToPage(arrTasks) {
  taskBox.innerHTML = "";
  arrTasks.forEach((task) => {
    let mainDiv = document.createElement("div");

    let text = document.createElement("h2");

    const del = document.createElement("button");

    text.appendChild(document.createTextNode(task.title));

    del.setAttribute("data-id", task.id);

    del.appendChild(document.createTextNode("Delete"));

    del.classList.add("del");

    mainDiv.appendChild(text);
    mainDiv.appendChild(del);

    taskBox.appendChild(mainDiv);
  });
}

function localSFun(arrTasks) {
  localStorage.setItem("task", JSON.stringify(arrTasks));
}

function update() {
  let data = localStorage.getItem("task");
  if (data) {
    let info = JSON.parse(data);
    taskToPage(info);
  }
}

function removeLocal(taskId) {
  arrTasks = arrTasks.filter((task) => task.id != taskId);
  localSFun(arrTasks);
}
