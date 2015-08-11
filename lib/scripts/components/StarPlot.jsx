
var React = require('react');
var surveyKey = require('../services/surveyKey');

module.exports = React.createClass({
  displayName: 'StarPlot',

  componentDidMount: function () {
    var wrapper = d3.select(React.findDOMNode(this));

    var scale = d3.scale.linear()
        .domain([0, 100])
        .range([0, 100]);

    var star = d3.starPlot();

    var key = surveyKey.personality.slice().reverse();
    var labels = key.map(function (dimension) { return dimension.key; });
    var properties = key.map(function (dimension) { return dimension.title; });

    star.width(180)
        .properties(properties)
        .scales(scale)
        .labels(properties)
        .margin({
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        })
        .labelMargin(10)
        .includeGuidelines(true)
        .includeLabels(true);

    var svg = wrapper.append('svg');

    var starG = svg.append('g')
        .datum(this.props.data)
        .call(star)
        .call(star.interaction);

    var interactionLabel = wrapper.append('div')
        .attr('class', 'interaction label')

    var circle = svg.append('circle')
        .attr('class', 'interaction circle')
        .attr('r', 5)

    var interaction = wrapper.selectAll('.interaction')
        .style('display', 'none');

    svg.selectAll('.star-interaction')
      .on('mouseover', function(d) {
        svg.selectAll('.star-label')
          .style('display', 'none')

        interaction
          .style('display', 'block')

        circle
          .attr('cx', d.x)
          .attr('cy', d.y)

        var label = interactionLabel.node();
        label.textContent = 'hello';
        console.log(label.offsetWidth)
        label.style.left = (d.xExtent - (label.offsetWidth / 2)) + 'px';
        label.style.top = (d.yExtent - (label.offsetHeight / 2)) + 'px';
        // $interactionLabel = $(interactionLabel.node());
        // interactionLabel
        //   .text(d.key + ': ' + d.datum[d.key])
        //   .style('left', d.xExtent - ($interactionLabel.width() / 2))
        //   .style('top', d.yExtent - ($interactionLabel.height() / 2))
      })
      .on('mouseout', function(d) {
        interaction
          .style('display', 'none')

        svg.selectAll('.star-label')
          .style('display', 'block')
      })
  },

  render: function () {
    return <div className='star-wrap'/>;
  }
});

// TOTAL HACK :(
// copy of source from https://github.com/kevinschaul/d3-star-plot

d3.starPlot = function() {
  var width = 200,
      margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      labelMargin = 20,
      includeGuidelines = true,
      includeLabels = true,
      properties = [],
      scales = [],
      labels = [],
      title = nop,

      g,
      datum,
      radius = width / 2,
      origin = [radius, radius],
      radii = properties.length,
      radians = 2 * Math.PI / radii,
      scale = d3.scale.linear()
        .domain([0, 100])
        .range([0, radius])

  function chart(selection) {
    datum = selection.datum();
    g = selection
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    if (includeGuidelines) {
      drawGuidelines();
    }
    if (includeLabels) {
      drawLabels();
    }

    drawChart();
  }

  function drawGuidelines() {
    var r = 0;
    properties.forEach(function(d, i) {
      var l, x, y;

      l = radius;
      x = l * Math.cos(r);
      y = l * Math.sin(r);
      g.append('line')
        .attr('class', 'star-axis')
        .attr('x1', origin[0])
        .attr('y1', origin[1])
        .attr('x2', origin[0] + x)
        .attr('y2', origin[1] + y)

      r += radians;
    })
  }

  function drawLabels() {
    var r = 0;
    properties.forEach(function(d, i) {
      var l, x, y;

      l = radius;
      x = (l + labelMargin) * Math.cos(r);
      y = (l + labelMargin) * Math.sin(r);
      g.append('text')
        .attr('class', 'star-label')
        .attr('x', origin[0] + x)
        .attr('y', origin[1] + y)
        .text(labels[i])
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')

      r += radians;
    })
  }

  function drawChart() {
    g.append('circle')
      .attr('class', 'star-origin')
      .attr('cx', origin[0])
      .attr('cy', origin[1])
      .attr('r', 2)

    var path = d3.svg.line.radial()

    var pathData = [];
    var r = Math.PI / 2;
    properties.forEach(function(d, i) {
      var userScale = scales[i] || scales[0];
      pathData.push([
        scale(userScale(datum[d])),
        r
      ])
      r += radians;
    });

    g.append('path')
      .attr('class', 'star-path')
      .attr('transform', 'translate(' + origin[0] + ',' + origin[1] + ')')
      .attr('d', path(pathData) + 'Z');

    g.append('text')
      .attr('class', 'star-title')
      .attr('x', origin[0])
      .attr('y', -(margin.top / 2))
      .text(title(datum))
      .style('text-anchor', 'middle')
  }

  function drawInteraction() {
    var path = d3.svg.line.radial();

    // `*Interaction` variables are used to build the interaction layer.
    // `*Extent` variables are used to compute (and return) the x,y
    // positioning of the attribute extents. `*Value` variables are used
    // for the attribute values.
    var rInteraction = Math.PI / 2;
    var rExtent = 0;
    properties.forEach(function(d, i) {
      var lInteraction, xInteraction, yInteraction;
      var lExtent, xExtent, yExtent;

      lInteraction = radius;
      xInteraction = lInteraction * Math.cos(rInteraction);
      yInteraction = lInteraction * Math.sin(rInteraction);

      lExtent = radius + labelMargin;
      xExtent = lExtent * Math.cos(rExtent) + origin[0] + margin.left;
      yExtent = lExtent * Math.sin(rExtent) + origin[1] + margin.top;

      var userScale = scales[i] || scales[0];
      lValue = scale(userScale(datum[d]));
      x = lValue * Math.cos(rExtent) + origin[0] + margin.left;
      y = lValue * Math.sin(rExtent) + origin[1] + margin.top;

      var halfRadians = radians / 2;
      var pathData = [
        [0, rInteraction - halfRadians],
        [lInteraction, rInteraction - halfRadians],
        [lInteraction, rInteraction + halfRadians]
      ];

      var datumToBind = {
        xExtent: xExtent,
        yExtent: yExtent,
        x: x,
        y: y,
        key: properties[i],
        datum: datum
      };

      g.append('path')
        .datum(datumToBind)
        .attr('class', 'star-interaction')
        .attr('transform', 'translate(' + origin[0] + ',' + origin[1] + ')')
        .attr('d', path(pathData) + 'Z');

      rInteraction += radians;
      rExtent += radians;
    })
  }

  function nop() {
    return;
  }

  chart.interaction = function() {
    drawInteraction();
  };

  chart.properties = function(_) {
    if (!arguments.length) return properties;
    properties = _;
    radii = properties.length;
    radians = 2 * Math.PI / radii;
    return chart;
  };

  chart.scales = function(_) {
    if (!arguments.length) return scales;
    if (Array.isArray(_)) {
      scales = _;
    } else {
      scales = [_];
    }
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    radius = width / 2;
    origin = [radius, radius];
    scale.range([0, radius])
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    origin = [radius, radius];
    return chart;
  };

  chart.labelMargin = function(_) {
    if (!arguments.length) return labelMargin;
    labelMargin = _;
    return chart;
  };

  chart.title = function(_) {
    if (!arguments.length) return title;
    title = _;
    return chart;
  };

  chart.labels = function(_) {
    if (!arguments.length) return labels;
    labels = _;
    return chart;
  };

  chart.includeGuidelines = function(_) {
    if (!arguments.length) return includeGuidelines;
    includeGuidelines = _;
    return chart;
  };

  chart.includeLabels = function(_) {
    if (!arguments.length) return includeLabels;
    includeLabels = _;
    return chart;
  };

  return chart;
}

