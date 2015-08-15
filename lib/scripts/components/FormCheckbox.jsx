
var React = require('react'),
  classnames = require('classnames'),
  InputStore = require('../input/store'),
  InputActions = require('../input/actions'),
  FormCheckbox;


module.exports = FormCheckbox = React.createClass({
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
      <div className='checkbox-wrap' onMouseDown={this._handleClick}>
        <div className={classnames(this.props.className, 'checkbox', {'checked': this.state.checked})} />
        <label>
          {this.props.children}
        </label>
      </div>
    );
  }
});