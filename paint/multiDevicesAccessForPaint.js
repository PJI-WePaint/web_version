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
      if (message.toUpperCase() == "CIRCLE") add_circle();
      else if (message.toUpperCase() == "RECTANGLE") add_rectangle();
      //else if (message.toUpperCase() == "LINE") addLine();
      else if (message.toUpperCase() == "ELLIPSE") add_ellipse();
      else return;
      this.resetCompassValues();
      this.resetAcceleroValues();
    }

    androphone.textRecognised = function(text) {
      if (text.toUpperCase() == "CIRCLE") add_circle();
      else if (text.toUpperCase() == "RECTANGLE") add_rectangle();
      else if (text.toUpperCase() == "LINE") addLine();
      else if (text.toUpperCase() == "ELLIPSE") addEllipse();
      else return;
      this.resetCompassValues();
    }


    androphone.resetCompassValues();
    androphone.resetAcceleroValues();

    // GET AN ADAPTER TO RFID READER
    //
    paint.createObject = function(nameObject) {
      if (nameObject.toUpperCase() == "CIRCLE") addCircle();
      else if (nameObject.toUpperCase() == "RECTANGLE") addRectangle();
      else return;
      this.resetCompassValues();
    }

  }
}