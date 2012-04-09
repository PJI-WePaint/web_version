var paper_paint;
var paper_menu;
var default_color = {
  fill: '#B9B5B5',
  stroke: '#B9B5B5',
  'stroke-width': 1
};

var ox = 0;
var oy = 0;
var start = function() {
    this.attr({
      opacity: .5
    });
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
    add_circle();
  });
  var rectangle = paper_menu.rect(25, 110, 90, 50).attr(default_color).click(function() {
    add_rectangle();
  });
  var square = paper_menu.rect(25, 180, 90, 90).attr(default_color).click(function() {
    add_square();
  });
  // TODO : add listener 
}


function add_circle() {
  var start = function() {
      this.ox = this.attr("cx");
      this.oy = this.attr("cy");
      this.attr({
        opacity: .5
      });
    },
    move = function(dx, dy) {
      this.attr({
        cx: this.ox + dx,
        cy: this.oy + dy
      });
    },
    up = function() {
      this.attr({
        opacity: 5
      });
    };
  var circle = paper_paint.circle(70, 50, 40).attr(default_color);
  circle.drag(move, start, up);

}

function add_rectangle() {
  var rectangle = paper_paint.rect(70, 50, 90, 50).attr(default_color);
  rectangle.drag(move, start, up);
}

function add_square() {
  var square = paper_paint.rect(70, 50, 90, 90).attr(default_color);
  square.drag(move, start, up);
}


jQuery(document).ready(function() {
  paper_paint = Raphael("paper_paint", 850, 400);
  create_menu();

  //var rectangle = paint_c.circle(100,100, 80);
});