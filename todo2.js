var ul = document.getElementById('todolist'); //ul
var text1 = document.getElementById('todotext'); //input text box
//var classArray = [];

//Add input value in todo list
text1.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
       
        //add item to local storage
            addItemToStorage();
        
        //create li elements in ul
            limaker(text1.value);

    document.getElementById('todotext').value= ''; //clear input field
    }

    pendingToComplete();
});


//When page loads or refresh, get values from localstorage and display
window.addEventListener("load", getItemFromStorage, false);

function getItemFromStorage(){
        var a = localStorage.key(1);
        var b = JSON.parse(localStorage.getItem(a));
        var c = localStorage.key(0);
        var d = JSON.parse(localStorage.getItem(c));
        for(i in b){
            limaker2(b[i],d[i]);
            pendingToComplete();
        }
        var litags = ul.getElementsByTagName("li");
        var items = document.getElementsByClassName("itemcheck");
        for(j=0;j<litags.length;j++){
            if(litags[j].className == "completed"){
                litags[j].appendChild(document.createTextNode("\u2713"));
                items[j].style.display="none";  
            }
        }
    }

//changing tabs

    var tabs = document.getElementsByClassName("state");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
  }

//display all todos
function displayall(){
    document.getElementById("todotext").style.display="block";
    var completed = document.getElementsByClassName("completed");
    var pending = document.getElementsByClassName("pending");
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
    var completed = document.getElementsByClassName("completed");
    var pending = document.getElementsByClassName("pending");
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
    var pending = document.getElementsByClassName("pending");
    var completed = document.getElementsByClassName("completed");
    for(i=0;i<pending.length;i++){
        pending[i].style.display="none";
    }

    for(i=0;i<completed.length;i++){
        completed[i].style.display="block";
    }
}

//function to chnage pending task to completed
function pendingToComplete(){
    var items = document.getElementsByClassName("itemcheck");
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("change", function() {
            
            if(this.parentNode.className=="pending"){
                this.parentNode.setAttribute("class", "completed");
                this.parentNode.appendChild(document.createTextNode("\u2713"));
                this.style.display="none";
                var store = localStorage.key(0);
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
        var itemsArray = [];
        itemsArray.push(text1.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));

    }else{
         var itemsArray = JSON.parse(localStorage.getItem('items'));
         itemsArray.push(text1.value);
         localStorage.setItem('items', JSON.stringify(itemsArray));
    }
}
//var classArray = [];
//function for creating li elements
function limaker(itemvalue){
    var li = document.createElement('li');//li
    
    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "itemcheck");

    
    li.appendChild(checkbox);

    var label= document.createElement('label');
    label.appendChild(document.createTextNode(itemvalue));
    li.setAttribute("class", "pending");
    if(localStorage.getItem('classes') == null){
        var classArray = [];
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
    var li = document.createElement('li');//li
    
    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "itemcheck");

    
    li.appendChild(checkbox);

    var label= document.createElement('label');
    label.appendChild(document.createTextNode(itemvalue));
    li.setAttribute("class", classvalue);
    li.appendChild(label);
    ul.appendChild(li);
}