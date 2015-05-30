/** @jsx React.DOM */

var react = require('react/addons'),
  api = require('../services/api'),
  Survey;

module.exports = Survey = React.createClass({
  getInitialState: function () {
    return {
      data: null
    };
  },

  _setData: function (data) {
    this.setState({
      data: data
    });
  },

  componentWillMount: function () {
    api.config(this.props);
  },

  componentDidMount: function () {
    api.getQuestions(this._setData);
  },

  render: function () {
    if (this.state.data) {
      return <div>{this.state.data}</div>;
    } else {
      return null;
    }
  }
});