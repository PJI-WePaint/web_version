wse = 
{

	//server : "traceSession.php",

	id : new Date().valueOf(),

	counter : 0,
	
	listeners : new Array,

    server :  urls.wse.traceSession,
    
	cleanSession : function (sessionName) 
	{
		this.name = sessionName;
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'cleanSession', 
		        	sessionName : wse.name,
		        },
		        onSuccess: wse.cleanSessionCallBack,
		        onFailure: wse.cleanSessionCallBackError 
		    }
		);
	},
	cleanSessionCallBack : function (transport, json) 
	{
		wse.counter = 0;
	},
	
	cleanSessionCallBackError : function () {},
	
	getIpAddress : function (sessionName) 
	{
		this.name = sessionName;
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'ipServer', 
		        },
		        onSuccess: wse.ipAddressCallBack,
		        onFailure: wse.ipAddressBackError 
		    }
		);
	},
	ipAddressCallBack : function (transport, json) 
	{
		wse.ipAddress = json.ipAddress;
	},
	
	ipAddressBackError : function () {},

	joinSessionAndReplay : function(sessionName){
		this.name = sessionName;
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'joinSession', 
		        	sessionName : wse.name,
		        },
		        onSuccess: wse.joinSessionRePlayCallBack,
		        onFailure: wse.joinSessionCallBackError 
		    }
		);
	},

	joinSessionRePlayCallBack : function (transport, json){
		console.log(json);
		if(json.lastIndex < 0){
			wse.counter = json.lastIndex;
		}else{
			wse.counter = 0;
		}
		wse.beingUpdated();
	},
	
	joinSession : function (sessionName) 
	{
		this.name = sessionName;
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'joinSession', 
		        	sessionName : wse.name,
		        },
		        onSuccess: wse.joinSessionCallBack,
		        onFailure: wse.joinSessionCallBackError 
		    }
		);
	},
	
	joinSessionCallBack : function (transport, json) 
	{
		wse.counter = json.lastIndex;
		wse.beingUpdated();
	},
	
	joinCallBackError : function () {
		console.log("alllo");
	},
	
	sendMessage : function (mess) 
	{
	 	var m =  { source :  wse.id, message : mess };
	    
		tilt=Object.toJSON(m);
		
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'sendMessage', 
		        	sessionName : wse.name,
		        	message :  Object.toJSON(m)
		        },
		        onSuccess: wse.sendMessageCallBack,
		        onFailure: wse.sendMessageCallBackError 
		    }
		);
	},

	sendMessageCallBack : function (transport, json) { },

	sendMessageCallBackError : function () { },
	
	beingUpdated : function () 
	{
		console.log("je vais update !");
		new Ajax.Request(wse.server,
		    {
		        method:'post',
		        parameters: { 
		        	action : 'getMessages', 
		        	sessionName : wse.name,
		        	since : this.counter
		        },
		        onSuccess: wse.beingUpdated_CallBack,
		        onFailure: wse.beingUpdated_CallBackError 
		    }
		);
	},

	beingUpdated_CallBack : function (transport, json) 
	{
		console.log(json);
		if(transport == null || json == null)
		{
			wse.beingUpdated();
		}
		else
		{
			//alert(json.lastIndex + " : " + json.lastMessages);
			wse.counter=json.lastIndex;
			wse.processMessages(json.lastMessages);
			wse.beingUpdated();
		}
	},
	

	beingUpdated_CallBackError : function () 
	{
		alert("error on session.beingUpdated_CallBackError");
	},
	
	processMessages : function (messages) 
	{
		for (var i=0; i<messages.length; i++) 
		{
			this.processOneMessage (messages[i]);
		}
	},
	
	processOneMessage : function (messageNF) 
	{
		messageNF2 = messageNF;
		var message = messageNF.replace("\n","").replace(new RegExp('"',"g"),"'").evalJSON();
		message2 = message;

		if (message.source == wse.id)
			return;

		for (var i=0; i<this.listeners.length; i++) 
		{
			this.listeners[i].newMessageReceive
			(message.message);
		}
	},
	
	addListener : function (listener) 
	{
		this.listeners.push(listener);
	}

	
}

