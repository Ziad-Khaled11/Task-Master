let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";
let timer; // To keep track of the timer interval
let isPaused = false; // Flag for pause/resume functionality

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// Update work and break times based on input fields
function updateTimes() {
    workTime = parseInt(document.getElementById('work-time').value);
    breakTime = parseInt(document.getElementById('break-time').value);

    if (!isPaused) {
        document.getElementById('minutes').innerHTML = workTime;
        document.getElementById('seconds').innerHTML = "00";
    }
}

// start timer
function start() {
    // change button visibility
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let breakCount = 0;

    // countdown function
    let timerFunction = () => {
        // change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++;

                    // change the panel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    workMinutes = workTime - 1;
                    breakCount++;

                    // change the panel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    timer = setInterval(timerFunction, 1000); // 1000 = 1s
}

// pause timer
function pause() {
    clearInterval(timer); // Stop the timer
    isPaused = true; // Set the pause flag
    document.getElementById('start').style.display = "block";
    document.getElementById('pause').style.display = "none";
}

// resume timer
function resume() {
    start(); // Restart the timer
    isPaused = false; // Clear the pause flag
}

// reset timer
function reset() {
    clearInterval(timer); // Stop the timer
    document.getElementById('start').style.display = "block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "none";

    // Reset times
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";

    // Reset titles
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}

