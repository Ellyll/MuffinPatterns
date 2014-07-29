function CanvasRenderer() {
    var that = this;
    this.render= function(patterns, context) {

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
                    renderFunc(primitive, context);
                    return;
                }
            }
            throw "Error: no mapping found for primitive " + primitive.name;
        });
    };
    
    this.renderArc = function(arc, context) {
        context.beginPath();

        if (arc.stroked) context.strokeStyle = arc.strokeStyle;
        if (arc.filled)  context.fillStyle = arc.fillStyle;

        context.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle, arc.anticlockwise);

        if (arc.filled)  context.fill();
        if (arc.stroked) context.stroke();
    };

    this.renderLine = function(line, context) {
        context.beginPath();
        context.strokeStyle = line.strokeStyle;
        context.moveTo(line.xStart,line.yStart);
        context.lineTo(line.xEnd,line.yEnd);
        context.stroke();
    };

}
