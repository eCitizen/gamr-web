
var api = require('../services/api');
var React = require('react');
var Grid = require('./Grid.jsx');
var InputStore = require('../input/store');

module.exports = React.createClass({
  displayName: 'Profile',

  componentDidMount: function () {
    /*
     * TODO: when to subbmit and when not to?
     */
    var formData = InputStore.getAllForms();
    api.submitQuestions(formData, function (err, data) {
      console.log('from server', data);
    }.bind(this));
  },

  render: function () {
    return (
      <Grid>
        <h1>Profile</h1>
        <p>
          Here are your results...
        </p>
        <pre>
          {JSON.stringify(InputStore.getAllForms(), null, 2)}
        </pre>
      </Grid>
    );
  }
});