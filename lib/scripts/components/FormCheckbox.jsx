
var React = require('react/addons'),
  classnames = require('classnames'),
  InputStore = require('../input/store'),
  FormCheckbox;


module.exports = FormCheckbox = React.createClass({
  getInitialState: function () {
    return {
      checked: this.props.checked  
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
    var form = this.props.formId ? InputStore.getForm(this.props.formId) : null;
    this.props.action(checked, form);
    this.setState({
      checked: checked
    });
  },

  render: function () {
    return (
      <div className='checkbox-wrap'>
        <div className={classnames('checkbox', {'checked': this.state.checked})} 
          onClick={this._handleClick}/>
        <label onClick={this._handleClick}>
          {this.props.children}
        </label>
      </div>
    );
  }
});