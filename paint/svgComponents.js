window.SVG_NS = "http://www.w3.org/2000/svg";

function generateSetFunction (container, label, attributeName) {
	var implementation=container+".set"+label+" = function (value) { this.node.setAttribute('"+attributeName+"',value); };";
	implementation+=container+".get"+label+" = function (value) { return this.node.getAttribute('"+attributeName+"'); };";
	eval(implementation);
}

function generateSetFunctions (container) {
	for (var i=1;i<arguments.length;i+=2) 
		generateSetFunction (container, arguments[i], arguments[i+1]);
}

function generateXmlClass (className, tagName, constructorParameters, attributes, otherStuff) {
	var implem=className+" = function (svg_container";
	for (var i=0;i<constructorParameters.length;i+=2)
		implem+=","+constructorParameters[i+1];
	implem+=") { \n";
	implem+="this.node=document.createElementNS(SVG_NS,'"+tagName+"');\n";
	implem+="this.node.__object=this;\n";
	implem+="svg_container.appendChild(this.node);\n";
	for (var i=0;i<constructorParameters.length;i+=2)
		implem+="this.set"+constructorParameters[i]+"("+constructorParameters[i+1]+");\n";
	implem+=otherStuff;
	implem+="}\n";
	implem+=className+".prototype = {};";
	eval(implem);
	var tab_tempo=[className+".prototype"];
	generateSetFunctions.apply (null,tab_tempo.concat(attributes));
}

var svgSpecs = ["X","x","Y","y","Width","width","Height","height"];
var lineSpecs = ["X1", "x1", "Y1", "y1", "X2", "x2", "Y2", "y2"];
var rectangleSpecs = ["X","x","Y","y","Width","width","Height","height"];
var ellipseSpecs = ["Cx","cx","Cy","cy","Rx","rx","Ry","ry"];
var circleSpecs = ["Cx","cx","Cy","cy","R","r"];

var paintSpecs = ["Stroke", "stroke", "StrokeWidth", "stroke-width", "Fill", "fill"];

generateXmlClass ("Svg", "svg", svgSpecs, svgSpecs, "");
generateXmlClass ("Line", "line", lineSpecs, lineSpecs.concat(paintSpecs), "");
generateXmlClass ("Rectangle", "rect", rectangleSpecs, rectangleSpecs.concat(paintSpecs), "");
generateXmlClass ("Ellipse", "ellipse", ellipseSpecs, ellipseSpecs.concat(paintSpecs), "");
generateXmlClass ("Circle", "circle", circleSpecs, circleSpecs.concat(paintSpecs), "");

Line.prototype.setSelected = function () {
	this.setStroke("red");
}

Line.prototype.setUnselected = function () {
	this.setStroke(this.actualStroke);
}

Rectangle.prototype.setSelected = Line.prototype.setSelected;
Rectangle.prototype.setUnselected = Line.prototype.setUnselected;

Ellipse.prototype.setSelected = Line.prototype.setSelected;
Ellipse.prototype.setUnselected = Line.prototype.setUnselected;

Circle.prototype.setSelected = Line.prototype.setSelected;
Circle.prototype.setUnselected = Line.prototype.setUnselected;


Line.prototype.setLocation = function (x,y) {
	var x1=parseInt(this.getX1());
	var y1=parseInt(this.getY1());
	var x2=parseInt(this.getX2());
	var y2=parseInt(this.getY2());
	var dx=x-originX;
	var dy=y-originY;
	this.setX1(x1+dx);
	this.setY1(y1+dy);
	this.setX2(x2+dx);
	this.setY2(y2+dy);
	originX=x;
	originY=y;
}
Line.prototype.move = function (dx,dy) {
	var x1=parseInt(this.getX1());
	var y1=parseInt(this.getY1());
	var x2=parseInt(this.getX2());
	var y2=parseInt(this.getY2());
	this.setX1(x1+dx);
	this.setY1(y1+dy);
	this.setX2(x2+dx);
	this.setY2(y2+dy);
}

Rectangle.prototype.setLocation = function (x,y) {
	var rx=parseInt(this.getX());
	var ry=parseInt(this.getY());
	var dx=x-originX;
	var dy=y-originY;
	this.setX(rx+dx);
	this.setY(ry+dy);
	originX=x;
	originY=y;
}

Rectangle.prototype.move = function (dx,dy) {
	var rx=parseInt(this.getX());
	var ry=parseInt(this.getY());
	this.setX(rx+dx);
	this.setY(ry+dy);
}

Ellipse.prototype.setLocation = function (x,y) {
	var rx=parseInt(this.getCx());
	var ry=parseInt(this.getCy());
	var dx=x-originX;
	var dy=y-originY;
	this.setCx(rx+dx);
	this.setCy(ry+dy);
	originX=x;
	originY=y;
}

Ellipse.prototype.move = function (dx,dy) {
	var rx=parseInt(this.getCx());
	var ry=parseInt(this.getCy());
	this.setCx(rx+dx);
	this.setCy(ry+dy);
}

Circle.prototype.setLocation = Ellipse.prototype.setLocation;
Circle.prototype.move = Ellipse.prototype.move;

Text = function (container, x , y , text) {
	this.node=document.createElementNS(SVG_NS,"text");
	container.appendChild(this.node);
	this.setX(x);
	this.setY(y);
	this.setFont("Verdana");
	this.setFontSize("11");
	this.setFill("black");
	this.setTextAnchor("middle");
	
	this.nodeSpan=document.createElementNS(SVG_NS,"tspan");
	this.node.appendChild(this.nodeSpan);
	this.nodeSpan.appendChild(document.createTextNode(text));
}

generateSetFunctions ("Text.prototype","X","x","Y","y","Font","font-family","FontSize","font-size","TextAnchor","text-anchor","Fill","fill");

function creerElementXML (nomBalise, conteneur) {
	var balise=document.createElement(nomBalise);
	conteneur.appendChild(balise);
	return balise;
}
Tableau = function (conteneur, nbColonnes, nbLignes) {
	this.balise = creerElementXML ("table", conteneur);
	this.balise.__objet=this;
	for (var l=0;l<nbLignes;l++) {
		var ligne=this.ajouterUneLigne();
		for (var c=0;c<nbColonnes;c++) {
			var cellule=ligne.ajouterUneCellule();
			cellule.fixerTexte(" ");
		}
	}
	this.balise.setAttribute("cellspacing",2);
	this.balise.setAttribute("cellpadding",2);
}

Tableau.prototype = {
	ajouterUneLigne : function () {
		return new Ligne (this);
	},
	avoirLigneNumero : function (numero) {
		return this.balise.childNodes[numero].__objet;
	},
	setBorder : function (border) {
		this.balise.setAttribute("border",border);
	},
	setAlign : function (align) {
		this.balise.setAttribute("align",align);
	},
	setBackground : function (color) {
		this.balise.setAttribute("bgcolor",color);
	}
}

Ligne = function (tableau) {
	this.balise = creerElementXML ("tr", tableau.balise);
	this.balise.__objet=this;
}

Ligne.prototype = {
	ajouterUneCellule : function () {
		return new Cellule (this);
	},
	avoirCelluleNumero : Tableau.prototype.avoirLigneNumero
}

Cellule = function (ligne) {
	this.balise = creerElementXML ("td",ligne.balise);
	this.balise.__objet=this;
}

Cellule.prototype = {
	fixerTexte : function (texte) {
		if (this.balise.firstChild)
			this.balise.removeChild(this.balise.firstChild);
		this.balise.appendChild(document.createTextNode(texte));
	},
	fixerContenu : function (balise) {
		if (this.balise.firstChild)
			this.balise.removeChild(this.balise.firstChild);
		this.balise.appendChild(balise);
	},
	avoirTexte : function () {
		return this.balise.firstChild.data;
	},
	setBackground : function (color) {
		this.balise.setAttribute("bgcolor",color);
	}
}