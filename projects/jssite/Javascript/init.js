//init.js


//function called onbody load
function init(){
    
    //make title
    var h = document.createElement('h1');
    h.setAttribute('id', 'title');
    var text = document.createTextNode(first);
    h.appendChild(text);
    document.getElementsByTagName('body')[0].appendChild(h);
    
    //make sidebar
    var sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar')
    document.getElementsByTagName('body')[0].appendChild(sidebar);
    
    
    //make restart, placed in sidebar
    makeStartOver();
    
    //make form, placed in sidebar
    makeForm();
    
    
    //make cookies and loacalStorage, placed in sidebar
    makeToday();
    makelTab();
    

    //make center
    var centerdiv = document.createElement('div');
    centerdiv.setAttribute('id', 'centerdiv');
    document.getElementsByTagName('body')[0].appendChild(centerdiv);

    
    //make choices, placed in center
    makeSelect(first);

}

//creates the reset button, clears all selects except the first one
function makeStartOver(){
    var div = document.createElement('div');
    div.setAttribute('id', 'restartdiv');
    
    var button = document.createElement('button');
    button.setAttribute('type', "button");
    button.setAttribute('onclick', "checkRepeat('select' + first)");
    makeTextNode("Restart", button)
    div.appendChild(button);
    document.getElementById('sidebar').appendChild(div);     
}

//creates form elements, name and village
function makeForm(){
    var formEle = document.createElement('form');
    formEle.setAttribute('onsubmit', "submitForm()");
    formEle.setAttribute('onmouseover', 'grow(this)');
    formEle.setAttribute('onmouseout', 'shrink(this)');
    makeTextNode('Name: ', formEle);
    makeInput("text", "name", "Lauren", formEle);
    formEle.appendChild(document.createElement('br')); //for sanity
    makeTextNode('Village: ', formEle);
    makeInput("text", "village", "Castele", formEle);
    formEle.appendChild(document.createElement('br')); //for sanity
    
    //make submit button
    var iEle = document.createElement('input');
    iEle.setAttribute('type', "submit");
    iEle.setAttribute('value', "Send");
    iEle.setAttribute('id', "Send");
    
    
    var div2 = document.createElement('div');
    div2.setAttribute('id', 'sendDiv');
    div2.appendChild(iEle);
    formEle.appendChild(div2);
    
    
    document.getElementById('sidebar').appendChild(formEle);
}

//function called when Send button is clicked, creates alert with info
function submitForm(){
    var array = document.getElementsByTagName('input');
    var name = array[0].value;
    var village = array[1].value;
    var curr = GetCookie('today');
    var lis = localStorage.getItem('license')
    
    console.log(name + ", " + village);
    
    if(curr === null){
        curr = "nobody";
    }
    if(lis === null){
        lis = "apprentice";
    }
    if(name === ""){
        name = "Some dude";
    }
    if(village == ""){
        village = "nowhere";
    }
    
    
    alert(name + " from " + village + " is currently is a " 
          + curr + " and has a license to be a " + lis);  
}

//makes a textnode and appends it to another node (I got tired of writting this over and over)
function makeTextNode(text, formEle){
    var textN = document.createTextNode(text);
    formEle.appendChild(textN);
}

//makes an input element and appends it to a node
function makeInput(type, name, value, Ele){
    var iEle = document.createElement('input');
    iEle.setAttribute('type', type);
    iEle.setAttribute('name', name);
    iEle.setAttribute('value', value);
    Ele.appendChild(iEle);
}

//creates cookie tab
function makeToday(){
    //if a cookie does not exist, the user has NOT been here before
    var cookiediv = document.createElement('div');
    cookiediv.setAttribute('id', 'cookiediv');
    cookiediv.setAttribute('onmouseover', 'grow(this)');
    cookiediv.setAttribute('onmouseout', 'shrink(this)');
		if( GetCookie('today') == null){	
			makeTextNode("You have no life.", cookiediv);
		}else{
            var lifeToday = GetCookie('today');
            makeTextNode("Today you have been: ", cookiediv);
    
            var div2 = document.createElement('div');
            div2.setAttribute('id', 'textcdiv');
            makeTextNode(lifeToday, div2);
            cookiediv.appendChild(div2);
            
        }//end if else
    

    //if tab already exists replace it with a new one
    if(document.getElementById('cookiediv') === null){
        document.getElementById('sidebar').appendChild(cookiediv);
    }else{
        document.getElementById('cookiediv').parentNode.replaceChild(cookiediv, document.getElementById('cookiediv'));
    }
   
}//end makeToday

//sets the cookie called today with current life, expires in 24hrs
function makeCookie(name){
    SetCookie('today', name, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    makeToday();
}

//make the Get License button
function makelButton(name){
    var button = document.createElement('button');
    button.setAttribute('type', "button");
    button.setAttribute('onclick', 'lbtnclick("'+name+'")');
    button.setAttribute('id', "Lbutton");
    makeTextNode("Get License", button)
    
    var div2 = document.createElement('div');
    div2.setAttribute('id', 'lBtnDiv');
    div2.appendChild(button);
    
    document.getElementById('centerdiv').appendChild(div2);
}//end makelButton


//function called when Get Liscense is clicked, makes new liscense tab and updates localStorage
function lbtnclick(name){
    localStorage.setItem('license', name);
    var div = document.createElement('div');
    div.setAttribute('id', 'ldiv');
    div.setAttribute('onmouseover', 'grow(this)');
    div.setAttribute('onmouseout', 'shrink(this)');
    makeTextNode("You have a license for: ", div);
    
    var div2 = document.createElement('div');
    div2.setAttribute('id', 'textldiv');
    makeTextNode(name, div2);
    div.appendChild(div2);
    
    document.getElementById('ldiv').parentNode.replaceChild(div, document.getElementById('ldiv'));
}//end lbtnclick


//makes the liscense tab
function makelTab(){
    var ldiv = document.createElement('div');
    ldiv.setAttribute('id', 'ldiv');
    ldiv.setAttribute('onmouseover', 'grow(this)');
    ldiv.setAttribute('onmouseout', 'shrink(this)');
	if(typeof(Storage) != "undefined"){
		if(localStorage.getItem('license') === null || localStorage.getItem('license') == "undefined"){	
			makeTextNode("You have no licenses.", ldiv);
		}else{
            makeTextNode("You have a license for: ", ldiv);
            
            var div2 = document.createElement('div');
            div2.setAttribute('id', 'textldiv');
            makeTextNode(localStorage.getItem('license'), div2);
            ldiv.appendChild(div2);
            
        }
	}
    document.getElementById('sidebar').appendChild(ldiv);  
}//end makelTab


//functions to animate sidebar divs
function grow(div){
    div.style.transition = "all .2s ease-in-out";
    div.style.transform = "scale(1.1)";
}
function shrink(div){
    div.style.transition = "all .2s ease-in-out";
    div.style.transform = "scale(1)";
}



