let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.side-bar');
let bt = document.querySelector('#expand');
let navbar = document.querySelector('nav');
let text = document.querySelectorAll('.nav-item');
const listnames = document.querySelector('.listNames')
const listName = document.querySelector('.listName');
const inputBox = document.getElementById('input-box');
const dateBox = document.getElementById('date-box');
const timeBox = document.getElementById('time-box');
const comboBox = document.getElementById('combo-box');
const iconBox = document.getElementById('icon-box');
const inputLBox = document.getElementById('inputL-box');
const dateLBox = document.getElementById('dateL-box');
const timeLBox = document.getElementById('timeL-box');
const listContainer = document.getElementById('list-container');
const listedContainer = document.getElementById('listed-container');
const emptyPage = document.querySelectorAll('.empty-tasks');
const emptyListPage = document.querySelectorAll('.empty-task');
const tasks = document.querySelector('.tasks');
const emptyList = document.querySelector('.empty');
const addList = document.querySelector('.addList');
const listInput = document.querySelectorAll('.listInput');
const listNameText = document.querySelector('.listText');
const listTasks = document.querySelector('.listed-tasks');
const addText = document.querySelector('.add');
const Category = document.querySelector('.category');
const CategoryList = document.querySelector('.category-list');
let listedTasksView = false;
let counter = 0;


localStorage.clear();

$(document).ready(function() {
    function formatOption(option) {
        if (!option.id) {
            return option.text;
        }
        var iconUrl = $(option.element).data('icon');
        return $('<span><img src="' + iconUrl + '" class="icon" /> ' + option.text + '</span>');
    }

    $('#combo-box').select2({
        templateResult: formatOption,
        templateSelection: formatOption,
        minimumResultsForSearch: -1 // Hide the search box
    });
});

$(document).ready(function() {
    function formatOption(option) {
        if (!option.id) {
            return option.text;
        }
        var iconUrl = $(option.element).data('icon');
        return $('<span><img src="' + iconUrl + '" class="icon" /> ' + option.text + '</span>');
    }

    $('#icon-box').select2({
        templateResult: formatOption,
        templateSelection: formatOption,
        minimumResultsForSearch: -1 // Hide the search box
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle logic
    if (btn && sidebar) {
        btn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            addText.classList.toggle('active');
        });
    }

    // Show listInput elements on addList click
    addList.addEventListener('click', function() {
        listInput.forEach(input => {
            input.style.display = 'block';
        });
    });

    // Navbar toggle logic
    if (bt && navbar) {
        bt.addEventListener('click', function() {
            navbar.classList.toggle('active');
            text.forEach(element => {
                element.classList.toggle('active');
            });

            // Remove 'expanded' class from sidebar if the navbar is not active
            if (!navbar.classList.contains('active')) {
                sidebar.classList.remove('expanded');
            } else {
                sidebar.classList.add('expanded');
            }
        });
    }

    // Unified document click event to close sidebar, navbar, and listInput
    document.onclick = function(e) {
        // Close sidebar if clicking outside
        if (sidebar && !btn.contains(e.target) && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
            addText.classList.remove('active');
        }

        // Close navbar if clicking outside
        if (navbar && !bt.contains(e.target) && !navbar.contains(e.target)) {
            navbar.classList.remove('active');
            text.forEach(element => {
                element.classList.remove('active');
            });
            sidebar.classList.remove('expanded');
        }

        // Close listInput elements if clicking outside
        if (!e.target.closest('.listInput') && !addList.contains(e.target)) {
            listInput.forEach(input => {
                input.style.display = 'none';
                listNameText.value = '';
            });
        }
    };
});



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

function clickEvent(e) {
    let elementId = e.target.id;
    let elements = document.querySelectorAll(`[id='${elementId}']`);
    if (e.target.tagName === "LI") {
        elements.forEach(function(element) {
            element.classList.toggle("checked");
        });
    } else if (e.target.tagName === 'OL' || e.target.tagName === 'ION-ICON') {
        let parentLi = e.target.closest('li');
        if (parentLi) {
            elements.forEach(function(element) {
                element.classList.toggle("checked");
            });
        }
    }
    else if (e.target.tagName === "SPAN"){
        let taskId = e.target.parentElement.id;
        document.querySelectorAll(`[id='${taskId}']`).forEach(task => {
            task.remove();
        });
        
    }
    saveData();
}

listContainer.addEventListener("click", clickEvent, false);
listedContainer.addEventListener("click", clickEvent, false);



function AddList() {
    let listNameValue = listNameText.value;
    if (listNameValue === "") {
        alert("Please enter a list name");
    } else {
        listInput.forEach(input => {
            input.style.display = 'none';
        });
        let icon = iconBox.value
        listTasks.style.display = 'none';
        listnames.style.display = 'block';
        emptyList.style.display = 'none';
        tasks.style.display = 'block';
        let li = document.createElement('li');
        className = listNameValue.replace(/ /g, '-');
        li.innerHTML = `
            <a href="#" class="${className}">
                <img src="../resources/icons/${icon}.png" class="side-icon">
                <span class="side-item">${listNameValue}</span>
            </a>
        `;

        listnames.appendChild(li);
        addOption(listNameValue, className, icon);
        const anchor = li.querySelector('a');
        anchor.addEventListener('click', listNameClicked);
        listNameText.value = '';
    }
    saveData();
}

function addTaskinList() {
    if (inputLBox.value === "") {
        alert('Please enter a task first');
    } else if (dateLBox.value === "") {
        alert('Please select a date first');
    } else if (timeLBox.value === "") {
        alert('Please select time first');
    } else {
        const taskText = inputLBox.value;
        const taskTime = timeLBox.value;
        const taskDate = dateLBox.value;
        const taskDateTime = new Date(`${taskDate}T${taskTime}`);
        

        let UID = uniqueId();
        let li = document.createElement('li');
        let allLi = document.createElement('li');
        li.innerHTML = `
        <div class="tasks-container">
        <ol><ion-icon name="clipboard-outline"></ion-icon>${taskText}</ol>
        <ol><ion-icon name="calendar-outline"></ion-icon>${taskDate}</ol>
        <ol><ion-icon name="time-outline"></ion-icon>${taskTime}</ol>
        </div>
        `;
        let className = listName.innerHTML.replace(/ /g, '-');
        li.classList.add(className);
        li.dataset.dateTime = taskDateTime.toISOString();
        li.dataset.checked = 'false'; 
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        span.classList.add('remove-task');
        li.appendChild(span);
        li.id = UID;
        allLi.innerHTML = li.innerHTML;
        allLi.dataset.dateTime = taskDateTime.toISOString();
        allLi.classList.add(className);
        allLi.id = UID;
        listedContainer.appendChild(li);
        listContainer.appendChild(allLi);

        inputLBox.value = "";
        timeLBox.value = "";
        dateLBox.value = "";

        span.addEventListener('click', function() {
            li.remove();
            allLi.remove(); 
            saveData();
        });

        saveData();
    }
}



function listNameClicked(event) {
    event.preventDefault();
    const className = event.currentTarget.className; 
    let title = className.replace('-',/ /g);
    tasks.style.display = 'none';
    listTasks.style.display = 'block';
    inputLBox.value = "";
    timeLBox.value = "";
    dateLBox.value = "";
    listName.innerHTML = title
    listedTasksView = true;
    const items = listedContainer.querySelectorAll('li');

    items.forEach(item => {
        if (item.classList.contains(className)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function allClicked(){
    tasks.style.display = 'block';
    listTasks.style.display = 'none';
    inputBox.value = "";
    timeBox.value = "";
    dateBox.value = "";
}






// Function to check and update task status
function checkExpiredTasks() {
    const tasks = listContainer.querySelectorAll('li');
    const listTasks = listedContainer.querySelectorAll('li');
    tasks.forEach(task => {
        const taskDateTime = new Date(task.dataset.dateTime);
        if (isTaskExpired(taskDateTime)) {
            task.classList.add("expired");
        } else {
            task.classList.remove("expired");
        }
    });
    listTasks.forEach(task => {
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



function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        content: li.innerHTML,
        dateTime: li.dataset.dateTime,
        checked: li.dataset.checked // Save checked state
    }));
    const lists = Array.from(listnames.children).map(li => ({
        content: li.innerHTML
    }));
    localStorage.setItem("listsdata", JSON.stringify(tasks));
    localStorage.setItem("list", JSON.stringify(lists));
    showImage();
}

function showData() {
    const tasks = JSON.parse(localStorage.getItem("listsdata"));
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

function showImage() {
    let numberOfItems = listContainer.querySelectorAll('li').length;
    let numberOfLists = listnames.querySelectorAll('li').length;
    let numberOfItemsInList = listedContainer.querySelectorAll('li').length;
    if (numberOfLists > 1) {
        emptyList.style.display = 'none';
        if(!listedTasksView){
            listTasks.style.display ='none';
        }
        if (numberOfItems === 0) {
            emptyPage.forEach(element => {
                element.style.display = 'block';
            });
            Category.style.display = 'none';
        } else {
            emptyPage.forEach(element => {
                element.style.display = 'none';
            });
            Category.style.display = 'flex';
        }
        if (numberOfItemsInList === 0){
            emptyListPage.forEach(element => {
                element.style.display = 'block';
            });
            CategoryList.style.display = 'none';
        } else {
            emptyListPage.forEach(element => {
                element.style.display = 'none';
            });
            CategoryList.style.display = 'flex';
        }

    }
    else{
        tasks.style.display = 'none';
        emptyList.style.display = 'block';
        if(!listedTasksView){
            listTasks.style.display ='none';
    
        }
    }
}

function startChecking() {
    setInterval(checkExpiredTasks, 1000); // Check every second
}

function deleteAll() {
    localStorage.clear();
    listContainer.innerHTML = '';
    listedContainer.innerHTML = '';
    showImage();
}

function uniqueId() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 16);
}

function addOption(text, value, iconName) {

    const newOption = document.createElement('option');
    newOption.text = text;
    newOption.value = value;      

    newOption.setAttribute('data-icon', `icons/${iconName}.png`);

    comboBox.appendChild(newOption);
}

showData();
startChecking();
