var paper_paint;
var paper_menu;
var id_element = 0;
var current = null;
var color = null;
var color_menu = null;
var default_color = {
  fill: '#B9B5B5'
};
var default_attr ={
  stroke: "none"
};

var ox = 0;
var oy = 0;
var start = function() {
    this.attr({
      opacity: .5
    });
    set_current(this);
  },
  move = function(dx, dy) {
    var x = (dx - ox);
    var y = (dy - oy)
    move_object(this.id, x, y, true);
    ox = dx;
    oy = dy;
  },
  up = function() {
    ox = 0;
    oy = 0;
    this.attr({
      opacity: 5
    });
  };

function create_menu() {
  paper_menu = Raphael("paper_menu", 150, 500);

  var circle = paper_menu.circle(70, 50, 40).attr(default_color).attr(default_attr).click(function() {
    add_element("circle", null, true);
  });
  var rectangle = paper_menu.rect(25, 110, 90, 50).attr(default_color).attr(default_attr).click(function() {
    add_element("rectangle", null, true);
  });
  var square = paper_menu.rect(25, 180, 90, 90).attr(default_color).attr(default_attr).click(function() {
    add_element("square", null, true);
  });

  var ellipse = paper_menu.ellipse(70, 310, 40, 30).attr(default_color).attr(default_attr).click(function() {
    add_element("ellipse", null, true);
  });

  var text = paper_menu.text(30,360,"Color:").attr({
    "font-size": "15",
    "font-family": "Arial",
    "fill": "#3E3D3D"
  });

  color_menu = paper_menu.rect(25, 380, 70, 70).attr(default_color).attr({
    stroke:"#000000",
    "stroke-width": 2
  }).click(function(){
    change_color_web();
  });
}

function add_element(element, id, server, id_user) {
  console.log(id_user);
  id_user = (typeof id_user == "undefined")? null:id_user;
  if (id != null) id_element = id;
  else id_element++;
  var object = null;
  switch (element.toUpperCase()) {
  case "CIRCLE":
    object = add_circle();
    break;
  case "RECTANGLE":
    object = add_rectangle();
    break;
  case "SQUARE":
    object = add_square();
    break;
  case "ELLIPSE":
    object = add_ellipse();
    break;
  default:
    console.log("Element not implemented yet");
  }
  if (object != null) {
    object.attr(default_attr).attr(color || default_color);
    object.id = id_element;
    object.drag(move, start, up);
    object.mousedown(function(e) {
      if (e.which == 3) {
        remove_object(this, id_element, true);
      }
    });
    
    if (server){ 
      set_current(object);
      paint.createObjectServeur(id_element, element);
    }
    if (id_user != null) {
      change_current_by_user(object.id, id_user);
    }
  }
}

function add_circle() {
  var circle = paper_paint.circle(70, 50, 40);
  return circle;
}

function add_rectangle() {
  var rectangle = paper_paint.rect(70, 50, 90, 50);
  return rectangle;
}

function add_square() {
  var square = paper_paint.rect(70, 50, 90, 90);
  return square;
}

function add_ellipse() {
  var ellipse = paper_paint.ellipse(70, 50, 40, 30);
  return ellipse;
}

function set_current(object) {
  if (current != null) {
    current.attr({
      stroke: "none"
    });
  }
  current = object;
  object.attr({
    stroke: "#FF0101",
    "stroke-width": 2,
    "stroke-linejoin": "round",
    "stroke-linecap": "round"
  });
  change_current_by_user(current.id, current_id);
  paint.changeCurrentServeur(current.id, current_id);

}

function move_object(object_id, dx, dy, server) {
  var object = paper_paint.getById(object_id);
  if (object != null) {
    object.attr({
      transform: "...T" + (dx) + "," + (dy)
    });
    if(server){
     paint.moveObjectServeur(dx,dy,object_id);
    }
  }
}

function remove_object(object, id, server, id_user) {
  id_user = (typeof id_user == "undefined")? null:id_user;
  var new_id;
  if (object != null) {
    new_id = object.id;
  } else if(id != null){
    object = paper_paint.getById(id);
    new_id = id;
  }else if (id_user != null){
    id = get_id_object_by_user(id_user);
    object = paper_paint.getById(id);
    new_id = id;
  }else{
    object = current;
    new_id = current.id;
  }
  object.remove();
  if (current != null && object.id == current.id) current = null;
  users.filter(function (user) { 
    if(user.id_object == object.id){
      user.id_object = null
    }
  });
  if (server) paint.removeObjectServeur(new_id);
}

function change_color_web(){
  alert("Go Android App for change");
}

function create_object_color(code_color){
  color = {
    fill: code_color
  }
  //color_menu.attr({fill: code_color});
}

function change_color_object(id, code_color, id_user){
  id_user = (typeof id_user == "undefined")? null:id_user;
  create_object_color(code_color);
  var object

  if(id != null){
   object = paper_paint.getById(id);
  }else if (id_user != null){
    id = get_id_object_by_user(id_user);
    object = paper_paint.getById(id);
  }else{
    object = current;
  }
  if(object != null){
    object.attr(color || default_color);
    androphone.returnColor(code_color,true);
  }/*else{
    androphone.returnColor(code_color,false);
  }*/
}

jQuery(document).ready(function() {
  paper_paint = Raphael("paper_paint", 850, 500);
  create_menu();

  window.onbeforeunload = function (e) {
    if(startSession){
      paint.quitSessionServeur(current_id);
    }
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = 'Quit';
    }

    // For Chrome, Safari and Opera 12+
    return 'Quit';
  };
});