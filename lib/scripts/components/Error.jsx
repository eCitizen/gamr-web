
var React = require('react');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var errorSvc = require('../services/error');
var touchdown = require('../services/touchdown');

module.exports = React.createClass({
  displayName: 'Error',

  getInitialState: function() {
    return { error: null };
  },

  componentDidMount: function () {
    errorSvc.onCreate(this.open);
    errorSvc.onDismiss(this.close);
  },

  componentWillUnmount: function () {
    errorSvc.offCreate(this.open);
    errorSvc.offDismiss(this.close);
  },

  open: function (config) {
    this.setState({
      error: config
    })
  },

  close: function () {
    this.setState({
      error: null
    });
  },

  render: function () {
    var child = <div/>;
    if (this.state.error) {
      child = (
        <div key='message' className='gamr-error-wrap'>
          <div className='gamr-error' {... touchdown(errorSvc.dismiss)}>
            <h4>{this.state.error.title}</h4>
            <p>{this.state.error.message}</p>
            <span className='gamr-error-dismiss fa fa-times'/>
          </div>
        </div>
      );
    }
    return (
      <CSSTransitionGroup transitionName='err-fade'>
        {child}
      </CSSTransitionGroup>
    );
  }
});