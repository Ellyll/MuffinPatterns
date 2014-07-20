function do_lines_and_circles() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    draw_lines(canvas, context, 16);
    draw_circle_thing(canvas, context);
}

function draw_lines(canvas, context, numberOfLines) {
    var graphThing = new GraphThing(0, 0, canvas.width, canvas.height, numberOfLines);
    graphThing.render(context);
}

function draw_circle_thing(canvas, context) {
    var xc = (canvas.width / 2) - 1;
    var yc = (canvas.width / 2) - 1;
    var radius = 50;
    var numberOfPoints = 16.0;
    var rotation = 0.0;

    var circleThing = new CircleThing(xc, yc, radius, numberOfPoints, rotation);
    circleThing.render(context);
}
