// chooser.js

/*iterativly and dynamically create and fill select statements based on the data.js */
function makeSelect(name, parent){
    array = data[name];
    
    //removes image, 4th level header and Get Liscence button if above selects are changed
    if(array === undefined){
        var kids = document.getElementById('centerdiv').children;
        var blength = kids.length - 1;
        if(kids[blength].tagName === 'IMG'){
            kids[blength].parentElement.removeChild(kids[blength]);     //image
            kids[blength-1].parentElement.removeChild(kids[blength-1]); //button 
            kids[blength-2].parentElement.removeChild(kids[blength-2]); //header
            
            life(name);
            return;
        }else{
            life(name);
            return;
        }// end if else
    }// end if
    
    //creates select based on data.js
    var s = document.createElement('select');
    s.setAttribute('id', 'select' + name);
    s.setAttribute('onchange', 'addChange(this.value, this.id)');
    
    for (var i = 1; i < array.length; i++) {
        var option = document.createElement('option');
        option.value = array[i];
        option.text = array[i];
        s.appendChild(option);
    } 
    
    //make header
    checkRepeat(parent);
    var hEle = makeHeader(array[0], name)
    
    //add select and header to center
    document.getElementById('centerdiv').appendChild(hEle);
    document.getElementById('centerdiv').appendChild(s);
    
}// end makeSelect

// Helper function for adding onchange to the select 
function addChange(value, parent){
    if (value === '---'){
        //do nothing
    }else{
        makeSelect(value, parent);
    }
}//end add change

//creates and returns an h2 element from text parameters
function makeHeader(text){
    var h = document.createElement('h2');
    h.setAttribute('id', 'h2' + name);
    var text = document.createTextNode(text);
    h.appendChild(text);
    return(h);
}//end makeHeader


/* When there is no other option found, call this function
 * creates image, liscence button and updates cookie
 */
function life(name){
    
    //make image and header
    var hEle = makeHeader('You have chosen: ' + name + '!');
    var imgEle = document.createElement('img');
    imgEle.setAttribute('src', 'Media/' + name + '.png');
    imgEle.setAttribute('id', name);
    imgEle.setAttribute('class', 'lifeimg');
    hEle.setAttribute('id', 'h2img');
    document.getElementById('centerdiv').appendChild(hEle);
    
    //make liscense button
    makelButton(name);
    
    document.getElementById('centerdiv').appendChild(imgEle);
    
    //update cookie
    makeCookie(name);
    
}//end life

//removes nodes if selects above them are changed
function checkRepeat(parent){
    kids = document.getElementById('centerdiv').children;
    for(var i = 0; i < kids.length; i++){
        if(kids[i].id === parent){ 
            var removenum = kids.length - i;
            for(var b = kids.length - 1; b > i; b--){
                kids[b].parentElement.removeChild(kids[b]); 
            }// end for
        }// end if     
    }//end for
}//end checkRepeat















