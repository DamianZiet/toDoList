let arrTasks = [];
let arrTaskdoIt = [];
let editArr= []; 
let editButtonArr = [];
let doneButtonArr = [];
let btnRemoveArr = [];
let btnBackArr = [];
let indexClick = 0;

const task = document.getElementById('task');
const date = document.getElementById('date');
const time = document.getElementById('time');
const addNewTask = document.getElementById('addNewTask');
const bodyTable = document.getElementById('bodyTable');
const tableTaskDone = document.getElementById('tableTaskDone')
const container = document.querySelector('.container')
var curElement = document.activeElement;

function containerHeight(){
    const yourTask = document.querySelector('.yourTask').offsetHeight;
    const addTask = document.querySelector('.addTask').offsetHeight;
    const listTask = document.querySelector('.listTask').offsetHeight;
    const taskList = document.querySelector('.taskList').offsetHeight;
    const tableHeight =  table.offsetHeight;
    const listDone = document.querySelector('.listDone').offsetHeight;
    const taskListDone = document.querySelector('.taskListDone').offsetHeight;
    container.style.height = yourTask + addTask  + listTask + taskList +tableHeight+ listDone + taskListDone +50 +"px";
}
containerHeight()

function createTask(valueTask,valueDate,valueTime){
    indexClick++;
    newRow = bodyTable.insertRow(bodyTable.length);   
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3= newRow.insertCell(3);
    cell0.innerHTML =indexClick;
    cell1.innerHTML =valueTask;
    cell2.innerHTML =valueDate;
    cell3.innerHTML = valueTime;
    const editButton = document.createElement('button');
    const doneButton = document.createElement('button');
    editButton.className= 'editButton';
    editButton.textContent = 'Edytuj';
    newRow.appendChild(editButton);
    editButtonArr.push(editButton);
    doneButton.className= 'doneButton';
    doneButton.textContent = 'Zrobione';
    newRow.appendChild(doneButton);
    doneButtonArr.push(doneButton);
    arrTasks.push(newRow);
    bodyTable.textContent = '';
    arrTasks.forEach((task,index)=>{
        task.id =index;
        const taskValues = task.childNodes;
        taskValues.forEach(value=>value.setAttribute('data-key', index));
        bodyTable.appendChild(task);
        task.childNodes[0].innerHTML =++index;
    })
    if(indexClick%2===0){
        newRow.style.backgroundColor= `#ffff0099`;
        } else{
            newRow.style.backgroundColor= "#e9ff00";
        }
    const heigthNewRow = newRow.offsetHeight + 8
    container.style.height = container.offsetHeight +  heigthNewRow + "px";
    doneButtonArr.forEach(btn=>btn.addEventListener('click',doIts));
    editButtonArr.forEach(btn=>btn.addEventListener('click',edit));
}

function backTasks(){
    const index = this.dataset.key;
    arrTaskdoIt[index].children[4].remove();
    arrTaskdoIt[index].children[4].remove();
    const backTask=  arrTaskdoIt.splice(index,1);
    tableTaskDone.textContent = '';
    arrTaskdoIt.forEach((task,index)=>{ 
        task.id = index;
        task.childNodes.forEach(value=>value.setAttribute('data-key', index)); 
        tableTaskDone.appendChild(task);
        task.childNodes[0].innerHTML = ++index
    });
    createTask()
    container.style.height = container.offsetHeight -  newRow.offsetHeight - 10 + "px";
    cell1.innerHTML =backTask[0].childNodes[1].textContent;
    cell2.innerHTML =backTask[0].childNodes[2].textContent;
    cell3.innerHTML = backTask[0].childNodes[3].textContent;
}

function removeTask(){
    console.log('tak')
    const index = this.parentNode.id;
    this.parentNode.remove();
    arrTaskdoIt.splice(index,1)
    tableTaskDone.textContent = ''
    arrTaskdoIt.forEach((task,index)=>{
        task.id = index; 
        tableTaskDone.appendChild(task);
        task.childNodes[0].innerHTML = ++index
    })
    container.style.height = container.offsetHeight -  newRow.offsetHeight - 16 + "px";
}

function doIts() {
    const index = this.parentNode.id;
    this.parentNode.remove();
    const doneTask = arrTasks.splice(index,1);
    doneTask[0].childNodes[4].remove();
    bodyTable.textContent = '';
    indexClick=0;
    arrTasks.forEach((task,index)=>{
        task.id = index;
        task.childNodes.forEach(value=>value.setAttribute('data-key', index)); 
        bodyTable.appendChild(task);
        task.childNodes[0].innerHTML =++indexClick;
        if(indexClick%2===0){
        task.style.backgroundColor= `#ffff0099`;
        } else{
            task.style.backgroundColor= `#e9ff00`;
        }
    }) 
    arrTaskdoIt = arrTaskdoIt.concat(doneTask);
    const btnBack = document.createElement('button')
    const btnRemove = document.createElement('button');
    arrTaskdoIt.forEach((task,index)=> {
        this.remove();
        task.id = index;
        btnBack.className= 'editButton';
        btnBack.textContent = "Cofnij"
        task.appendChild(btnBack);
        btnBackArr.push(btnBack)
        btnRemove.className= 'removeButton';
        btnRemove.textContent = "usuń"
        task.appendChild(btnRemove);
        btnRemoveArr.push(btnRemove)
        if(index%2===0){
            task.style.backgroundColor= `#00ff00a1`;
            } else{
                task.style.backgroundColor= `#00fb00c2`;
            } 
            task.childNodes.forEach(value=>value.setAttribute('data-key', index)); 
            tableTaskDone.appendChild(task);
            task.childNodes[0].innerHTML =++index;
    })
    btnRemoveArr.forEach(btn=>btn.addEventListener('click',removeTask));
    btnBackArr.forEach(btn=>btn.addEventListener('click',backTasks));
}

let flag = false;
function edit(){
if(!flag){
    editButtonArr.forEach(btn=>btn.removeEventListener('click',edit));
    doneButtonArr.forEach(btn=>btn.removeEventListener('click',doIts));
    btnRemoveArr.forEach(btn=>btn.removeEventListener('click',removeTask));
    btnBackArr.forEach(btn=>btn.removeEventListener('click',backTasks));
    addNewTask.removeEventListener('click', addRow);
    const index = this.dataset.key;
    this.addEventListener('click',edit)
    const tr = document.getElementById(index)
    const trArr = [];
    trArr.push(tr)
    const tdAllTask = [...document.querySelectorAll(`td[data-key="${index}"]`)];
    const input1 = document.createElement('textarea');
    const input2 = document.createElement('textarea');
    const input3 = document.createElement('textarea');
    const text1 = trArr[0].childNodes[1].textContent;
    trArr[0].childNodes[1].textContent = '';
    input1.style.width = 100+"%";
    input1.style.height = tdAllTask[1].offsetHeight+'px';
    input1.value = text1;
    const text2 = trArr[0].childNodes[2].textContent;
    trArr[0].childNodes[2].textContent = '';
    input2.style.width = 50+"%";
    input2.style.height = 30+'px';
    input2.value = text2;
    const text3 = trArr[0].childNodes[3].textContent;
    trArr[0].childNodes[3].textContent = '';
    input3.style.width = 30+"%";
    input3.style.height = 30+'px';
    input3.value = text3;
    tdAllTask[1].appendChild(input1);
    tdAllTask[2].appendChild(input2)
    tdAllTask[3].appendChild(input3)
    const textAreas = [...document.querySelectorAll('textarea')];
    textAreas.forEach((text)=>{
    text.setAttribute('data-key',index)
    })
 
    flag = true;
}
else if(flag){

   
    const index = this.dataset.key
    const textAreas = [...document.querySelectorAll('textarea')];
    const textValue1=  textAreas[0].value
    textAreas[0].remove()
    arrTasks[index].childNodes[1].textContent =textValue1;
    const textValue2=  textAreas[1].value
    textAreas[1].remove()
    arrTasks[index].childNodes[2].textContent =textValue2
    const textValue3=  textAreas[2].value
    textAreas[2].remove()
    arrTasks[index].childNodes[3].textContent =textValue3;
    editButtonArr.forEach(btn=>btn.addEventListener('click',edit));
    doneButtonArr.forEach(btn=>btn.addEventListener('click',doIts));
    btnRemoveArr.forEach(btn=>btn.addEventListener('click',removeTask));
    btnBackArr.forEach(btn=>btn.addEventListener('click',backTasks));
    addNewTask.addEventListener('click', addRow);
    flag = false;
}
}

function addRow(e){
    e.preventDefault();
    const form = document.querySelector('.input_div');
    let valueTask= task.value;
    let valueDate = date.value;
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if(valueTask  === '' ||valueDate === ''|| valueTask==='') return alert('Wypełij wszystkie pola');
    if(date.value != '') {
        if(regs = date.value.match(re)) {
          if(regs[1] < 1 || regs[1] > 31) {
            alert("Złą data w miejscu dd " + ". Musi być pomiędzy 1, 31");
            form.date.focus();
            return false;
          }
          if(regs[2] < 01 || regs[2] > 12) {
            alert("Zła data w miejscu mm " + ". Miesiąc musi być pomiędzy 1 , 12");
            form.date.focus();
            return false;
          }
          if(regs[3] < 2020 || regs[3] > 2021) {
            alert("Zła data w miejscu rrrr " + ". Rok musi być pomiędzy 2020, a 2021");
            form.date.focus();
            return false;
          }
        } else {
          alert("Wypełnij poprawnie date: " +"dd/mm/rrrr: ");
          form.date.focus();
          return false;
        }
      }

    let valueTime = time.value;
   
    task.value= '';
    date.value = '';
    time.value = '';
    createTask(valueTask,valueDate,valueTime);
}
addNewTask.addEventListener('click', addRow);
