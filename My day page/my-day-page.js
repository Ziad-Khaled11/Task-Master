const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const emptyPage = document.querySelectorAll('.empty-tasks');
const buttons = document.querySelectorAll('.category');
let counter = 0;
const complete = document.getElementById("complete")
const incomplete = document.getElementById("incomplete")


function addTask(){
    if(inputBox.value === ""){
        alert('Please enter a task first');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.classList.add('inComplete');
        const currentDate = new Date();
        localStorage.setItem('savedDate', currentDate.toString());
    }
    inputBox.value = "";
    saveData();
}

/* Complete the Task */
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        e.target.classList.add("Complete");
        e.target.classList.remove("inComplete");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        let numberOfItems = listContainer.querySelectorAll('li').length;
        console.log(numberOfItems);
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    counter = localStorage.getItem("data").length
    showImage();
    dayPassed();
}

function showData(){
    dayPassed();
    listContainer.innerHTML = localStorage.getItem("data");
    showImage();
}

function showImage(){
    let numberOfItems = listContainer.querySelectorAll('li').length;
    if (counter === 0 && numberOfItems === 0) {
        emptyPage.forEach(element => {
            element.style.display = 'block';
            
        });
        buttons.forEach(element => {
            element.style.display = 'none';
            
        });
        
    }
    else{
        emptyPage.forEach(element => {
            element.style.display = 'none';
        });
        buttons.forEach(element => {
            element.style.display = 'flex';
            complete.classList.remove("active");
            incomplete.classList.remove("active");
            
        });
        
    }
}

function deleteAll(){
    localStorage.clear();
    listContainer.innerHTML = ''
    counter = 0;
    showImage();
}

/*If Clicked on Complete Button */
complete.addEventListener("click", function() {
    let completed = document.querySelectorAll(".Complete");
    let incompleted = document.querySelectorAll(".inComplete");
    if (complete.classList.contains("active")) {
        complete.classList.remove("active");
        console.log("incomplete");
        completed.forEach(element => {
            element.style.display = 'flex';
        });
        incompleted.forEach(element => {
            element.style.display = 'flex'; 
        });

    }
    else{
        if (incomplete.classList.contains("active")) {
            incomplete.classList.remove("active");   
        }
        complete.classList.add("active");
        console.log("complete");
        completed.forEach(element => {
            element.style.display = 'flex';
        });
        incompleted.forEach(element => {
            element.style.display = 'none'; 
        });
    }
});

/*If Clicked on Inomplete Button */
incomplete.addEventListener("click", function() {
    let completed = document.querySelectorAll(".Complete");
    let incompleted = document.querySelectorAll(".inComplete");
    if (incomplete.classList.contains("active")) {
        incomplete.classList.remove("active");
        console.log("incomplete");
        completed.forEach(element => {
            element.style.display = 'flex';
        });
        incompleted.forEach(element => {
            element.style.display = 'flex'; 
        });
    }
    else{
        if (complete.classList.contains("active")) {
            complete.classList.remove("active");   
        }
        incomplete.classList.add("active");
        console.log("complete");
        completed.forEach(element => {
            element.style.display = 'none';
        });
        incompleted.forEach(element => {
            element.style.display = 'flex'; 
        });
    }
});

function dayPassed(){
    const itemValue = localStorage.getItem('savedDate');
    if(itemValue !== null){
        const now = new Date();
        const savedDateString = localStorage.getItem('savedDate');
        const savedDate = new Date(savedDateString);
        const oneDay = 24 * 60 * 60 * 1000;
        const differenceInTime = now.getTime() - savedDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / oneDay);
        if (differenceInDays >= 1) {
            deleteAll();
            console.log('A real day has passed.');
        } else {
            console.log('Less than a day has passed.');
        }
    }
}

showData();