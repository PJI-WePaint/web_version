createAndAddHtmlElement = function (tagName,parentNode) {
    var element=document.createElement(tagName);
	parentNode.appendChild(element)
    if (arguments.length>2) {
    	for (i=2;i<arguments.length;i+=2) {
        	element.setAttribute(arguments[i],arguments[i+1]);
        }
    }
    return element;
};

addTextToHtmlElement = function (element, text) {
	return element.appendChild(document.createTextNode(text));
};

addBRToHtmlElement = function (element) {
	return element.appendChild(document.createElement("br"));
};

insertEmptyLinetoHtmlElement = function (element) {
	addBRToHtmlElement(element);
	addBRToHtmlElement(element);
}
HtmlTable = function (nbLines,nbColumns) {
		this.nbLines=nbLines;
		this.nbColumns=nbColumns;
		this.table = document.createElement ("table");
		this.cells=new Array;
		for (var l=0;l<nbLines;l++) {
			var line=this.table.insertRow(l);
			this.cells[l]=new Array;	
			for (var c=0;c<nbColumns;c++) {
				this.cells[l][c]=line.insertCell(c);
				this.cells[l][c].bgColor="white";
				this.cells[l][c].align="center";
				this.cells[l][c].setAttribute("valign","top");
				this.cells[l][c].setAttribute("style","font-family: arial, helvetica, sans-serif;padding:0.25em;");
			}
		}
		this.table.cellSpacing=1;
		this.table.cellPadding=0;
		this.table.border=0;
		//table.width="300";
		this.table.bgColor="black";
		this.table.align="center";
	}
	
HtmlTable.prototype = {
	setBackgroundColor : function (bgColor) {
		for (var l=0;l<this.nbLines;l++) 
			for (var c=0;c<this.nbColumns;c++) 
				this.cells[l][c].bgColor=bgColor;
	},
	
	setBorderColor : function (borderColor) {
		this.table.bgColor=borderColor;
	},
	
	createHead : function (bgColor) {
		this.head=this.table.createTHead().insertRow(0);
		this.heads=new Array;
		for (var c=0;c<this.nbColumns;c++) {
			this.heads[c]=this.head.insertCell(c);
			this.heads[c].setAttribute("style"," color:black; font-family: arial, helvetica, sans-serif;");
			this.heads[c].bgColor=bgColor;
		}
	},
	
	setText : function (x,y,text) {
		if (this.cells[y][x].hasChildNodes()) 
			this.cells[y][x].removeChild(this.cells[y][x].firstChild);
		this.cells[y][x].appendChild(document.createTextNode(text));
	},
	
	getCell : function (x,y) {
		return this.cells[y][x];
	},
	
	setHead : function (x,text) {
		if (this.heads[x].hasChildNodes()) 
			this.heads[x].removeChild(this.heads[x].firstChild);
		this.heads[x].appendChild(document.createTextNode(text));
	}
	
}

function HtmlTableForAList ( list, title) {
	var table = new HtmlTable (list.length, 2) ;
	table.createHead("yellow");
	table.setHead(0,title);
	for (var i=0;i<list.length;i++)
		table.setText(0,i,list[i]+"");
	return table;
}

function HtmlTableForAnObject (object) {
	var len=0;
	for (var i in object) len++;
	
	var table = new HtmlTable (len+1,2) ;
	table.createHead("yellow");
	table.setHead(0,"Property");
	table.setHead(1,"Value");
	var i=0;
	for (var pty in object) {
		table.setText(0,i,pty);
		table.setText(1,i,object[pty]);
		i++;
	}
	return table;
}

function HtmlVerticalTableForAnObject (object) {
	var len=0;
	for (var i in object) len++;
	
	var table = new HtmlTable (1,2*(len)) ;
	var i=0;
	for (var pty in object) {
		table.setText(i,0,pty);
		table.getCell(i,0).setAttribute("bgColor","yellow");
		table.setText(i+1,0,object[pty]);
		i+=2;
	}
	return table;
}