let ul = document.getElementById('todolist'); //ul
let text1 = document.getElementById('todotext'); //input text box
let completed = document.getElementsByClassName("completed");
let pending = document.getElementsByClassName("pending");
let tabs = document.getElementsByClassName("state");
let items = document.getElementsByClassName("itemcheck");
let itemsArray = [];
//Add input value in todo list
text1.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
       
        //add item to local storage
            addItemToStorage();
        
        //create li elements in ul
            limaker(text1.value);

    text1.value= ''; //clear input field
    }

    pendingToComplete();
});


//When page loads or refresh, get values from localstorage and display
window.addEventListener("load", getItemFromStorage);

function getItemFromStorage(){
        var a = localStorage.key(1);
        var b = JSON.parse(localStorage.getItem(a));
        var c = localStorage.key(0);
        var d = JSON.parse(localStorage.getItem(c));
        for(i in b){
            limaker2(b[i],d[i]);
            pendingToComplete();
        }
    }

//changing tabs

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
  }

//display all todos
function displayall(){
    document.getElementById("todotext").style.display="block";
    for(i=0;i<completed.length;i++){
        completed[i].style.display="block";
    }

    for(i=0;i<pending.length;i++){
        pending[i].style.display="block";
    }
}

//display pending todos
function displaypending(){
    document.getElementById("todotext").style.display="none";
    for(i=0;i<completed.length;i++){
        completed[i].style.display="none";
    }

    for(i=0;i<pending.length;i++){
        pending[i].style.display="block";
    }

}

//display completed todos
function displaycompleted(){
    document.getElementById("todotext").style.display="none";
    for(i=0;i<pending.length;i++){
        pending[i].style.display="none";
    }

    for(i=0;i<completed.length;i++){
        completed[i].style.display="block";
    }
}

//function to chnage pending task to completed
function pendingToComplete(){
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("change", function() {
            
            if(this.parentNode.className=="pending"){
                this.parentNode.setAttribute("class", "completed");
                let store = localStorage.key(0);
                r = JSON.parse(localStorage.getItem(store));
                for(j in r){
                    if(j==i-1){
                        r[j] = "completed";
                    }
                }
            localStorage.setItem('classes', JSON.stringify(r));
            }
        });
    } 
}

//storing values in localstorage
function addItemToStorage(){
    if(localStorage.getItem('items') == null){
        itemsArray = [];
        itemsArray.push(text1.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));

    }else{
         itemsArray = JSON.parse(localStorage.getItem('items'));
         itemsArray.push(text1.value);
         localStorage.setItem('items', JSON.stringify(itemsArray));
    }
}

//function for creating li elements
function limaker(itemvalue){
    let li = document.createElement('li');//li
    
    let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "itemcheck");

    
    li.appendChild(checkbox);

    let label= document.createElement('label');
    label.appendChild(document.createTextNode(itemvalue));
    li.setAttribute("class", "pending");
    if(localStorage.getItem('classes') == null){
        classArray = [];
        classArray.push(li.className);
        localStorage.setItem('classes', JSON.stringify(classArray));
    }else{
        classArray = JSON.parse(localStorage.getItem('classes'));
        classArray.push(li.className);
        localStorage.setItem('classes', JSON.stringify(classArray));
        }

    li.appendChild(label);
    ul.appendChild(li);
}

function limaker2(itemvalue,classvalue){
    let li = document.createElement('li');//li
    
    let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "itemcheck");

    
    li.appendChild(checkbox);

    let label= document.createElement('label');
    label.appendChild(document.createTextNode(itemvalue));
    li.setAttribute("class", classvalue);
    li.appendChild(label);
    ul.appendChild(li);
}