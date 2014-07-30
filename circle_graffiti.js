
// Inspired by http://www.bbc.co.uk/news/uk-england-28035013

function init_circle_graffiti_canvas() {
    draw_circle_graffiti_canvas();
    window.addEventListener('resize', draw_circle_graffiti_canvas);
}

function init_circle_graffiti_svg() {
    draw_circle_graffiti_svg();
    window.addEventListener('resize', draw_circle_graffiti_svg);
}

function draw_circle_graffiti_canvas() {
    draw_circle_graffiti('canvas');
}

function draw_circle_graffiti_svg() {
    draw_circle_graffiti('svg');
}

function draw_circle_graffiti(renderMode) {

    var id = renderMode === 'svg' ? 'svg' : 'canvas';
    var graphicsElement = document.getElementById(id);

    var width = null, height = null;
    maximise_element(graphicsElement);

    if (renderMode === 'svg') {
        width = 100;
        height = 100;
    } else {
        width = graphicsElement.width;
        height = graphicsElement.height;
    }
    var xc = (width-1)/2;
    var yc = (height-1)/2;
    var shortestSide = Math.min(width, height);
    var percent = (shortestSide/2.1) / 100;

    var colour = '#00FF00';
    var patterns = [];

    // Concentric circles
    patterns.push(new Circle(xc, yc, 1*percent, colour, colour));
    patterns.push(new Circle(xc, yc, 14*percent, colour));
    patterns.push(new Circle(xc, yc, 28*percent, colour));
    patterns.push(new Circle(xc, yc, 58*percent, colour));
    patterns.push(new Circle(xc, yc, 70*percent, colour));
    patterns.push(new Circle(xc, yc, 82*percent, colour));

    // Smaller inner circles
    var angle;
    var step = (Math.PI*2) / 4;
    var start = step / 2;
    var r = 43*percent;
    var x,y;
    for (angle = start; angle < Math.PI*2 ; angle += step) {
        x = xc + Math.cos(angle)*r;
        y = yc + Math.sin(angle)*r;
        patterns.push(new Circle(x, y, 14*percent, colour));
        patterns.push(new Circle(x, y, 0.5*percent, colour, colour));
    }

    // Larger inner circles
    step = (Math.PI*2) / 4;
    start = 0;
    r = 47*percent;
    var r2 = 70*percent;
    for (angle = start; angle < Math.PI*2 ; angle += step) {
        x = xc + Math.cos(angle)*r;
        y = yc + Math.sin(angle)*r;
        patterns.push(new Circle(x, y, 10*percent, colour));
        patterns.push(new Circle(x, y, 0.5*percent, colour, colour));

        x = xc + Math.cos(angle)*r2;
        y = yc + Math.sin(angle)*r2;
        patterns.push(new Circle(x, y, 10*percent, colour));
        patterns.push(new Circle(x, y, 0.5*percent, colour, colour));

    }

    // Inner arcs
    patterns.push(new Arc(xc-(82*percent), yc, 82*percent, degrees_to_radians(-60), degrees_to_radians(60), false, colour));
    patterns.push(new Arc(xc+(82*percent), yc, 82*percent, degrees_to_radians(120), degrees_to_radians(-120), false, colour));
    patterns.push(new Arc(xc, yc-(82*percent), 82*percent, degrees_to_radians(30), degrees_to_radians(150), false, colour));
    patterns.push(new Arc(xc, yc+(82*percent), 82*percent, degrees_to_radians(-150), degrees_to_radians(-30), false, colour));

    // Petals
    add_petals(patterns, xc, yc, 82*percent, 16*percent, colour);


    // Render
    if (renderMode === 'svg') {
        var svgRenderer = new SVGRenderer();
        svgRenderer.render(patterns, graphicsElement);
    } else {
        var canvasRenderer = new CanvasRenderer();
        var context = graphicsElement.getContext('2d');
        canvasRenderer.render(patterns, context);
    }
}

function add_petals(patterns, xc, yc, r1, r2, colour) {
    var arcAngle = Math.PI - Math.acos(r2/(2*r1));

    var numberOfPetals = Math.floor((Math.PI*r1)/r2);
    var step = (Math.PI*2)  / numberOfPetals;

    for (var i=0; i<numberOfPetals ; i++) {
        var angle = (i*step) - (Math.PI/2);
        var x = Math.cos(angle)*r1;
        var y = Math.sin(angle)*r1;
        patterns.push(new Arc(xc+x, yc+y, r2, -arcAngle+angle, arcAngle+angle, false, colour));
    }
}
