
var React = require('react');
var classnames = require('classnames');
var InputStore = require('../input/store');
var InputActions = require('../input/actions');
var touchdown = require('../services/touchdown');

module.exports = React.createClass({
  displayName: 'FormCheckbox',

  getInitialState: function () {
    return {
      checked: this.props.formId ? 
          InputStore.getForm(this.props.formId)[this.props.id] : 
          this.props.checked
    };
  },

  getDefaultProps: function () {
    return {
      checked: false,
      action: function () {},
    };
  },

  _handleClick: function () {
    var checked = !this.state.checked;
    if (this.props.formId) {
      InputActions.updateField(this.props.formId, this.props.id, checked);
    }
    this.props.action(checked);
    this.setState({
      checked: checked
    });
  },

  render: function () {
    return (
      <div className='checkbox-wrap' {... touchdown(this._handleClick)}>
        <div className={classnames(this.props.className, 'checkbox', {'checked': this.state.checked})} />
        <label>
          {this.props.children}
        </label>
      </div>
    );
  }
});