const inputBox = document.getElementById('input-box');
const dateBox = document.getElementById('date-box');
const timeBox = document.getElementById('time-box');
const listContainer = document.getElementById('list-container');
const emptyPage = document.querySelectorAll('.empty-tasks');
const progress = document.querySelectorAll('.stats');
const numbers = document.getElementById('numbers');
const progression = document.getElementById('progress');
let sparklesTriggered = false;
let counter = 0;

function addTask() {
    if (inputBox.value === "") {
        alert('Please enter a task first');
    } else if (dateBox.value === "") {
        alert('Please select a date first');
    } else if (timeBox.value === "") {
        alert('Please select time first');
    } else {
        const taskText = inputBox.value;
        const taskTime = timeBox.value;
        const taskDate = dateBox.value;
        const taskDateTime = new Date(`${taskDate}T${taskTime}`);
        let li = document.createElement('li');
        li.innerHTML = `
        <div class="tasks-container">
        <ol><ion-icon name="clipboard-outline"></ion-icon>${taskText}</ol>
        <ol><ion-icon name="calendar-outline"></ion-icon>${taskDate}</ol>
        <ol><ion-icon name="time-outline"></ion-icon>${taskTime}</ol>
        </div>
        `;
        li.dataset.dateTime = taskDateTime.toISOString();
        li.dataset.checked = 'false'; // Default checked state
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.classList.add('inComplete');
        inputBox.value = "";
        timeBox.value = "";
        dateBox.value = "";
        saveData();
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            e.target.classList.add("Complete");
            e.target.classList.remove("inComplete");
            e.target.dataset.checked = 'true'; // Mark as checked
        } else {
            e.target.classList.remove("Complete");
            e.target.classList.add("inComplete");
            e.target.dataset.checked = 'false'; // Mark as unchecked
        }
    } else if (e.target.tagName === 'OL' || e.target.tagName === 'ION-ICON') {
        let parentLi = e.target.closest('li');
        if (parentLi) {
            parentLi.classList.toggle("checked");
            if (parentLi.classList.contains("checked")) {
                parentLi.classList.add("Complete");
                parentLi.classList.remove("inComplete");
                parentLi.dataset.checked = 'true'; // Mark as checked
            } else {
                parentLi.classList.remove("Complete");
                parentLi.classList.add("inComplete");
                parentLi.dataset.checked = 'false'; // Mark as unchecked
            }
        }
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        let numberOfItems = listContainer.querySelectorAll('li').length;
        console.log(numberOfItems);
        
    }
    saveData();
}, false);

function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        content: li.innerHTML,
        dateTime: li.dataset.dateTime,
        checked: li.dataset.checked // Save checked state
    }));
    localStorage.setItem("tasksdata", JSON.stringify(tasks));
    showImage();
}

function showData() {
    const tasks = JSON.parse(localStorage.getItem("tasksdata"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = task.content;
            li.dataset.dateTime = task.dateTime;
            li.dataset.checked = task.checked; // Restore checked state
            if (task.checked === 'true') {
                li.classList.add('checked', 'Complete');
                li.classList.remove('inComplete');
            } else {
                li.classList.add('inComplete');
            }
            listContainer.appendChild(li);
        });
    }
    showImage();
    checkExpiredTasks(); // Initial check
}

// Function to check and update task status
function checkExpiredTasks() {
    const tasks = listContainer.querySelectorAll('li');
    tasks.forEach(task => {
        const taskDateTime = new Date(task.dataset.dateTime);
        if (isTaskExpired(taskDateTime)) {
            task.classList.add("expired");
        } else {
            task.classList.remove("expired");
        }
    });
    saveData();
}

// Check if the task is expired
function isTaskExpired(taskDateTime) {
    return new Date() > taskDateTime;
}

function showImage() {
    let numberOfItems = listContainer.querySelectorAll('li').length;
    if (numberOfItems === 0) {
        emptyPage.forEach(element => {
            element.style.display = 'block';
        });
        progress.forEach(element => {
            element.style.display = 'none';
        });
    } else {
        emptyPage.forEach(element => {
            element.style.display = 'none';
        });
        progress.forEach(element => {
            element.style.display = 'flex';
        });
        let completed = document.querySelectorAll('.Complete');
        let num = completed.length;
        numbers.innerHTML = num +  " / " + numberOfItems;
        let percent = (num / numberOfItems) * 100;
        progression.style.width = percent + "%";
        if (percent === 100) {
            if (!sparklesTriggered) {
                sparkels(); // Trigger sparkles
                sparklesTriggered = true; // Mark as triggered
            }
        } else {
            sparklesTriggered = false; // Reset the flag if not 100%
        }
    }
}

function startChecking() {
    setInterval(checkExpiredTasks, 1000); // Check every second
}

function deleteAll() {
    localStorage.clear();
    listContainer.innerHTML = '';
    showImage();
}

const sparkels = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
showData();
startChecking();
