
var React = require('react');
var brainTypeHelper = require('../services/brainTypeHelper');

module.exports = React.createClass({
  displayName: 'BrainChart',

  componentDidMount: function () {

    var EQ = this.props.Empathizing.raw;
    var SQ = this.props.Systemizing.raw;
    
    console.log(EQ, SQ);

    var wrapper = d3.select(React.findDOMNode(this));

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var margin = {top: 10, right: 10, bottom: 25, left: 25},
      width = 225 - margin.left - margin.right,
      height = 225 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([width, 0]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      // .tickValues([33.333,66.666])
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      // .tickValues([33.333,66.666])
      .orient("left");


    var svg = wrapper.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // backgrround
    // http://stackoverflow.com/questions/17776641/fill-rect-with-pattern

    // see this....
    // http://stackoverflow.com/questions/13069446/simple-fill-pattern-in-svg-diagonal-hatching

    var defs =  svg.append('defs');

    defs.append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 6)
        .attr('height', 4)
      .append('path')
        .attr('d', 'M0,4 l0,-4')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

    defs.append('defs')
      .append('pattern')
        .attr('id', 'horizontalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 6)
      .append('path')
        .attr('d', 'M4,0 l-4,-0')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

    // end background

    x.domain([100, 0]);
    y.domain([0, 100]);

    function makeLine(threshold) {
      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      points = [
         {x: 0, y: threshold},
         {x: 100, y: threshold + 100},
      ]

      svg.append("path")
        .datum(points)
        .attr("class", "line")
        .attr("d", line);
    }

    function makeArea(upper, lower, opacity, className) {
      className = className || 'up';
      function getPoint(x) { 
        return {x: x, y: x + upper}
      }

      var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y1(function(d) { return y(d.y); })
        .y0(function(d) { 
          return y(d.y - (upper - lower)); 
        });

      points = [
        getPoint(0),
        // getPoint(0 - upper),
        // getPoint(100 - upper),
        getPoint(100)
      ]

      // console.log(points);

      svg.append("path")
        .datum(points)
        .attr("class", "area " + className)
        .style('fill-opacity', opacity)
        .attr("d", area);
    }

    makeArea(100 * 2 / 3, 100, .3);
    makeArea(100/3, 100*2/3, .2);
    // makeArea(-100/3, 100/3, .1);
    makeArea(-100*2/3, -100/3, .2, 'right');
    makeArea(-100, -100*2/3, .3, 'right');

    // makeLine(0);
    makeLine(100/3);
    makeLine(100*2/3);
    makeLine(-100/3);
    makeLine(-100*2/3);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("x", width/2)
      .attr("y", 18)
      .style("text-anchor", "middle")
      .text("Systemizing");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -18)
      .attr("dy", ".5em")
      .attr("dx", "-4.71em")
      .style("text-anchor", "end")
      .text("Empathizing");


    var dots = svg.selectAll(".dot")
      .data([
        // {x: 10, y: 10},
        // {x: 50, y: 50},
        // {x: 100, y: 100},
        // {x: 0, y: 100},
        {x: 23, y: 78}
      ])

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
        console.log('heee')
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html("hello")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
  },

  render: function () {
    return <div className='brain-chart-wrap'/>;
  }
});




