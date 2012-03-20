function getSessions(json){
  sessions = json.files
  var temp = sessions;
  var value;
  var i;
  var length = sessions.length;
  for(i=0;i<length;i++){
    value = sessions[i];
    if(value != undefined && !value.startsWith(beginNameSession)){
      delete temp[i]
    }
  }
  sessions = temp;
  display_sessions();
}

function display_sessions(){
  if(sessions != null){
    var content = jQuery("#dialog_sessions .dialog_content");
    if(noInformations){
      noInformations = false;
      jQuery("#dialog_sessions .dialog_content loader").html("");
    }
    // test function add 
    content.append("<div id='sessions'>");
    content = jQuery("#dialog_sessions .dialog_content #sessions");
    jQuery.each(sessions, function(key,value){
      if(value != undefined) content.append("<div class='session' data-name='"+value
                        +"' onClick='choose_session(this);'>"+value.split(beginNameSession)[1]+"</div>");
    });
    //content.append("</div>");
  }
}

function choose_session(div){
  // Do something awesome !!
  sessionName = jQuery(div).attr("data-name");
  startSession = true;
  beginSession();
  jQuery("#dialog_sessions").dialog('close');

}

function create_session(){
  name = jQuery("#text_session").val();
  sessionName = beginNameSession + name;
  startSession = true;
  beginSession();
  jQuery("#dialog_sessions").dialog('close');

}

jQuery(document).ready(function() {
  if(noInformations){
    jQuery("#dialog_sessions .dialog_content loader").append("<img src='images/ajax-loader.gif' />");
  }

  // Recup sessions!!
  fetch_data(urls.wse.getSessionsJson, null, getSessions, "POST");

  // display dialog
  jQuery("#dialog_sessions:ui-dialog").dialog("destroy");

  jQuery("#dialog_sessions").dialog({
    resizable: false,
    height: 200,
    modal: true,
    closeOnEscape: false
  });

  jQuery("#submit_session").click(create_session);


});
