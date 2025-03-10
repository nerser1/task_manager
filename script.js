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
            const object = taskList[index];
            const card = document.createElement("div");
            card.classList.add("card", "fade_in")
            const h5 = document.createElement("h5");
            h5.innerText = object.description;
            const date = document.createElement("p");
            date.classList.add("fw-bold");
            date.innerText = object.date;
            const time = document.createElement("p");
            time.innerText = object.time;
            const taskId = object.id;
            card.addEventListener("mouseover", function(){
                let deleteBtn = card.querySelector("button");
                if(!deleteBtn){
                    deleteBtn = document.createElement("button");
                    card.innerHTML = '';
                    card.append(h5, deleteBtn, date, time);
                    deleteBtn.innerHTML = `<i class="bi bi-x"></i>`   
                }
                deleteBtn.addEventListener("click", function() {
                    deleteMe(taskId);
                });
            })
            card.addEventListener("mouseleave", function(){
                card.innerHTML = '';
                card.append(h5, date, time); 
            })
            card.append(h5, date, time);   
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