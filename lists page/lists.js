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
const highall = document.getElementById('Highall');
const lowall = document.getElementById('Lowall');
const mediumall = document.getElementById('Mediumall');
const Highlist = document.getElementById('highaddlist');
const Lowlist = document.getElementById('lowaddlist');
const Mediumlist = document.getElementById('mediumaddlist');
const HIGH = document.getElementById('High');
const LOW = document.getElementById('Low');
const MEDIUM = document.getElementById('Medium');
const HIGHALL = document.getElementById('highall');
const LOWALL = document.getElementById('lowall');
const MEDIUMALL = document.getElementById('mediumall');
const listside = document.getElementById('listsidebar');
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





function clickEvent(e) {
    const elementId = e.target.id;
    const elements = document.querySelectorAll(`[id='${elementId}']`);
    
    if (e.target.tagName === "LI") {
        elements.forEach(element => {
            element.classList.toggle("checked");
        });
    } 
    else if (e.target.tagName === 'OL' || e.target.tagName === 'ION-ICON') {
        const parentLi = e.target.closest('li');
        if (parentLi) {
            const parentElements = document.querySelectorAll(`[id='${parentLi.id}']`);
            parentElements.forEach(element => {
                element.classList.toggle("checked");
            });
        }
    } 
    else if (e.target.tagName === "SPAN") {
        const taskId = e.target.parentElement.id;
        document.querySelectorAll(`[id='${taskId}']`).forEach(task => {
            task.remove();
        });
    }

    saveData(); // Ensure this function is defined and working properly
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
        className = listNameValue.replace(' ', '-');
        li.innerHTML = `
            <a href="#" class="${className}">
                <img src="../resources/icons/${icon}.png" class="side-icon">
                <span class="side-item">${listNameValue}</span>
            </a>
        `;
        li.classList.add(className);
        listnames.appendChild(li);
        addOption(listNameValue, className, icon);
        const anchor = li.querySelector('a');
        anchor.addEventListener('click', listNameClicked);
        listNameText.value = '';
    }
    saveData();
}

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
        let UID = uniqueId();
        const taskDateTime = new Date(`${taskDate}T${taskTime}`);
        let li = document.createElement('li');
        let allLi = document.createElement('li');
        li.innerHTML = `
        <div class="tasks-container">
        <ol><ion-icon name="clipboard-outline"></ion-icon>${taskText}</ol>
        <ol><ion-icon name="calendar-outline"></ion-icon>${taskDate}</ol>
        <ol><ion-icon name="time-outline"></ion-icon>${taskTime}</ol>
        </div>
        `;
        li.dataset.dateTime = taskDateTime.toISOString();
        li.dataset.checked = 'false'; // Default checked state
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.classList.add('inComplete');
        li.id = UID;
        let className = comboBox.value.replace(' ', '-');
        li.classList.add(className);
        if (lowall.classList.contains('active')) {
            li.classList.add('low');
            allLi.classList.add('low');
        }
        else if (mediumall.classList.contains('active')) {
            li.classList.add('medium');
            allLi.classList.add('medium');
        }
        else if (highall.classList.contains('active')){
            li.classList.add('high');
            allLi.classList.add('high');
        }
        else{
            li.classList.add('low');
            allLi.classList.add('low');
        }
        allLi.innerHTML = li.innerHTML;
        allLi.id = UID;
        const newOl = document.createElement('ol');
        newOl.innerHTML = `<ion-icon name="folder-open-outline"></ion-icon>${comboBox.value}`;
        li.querySelector('.tasks-container').appendChild(newOl);
        // allLi.appendChild(span);
        allLi.dataset.dateTime = taskDateTime.toISOString();
        allLi.classList.add(className);
        listContainer.appendChild(li);
        listedContainer.appendChild(allLi);
        inputBox.value = "";
        timeBox.value = "";
        dateBox.value = "";
        if (lowall.classList.contains('active')) {
            lowall.classList.remove('active');
        }
        if (mediumall.classList.contains('active')) {
            mediumall.classList.remove('active');
        }
        if (highall.classList.contains('active')){
            highall.classList.remove('active');
        }
        saveData();
    }
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
        
        let className = listName.innerHTML.replace(' ', '-');
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
        
        li.classList.add(className);
        li.dataset.dateTime = taskDateTime.toISOString();
        li.dataset.checked = 'false'; 
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        span.classList.add('remove-task');
        li.appendChild(span);
        li.id = UID;
        if (Lowlist.classList.contains('active')) {
            li.classList.add('low');
            allLi.classList.add('low');
        }
        else if (Mediumlist.classList.contains('active')) {
            li.classList.add('medium');
            allLi.classList.add('medium');
        }
        else if (Highlist.classList.contains('active')){
            li.classList.add('high');
            allLi.classList.add('high');
        }
        else{
            li.classList.add('low');
            allLi.classList.add('low');
        }
        allLi.innerHTML = li.innerHTML;
        allLi.dataset.dateTime = taskDateTime.toISOString();
        allLi.classList.add(className);
        allLi.id = UID;
        const newOl = document.createElement('ol');
        newOl.innerHTML = `<ion-icon name="folder-open-outline"></ion-icon>${listName.innerHTML}`;
        allLi.querySelector('.tasks-container').appendChild(newOl);
        listedContainer.appendChild(li);
        listContainer.appendChild(allLi);

        inputLBox.value = "";
        timeLBox.value = "";
        dateLBox.value = "";
        if (Lowlist.classList.contains('active')) {
            Lowlist.classList.remove('active');
        }
        if (Mediumlist.classList.contains('active')) {
            Mediumlist.classList.remove('active');
        }
        if (Highlist.classList.contains('active')){
            Highlist.classList.remove('active');
        }
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
    let title = className.replace('-',' ');
    tasks.style.display = 'none';
    listTasks.style.display = 'block';
    inputLBox.value = "";
    timeLBox.value = "";
    dateLBox.value = "";
    listName.innerHTML = title
    listedTasksView = true;
    const items = listedContainer.querySelectorAll('li');
    if (Lowlist.classList.contains('active')) {
        Lowlist.classList.remove('active');
    }
    if (Mediumlist.classList.contains('active')) {
        Mediumlist.classList.remove('active');
    }
    if (Highlist.classList.contains('active')){
        Highlist.classList.remove('active');
    }
    if (LOW.classList.contains('active')) {
        LOW.classList.remove('active');
    }
    if (MEDIUM.classList.contains('active')) {
        MEDIUM.classList.remove('active');
    }
    if (HIGH.classList.contains('active')){
        HIGH.classList.remove('active');
    }
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
    if (lowall.classList.contains('active')) {
        lowall.classList.remove('active');
    }
    if (mediumall.classList.contains('active')) {
        mediumall.classList.remove('active');
    }
    if (highall.classList.contains('active')){
        highall.classList.remove('active');
    }
    if (LOWALL.classList.contains('active')) {
        LOWALL.classList.remove('active');
    }
    if (MEDIUMALL.classList.contains('active')) {
        MEDIUMALL.classList.remove('active');
    }
    if (HIGHALL.classList.contains('active')){
        HIGHALL.classList.remove('active');
    }
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

function high(){
    if (lowall.classList.contains('active')) {
        lowall.classList.remove('active');
    }
    if (mediumall.classList.contains('active')) {
        mediumall.classList.remove('active');
    }
    if (highall.classList.contains('active')){
        highall.classList.remove('active');
    }
    else{
        highall.classList.add('active');
    }
}

function low(){
    if (lowall.classList.contains('active')) {
        lowall.classList.remove('active');
    }
    else{
        lowall.classList.add('active');
    }
    if (mediumall.classList.contains('active')) {
        mediumall.classList.remove('active');
    }
    if (highall.classList.contains('active')){
        highall.classList.remove('active');
    }
}

function medium() {
    if (lowall.classList.contains('active')) {
        lowall.classList.remove('active');
    }
    if (mediumall.classList.contains('active')) {
        mediumall.classList.remove('active');
    }
    else{
        mediumall.classList.add('active');
    }
    if (highall.classList.contains('active')){
        highall.classList.remove('active');
    }
}

function highlist(){
    if (Lowlist.classList.contains('active')) {
        Lowlist.classList.remove('active');
    }
    if (Mediumlist.classList.contains('active')) {
        Mediumlist.classList.remove('active');
    }
    if (Highlist.classList.contains('active')){
        Highlist.classList.remove('active');
    }
    else{
        Highlist.classList.add('active');
    }
}

function lowlist(){
    if (Lowlist.classList.contains('active')) {
        Lowlist.classList.remove('active');
    }
    else{
        Lowlist.classList.add('active');
    }
    if (Mediumlist.classList.contains('active')) {
        Mediumlist.classList.remove('active');
    }
    if (Highlist.classList.contains('active')){
        Highlist.classList.remove('active');
    }
}

function mediumlist() {
    if (Lowlist.classList.contains('active')) {
        Lowlist.classList.remove('active');
    }
    if (Mediumlist.classList.contains('active')) {
        Mediumlist.classList.remove('active');
    }
    else{
        Mediumlist.classList.add('active');
    }
    if (Highlist.classList.contains('active')){
        Highlist.classList.remove('active');
    }
}

function High(){
    const items = listedContainer.querySelectorAll('li');
    if (LOW.classList.contains('active')) {
        LOW.classList.remove('active');
    }
    if (MEDIUM.classList.contains('active')) {
        MEDIUM.classList.remove('active');
    }
    if (HIGH.classList.contains('active')){
        HIGH.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        HIGH.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('high')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function Low(){
    const items = listedContainer.querySelectorAll('li');
    
    if (MEDIUM.classList.contains('active')) {
        MEDIUM.classList.remove('active');
    }
    if (HIGH.classList.contains('active')){
        HIGH.classList.remove('active');
    }
    if (LOW.classList.contains('active')) {
        LOW.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        LOW.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('low')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function Medium(){
    const items = listedContainer.querySelectorAll('li');
    if (LOW.classList.contains('active')) {
        LOW.classList.remove('active');
    }
    if (HIGH.classList.contains('active')){
        HIGH.classList.remove('active');
    }
    if (MEDIUM.classList.contains('active')) {
        MEDIUM.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        MEDIUM.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('medium')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function HighAll(){
    const items = listContainer.querySelectorAll('li');
    if (LOWALL.classList.contains('active')) {
        LOWALL.classList.remove('active');
    }
    if (MEDIUMALL.classList.contains('active')) {
        MEDIUMALL.classList.remove('active');
    }
    if (HIGHALL.classList.contains('active')){
        HIGHALL.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        HIGHALL.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('high')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function LowAll(){
    const items = listContainer.querySelectorAll('li');
    
    if (MEDIUMALL.classList.contains('active')) {
        MEDIUMALL.classList.remove('active');
    }
    if (HIGHALL.classList.contains('active')){
        HIGHALL.classList.remove('active');
    }
    if (LOWALL.classList.contains('active')) {
        LOWALL.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        LOWALL.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('low')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function MediumAll(){
    const items = listContainer.querySelectorAll('li');
    if (LOWALL.classList.contains('active')) {
        LOWALL.classList.remove('active');
    }
    if (HIGHALL.classList.contains('active')){
        HIGHALL.classList.remove('active');
    }
    if (MEDIUMALL.classList.contains('active')) {
        MEDIUMALL.classList.remove('active');
        items.forEach(item => {
            item.style.display = 'flex';
        });
    }
    else{
        MEDIUMALL.classList.add('active');
        items.forEach(item => {
            if (item.classList.contains('medium')) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

}

function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        content: li.innerHTML,
        dateTime: li.dataset.dateTime,
        checked: li.dataset.checked // Save checked state
    }));
    const listedTasks = Array.from(listedContainer.children).map(li => ({
        content: li.innerHTML,
        dateTime: li.dataset.dateTime,
        checked: li.dataset.checked // Save checked state
    }));
    const lists = Array.from(listnames.children).map(li => ({
        content: li.innerHTML
    }));
    localStorage.setItem("listsdata", JSON.stringify(tasks));
    localStorage.setItem("listeddata", JSON.stringify(listedTasks));
    localStorage.setItem("listnames", JSON.stringify(lists));
    showImage();
}

function showData() {
    const tasks = JSON.parse(localStorage.getItem("listsdata"));
    const listedTasks = JSON.parse(localStorage.getItem("listeddata"));
    const lists = JSON.parse(localStorage.getItem("listnames"));
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
    if (listedTasks) {
        listedTasks.forEach(task => {
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
            listedContainer.appendChild(li);
        });
    }
    if (lists) {
        lists.forEach(list => {
            let li = document.createElement('li');
            li.innerHTML = list.content;
            listnames.appendChild(li);
            const anchor = li.querySelector('a');
            anchor.addEventListener('click', listNameClicked);
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

function deleteList(){
    const className = listName.innerHTML.replace(' ', '-'); 
    const items = listedContainer.querySelectorAll('li');
    const allItems = listContainer.querySelectorAll('li');
    items.forEach(item => {
        if (item.classList.contains(className)) {
            item.remove();
    }});
    allItems.forEach(item => {
        if (item.classList.contains(className)) {
            item.remove();
    }});
}

function deleteWholeList(){
    const className = listName.innerHTML.replace(' ', '-'); 
    const items = listedContainer.querySelectorAll('li');
    const allItems = listContainer.querySelectorAll('li');
    items.forEach(item => {
        if (item.classList.contains(className)) {
            item.remove();
    }});
    allItems.forEach(item => {
        if (item.classList.contains(className)) {
            item.remove();
    }});
    for (let i = 0; i < comboBox.options.length; i++) {
        if (comboBox.options[i].value === className) {
            comboBox.remove(i); // Removes the option with the matching value
            break;
        }
    }
    allClicked();
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
