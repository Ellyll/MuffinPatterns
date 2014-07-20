
// Inspired by http://www.bbc.co.uk/news/uk-england-28035013

function draw_circle_graffiti() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    maximise_canvas(canvas);

    var width = canvas.width;
    var height = canvas.height;
    var xc = (width-1)/2;
    var yc = (height-1)/2;
    var shortestSide = Math.min(width, height);
    var percent = (shortestSide/2.1) / 100;

    var colour = '#00FF00';
    var patterns = [];
    patterns.push(new Circle(xc, yc, 2, colour, colour));
    patterns.push(new Circle(xc, yc, 14*percent, colour));
    patterns.push(new Circle(xc, yc, 28*percent, colour));
    patterns.push(new Circle(xc, yc, 58*percent, colour));
    patterns.push(new Circle(xc, yc, 70*percent, colour));
    patterns.push(new Circle(xc, yc, 82*percent, colour));

    var angle;
    var step = (Math.PI*2) / 4;
    var start = step / 2;
    var r = 43*percent;
    var x,y;
    for (angle = start; angle < Math.PI*2 ; angle += step) {
        x = xc + Math.cos(angle)*r;
        y = yc + Math.sin(angle)*r;
        patterns.push(new Circle(x, y, 14*percent, colour));
        patterns.push(new Circle(x, y, 2, colour, colour));
    }

    step = (Math.PI*2) / 4;
    start = 0;
    r = 47*percent;
    var r2 = 70*percent;
    for (angle = start; angle < Math.PI*2 ; angle += step) {
        x = xc + Math.cos(angle)*r;
        y = yc + Math.sin(angle)*r;
        patterns.push(new Circle(x, y, 10*percent, colour));
        patterns.push(new Circle(x, y, 2, colour, colour));

        x = xc + Math.cos(angle)*r2;
        y = yc + Math.sin(angle)*r2;
        patterns.push(new Circle(x, y, 10*percent, colour));
        patterns.push(new Circle(x, y, 2, colour, colour));

    }

    patterns.forEach(function(p) { p.render(context); });
}
