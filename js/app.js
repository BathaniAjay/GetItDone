const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list =  document.querySelector("#list");
const input = document.querySelector("input");

const check ="fa-check-circle";
const unCheck ="fa-circle-thin";
const lineThrough = "lineThrough";

let List;
let id;
let data = localStorage.getItem("TODO");

if(data) {
  List = JSON.parse(data);
  id = List.length;
  loadList(List);
} else {
  List = [];
  id = 0;
}

function loadList(arr) {
  arr.forEach(function(item) {
    toDo(item.name, item.id,item.done,item.trash);
  });
}

clear.addEventListener("click",function(){

  localStorage.clear();
  location.reload();
});

localStorage.setItem("TODO",JSON.stringify(List));

const options = {weekday:"long", month:"short",day:"numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US",options);

function toDo(todo,id,done,trash) {

  if(trash){return;}

  const Done = done?check:unCheck;
  const Line = done?lineThrough:"";
  
  const item = `
        <li class="item">
        <i class="fa ${Done} co" job="complete" id="${id}"></i>
        <p class="text ${Line}">${todo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
  `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

input.addEventListener("keyup",function(event){
  if(event.keyCode == 13) {
    const value = input.value;
    if(value) {
      toDo(value,id,false,false);
      List.push({
        name:value,
        id:id,
        done:false,
        trash:false
      });
      localStorage.setItem("TODO",JSON.stringify(List));
      id++;
    }
    input.value= "";
  }
 

});
// toDo("Drink Coffe",1,false,true);

function completeToDo(element) {

  element.classList.toggle(check);
  element.classList.toggle(unCheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  List[element.id].done = List[element.id].done?false:true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}

list.addEventListener("click",function(event){

  const element = event.target;
  const job = element.attributes.job.value;

  if(job == "complete") {
    completeToDo(element);
  } else if(job == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO",JSON.stringify(List));
});
