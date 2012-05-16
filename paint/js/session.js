var timeoutGetSession;
function getSessions(json) {
  if (!startSession){
    sessions = json.files;
    var temp = sessions;
    var value;
    var i;
    var length = sessions.length;
    for (i = 0; i < length; i++) {
      value = sessions[i];
      if (value != undefined && !value.startsWith(beginNameSession)) {
        delete temp[i];
      }
    }
    sessions = temp;
    display_sessions();
    timeoutGetSession = setTimeout("fetch_data(urls.wse.getSessionsJson, null,\"POST\", getSessions)","1000");
  }else{
    clearTimeout(timeoutGetSession);
  }
}

function display_sessions() {
  if (sessions != null) {
    var content = jQuery("#dialog_sessions .dialog_content");
    if (noInformations) {
      noInformations = false;
      jQuery("#dialog_sessions .dialog_content loader").html("");
    }
        jQuery("#dialog_sessions .dialog_content").html("");
        // test function add 
        content.append("<div id='sessions'>");
        content = jQuery("#dialog_sessions .dialog_content #sessions");
        jQuery.each(sessions, function(key, value) {
          if (value != undefined) content.append("<div class='session' data-name='" + value + "' onClick='choose_session(this);'>" + value.split(beginNameSession)[1] + "</div>");
        });
        //content.append("</div>");
      }
    }

    function choose_session(div) {
    sessionName = jQuery(div).attr("data-name");
    startSession = true;
    beginSession();
    jQuery("#dialog_sessions").dialog('close');

  }

  function create_session() {
    name = jQuery("#text_session").val();
    sessionName = beginNameSession + name;
    createSession = true;
    startSession = true;
    beginSession();
    jQuery("#dialog_sessions").dialog('close');

  }

  function test_session() {
    if (!startSession) {
      alert("You need to choose sessions");
      jQuery("#dialog_sessions:ui-dialog").dialog("destroy");
      jQuery("#dialog_sessions").dialog({
        resizable: false,
        modal: true,
        closeOnEscape: false,
        close: function(event, ui) {
          test_session();
        }
      });
    }
  }

  function show_name_session_and_user_name() {
    var name = sessionName.split("_")[1];
    jQuery("#link_qrcodes").prepend("<div class=\"item-menu\" id=\"session-name\"><span id=\"session-name\">Name session: " + name + "</span></div>");
  }

  jQuery(document).ready(function() {
    if (noInformations) {
      jQuery("#dialog_sessions .dialog_content .loader").append("<img src='images/ajax-loader.gif' />");
    };
    // Recup sessions!!
    timeoutGetSession = setTimeout("fetch_data(urls.wse.getSessionsJson, null,\"POST\", getSessions)","1000");

    // display dialog
    jQuery("#dialog_sessions:ui-dialog").dialog("destroy");

    jQuery("#dialog_sessions").dialog({
      resizable: false,
      modal: true,
      closeOnEscape: false,
      close: function(event, ui) {
        test_session();
      }
    });

    jQuery("#submit_session").click(create_session);

    jQuery("#dialog_sessions").dialog({

    });

  });