let time = 1500;
let prev_time = time;
let interval;
let counter;
let start_stop;
let tasksArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
let finished_button;
let pause_button;
let start_button;
let add_new_button;
let pomodoro_button;
let short_break_button;
let long_break_button;
let task_input;

const sound = new Audio("notification.wav");
window.onload = () => {
    task_input = document.getElementById("item");
    counter = document.getElementById("counter");
    start_stop = document.getElementById("start-stop");
    pomodoro_button = document.getElementById("pomodoro_button");
    short_break_button = document.getElementById("short_break_button");
    long_break_button = document.getElementById("long_break_button");
    finished_button = document.getElementById("finished_button");
    pause_button = document.getElementById("pause-button");
    add_new_button = document.getElementById("add_new_button");

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
    finish();
}

function finish() {
    clearInterval(interval);
    pause_button.style = "display: none;";
    finished_button.style = "display: none;";
    start_stop.style = "display: block;";
    time = prev_time;
}
function pomodoro_time() {
    finish();
    task_input.style = "";
    short_break_button.style = "";
    pomodoro_button.style =
        "background-color: white; border-color: #ff5a5a; border-style: solid; color: #ff5a5a;";
    long_break_button.style = "";
    counter.innerText = "25:00";
    time = 1500;
    prev_time = time;
}

function short_b_time() {
    finish();
    task_input.style = "display: none";
    pomodoro_button.style = "";
    short_break_button.style =
        "background-color: white; border-color: #ff5a5a; border-style: solid; color: #ff5a5a;";
    long_break_button.style = "";
    counter.innerText = "05:00";
    time = 300;
    prev_time = time;
}

function long_b_time() {
    finish();
    task_input.style = "display: none";
    short_break_button.style = "";
    pomodoro_button.style = "";
    long_break_button.style =
        "background-color: white; border-color: #ff5a5a; border-style: solid; color: #ff5a5a;";
    counter.innerText = "10:00";
    time = 600;
    prev_time = time;
}

function every_time() {
    time--;
    counter.innerText =
        String(Math.floor(time / 60)).padStart(2, "0") +
        ":" +
        String(time % 60).padStart(2, "0");
    if (time <= 0) {
        if (input.value != "") {
            tasksArray.push(input.value);
            localStorage.setItem("tasks", JSON.stringify(tasksArray));
            addTask(input.value);
            input.value = "";
        }
        sound.play();
        finish();
    }
}

function start_time() {
    const input = document.getElementById("item");
    if (time != 1500) {
        interval = setInterval(every_time, 1000);

        start_stop.style = "display: none;";
        pause_button.style = "display: inline-block;";
        pause_button.innerText = "pause";
    } else if (time == 1500 && input.value == "") {
        alert("You should enter a task to start ^v^");
    } else if (time == 1500 && input.value != "") {
        interval = setInterval(every_time, 1000);

        start_stop.style = "display: none;";
        finished_button.style = "display: inline-block;";
        pause_button.style = "display: inline-block;";
        pause_button.innerText = "pause";
    }
}

function pause() {
    if (pause_button.innerText == "continue") return start_time();
    clearInterval(interval);
    pause_button.innerText = "continue";
}
