let time = 1500;
let i = time;
let interval;
let counter;
let start_stop;
let tasksArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
let finished_button;
let pause_button;
window.onload = () => {
    counter = document.getElementById("counter");
    start_stop = document.getElementById("start-stop");
    finished_button = document.getElementById("finished_button");
    pause_button = document.getElementById("pause-button");
    tasksArray.forEach(addTask);
};
function addTask(text) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
}
function add() {
    const input = document.getElementById("item");
    if (input.value != "") {
        tasksArray.push(input.value);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
        addTask(input.value);
        input.value = "";
    }
}
function pomodoro_time() {
    counter.innerText = "25:00";
    time = 1500;
}

function short_b_time() {
    counter.innerText = "05:00";
    time = 300;
}

function long_b_time() {
    counter.innerText = "10:00";
    time = 600;
}

function every_time() {
    time--;
    counter.innerText =
        String(Math.floor(time / 60)).padStart(2, "0") +
        ":" +
        String(time % 60).padStart(2, "0");
    if (time == 0) {
        clearInterval(interval);
    }
}

function start_time() {
    interval = setInterval(every_time, 1000);

    start_stop.style = "display: none;";
    finished_button.style = "display: inline-block;";
    pause_button.style = "display: inline-block;";
    pause_button.innerText = "pause";
}

function pause() {
    if (pause_button.innerText == "continue") return start_time();
    clearInterval(interval);
    pause_button.innerText = "continue";
}
