
var React = require('react');

module.exports = React.createClass({
  displayName: 'BrainChart',

  componentDidMount: function () {
    var wrapper = d3.select(React.findDOMNode(this));

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 225 - margin.left - margin.right,
      height = 225 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([width, 0]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(8)
      .tickValues([33.333,66.666])
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(8)
      .tickValues([33.333,66.666])
      .orient("left");


    var svg = wrapper.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

    function makeArea(upper, lower, opacity) {
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

      console.log(points);

      svg.append("path")
        .datum(points)
        .attr("class", "area")
        .style('fill-opacity', opacity)
        .attr("d", area);
    }

    makeArea(100 * 2 / 3, 100, .3);
    makeArea(100/3, 100*2/3, .2);
    makeArea(-100/3, 100/3, .1);
    makeArea(-100*2/3, -100/3, .2);
    makeArea(-100, -100*2/3, .3);

    // makeLine(0);
    // makeLine(100/3);
    // makeLine(100*2/3);
    // makeLine(-100/3);
    // makeLine(-100*2/3);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("x", '50%')
      .attr("y", -6)
      .style("text-anchor", "middle")
      .text("Systematizing");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -16)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Empathizing");


    svg.selectAll(".dot")
      .data([
        // {x: 10, y: 10},
        // {x: 50, y: 50},
        // {x: 100, y: 100},
        // {x: 0, y: 100},
        {x: 23, y: 78}
      ])
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
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
