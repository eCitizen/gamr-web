
/*
 * Mixin for form fields
 */

var InputActions = require('../input/actions'),
  InputStore = require('../input/store');

module.exports = {
  getInitialState: function () {
    InputActions.setField(this.props.formId, this.props.id, this.props.defaultValue);
    return this._getState();
  },

  componentDidMount: function () {
    InputStore.on(this.props.formId, this._handleChange);
  },

  componentWillUnmount: function () {
    InputStore.removeListener(this.props.formId, this._handleChange);
  },

  _update: function (event) {
    InputActions.updateField(this.props.formId, this.props.id, event.target.value);
  },

  _handleChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var value = InputStore.getField(this.props.formId, this.props.id);
    var valid = (typeof this.props.validate === 'function') ?
          this.props.validate(value, this.props.id) : true;

    return {
      value: value,
      valid: valid
    };
  },
};