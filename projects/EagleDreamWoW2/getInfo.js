//api:  https://us.api.battle.net/wow/character/Dalaran/Regex?fields=appearance&locale=en_US&apikey=8neakgvt8krqfq8qcu7xdgk5uk6zuh2k

function search(){
    var nameValue = document.getElementById("name").value;
    var realmValue = document.getElementById("realm").value;
    validCharacter(nameValue, realmValue);
}//end search


//name = name of charcater
//realm = realm of charcater
function fetchDataStats(nameVal, realmVal){
    const url = 'https://us.api.blizzard.com/wow/character/'+realmVal+'/'+nameVal+'?fields=stats&locale=en_US&access_token=USbUdIsBkbvkoxNljx11yuCJpO8uME6g6e';
    fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        
        //Attributes
        var string= "<table>";
        string += makeStatRow("Strength", data.stats.str);
        string += makeStatRow("Agility", data.stats.agi);
        string += makeStatRow("Intillect", data.stats.int);
        string += makeStatRow("Stamina", data.stats.sta);
        $('#attributes').html(string+"</table>");
        
        //Defense
        var string= "<table>";
        string += makeStatRow("Armor", data.stats.armor);
        string += makeStatRow("Dodge", (data.stats.dodge).toFixed(2) + "%");
        string += makeStatRow("Parry", (data.stats.parry).toFixed(2) + "%");
        string += makeStatRow("Block", (data.stats.block).toFixed(2) + "%");
        $('#defense').html(string+"</table>");
        
        //Attack
        var string= "<table>";
        if (data.stats.mainHandDmgMin == -1 || data.stats.mainHandDmgMax == -1){
            string += makeStatRow("Damage", "--");
        }else{
            string += makeStatRow("Damage", data.stats.mainHandDmgMin+" - "+data.stats.mainHandDmgMax);
        }
        string += makeStatRow("Speed", data.stats.mainHandSpeed);
        if (data.stats.rangedDmgMin == -1 || data.stats.rangedDmgMax == -1){
            string += makeStatRow("Ranged Damage", "--");
        }else{
            string += makeStatRow("Ranged Damage", data.stats.rangedDmgMin+" - "+data.stats.rangedDmgMax);
        }
        string += makeStatRow("Ranged Speed", data.stats.rangedSpeed);
        $('#attack').html(string+"</table>");
        
        //Spell
        var string= "<table>";
        if(data.stats.mana5 == 0){
            string += makeStatRow("Mana Regen", "--");
        }else{
            string += makeStatRow("Mana Regen", data.stats.mana5);
        }
        $('#spell').html(string+"</table>");
        
        //Enchancements
        var string= "<table>";
        string += makeStatRow("Crit", (data.stats.crit).toFixed(2) + "%");
        string += makeStatRow("Haste", (data.stats.haste).toFixed(2) + "%");
        string += makeStatRow("Mastery", (data.stats.mastery).toFixed(2) + "%");
        string += makeStatRow("Leech", (data.stats.leech).toFixed(2) + "%");
        string += makeStatRow("Versatility", (data.stats.versatility).toFixed(2) + "%");
        $('#enchancements').html(string+"</table>");
        
        //Image
        var img= "https://render-us.worldofwarcraft.com/character/"+data.thumbnail;
        console.log(img);
        var string ="<img src='"+img+"' alt='Avatar Image Unavailble'/>";
         $('#profile').html(string);
        
        //info title
        $('#charname').html(data.name);
        $('#realmname').html(data.realm);
        
        //Info
        var string= "<table>";
        string += makeStatRow("Level", data.level);
        string += makeStatRow("Health", data.stats.health);
        string += makeStatRow("Power Type", data.stats.powerType);
        $('#info').html(string+"</table>");
        
        
      })
      .catch(function(error) {
        console.log(error);
    });
}//end fetchData

function fetchDataItems(nameVal, realmVal){
    const url = 'https://us.api.blizzard.com/wow/character/'+realmVal+'/'+nameVal+'?fields=items&locale=en_US&access_token=USbUdIsBkbvkoxNljx11yuCJpO8uME6g6e';
    fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        var string= "<table>";
        string += makeItemRow("Head", data.items.head);
        string += makeItemRow("Neck", data.items.neck);
        string += makeItemRow("Shoulder", data.items.shoulder);
        string += makeItemRow("Back", data.items.back);
        string += makeItemRow("Chest", data.items.chest);
        string += makeItemRow("Shirt", data.items.shirt);
        string += makeItemRow("Wrist", data.items.wrist);
        string += makeItemRow("Hands", data.items.hands);
        string += makeItemRow("Tabard", data.items.tabard); //Regex dosen't have one but I do
        string += makeItemRow("Waist", data.items.waist);
        string += makeItemRow("Legs", data.items.legs);
        string += makeItemRow("Feet", data.items.feet);
        string += makeItemRow("Finger 1", data.items.finger1);
        string += makeItemRow("Finger 2", data.items.finger2);
        string += makeItemRow("Trinket 1", data.items.trinket1);
        string += makeItemRow("Trinket 2", data.items.trinket2);
        string += makeItemRow("Main Hand", data.items.mainHand);
        $('#innerItems').html(string+"</table>");
      })
      .catch(function(error) {
        console.log(error);
    });
}//end fetchData

function makeItemRow(name, id){
    if(id == undefined){
        return "<tr><td>"+name+"</td><td>--</td></tr>";
    }else{
        return "<tr><td>"+name+"</td><td>"+id.name+"</td></tr>";
    }
}//end makeItemRow

function makeStatRow(name, id){
    if(id == undefined || id == -1){
        return "<tr><td class='stat-name'>"+name+"</td><td>--</td></tr>";
    }else{
        return "<tr><td class='stat-name'>"+name+"</td><td>"+id+"</td></tr>";
    }
}//end makeStatRow

function validCharacter(nameValue, realmValue){
    const url = 'https://us.api.blizzard.com/wow/character/'+realmValue+'/'+nameValue+'?fields=stats&locale=en_US&access_token=USbUdIsBkbvkoxNljx11yuCJpO8uME6g6e';
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) { 
            if(data.status == "nok"){
                document.getElementById("about").style.visibility = "hidden";
                document.getElementById("error").style.visibility = "visible";
                $('#error').html(data.reason);
            }else{
                document.getElementById("error").style.visibility = "hidden";
                fetchDataStats(nameValue, realmValue);
                fetchDataItems(nameValue, realmValue);
                document.getElementById("about").style.visibility = "visible";
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    
}//end validCharacter










