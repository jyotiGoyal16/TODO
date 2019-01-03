(function(){
    var ul = document.getElementById('todolist'); //ul
    var inputText = document.getElementById('todotext'); //input text box
    var itemsArray = [];

//Add input value in todo list on pressing enter and store the value in local storage
inputText.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        createLiElement(inputText.value);
        inputText.value= ''; 
    }
});


//When page loads, get values from localstorage and display
window.addEventListener("load", function(){
    var storeItem = localStorage.key(0);
        var tododata = JSON.parse(localStorage.getItem(storeItem));
        for(i in tododata){
            createLiElement(tododata[i].data,tododata[i].state);
        }
});

//changing tabs and displaying respective data
var tabs = document.getElementsByClassName("state");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        var litag = document.getElementsByTagName("li");
        
        if(this.id=="completedtodo"){
            
            for(var j = 0; j < litag.length;j++){
                if(litag[j].className == "pending"){
                    litag[j].className += " hidden";
                    inputText.className += " hidden";
                }
                else{
                    litag[j].classList.remove("hidden");
                }
            }
        }

        else if(this.id=="pendingtodo"){
            for(var j = 0; j < litag.length;j++){
                if(litag[j].className == "completed"){
                    litag[j].className += " hidden";
                    inputText.className += " hidden";
                }
                else{
                    litag[j].classList.remove("hidden");
                }
            } 
        }

        else{
            for(var j = 0; j < litag.length;j++){
                litag[j].classList.remove("hidden");
                inputText.classList.remove("hidden");
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
                var storeItem = localStorage.key(0);
                var storedata = JSON.parse(localStorage.getItem(storeItem));
                for(j in storedata){
                    if(j==i-1){
                        storedata[j].state = "completed";
                    }
                }
                localStorage.setItem('items', JSON.stringify(storedata));
            }
        });
    } 
}

//storing values in localstorage
function addItemToStorage(valueparam, states = "pending"){
    itemsArray.push({'data':valueparam, 'state':states});
    localStorage.setItem('items', JSON.stringify(itemsArray));
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
    addItemToStorage(itemvalue, state);
    pendingToComplete();
}
})();