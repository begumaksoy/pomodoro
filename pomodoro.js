let time = 1500;
let i = time;
let interval;
let counter;
let start_stop;

window.onload = () => {
    counter = document.getElementById("counter");
    start_stop = document.getElementById("start-stop");
};

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
    if (start_stop.innerText == "start") {
        start_stop.innerText = "stop";
        start_stop.className = "stop_button";
        interval = setInterval(every_time, 1000);
    } else {
        start_stop.innerText = "start";
        start_stop.className = "start_button";
        clearInterval(interval);
    }
}
