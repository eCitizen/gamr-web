
var React = require('react');
var InputStore = require('../input/store');
var Loading = require('./Loading.jsx');
var Grid = require('./Grid.jsx');
var api = require('../services/api');

module.exports = React.createClass({
  displayName: 'Profile',

  getInitialState: function () {
    return {
      processed: false,
      formData: InputStore.getAllForms()
    };
  },

  componentDidMount: function () {
    api.submitQuestions(this.state.formData, function (err, data) {
      this.setState({
        processed: true
      });
    }.bind(this));

    setTimeout(function () {
      this.setState({
        waited: true
      });
    }.bind(this), 2000);

    process.nextTick(function () {
      this.setState({
        loadingIcon: true
      })
    }.bind(this))
  },

  render: function () {
    var content;

    if (this.state.processed && this.state.waited) {
      content = (
        <div>
          <h1>Profile</h1>
          <p>
            Here are your results...
          </p>
          <pre>
            {JSON.stringify(this.state.formData, null, 2)}
          </pre>
        </div>
      );
    } else {
      content = (
        <div className='loading-profile'>
          <h5>Creating Your Profile</h5>
          <Loading active={this.state.loadingIcon}/>
        </div>
      );
    }

    return (
      <Grid>
        {content}
      </Grid>
    );
  }
});