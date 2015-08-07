
var React = require('react');

module.exports = React.createClass({
  displayName: 'BrainChart',

  componentDidMount: function () {
    var wrapper = d3.select(React.findDOMNode(this));

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var margin = {top: 10, right: 10, bottom: 10, left: 20},
      width = 300 - margin.left - margin.right,
      height = 225 - margin.top - margin.bottom;

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

    var area = d3.svg.area()
      .x(function(d) { 
        console.l
        return x(d.x); 
      })
      .y0(function(d) { return y(d.y/2); })
      .y1(function(d) { return y(d.y); });

    var svg = wrapper.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain([100, 0]);
    y.domain([0, 100]);

    svg.append("path")
      .datum([{
        x: 0, y: 40
      }, {
        x: 100, y: 160
      }])
      .attr("class", "area")
      .attr("d", area);

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
      .data([{x: 10, y: 10}])
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function (d) {return x(d.x)})
      .attr("cy", function (d) {return y(d.y)})
      .style("fill", function(d) { return '#fff';}) 
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
