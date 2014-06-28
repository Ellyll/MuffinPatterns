function do_the_muffin_magic() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    draw_lines(canvas, context, 16);
    draw_circle_thing(canvas, context);

    console.log('Hello Lazy! <3');
}

function draw_lines(canvas, context, numberOfLines) {
    var yStep = canvas.height / numberOfLines;
    var xStep = canvas.width / numberOfLines;
    var xMax = canvas.width-1;
    var yMax = canvas.height-1;

    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    for (var i=0 ; i<numberOfLines; i++) {
        draw_line(context, 0, i*yStep, i*xStep, yMax, colours[colourIndex]);
        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }

    draw_line(context, 0, 0, 0, yMax, '#F00');
    draw_line(context, 0, yMax, xMax, yMax, '#00F');
}

function draw_line(context, x1, y1, x2, y2, strokeStyle) {
    context.beginPath();
    context.strokeStyle = strokeStyle;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}

function draw_circle_thing(canvas, context) {
    var xc = (canvas.width / 2) - 1;
    var yc = (canvas.width / 2) - 1;
    var radius = 50;
    var step = (2.0 * Math.PI) / 16.0;

    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    for(var angle = 0; angle < (2.0*Math.PI) ; angle += step) {
        var startAngle = angle - (step * 3.0);

        var x1 = xc + (radius * Math.sin(startAngle));
        var y1 = yc + (radius * Math.cos(startAngle));
        var x2 = xc + (radius * Math.sin(angle));
        var y2 = yc + (radius * Math.cos(angle));

        draw_line(context, x1, y1, x2, y2, colours[colourIndex]);
        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }

}