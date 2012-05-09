// *********************
//
//    MINY
//
// *********************
// GET AN ADAPTER TO ANDROPHONE
//



function beginSession() {
  if (startSession) {
    show_name_session_and_user_name();
    manager = new Manager(sessionName);
    
    androphone = manager.getAndrophone(_location, "Xavier");
    //androphone = manager.getAndrophone(_location, "");
    paint = manager.getPaint("", "");

    get_last_id();
    wse.beingUpdated();
    androphone.beginMove = function(idUser){
      change_origin_by_user (idUser,0,0);
    }

    androphone.endMove = function(idUser){
      change_origin_by_user (idUser,0,0);
    }
  
    // COMPASS EVENTS
    //
    androphone.compass = function(idUser,x, y, z) {
      var origin = get_origin_by_user(idUser);
      var dx = x - origin.ox;
      var dy = y - origin.oy;
      id = findIndexByKeyValue(users,'id',idUser);
      if (users[id].id_object != null){
        move_object(users[id].id_object, dx*2, dy*2, false);
        change_origin_by_user (idUser,x,y);
      }
    }

    androphone.resetCompassValues = function() {
      this.compassX = 500;
    }

    // ACCELEROMETER EVENTS
    //
    androphone.accelerometer = function(idUser,x, y, z) {
      var origin = get_origin_by_user(idUser);
      var dx = x - origin.ox;
      var dy = y - origin.oy;
      id = findIndexByKeyValue(users,'id',idUser);
      if (users[id].id_object != null){
        move_object(users[id].id_object, dx*20, dy*20, false);
        change_origin_by_user (idUser,x,y);
      }
     
    }

    androphone.resetAcceleroValues = function() {
      this.acceleroX = 500;
    }

    // MESSAGE EVENTS
    //
    androphone.addObject = function(message, idUser) {
      add_element(message, null,false, idUser);
      //this.resetCompassValues();
      //this.resetAcceleroValues();
    }

    androphone.textRecognised = function(text, idUser) {
      add_element(text,null,false, idUser);
    }

    androphone.color = function(code_color, idUser){
      change_color_object(null,code_color, idUser);
    }

    androphone.removeCurrent = function(idUser){
      remove_object(null, null, false, idUser);
    }

    androphone.joinSessionPaint = function ( idUser ){
      new_user(idUser);
    }

    androphone.resetCompassValues();
    androphone.resetAcceleroValues();

    // GET AN ADAPTER TO RFID READER
    //
    paint.createObject = function(idObject, typeObject) {
      add_element(typeObject,idObject,false);
    }

    paint.removeObject = function(idObject){
      remove_object(null, idObject, false);
    }

    paint.changeCurrent = function(idObject, idUser){
      change_current_by_user(idObject,idUser);
    }

    paint.joinSession = function(idUser){
      console.log("join!!!");
      new_user(idUser);
    }

    paint.moveObject = function(dx, dy, idObject){
      move_object(idObject, dx, dy,false);
    }

    paint.quitSession = function (idUser){
      remove_user(idUser);
    }
  }
}