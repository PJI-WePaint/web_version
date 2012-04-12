var paper_paint;
var paper_menu;
var id_element = 0;
var current = null;
var default_color = {
  fill: '#B9B5B5',
  stroke: 'none'
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
    this.attr({
      transform: "...T" + (dx - ox) + "," + (dy - oy)
    });
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
  paper_menu = Raphael("paper_menu", 150, 400);

  var circle = paper_menu.circle(70, 50, 40).attr(default_color).click(function() {
    add_element("circle", null, true);
  });
  var rectangle = paper_menu.rect(25, 110, 90, 50).attr(default_color).click(function() {
    add_element("rectangle", null, true);
  });
  var square = paper_menu.rect(25, 180, 90, 90).attr(default_color).click(function() {
    add_element("square", null, true);
  });

  var ellipse = paper_menu.ellipse(70, 310, 40, 30).attr(default_color).click(function() {
    add_element("ellipse", null, true);
  });
}

function add_element(element, id, server) {
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
    object.id = id_element;
    object.drag(move, start, up);
    object.mousedown(function(e) {
      if (e.which == 3) {
        remove_object(this, id_element, true);
      }
    });
    set_current(object);
    if (server) paint.createObjectServeur(id, element);
  }
}

function add_circle() {
  var circle = paper_paint.circle(70, 50, 40).attr(default_color);
  return circle;
}

function add_rectangle() {
  var rectangle = paper_paint.rect(70, 50, 90, 50).attr(default_color);
  return rectangle;
}

function add_square() {
  var square = paper_paint.rect(70, 50, 90, 90).attr(default_color);
  return square;
}

function add_ellipse() {
  var ellipse = paper_paint.ellipse(70, 50, 40, 30).attr(default_color);
  return ellipse;
}

function set_current(object) {
  if (current != null) {
    current.attr({
      stroke: "none"
    });
  }
  androphone.resetAcceleroValues();
  current = object;
  object.attr({
    stroke: "#FF0101",
    "stroke-width": 2,
    "stroke-linejoin": "round",
    "stroke-linecap": "round"
  });
}

function move_object(object, dx, dy) {
  if (current != null) {
    current.attr({
      transform: "...T" + (dx) + "," + (dy)
    });
  }
}

function remove_object(object, id, server) {
  var new_id;
  if (object != null) {
    new_id = object.id;
  } else {
    object = paper_paint.getById(id);
    new_id = id;
  }
  object.remove();
  if (current != null && object.id == current.id) current = null;
  if (server) paint.removeObjectServeur(new_id);
}

jQuery(document).ready(function() {
  paper_paint = Raphael("paper_paint", 850, 400);
  create_menu();
});