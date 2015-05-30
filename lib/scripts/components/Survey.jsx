/** @jsx React.DOM */

var react = require('react/addons'),
  api = require('../services/api'),
  Survey;

module.exports = Survey = React.createClass({
  componentWillMount: function () {
    api.config(this.props);
  },

  componentDidMount: function () {
    api.getQuestions();
  },

  render: function () {
    return <div>A Survey!</div>
  }
});