function showQRCode(text) {

  
  var dotsize = 5;  // size of box drawn on canvas
  var padding = 10; // (white area around your QRCode)
  var black = "rgb(0,0,0)";
  var white = "rgb(255,255,255)";
  var QRCodeVersion = 15; // 1-40 see http://www.denso-wave.com/qrcode/qrgene2-e.html
  
  var canvas=document.createElement('canvas');
  var qrCanvasContext = canvas.getContext('2d');
  try {
    // QR Code Error Correction Capability 
    // Higher levels improves error correction capability while decreasing the amount of data QR Code size.
    // QRErrorCorrectLevel.L (5%) QRErrorCorrectLevel.M (15%) QRErrorCorrectLevel.Q (25%) QRErrorCorrectLevel.H (30%)
    // eg. L can survive approx 5% damage...etc.
    var qr = new QRCode(5, QRErrorCorrectLevel.L); 
    qr.addData(text);
    qr.make();
   }
  catch(err) {
    var errorChild = document.createElement("p");
    var errorMSG = document.createTextNode("QR Code FAIL! " + err);
    errorChild.appendChild(errorMSG);
    return errorChild;
  }
    
  var qrsize = qr.getModuleCount();
  canvas.setAttribute('height',(qrsize * dotsize) + padding);
  canvas.setAttribute('width',(qrsize * dotsize) + padding);
  var shiftForPadding = padding/2;
  if (canvas.getContext){
    for (var r = 0; r < qrsize; r++) {
      for (var c = 0; c < qrsize; c++) {
        if (qr.isDark(r, c))
          qrCanvasContext.fillStyle = black;  
        else
          qrCanvasContext.fillStyle = white;  
        qrCanvasContext.fillRect ((c*dotsize) +shiftForPadding,(r*dotsize) + shiftForPadding,dotsize,dotsize);   // x, y, w, h
      } 
    }
  }

  var imgElement = document.createElement("img");
  imgElement.src = canvas.toDataURL("image/png");

  return imgElement;
    
}

function updateQRCode(text) {

        var element = document.getElementById("qrcode");

        var bodyElement = document.body;
        if(element.lastChild)
          element.replaceChild(showQRCode(text), element.lastChild);
        else
          element.appendChild(showQRCode(text));

}

function CreateJson_parameter(){
  var return_Json = JSON.stringify({
      "url":location.hostname, "sessionName" : sessionName, "_location": _location, "location_parameter" : location_parameter});
  
  return return_Json;
}


jQuery(document).ready(function($) {
    jQuery("#configuration").click(function(){
      text = CreateJson_parameter();
      updateQRCode(text);
    });

    jQuery("#mobile-apk").click(function(){
      text = location.origin + location.pathname + "attachements/MinyRemote.apk";
      updateQRCode(text);
    });

    jQuery("#rase-qrcode").click(function(){
      jQuery("#qrcode").html(" ");
    });
});
  

