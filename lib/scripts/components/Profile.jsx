
var React = require('react');
var Grid = require('./Grid.jsx');
var InputStore = require('../input/store');

module.exports = React.createClass({
  displayName: 'Profile',

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