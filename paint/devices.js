function stringListEquals (){
  for (var i=0;i<arguments.length;i+=2)
  if (arguments[i+1]!=null && arguments[i].toUpperCase()!=arguments[i+1].toUpperCase())
    return false;
  return true;
}
Manager = function (session){
  wse.joinSession(session);
  console.log("joinsession");
  this.bus=wse;
}
Androphone = function (bus, location, locationParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='Androphone';
  var listener = {};
  listener.object=this;
  listener.newMessageReceive = function (message) {
    try{
      var objMsg=this.object.objMsg;
      if (stringListEquals(message.location, objMsg.location, message.locationParams, objMsg.locationParams, objMsg.object, message.object)){
        if (stringListEquals(message.action,'message')) {
          var actionParams=message.actionParams;
          this.object.message(actionParams.message);
        }
        if (stringListEquals(message.action,'textRecognised')) {
          var actionParams=message.actionParams;
          this.object.textRecognised(actionParams.text);
        }
        if (stringListEquals(message.action,'gpsLocation')) {
          var actionParams=message.actionParams;
          this.object.gpsLocation(actionParams.minutes , actionParams.seconds , actionParams.degrees);
        }
        if (stringListEquals(message.action,'qrCode')) {
          var actionParams=message.actionParams;
          this.object.qrCode(actionParams.content);
        }
        if (stringListEquals(message.action,'compass')) {
          var actionParams=message.actionParams;
          this.object.compass(actionParams.z , actionParams.y , actionParams.x);
        }
        if (stringListEquals(message.action,'light')) {
          var actionParams=message.actionParams;
          this.object.light(actionParams.lumens);
        }
        if (stringListEquals(message.action,'accelerometer')) {
          var actionParams=message.actionParams;
          this.object.accelerometer(actionParams.z , actionParams.y , actionParams.x);
        }
      }
    }
    catch (ex) {
      console.log(message);
      //alert('error during receiving WSE message : '+message); 
    }
  }
  this.bus.addListener(listener);
}
Androphone.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  vibrate : function ( position ){
    this.objMsg.action='vibrate';
    var actionParams = {};
    actionParams.position=position;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  message : function ( message ){
    alert('message');
  }
  ,
  textRecognised : function ( text ){
    alert('textRecognised');
  }
  ,
  gpsLocation : function ( minutes , seconds , degrees ){
    alert('gpsLocation');
  }
  ,
  qrCode : function ( content ){
    alert('qrCode');
  }
  ,
  compass : function ( z , y , x ){
    alert('compass');
  }
  ,
  light : function ( lumens ){
    alert('light');
  }
  ,
  accelerometer : function ( z , y , x ){
    alert('accelerometer');
  }
}
Manager.prototype['getAndrophone'] = function (location, locationParams){
  return new Androphone (this.bus, location, locationParams);
}
Camera = function (bus, location, locationParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='Camera';
}
Camera.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  goHome : function (  ){
    this.objMsg.action='goHome';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  moveDown : function (  ){
    this.objMsg.action='moveDown';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  moveRight : function (  ){
    this.objMsg.action='moveRight';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  moveUp : function (  ){
    this.objMsg.action='moveUp';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  moveLeft : function ( position ){
    this.objMsg.action='moveLeft';
    var actionParams = {};
    actionParams.position=position;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
}
Manager.prototype['getCamera'] = function (location, locationParams){
  return new Camera (this.bus, location, locationParams);
}
Epoc = function (bus, location, locationParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='Epoc';
  var listener = {};
  listener.object=this;
  listener.newMessageReceive = function (message) {
    try{
      var objMsg=this.object.objMsg;
      if (stringListEquals(message.location, objMsg.location, message.locationParams, objMsg.locationParams, objMsg.object, message.object)){
        if (stringListEquals(message.action,'brainStateReport')) {
          var actionParams=message.actionParams;
          this.object.brainStateReport(actionParams.excitement , actionParams.boredom , actionParams.meditation);
        }
      }
    }
    catch (ex) {
      console.log(message);
      //alert('error during receiving WSE message : '+message); 
    }
  }
  this.bus.addListener(listener);
}
Epoc.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  brainStateReport : function ( excitement , boredom , meditation ){
    alert('brainStateReport');
  }
}
Manager.prototype['getEpoc'] = function (location, locationParams){
  return new Epoc (this.bus, location, locationParams);
}
RFiD = function (bus, location, locationParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='RFiD';
  var listener = {};
  listener.object=this;
  listener.newMessageReceive = function (message) {
    try{
      var objMsg=this.object.objMsg;
      if (stringListEquals(message.location, objMsg.location, message.locationParams, objMsg.locationParams, objMsg.object, message.object)){
        if (stringListEquals(message.action,'pickUp')) {
          var actionParams=message.actionParams;
          this.object.pickUp(actionParams.stamp);
        }
        if (stringListEquals(message.action,'layDown')) {
          var actionParams=message.actionParams;
          this.object.layDown(actionParams.stamp);
        }
      }
    }
    catch (ex) {
      console.log(message);
      //alert('error during receiving WSE message : '+message); 
    }
  }
  this.bus.addListener(listener);
}
RFiD.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  pickUp : function ( stamp ){
    alert('pickUp');
  }
  ,
  layDown : function ( stamp ){
    alert('layDown');
  }
}
Manager.prototype['getRFiD'] = function (location, locationParams){
  return new RFiD (this.bus, location, locationParams);
}
X10 = function (bus, location, locationParams, objectParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='X10';
  this.objMsg.objectParams=objectParams;
}
X10.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  switchOff : function (  ){
    this.objMsg.action='switchOff';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  switchOn : function (  ){
    this.objMsg.action='switchOn';
    var actionParams = {};
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
}
Manager.prototype['getX10'] = function (location, locationParams, objectParams){
  return new X10 (this.bus, location, locationParams, objectParams);
}
