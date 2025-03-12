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

function deleteMe(id){
    console.log("delete")
    const taskListStr = localStorage.getItem("taskList")
    const taskList = JSON.parse(taskListStr);
    const index = taskList.findIndex((c)=> c.id === id)
    if(index != -1){
        taskList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));   
    }
    const idArrStr = localStorage.getItem("idArr")
    const idArr = JSON.parse(idArrStr);
    const idIndex = idArr.findIndex((c)=> c === id)
    if(idIndex != -1){
        idArr.splice(index, 1);
        localStorage.setItem("idArr", JSON.stringify(idArr));   
    }
    addToBoard(); 
}

function addToBoard(){
    DOM.board.innerHTML = ''; 
    const arr = localStorage.getItem("taskList");
    if(arr){
        const taskList = JSON.parse(arr);
        for (let index = 0; index < taskList.length; index++) {
            const task = taskList[index];
            const card = document.createElement("div");
            card.classList.add("task","taskBack", "fade_in", "d-flex", "flex-column")
            const headCard = document.createElement("div");
            headCard.classList.add("d-flex", "flex-row", "justify-content-between", "pe-0")
            const taskId = task.id;
            const idShow = document.createElement("p");
            idShow.innerText = taskId;
            headCard.append(idShow);
            const h5 = document.createElement("h5");
            h5.innerText = task.description;
            const dueDate = document.createElement("div");
            dueDate.classList.add("dueDate")
            const date = document.createElement("p");
            date.classList.add("fw-bold");
            date.innerText = task.date;
            const time = document.createElement("p");
            time.innerText = task.time;
            dueDate.append(date, time);
            card.addEventListener("mouseover", function(){
                let deleteBtn = card.querySelector("button");
                if(!deleteBtn){
                    deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("deleteBtn");
                    headCard.append(deleteBtn);
                    card.innerHTML = '';
                    card.append(headCard, h5, dueDate);
                    deleteBtn.innerHTML = `<i class="bi bi-x-square-fill"></i>`   
                }
                deleteBtn.addEventListener("click", function() {
                    deleteMe(taskId);
                });
            })
            card.addEventListener("mouseleave", function(){
                headCard.innerHTML = '';
                headCard.append(idShow);
                card.innerHTML = '';
                card.append(headCard, h5, dueDate); 
            })
            card.append(headCard, h5, dueDate);   
            DOM.board.append(card);   
            
        }
    }
}

function getId(){
    const idArrStr = localStorage.getItem("idArr");
    let idArr = '';
    let correntId = 0;
    if (idArrStr){
        idArr = JSON.parse(idArrStr);
        correntId = Math.floor(Math.random()*1000);
        if(idArr.includes(correntId) === 'true'){
            correntId = Math.floor(Math.random()*1000);
        }
        idArr.push(correntId);
        localStorage.setItem("idArr", JSON.stringify(idArr));
    }else{
        idArr = [];
        correntId = 978;
        idArr.push(correntId);
        localStorage.setItem("idArr", JSON.stringify(idArr));
    }
    return correntId;
}

function addToTaskList(){
    const task = {
        description: DOM.descriptionInput.value,
        date: DOM.dateInput.value,
        time: DOM.timeInput.value,
        id: getId()
    }
    console.log(task)
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