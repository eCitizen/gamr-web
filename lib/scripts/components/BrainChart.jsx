
var React = require('react');
var brainTypeHelper = require('../services/brainTypeHelper');

module.exports = React.createClass({
  displayName: 'BrainChart',

  componentDidMount: function () {
    var data = [
      // {y: 12, x: 26},
      // {y: 32, x: 24},
      // {y: 6,  x: 13},
      // {y: 16, x: 12},
      // {y: 32, x: 12},
      // {y: 32, x: 0},
      // {y: 2, x: 25},
      {x: this.props.Systemizing, y: this.props.Empathizing}
    ];

    var wrapper = d3.select(React.findDOMNode(this));

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var margin = {top: 10, right: 10, bottom: 25, left: 25};
    var width = 225 - margin.left - margin.right;
    var height = 225 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([width, 0]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    x.domain([brainTypeHelper.SQ_MIN, brainTypeHelper.SQ_MAX].reverse());
    y.domain([brainTypeHelper.EQ_MIN, brainTypeHelper.EQ_MAX]);

    var svg = wrapper.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "chart-wrap")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    definePatterns(svg);

    var background = svg.append("g").attr('class', 'chart-background');
    shadeRegions(background);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("x", width/2)
      .attr("y", 22)
      .style("text-anchor", "middle")
      .text("Systemizing");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -22)
      .attr("dy", ".5em")
      .attr("dx", "-4.71em")
      .style("text-anchor", "end")
      .text("Empathizing");

    var dots = svg.selectAll(".dot").data(data);

    dots.enter().append("circle")
      .attr("class", "dot")
      .attr("r", 1.5)
      .attr("cx", function (d) {return x(d.x)})
      .attr("cy", function (d) {return y(d.y)});

    dots.enter().append("circle")
      .attr("class", "outer-dot")
      .attr("r", 6)
      .attr("cx", function (d) {return x(d.x)})
      .attr("cy", function (d) {return y(d.y)})
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(brainTypeHelper.getBrainType(d.x, d.y))
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

    function shadeRegions(svg) {
      var lines = brainTypeHelper.makeThresholdLineFunctions();
      var areas = brainTypeHelper.makeThresholdAreaFunctions();

      // lines.forEach(function (thresholdFn, idx) {
      //   makeLine(svg, thresholdFn);
      // });

      areas.forEach(function (area, idx) {
        makeArea(svg, area, idx);
      });
    }

    function getRelevantPoints(line) {
      var x1 = line.fE(brainTypeHelper.EQ_MIN);
      if (x1 < brainTypeHelper.SQ_MIN) x1 = brainTypeHelper.SQ_MIN;

      var x2 = line.fE(brainTypeHelper.EQ_MAX); 
      if (x2 > brainTypeHelper.SQ_MAX) x2 = brainTypeHelper.SQ_MAX;
      return [x1, x2];
    }

    function makeLine(svg, threshold) {
      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      var points = getRelevantPoints(threshold).map(function (x) {
        return {
          x: x,
          y: threshold.fS(x)
        };
      });
 
      svg.append("path")
        .datum(points)
        .attr("class", "line")
        .attr("d", line);
    }

    function makeArea(svg, areaThreshold, idx) {
      var className = areaThreshold.type.split(' ').join('-');

      var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y1(function(d) { return y(d.y); })
        .y0(function(d) {
          var E = areaThreshold.lower ? areaThreshold.lower.fS(d.x) : brainTypeHelper.EQ_MAX;
          E = (E > brainTypeHelper.EQ_MAX) ? brainTypeHelper.EQ_MAX : E;
          E = (E < brainTypeHelper.EQ_MIN) ? brainTypeHelper.EQ_MIN : E;
          return y(E); 
        });

      var points = [];
      if (areaThreshold.upper) points = points.concat(getRelevantPoints(areaThreshold.upper));
      if (areaThreshold.lower) points = points.concat(getRelevantPoints(areaThreshold.lower));
      points.sort();

      points = points.sort().map(function (x) {
        var E = areaThreshold.upper ? areaThreshold.upper.fS(x) : brainTypeHelper.EQ_MIN;
        E = (E > brainTypeHelper.EQ_MAX) ? brainTypeHelper.EQ_MAX : E;
        E = (E < brainTypeHelper.EQ_MIN) ? brainTypeHelper.EQ_MIN : E;
        return {
          x: x, 
          y: E
        };
      });

      svg.append("path")
        .datum(points)
        .attr("class", "area " + className)
        .attr("d", area);
    }
  },

  render: function () {
    return <div className='brain-chart-wrap'/>;
  }
});

function definePatterns(svg) {
  // backgrround
  // http://stackoverflow.com/questions/17776641/fill-rect-with-pattern

  // see this....
  // http://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching

  var defs = svg.append('defs');

  defs.append('pattern')
      .attr('id', 'diagonalHatch')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 6)
      .attr('height', 4)
    .append('path')
      .attr('class', 'hatch')
      .attr('d', 'M0,4 l0,-4')
      .attr('stroke-width', 2);

  defs.append('defs')
    .append('pattern')
      .attr('id', 'horizontalHatch')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 4)
      .attr('height', 6)
    .append('path')
      .attr('class', 'hatch')
      .attr('d', 'M4,0 l-4,-0')
      .attr('stroke-width', 2);

  definePattern(defs, {
    id: 'Extreme-Male-Hatch',
    width: 5,
    orientation: 'x'
  });

  definePattern(defs, {
    id: 'Male-Hatch',
    width: 7,
    orientation: 'x'
  });

  definePattern(defs, {
    id: 'Female-Hatch',
    width: 7,
    orientation: 'y'
  });

  definePattern(defs, {
    id: 'Extreme-Female-Hatch',
    width: 5,
    orientation: 'y'
  });

  definePattern(defs, {
    id: 'Balanced-Hatch',
    width: 7,
    rotate: -45
  });
}

function definePattern(defs, options) {
  var isX = options.orientation === 'x';
  var w = isX ? 5 : options.width;
  var h = isX ? options.width : 5;
  var p = isX ? 'M'+w+',0 l-'+w+',0' : 'M0,'+w+' l0,-'+w;

  var pattern = defs.append('pattern')
    .attr('id', options.id)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', w)
    .attr('height', h)

  var line = pattern.append('path')
    .attr('class', 'hatch')
    .attr('d', p)
    .attr('stroke-width', options.strokeWidth || 2);

  if (options.dashArray) {
    line.style("stroke-dasharray", options.dashArray);
  }

  if (options.rotate) {
    console.log(options);
    pattern.attr('patternTransform','rotate('+options.rotate+' 0 0)');
  }
}

