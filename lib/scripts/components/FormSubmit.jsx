
var React = require('react');
var InputStore = require('../input/store');
var InputActions = require('../input/actions');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: 'FormSubmit',

  getDefaultProps: function () {
    return {
      action: function () {}
    };
  },

  render: function () {
    return (
      <Button className={this.props.className} action={function () {
        InputActions.submit(this.props.formId);
        if (this.props.action) this.props.action(InputStore.getForm(this.props.formId));
      }.bind(this)}>
        {this.props.children}
      </Button>
    );
  }
});