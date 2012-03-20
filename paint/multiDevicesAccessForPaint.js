// *********************
//
//    MINY
//
// *********************

// GET AN ADAPTER TO ANDROPHONE
//
function beginSession(){
	if(startSession){
		console.log(sessionName);
		manager=new Manager(sessionName);

		androphone=manager.getAndrophone(_location,"Xavier");

		// QR CODE EVENTS
		//

		androphone.qrCode = function (content) {
			var color=content;
			if (shiftPressed) {
				current.__object.setStroke(color);
				current.__object.actualStroke=color;
			}
			else 
				current.__object.setFill(color);
			this.resetCompassValues()
		}

		// COMPASS EVENTS
		//

		androphone.compass = function (x,y,z) {
			if (this.compassX==500) {
				this.compassX=x;
				this.compassY=y;
			}
			var dx=x-this.compassX;
			var dy=y-this.compassY;
			current.__object.move(dx*2,dy*2);
			this.compassX=x;
			this.compassY=y;
		}

		androphone.resetCompassValues = function () { this.compassX=500; }

		// ACCELEROMETER EVENTS
		//

		androphone.accelerometer = function (x,y,z) {
			if (this.acceleroX==500) {
				this.acceleroX=x;
				this.acceleroY=y;
			}
			var dx=this.acceleroX-x;
			var dy=this.acceleroY-y;
			current.__object.move(dx*20,dy*20);
			this.acceleroX=x;
			this.acceleroY=y;
		}

		androphone.resetAcceleroValues = function () { this.acceleroX=500; }

		// MESSAGE EVENTS
		//

		androphone.message = function (message) {
			if (message.toUpperCase()=="CIRCLE") addCircle();
			else if (message.toUpperCase()=="RECTANGLE") addRectangle();
			else if (message.toUpperCase()=="LINE") addLine();
			else if (message.toUpperCase()=="ELLIPSE") addEllipse();
			else return;
			this.resetCompassValues();
		}

		androphone.textRecognised = function (text) {
			if (text.toUpperCase()=="CIRCLE") addCircle();
			else if (text.toUpperCase()=="RECTANGLE") addRectangle();
			else if (text.toUpperCase()=="LINE") addLine();
			else if (text.toUpperCase()=="ELLIPSE") addEllipse();
			else return;
			this.resetCompassValues();
		}


		androphone.resetCompassValues();
		androphone.resetAcceleroValues();

		// GET AN ADAPTER TO RFID READER
		//

		rfid=manager.getRFiD("NewYork","Xavier");
		rfid.layDown = function (stamp) {
			if (stamp=="GreyRabbit") addCircle();
			else if (stamp=="OrangeStamp") addEllipse();
			else if (stamp=="RedStamp") addRectangle();
			
		}

		rfid.pickUp = function (stamp) {
			
		}

	}
}