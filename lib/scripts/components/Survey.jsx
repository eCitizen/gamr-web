/** @jsx React.DOM */

var react = require('react/addons'),
  api = require('../services/api'),
  Survey;

module.exports = Survey = React.createClass({
  render: function () {
    console.log('hello')
    return <div>A Survey!</div>
  }
});