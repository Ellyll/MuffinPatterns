function SVGRenderer() {
    var that = this;
    var svgNS = "http://www.w3.org/2000/svg";
    this.render= function(patterns, svgElement) {

        // Empty svg node (not the most efficient thing to do)
        while (svgElement.firstChild) {
            svgElement.removeChild(svgElement.firstChild);
        }

        var mappings = [
            [ 'Arc', that.renderArc ],
            [ 'Line', that.renderLine ]
        ];

        var flattenArray = function(toFlatten) {
            var isArray = Object.prototype.toString.call(toFlatten) === '[object Array]';

            if (isArray && toFlatten.length > 0) {
                var head = toFlatten[0];
                var tail = toFlatten.slice(1);

                return flattenArray(head).concat(flattenArray(tail));
            } else {
                return [].concat(toFlatten);
            }
        };

        var primitives = patterns.map(function(pattern) { return pattern.getPrimitives(); });
        primitives = flattenArray(primitives);

        primitives.forEach(function(primitive) {
            for(var i=0 ; i<mappings.length ; i++) {
                var typeName = mappings[i][0];
                var renderFunc = mappings[i][1];
                if (primitive.name === typeName) {
                    renderFunc(primitive, svgElement);
                    return;
                }
            }
            throw "Error: no mapping found for primitive " + primitive.name;
        });
    };

    this.renderArc = function(arc, svgElement) {

        var svgChild;

        if (arc.startAngle === 0 && arc.endAngle === Math.PI*2) {
            // Need a circle

            svgChild = document.createElementNS(svgNS, 'circle');
            svgChild.setAttributeNS(null, 'cx', arc.x);
            svgChild.setAttributeNS(null, 'cy', arc.y);
            svgChild.setAttributeNS(null, 'r', arc.radius);

        } else {
            // Need an arc

            // Calculate start and end points
            var startAngle = arc.anticlockwise ? arc.startAngle : arc.endAngle;
            var endAngle = arc.anticlockwise ? arc.endAngle : arc.startAngle;
            var xStart = arc.x + (arc.radius * Math.cos(startAngle));
            var yStart = arc.y + (arc.radius * Math.sin(startAngle));
            var xEnd = arc.x + (arc.radius * Math.cos(endAngle));
            var yEnd = arc.y + (arc.radius * Math.sin(endAngle));

            var command = 'M ' + xStart + ' ' + yStart + ' ' +
                          'A ' + arc.radius + ' ' + arc.radius + ' 0 0 0 ' + xEnd + ' ' + yEnd;

            svgChild = document.createElementNS(svgNS, 'path');
            svgChild.setAttributeNS(null, 'd', command);
        }

        var fillStyle = arc.filled ? arc.fillStyle : 'none';
        var strokeStyle = arc.stroked ? arc.strokeStyle : 'none';
        svgChild.setAttributeNS(null, 'fill', fillStyle);
        svgChild.setAttributeNS(null, 'stroke', strokeStyle);
        svgChild.setAttributeNS(null, 'stroke-width', '0.1');

        svgElement.appendChild(svgChild);
    };


    this.renderLine = function(line, svgElement) {

        var svgLine = document.createElementNS(this._svgNS, 'line');
        svgLine.setAttributeNS(null, 'x1', line.xStart);
        svgLine.setAttributeNS(null, 'y1', line.yStart);
        svgLine.setAttributeNS(null, 'x2', line.xStart);
        svgLine.setAttributeNS(null, 'y2', line.yStart);
        if (line.filled) svgLine.style.filled = line.fillStyle;
        if (line.filled) svgLine.style.stroke = line.strokeStyle;

        svgElement.appendChild(svgLine);
    };
}