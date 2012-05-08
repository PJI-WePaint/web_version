var current_id;
var users = [];
function get_last_id(){
  var name = sessionName.split("_")[1]
  jQuery.getJSON("BDD/user.php",{action : "get_last_id", session: name},function(data){
    current_id = data.last_id + 1;
    create_current_user();
  });
}

function create_current_user(){
  var name = sessionName.split("_")[1]
  fetch_data("BDD/user.php", {action : "create", id: current_id, type: "PC", session: name},"GET", function(data){
    if(data.errors)
      current_id = data.new_id;
    paint.joinSessionServeur(current_id);
    users.push({id: current_id, id_object: null});
  });
}

function new_user(idUser){
  users.push({id: idUser, id_object : null});
}


function change_current_by_user(idObject, idUser){
  users.filter(function (user) { 
    if(user.id == idUser){
      user.id_object = idObject
    }
  });
}
function get_id_object_by_user(id_user){
  var id_object;
  id = findIndexByKeyValue(users,'id',id_user);
  return users[id]["id_object"];

}

function remove_user(id_user){
 id = findIndexByKeyValue(users,'id',id_user);
 users.splice(id,1);
}
