function do_lines_and_circles() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var patterns = [];

    patterns = patterns.concat(get_graph_thing(canvas, 16));
    patterns = patterns.concat(get_circle_thing(canvas));

    var canvasRenderer = new CanvasRenderer();
    canvasRenderer.render(patterns, context);
}

function get_graph_thing(canvas, numberOfLines) {
    var graphThing = new GraphThing(0, 0, canvas.width, canvas.height, numberOfLines);
    return [graphThing];
}

function get_circle_thing(canvas) {
    var xc = (canvas.width / 2) - 1;
    var yc = (canvas.width / 2) - 1;
    var radius = 50;
    var numberOfPoints = 16.0;
    var rotation = 0.0;

    var circleThing = new CircleThing(xc, yc, radius, numberOfPoints, rotation);
    return [circleThing];
}
