
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

	_vallidate: function (value) {
		if (!this.props.required) {
			return true;
		} else if (typeof value === 'string') {
			return value.trim() ? true : false;
		} else {
			return value ? true : false;
		}
	},

	_getState: function () {
		var value = InputStore.getField(this.props.formId, this.props.id),
			valid = (typeof this.props.vallidate === 'function') ?
					this.props.vallidate(value) : this._vallidate(value);
		return {
			value: value,
			valid: valid
		};
	},
};