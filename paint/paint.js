var body=document.getElementById("body");
var shiftPressed = false;
function keyDown (event) {
	if (event.which==16)
		{ shiftPressed=true; }
		
}
function keyUp (event) {
	if (event.which==16)
		{ shiftPressed=false; }
}
document.addEventListener("keydown",keyDown,false);
document.addEventListener("keyup",keyUp,false);

// Construct HTML framework

var canevas = new Tableau (body,2,1);
canevas.setBorder(0);
canevas.setAlign("center");
canevas.setBackground("#D86956");
var leftCell= canevas.avoirLigneNumero(0).avoirCelluleNumero(0).balise;
canevas.avoirLigneNumero(0).avoirCelluleNumero(0).setBackground("#FFFFFF");
var rightCell= canevas.avoirLigneNumero(0).avoirCelluleNumero(1).balise;
rightCell.setAttribute("valign","top");
var tools = new Tableau(rightCell,1,4);
tools.setBorder(0);
tools.setBackground("#000000");

// Create SVG containers

svg=new Svg(leftCell,10,10,800,500);

for (var i=0;i<4;i++)
	tools.avoirLigneNumero(i).avoirCelluleNumero(0).setBackground("#FFFFFF");

var svgLine = new Svg(tools.avoirLigneNumero(0).avoirCelluleNumero(0).balise,0,0,50,50);
var svgRectangle = new Svg(tools.avoirLigneNumero(1).avoirCelluleNumero(0).balise,0,0,50,50);
var svgEllipse = new Svg(tools.avoirLigneNumero(2).avoirCelluleNumero(0).balise,0,0,50,50);
var svgCircle = new Svg(tools.avoirLigneNumero(3).avoirCelluleNumero(0).balise,0,0,50,50);

// Create LINE tool

var line=new Line(svgLine.node,5,5,40,40);
line.setStroke("black");
line.setStrokeWidth("2");

// Create RECTANGLE tool

var rectangle=new Rectangle(svgRectangle.node,"5","5","40","40");
rectangle.setStroke("black");
rectangle.setStrokeWidth("2");
rectangle.setFill("yellow");

// Create ELLIPSE tool

var ellipse=new Ellipse(svgEllipse.node,"25","25","10","20");
ellipse.setStroke("black");
ellipse.setStrokeWidth("2");
ellipse.setFill("green");

// Create CIRCLE tool

var circle=new Circle(svgCircle.node,"25","25","20");
circle.setStroke("blue");
circle.setStrokeWidth("2");
circle.setFill("brown");

//
// EVENTS FOR MOVE AND RESIZE

current=null;

function setCurrent(element) {
	resetCurrent();
	current=element;
	current.__object.setSelected();
	
}

function beginMove(event) {
	setCurrent(this);
	originX=event.pageX;
	originY=event.pageY;
	svg.node.addEventListener("mousemove",move,false);
	svg.node.addEventListener("mouseup",endMove,false);
	
}

function endMove() {
	svg.node.removeEventListener("mousemove",move,false);
	svg.node.removeEventListener("mouseup",endMove,false);	
}

function resetCurrent() {
	if (current!=null)
		current.__object.setUnselected();
	current=null;
}

function move (event) {
	var x=event.pageX;
	var y=event.pageY;
	current.__object.setLocation(x,y);
}

// FACTORY FUNCTIONS

function addLine() { 
	var line=new Line(svg.node,45,45,145,145);
	line.setStroke("black");
	line.setStrokeWidth("2");
	line.actualStroke="black";
	setCurrent(line.node);
	line.node.addEventListener("mousedown",beginMove,false);
}
function addRectangle() { 
	var rectangle=new Rectangle(svg.node,"5","5","100","100");
	rectangle.setStroke("black");
	rectangle.setStrokeWidth("2");
	rectangle.setFill("yellow");
	rectangle.actualStroke="black";
	setCurrent(rectangle.node);
	rectangle.node.addEventListener("mousedown",beginMove,false);
}

function addEllipse() { 
	var ellipse=new Ellipse(svg.node,"75","75","60","80");
	ellipse.setStroke("black");
	ellipse.setStrokeWidth("2");
	ellipse.setFill("green");
	ellipse.actualStroke="black";
	setCurrent(ellipse.node);
	ellipse.node.addEventListener("mousedown",beginMove,false);
}


function addCircle() { 
	var circle=new Circle(svg.node,"75","75","50");
	circle.setStroke("blue");
	circle.setStrokeWidth("2");
	circle.setFill("brown");
	circle.actualStroke="black";
	setCurrent(circle.node);
	circle.node.addEventListener("mousedown",beginMove,false);
}

// Links between tools and factory functions

svgLine.node.addEventListener("click",addLine, false);
svgRectangle.node.addEventListener("click",addRectangle, false);
svgEllipse.node.addEventListener("click",addEllipse, false);
svgCircle.node.addEventListener("click",addCircle, false);