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

        //create li elements in ul
            let myvalue = limaker(text1.value);

        //add item to local storage
            addItemToStorage(myvalue);

        //clear input field
            text1.value= ''; 
    }
    pendingToComplete();
});


//When page loads or refresh, get values from localstorage and display
window.addEventListener("load", function(){
    getItemFromStorage();
    //addItemToStorage();
});

function getItemFromStorage(){
        let store = localStorage.key(1);
        let b = JSON.parse(localStorage.getItem(store));
        for(i in b){
            limaker(b[i].data,b[i].state);
            addItemToStorage(b[i].data,b[i].state);
            pendingToComplete();
        }
    }

//changing tabs

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        console.log(this.id);
        if(this.id=="completedtodo"){
            console.log(this.innerText)
            let li = document.getElementsByTagName("li");
            for(let j = 0; j < li.length;j++){
                if(li[j].className == "pending"){
                    li[j].className += " hidden";
                }
                else{
                    li[j].classList.remove("hidden");
                }
            }
        }
        else if(this.id=="pendingtodo"){
            let li = document.getElementsByTagName("li");
            for(let j = 0; j < li.length;j++){
                if(li[j].className == "completed"){
                    li[j].className += " hidden";
                }
                else{
                    li[j].classList.remove("hidden");
                }
            } 
        }
        else{
            let li = document.getElementsByTagName('li');
            for(let j = 0; j < li.length;j++){
                li[j].classList.remove("hidden");
            } 
        }
    });
  }

//display all todos
// function displayall(){
//     document.getElementById("todotext").style.display="block";
//     for(i=0;i<completed.length;i++){
//         completed[i].style.display="block";
//     }

//     for(i=0;i<pending.length;i++){
//         pending[i].style.display="block";
//     }
// }

//display pending todos
// function displaypending(){
//     document.getElementById("todotext").style.display="none";
//     for(i=0;i<completed.length;i++){
//         completed[i].style.display="none";
//     }

//     for(i=0;i<pending.length;i++){
//         pending[i].style.display="block";
//     }

// }

//display completed todos
// function displaycompleted(){
//     document.getElementById("todotext").style.display="none";
//     for(i=0;i<pending.length;i++){
//         pending[i].style.display="none";
//     }

//     for(i=0;i<completed.length;i++){
//         completed[i].style.display="block";
//     }
// }

//function to chnage pending task to completed
function pendingToComplete(){
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("change", function() {
            
            if(this.parentNode.className=="pending"){
                this.parentNode.setAttribute("class", "completed");
                let store = localStorage.key(1);
                let r = JSON.parse(localStorage.getItem(store));
                for(j in r){
                    if(j==i){
                        r[j].state = "true";
                    }
                }
                localStorage.setItem('items', JSON.stringify(r));
            }
        });
    } 
}

//storing values in localstorage
function addItemToStorage(valueparam, states = "false"){
    if(localStorage.getItem('items') == null){
        itemsArray = [];
        itemsArray.push({'data':valueparam, 'state':states});
        localStorage.setItem('items', JSON.stringify(itemsArray));

    }else{
         //itemsArray = JSON.parse(localStorage.getItem('items'));
         itemsArray.push({'data':valueparam, 'state':states});
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
    li.appendChild(document.createTextNode(itemvalue));
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

    //li.appendChild(label);
    ul.appendChild(li);
   return li.innerText;
}