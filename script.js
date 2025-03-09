console.log("script start")

const DOM = {
    descriptionInput: null,
    dateInput: null,
    timeInput: null,
    cleanBtn: null,
    AddTaskBtn: null,
    board: null

}

DOM.descriptionInput = document.getElementById("description");
DOM.dateInput = document.getElementById("date");
DOM.timeInput = document.getElementById("time");
DOM.cleanBtn = document.getElementById("cleanBtn");
DOM.AddTaskBtn = document.getElementById("addTaskBtn");
DOM.board = document.getElementById("board");

function cleanForm(){
    DOM.descriptionInput.value = '';
    DOM.dateInput.value = '';
    DOM.timeInput.value = '';    
}

function addToBoard(){
    DOM.board.innerHTML = ''; 
    const arr = localStorage.getItem("taskList");
    if(arr){
        const taskList = JSON.parse(arr);
        for (let index = 0; index < taskList.length; index++) {
            const object = taskList[index];
            const card = document.createElement("div");
            card.classList.add("card")
            const h3 = document.createElement("h3");
            h3.innerText = object.description;
            const date = document.createElement("h5");
            date.innerText = object.date;
            const time = document.createElement("h5");
            time.innerText = object.time;
            card.append(h3, date, time);   
            DOM.board.append(card);    
        }
    }
}

function addToTaskList(){
    const task = {
        description: DOM.descriptionInput.value,
        date: DOM.dateInput.value,
        time: DOM.timeInput.value
    }
    const taskListStr = localStorage.getItem("taskList");
    if(taskListStr){
        const taskList = JSON.parse(taskListStr);
        taskList.push(task);
        localStorage.setItem("taskList", JSON.stringify(taskList))
    }else{
        const taskList = [];
        taskList.push(task);
        localStorage.setItem("taskList", JSON.stringify(taskList))
    }
    addToBoard();
}

function init(){

    addToBoard();

    DOM.cleanBtn.addEventListener("click", function(){
        cleanForm();
    })

    DOM.AddTaskBtn.addEventListener("click", function(){
        if(DOM.descriptionInput.value && DOM.dateInput.value && DOM.timeInput.value){
            addToTaskList()
        }else{
            alert("one or more inputs is empty, please insert all the form")
        }
        cleanForm();
    })
}

init()