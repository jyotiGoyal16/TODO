(function(){
    var ul = document.getElementById('todolist'); //ul
var text1 = document.getElementById('todotext'); //input text box
//var completed = document.getElementsByClassName("completed");
//var pending = document.getElementsByClassName("pending");
var itemsArray = [];

//Add input value in todo list
text1.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        var myvalue = createLiElement(text1.value);
        addItemToStorage(myvalue);
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
        var store = localStorage.key(0);
        var b = JSON.parse(localStorage.getItem(store));
        for(i in b){
            createLiElement(b[i].data,b[i].state);
            addItemToStorage(b[i].data,b[i].state);
            pendingToComplete();
        }
    }

//changing tabs
var tabs = document.getElementsByClassName("state");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        if(this.id=="completedtodo"){
            var li = document.getElementsByTagName("li");
            for(var j = 0; j < li.length;j++){
                if(li[j].className == "pending"){
                    li[j].className += " hidden";
                    text1.className += " hidden";
                }
                else{
                    li[j].classList.remove("hidden");
                }
            }
        }
        else if(this.id=="pendingtodo"){
            var li = document.getElementsByTagName("li");
            for(var j = 0; j < li.length;j++){
                if(li[j].className == "completed"){
                    li[j].className += " hidden";
                    text1.className += " hidden";
                }
                else{
                    li[j].classList.remove("hidden");
                }
            } 
        }
        else{
            var li = document.getElementsByTagName('li');
            for(var j = 0; j < li.length;j++){
                li[j].classList.remove("hidden");
                text1.classList.remove("hidden");
            } 
        }
    });
  }

//function to chnage pending task to completed
var items = document.getElementsByClassName("itemcheck");
function pendingToComplete(){
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("change", function() {
                
                if(this.parentNode.className=="pending"){
                    this.parentNode.setAttribute("class", "completed");
                    var store = localStorage.key(0);
                    var r = JSON.parse(localStorage.getItem(store));
                    for(j in r){
                        if(j==i-1){
                            r[j].state = "completed";
                        }
                    }
                    localStorage.setItem('items', JSON.stringify(r));
                }
            });
        } 
    }

//storing values in localstorage
function addItemToStorage(valueparam, states = "pending"){
    if(localStorage.getItem('items') == null){
        itemsArray = [];
        itemsArray.push({'data':valueparam, 'state':states});
        localStorage.setItem('items', JSON.stringify(itemsArray));

    }else{
         itemsArray.push({'data':valueparam, 'state':states});
         localStorage.setItem('items', JSON.stringify(itemsArray));
    }
}

//function for creating li elements
function createLiElement(itemvalue, state="pending"){
    var li = document.createElement('li');//li
    
    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute("class", "itemcheck");
        
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(itemvalue));
    li.setAttribute("class", state);
    ul.appendChild(li);
   return li.innerText;
}
})();