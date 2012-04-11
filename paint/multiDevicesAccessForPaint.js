// *********************
//
//    MINY
//
// *********************
// GET AN ADAPTER TO ANDROPHONE
//


function beginSession() {
  if (startSession) {
    console.log(sessionName);
    manager = new Manager(sessionName);

    androphone = manager.getAndrophone(_location, "Xavier");
    paint = manager.getPaint(null, null);

    // QR CODE EVENTS
    //
   androphone.qrCode = function(content) {
      var color = content;
      if (shiftPressed) {
        current.__object.setStroke(color);
        current.__object.actualStroke = color;
      } else current.__object.setFill(color);
      this.resetCompassValues();
    }
        // COMPASS EVENTS
    //
    androphone.compass = function(x, y, z) {
      if (this.compassX == 500) {
        this.compassX = x;
        this.compassY = y;
      }
      var dx = x - this.compassX;
      var dy = y - this.compassY;
      move_object(current,dx*2,dy*2);
      this.compassX = x;
      this.compassY = y;
    }

    androphone.resetCompassValues = function() {
      this.compassX = 500;
    }

    // ACCELEROMETER EVENTS
    //
    androphone.accelerometer = function(x, y, z) {
     if (this.acceleroX == 500) {
        this.acceleroX = x;
        this.acceleroY = y;
      }
      var dx = this.acceleroX - x;
      var dy = this.acceleroY - y;
       move_object(current,dx*20,dy*20);
      this.acceleroX = x;
      this.acceleroY = y;
      var dx =x;
      var dy = y;
     
    }

    androphone.resetAcceleroValues = function() {
      this.acceleroX = 500;
    }

    // MESSAGE EVENTS
    //
    androphone.message = function(message) {
      add_element(message,false);
      this.resetCompassValues();
      this.resetAcceleroValues();
    }

    androphone.textRecognised = function(text) {
      add_element(text,false);
      this.resetCompassValues();
    }


    androphone.resetCompassValues();
    androphone.resetAcceleroValues();

    // GET AN ADAPTER TO RFID READER
    //
    paint.createObject = function(nameObject) {
      add_element(nameObject,false);
    }

  }
}