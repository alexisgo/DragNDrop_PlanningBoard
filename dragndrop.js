/**
 * @author alexisgoldstein
 */
$('document').ready(init);

function init(){
    loadLocations();
    $('#item1, #item2').bind('dragstart', function(event){
        event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    });
    
    // bind the dragover event on the board sections
    $('#todo, #inprogress, #done').bind('dragover', function(event){
        event.preventDefault();
    });
    
    // bind the drop event on the board sections
    $('#todo, #inprogress, #done').bind('drop', function(event){
        var notecard = event.originalEvent.dataTransfer.getData("text/plain");
        event.target.appendChild(document.getElementById(notecard));
        event.preventDefault();
        saveLocations(event.target, notecard);
    });
}

function saveLocations(target, notecard){
    // save the locations of notecards after each drop event
    // grab the notecard via jQuery using ids
    var parentId = target.getAttribute('id');
    var key = notecard + "parent";
    localStorage[key] = parentId;
    // store its parent's id in localStorage

    // what key to use? 
    // hardcode to item1 and item2 for now?
}

function loadLocations(){
    // find the parent for item1 and item2
    var item1parent = localStorage['item1parent'];
    var item2parent = localStorage['item2parent'];
    
    // move them to the appropriate location on the page
    if (item1parent) {
        var parent1 = document.getElementById(item1parent);
        var notecard1 = document.getElementById('item1');
        parent1.appendChild(notecard1);
    }
    
    if (item2parent) {
        var parent2 = document.getElementById(item2parent);
        var notecard2 = document.getElementById('item2');
        parent2.appendChild(notecard2);
    }
}

