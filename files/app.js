//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const option = document.querySelector(".filter-todo");

//event-listeners
todoButton.addEventListener("click" , addTodo);
todoList.addEventListener("click", checkDelete);
option.addEventListener("click" , filter);

//functions
function addTodo(event) {
    //preventing auto submission
    event.preventDefault();
    
    //create todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //create check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = ' <i class = "fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);

    //create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = ' <i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //add the newly created div to the original ul which is todo-list
    //if(todoInput.value != "")
    todoList.appendChild(todoDiv);

    //clear the input value
    todoInput.value = "";
}

function checkDelete(event){
    
    const item = event.target;

    if(item.classList[0] === "check-btn" ){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    if(item.classList[0] === "trash-btn" ){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend" , function(){
            todo.remove();
        });
        
    }
}

function filter(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.classList !== undefined){
            switch(event.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted": 
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;  
            }
        }
    });
}

// if (todo.classList !== undefined) is added because 
// if its not added the ul tag in html must have no space   this -> (<ul class="todo-list"> comment </ul>)
// but as we wrote some commented text it saves it as some empty text ul so we will get an error
// so to  solve this problem we can use that if statement 
// or we should write the ul without spaces like this -> (<ul class="todo-list"></ul>)