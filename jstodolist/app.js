const form =document.querySelector("#todoAddForm");
const addtodo=document.querySelector(".list-group");
const addbuttontodo=document.querySelector("#todoAddButton");
const todoName=document.querySelector("#todoName");
const cardgroupitem = document.querySelectorAll(".card-body")[0];
const cardgroupitem2 = document.querySelectorAll(".card-body")[1];
const allclearbutton = document.querySelector("#todoClearButton");
const filterInput=document.querySelector("#todoSearch");

 
let todos =[];



function runEvents(){
addbuttontodo.addEventListener("click",addelement);
document.addEventListener("DOMContentLoaded",pageLoaded);
cardgroupitem2.addEventListener("click",removetodo);
allclearbutton.addEventListener("click",allclearevent);
filterInput.addEventListener("keyup",fitlermachine);

}
runEvents();
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
    addelementtodo(todo);
    });
}

function addelement(e)
{
const inputtext=todoName.value.trim();
if(inputtext==null||inputtext==""){

    showAlert("warning","Lütfen değer gir");

}
else{
    addelementtodo(inputtext);
    addelementlocalstorage(inputtext);
    showAlert("success","Todo eklendi");

    

}

    e.preventDefault();
   }
function addelementtodo(newelement){

const li =document.createElement("li");
const a =document.createElement("a");
const i =document.createElement("i");
li.className="list-group-item d-flex justify-content-between";
li.textContent=newelement;
a.href="#"
a.className="delete-item";
i.className="fa fa-remove";
a.appendChild(i);
li.appendChild(a);
addtodo.appendChild(li);
todoName.value="";
}

function addelementlocalstorage(newelement){
  checkTodosFromStorage();
  todos.push(newelement);
  localStorage.setItem("todos",JSON.stringify(todos));

}
function checkTodosFromStorage(){

    if( localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
    todos=JSON.parse(localStorage.getItem("todos"));
        } 
} 


function showAlert(type,message){
    const div =document.createElement("div");
    div.className="alert alert-"+type;
    div.textContent=message;
    cardgroupitem.appendChild(div); 
    
    setTimeout(function(){
         div.remove(); //elementi kaldırma

    },2500)
}

function removetodo(e){
if(e.target.className==="fa fa-remove")
{
    const todoli= e.target.parentElement.parentElement;
    todoli.remove();
    showAlert("success",e.target.parentElement.parentElement.textContent+" "+"Todo'su Silindi")
    removoTodoStorage(todoli.textContent);
    

}
}
function removoTodoStorage(removoTodotext){

    let index = todos.indexOf(removoTodotext);
     todos.splice(index,1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function allclearevent(){
 const todolistesi =document.querySelectorAll(".list-group-item");
 
 if(todolistesi.length>0){
    todolistesi.forEach(function(todo){
        todo.remove();
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Değer silindi");
    })
 }
 else{
    showAlert("warning","Değer bulunamadı");
 }

}

function fitlermachine(e){
const filterValue=e.target.value.toLowerCase().trim();
const todohepsi=document.querySelectorAll(".list-group-item");
if(todohepsi.length>0){
    todohepsi.forEach(function(todo){
        if  (todo.textContent.toLowerCase().trim().includes(filterValue)){
            todo.setAttribute("style","display : block");

        }
        else{
            todo.setAttribute("style","display : none !important");
        }

    });

}
else{
    showAlert("warning","Filtre için en az 1 todo olmalı");
}


    
}