
var React = require('react/addons'),
  InputStore = require('../input/store'),
  Button = require('./Button.jsx'),
  FormSubmit;


module.exports = FormSubmit = React.createClass({
  getDefaultProps: function () {
    return {
      action: function () {}
    };
  },

  render: function () {
    return (
      <Button className={this.props.className} action={function () {
        this.props.action(InputStore.getForm(this.props.formId));
      }.bind(this)}>
        {this.props.children}
      </Button>
    );
  }
});