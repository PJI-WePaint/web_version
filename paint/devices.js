function stringListEquals (){
  for (var i=0;i<arguments.length;i+=2)
  if (arguments[i+1]!=null && arguments[i].toUpperCase()!=arguments[i+1].toUpperCase())
    return false;
  return true;
}
Manager = function (session){
  wse.joinSessionAndReplay(session);
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
        if (stringListEquals(message.action,'joinSessionPaint')) {
          var actionParams=message.actionParams;
          this.object.joinSessionPaint(actionParams.idUser);
        }
        if (stringListEquals(message.action,'textRecognised')) {
          var actionParams=message.actionParams;
          this.object.textRecognised(actionParams.text , actionParams.idUser);
        }
        if (stringListEquals(message.action,'color')) {
          var actionParams=message.actionParams;
          this.object.color(actionParams.code_color , actionParams.idUser);
        }
        if (stringListEquals(message.action,'removeCurrent')) {
          var actionParams=message.actionParams;
          this.object.removeCurrent(actionParams.idUser);
        }
        if (stringListEquals(message.action,'gpsLocation')) {
          var actionParams=message.actionParams;
          this.object.gpsLocation(actionParams.minutes , actionParams.seconds , actionParams.idUser , actionParams.degrees);
        }
        if (stringListEquals(message.action,'qrCode')) {
          var actionParams=message.actionParams;
          this.object.qrCode(actionParams.content , actionParams.idUser);
        }
        if (stringListEquals(message.action,'endMove')) {
          var actionParams=message.actionParams;
          this.object.endMove(actionParams.idUser);
        }
        if (stringListEquals(message.action,'beginMove')) {
          var actionParams=message.actionParams;
          this.object.beginMove(actionParams.idUser);
        }
        if (stringListEquals(message.action,'compass')) {
          var actionParams=message.actionParams;
          this.object.compass(actionParams.idUser , actionParams.z , actionParams.y , actionParams.x);
        }
        if (stringListEquals(message.action,'light')) {
          var actionParams=message.actionParams;
          this.object.light(actionParams.idUser , actionParams.lumens);
        }
        if (stringListEquals(message.action,'addObject')) {
          var actionParams=message.actionParams;
          this.object.addObject(actionParams.message , actionParams.idUser);
        }
        if (stringListEquals(message.action,'accelerometer')) {
          var actionParams=message.actionParams;
          this.object.accelerometer(actionParams.idUser , actionParams.z , actionParams.y , actionParams.x);
        }
      }
    }
    catch (ex) {
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
  joinSessionPaint : function ( idUser ){
    alert('joinSessionPaint');
  }
  ,
  textRecognised : function ( text , idUser ){
    alert('textRecognised');
  }
  ,
  color : function ( code_color , idUser ){
    alert('color');
  }
  ,
  removeCurrent : function ( idUser ){
    alert('removeCurrent');
  }
  ,
  gpsLocation : function ( minutes , seconds , idUser , degrees ){
    alert('gpsLocation');
  }
  ,
  qrCode : function ( content , idUser ){
    alert('qrCode');
  }
  ,
  endMove : function ( idUser ){
    alert('endMove');
  }
  ,
  beginMove : function ( idUser ){
    alert('beginMove');
  }
  ,
  compass : function ( idUser , z , y , x ){
    alert('compass');
  }
  ,
  light : function ( idUser , lumens ){
    alert('light');
  }
  ,
  addObject : function ( message , idUser ){
    alert('addObject');
  }
  ,
  accelerometer : function ( idUser , z , y , x ){
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
        if (stringListEquals(message.action,'moveObject')) {
          var actionParams=message.actionParams;
          this.object.moveObject(actionParams.dx , actionParams.dy , actionParams.idObject);
        }
        if (stringListEquals(message.action,'quitSession')) {
          var actionParams=message.actionParams;
          this.object.quitSession(actionParams.idUser);
        }
        if (stringListEquals(message.action,'changeCurrent')) {
          var actionParams=message.actionParams;
          this.object.changeCurrent(actionParams.idObject , actionParams.idUser);
        }
        if (stringListEquals(message.action,'createObject')) {
          var actionParams=message.actionParams;
          this.object.createObject(actionParams.idObject , actionParams.typeObject);
        }
        if (stringListEquals(message.action,'joinSession')) {
          var actionParams=message.actionParams;
          this.object.joinSession(actionParams.idUser);
        }
        if (stringListEquals(message.action,'removeObject')) {
          var actionParams=message.actionParams;
          this.object.removeObject(actionParams.idObject);
        }
      }
    }
    catch (ex) {
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
  moveObjectServeur : function ( dx , dy , idObject ){
    this.objMsg.action='moveObject';
    var actionParams = {};
    actionParams.dx=dx;
    actionParams.dy=dy;
    actionParams.idObject=idObject;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  quitSessionServeur : function ( idUser ){
    this.objMsg.action='quitSession';
    var actionParams = {};
    actionParams.idUser=idUser;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  changeCurrentServeur : function ( idObject , idUser ){
    this.objMsg.action='changeCurrent';
    var actionParams = {};
    actionParams.idObject=idObject;
    actionParams.idUser=idUser;
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
  joinSessionServeur : function ( idUser ){
    this.objMsg.action='joinSession';
    var actionParams = {};
    actionParams.idUser=idUser;
    this.objMsg.actionParams=actionParams;
    this.bus.sendMessage(this.objMsg);
  }
  ,
  moveObject : function ( dx , dy , idObject ){
    alert('moveObject');
  }
  ,
  quitSession : function ( idUser ){
    alert('quitSession');
  }
  ,
  changeCurrent : function ( idObject , idUser ){
    alert('changeCurrent');
  }
  ,
  createObject : function ( idObject , typeObject ){
    alert('createObject');
  }
  ,
  joinSession : function ( idUser ){
    alert('joinSession');
  }
  ,
  removeObject : function ( idObject ){
    alert('removeObject');
  }
}
Manager.prototype['getPaint'] = function (location, locationParams){
  return new Paint (this.bus, location, locationParams);
}
