
var Line = function(xStart, yStart, xEnd, yEnd, strokeStyle) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.strokeStyle = strokeStyle;
};
Line.prototype.render = function(context) {
    context.beginPath();
    context.strokeStyle = this.strokeStyle;
    context.moveTo(this.xStart,this.yStart);
    context.lineTo(this.xEnd,this.yEnd);
    context.stroke();
};

var CircleThing = function(x, y, radius, numberOfPoints, rotation) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = rotation;
    this.numberOfPoints = numberOfPoints;
};
CircleThing.prototype.setRotation = function(rotation) {
    this.rotation = rotation;
};
CircleThing.prototype.render = function(context) {
    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    var step = 2.0*Math.PI/this.numberOfPoints;

    for(var angle = this.rotation; angle-this.rotation < (2.0*Math.PI) ; angle += step) {
        var startAngle = angle - (step * 3.0);

        var x1 = this.x + (this.radius * Math.sin(startAngle));
        var y1 = this.y + (this.radius * Math.cos(startAngle));
        var x2 = this.x + (this.radius * Math.sin(angle));
        var y2 = this.y + (this.radius * Math.cos(angle));

        var line = new Line(x1, y1, x2, y2, colours[colourIndex]);
        line.render(context);

        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }
};

var GraphThing = function(xStart, yStart, width, height, numberOfLines) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.numberOfLines = numberOfLines;
};
GraphThing.prototype.render = function(context) {
    var yStep = this.height / this.numberOfLines;
    var xStep = this.width / this.numberOfLines;
    var xMax = this.width - 1;
    var yMax = this.height - 1;

    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    for (var i=0 ; i<this.numberOfLines; i++) {
        var line = new Line(this.xStart, this.yStart+(i*yStep), this.xStart+(i*xStep), this.yStart+yMax, colours[colourIndex]);
        line.render(context);
        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }

    var yAxisLine = new Line(this.xStart, this.yStart, this.xStart, this.yStart + yMax, '#F00');
    var xAxisLine = new Line(this.xStart, this.yStart + yMax, this.xStart + xMax, this.yStart + yMax, '#00F');
    yAxisLine.render(context);
    xAxisLine.render(context);
};