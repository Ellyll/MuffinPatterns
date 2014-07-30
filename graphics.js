
function maximise_element(element) {
    if (element.tagName === 'svg') {
        element.setAttributeNS(null, 'width', window.innerWidth.toString());
        element.setAttributeNS(null, 'height', window.innerHeight.toString());
    } else {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }
}

function degrees_to_radians(degrees) {
    return (Math.PI/180)*degrees;
}

var Line = function(xStart, yStart, xEnd, yEnd, strokeStyle) {
    this.name = 'Line';
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.strokeStyle = strokeStyle;
    this.isPrimitive = true;
};
Line.prototype.getPrimitives = function() { return [ this ]; };

var Arc = function(x, y, radius, startAngle, endAngle, anticlockwise, strokeStyle, fillStyle) {
    this.name = 'Arc';
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;
    this.strokeStyle = null;
    this.fillStyle = null;
    this.isPrimitive = true;

    if (typeof anticlockwise === 'undefined' || anticlockwise === null) {
        this.anticlockwise = false;
    } else {
        this.anticlockwise = anticlockwise;
    }

    if (typeof strokeStyle === 'undefined' || strokeStyle === null || strokeStyle === '') {
        this.strokeStyle = null;
        this.stroked = false;
    } else {
        this.strokeStyle = strokeStyle;
        this.stroked = true;
    }

    if (typeof fillStyle === 'undefined' || fillStyle === null || fillStyle === '') {
        this.fillStyle = null;
        this.filled = false;
    } else {
        this.fillStyle = fillStyle;
        this.filled = true;
    }
};
Arc.prototype.getPrimitives = function() { return [ this ]; };

var Circle = function(x, y, radius, strokeStyle, fillStyle) {
    this.name = 'Circle';
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeStyle = strokeStyle;
    this.isPrimitive = false;

    if (typeof strokeStyle === 'undefined' || strokeStyle === null || strokeStyle === '') {
        this.strokeStyle = null;
        this.stroked = false;
    } else {
        this.strokeStyle = strokeStyle;
        this.stroked = true;
    }

    if (typeof fillStyle === 'undefined' || fillStyle === null || fillStyle === '') {
        this.fillStyle = null;
        this.filled = false;
    } else {
        this.fillStyle = fillStyle;
        this.filled = true;
    }
};
Circle.prototype.getPrimitives = function() {
    return [ new Arc(this.x, this.y, this.radius, 0, Math.PI*2, this.anticlockwise, this.strokeStyle, this.fillStyle) ];
};

var CircleThing = function(x, y, radius, numberOfPoints, rotation) {
    this.name = 'CircleThing';
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rotation = rotation;
    this.numberOfPoints = numberOfPoints;
    this.isPrimitive = false;
};
CircleThing.prototype.setRotation = function(rotation) {
    this.rotation = rotation;
};
CircleThing.prototype.getPrimitives = function() {
    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    var lines = [];
    var step = 2.0*Math.PI/this.numberOfPoints;

    for(var angle = this.rotation; angle-this.rotation < (2.0*Math.PI) ; angle += step) {
        var startAngle = angle - (step * 3.0);

        var x1 = this.x + (this.radius * Math.sin(startAngle));
        var y1 = this.y + (this.radius * Math.cos(startAngle));
        var x2 = this.x + (this.radius * Math.sin(angle));
        var y2 = this.y + (this.radius * Math.cos(angle));

        var line = new Line(x1, y1, x2, y2, colours[colourIndex]);
        lines.push(line);

        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }

    return lines;
};

var GraphThing = function(xStart, yStart, width, height, numberOfLines) {
    this.name = 'GraphThing';
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.numberOfLines = numberOfLines;
    this.isPrimitive = false;
};
GraphThing.prototype.getPrimitives = function() {
    var yStep = this.height / this.numberOfLines;
    var xStep = this.width / this.numberOfLines;
    var xMax = this.width - 1;
    var yMax = this.height - 1;

    var colours = [ '#F55', '#55F', '#5F5', '#FF5' ];
    var colourIndex = 0;

    var lines = [];

    for (var i=0 ; i<this.numberOfLines; i++) {
        var line = new Line(this.xStart, this.yStart+(i*yStep), this.xStart+(i*xStep), this.yStart+yMax, colours[colourIndex]);
        lines.push(line);
        if (colourIndex === colours.length-1) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    }

    var yAxisLine = new Line(this.xStart, this.yStart, this.xStart, this.yStart + yMax, '#F00');
    var xAxisLine = new Line(this.xStart, this.yStart + yMax, this.xStart + xMax, this.yStart + yMax, '#00F');
    lines.push(yAxisLine);
    lines.push(xAxisLine);

    return lines;
};
