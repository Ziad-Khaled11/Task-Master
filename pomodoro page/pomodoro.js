let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";
let timer; // To keep track of the timer interval

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
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

// reset timer
function reset() {
    clearInterval(timer); // Stop the timer
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Reset times
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";

    // Reset titles
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}