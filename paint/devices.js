function stringListEquals (){
  for (var i=0;i<arguments.length;i+=2)
  if (arguments[i+1]!=null && arguments[i].toUpperCase()!=arguments[i+1].toUpperCase())
    return false;
  return true;
}
Manager = function (session){
  wse.joinSession(session);
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
        if (stringListEquals(message.action,'color')) {
          var actionParams=message.actionParams;
          this.object.color(actionParams.code_color);
        }
        if (stringListEquals(message.action,'removeCurrent')) {
          var actionParams=message.actionParams;
          this.object.removeCurrent();
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
      //alert('error during receiving WSE message : '+message);
      console.log('error during receiving WSE message : ' + message);
      console.log(ex);
      console.trace();
    }
  }
  this.bus.addListener(listener);
}
Androphone.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  returnColor : function ( code_color , code_retour ){
    this.objMsg.action='returnColor';
    var actionParams = {};
    actionParams.code_color=code_color;
    actionParams.code_retour=code_retour;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  notification : function ( message ){
    this.objMsg.action='notification';
    var actionParams = {};
    actionParams.message=message;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
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
  color : function ( code_color ){
    alert('color');
  }
  ,
  removeCurrent : function (  ){
    alert('removeCurrent');
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
Paint = function (bus, location, locationParams)
{
  this.bus=bus;
  this.objMsg={};
  this.objMsg.location=location;
  this.objMsg.locationParams=locationParams;
  this.objMsg.object='Paint';
  var listener = {};
  listener.object=this;
  listener.newMessageReceive = function (message) {
    try{
      var objMsg=this.object.objMsg;
      if (stringListEquals(message.location, objMsg.location, message.locationParams, objMsg.locationParams, objMsg.object, message.object)){
        if (stringListEquals(message.action,'createObject')) {
          var actionParams=message.actionParams;
          this.object.createObject(actionParams.idObject , actionParams.typeObject);
        }
        if (stringListEquals(message.action,'removeObject')) {
          var actionParams=message.actionParams;
          this.object.removeObject(actionParams.idObject);
        }
      }
    }
    catch (ex) {
      //alert('error during receiving WSE message : '+message);
      console.log('error during receiving WSE message : ' + message);
      console.log(ex);
      console.trace();
    }
  }
  this.bus.addListener(listener);
}
Paint.prototype = {
  useless_butUsefulForGeneration : ''
  ,
  removeObjectServeur : function ( idObject ){
    this.objMsg.action='removeObject';
    var actionParams = {};
    actionParams.idObject=idObject;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  createObjectServeur : function ( idObject , typeObject ){
    this.objMsg.action='createObject';
    var actionParams = {};
    actionParams.idObject=idObject;
    actionParams.typeObject=typeObject;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  createObject : function ( idObject , typeObject ){
    alert('createObject');
  }
  ,
  removeObject : function ( idObject ){
    alert('removeObject');
  }
}
Manager.prototype['getPaint'] = function (location, locationParams){
  return new Paint (this.bus, location, locationParams);
}
