var React = require('react/addons'),
	InputActions = require('../input/actions'),
	InputStore = require('../input/store'),
	classnames = require('classnames'),
  Select;

module.exports = Select = React.createClass({
	getDefaultProps: function () {
		return {
			required: true,
			defaultValue: '',
			vallidate: function (value) {
				if (!this.props.required) return true;
				return value.trim() ? true : false;
			}
		};
	},

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
		var value = event.target.value,
			valid = this.props.vallidate.call(this, value);
		InputActions.updateField(this.props.formId, this.props.id, value, valid);
	},

	_handleChange: function () {
		this.setState(this._getState());
	},

	_getState: function () {
		var value = InputStore.getField(this.props.formId, this.props.id);
		return {
			value: value,
			valid: this.props.vallidate.call(this, value)
		}
	},

	render: function () {
		if (Array.isArray(this.props.options)) {
			console.log('deal with array options');
		} else {
			options = Object.keys(this.props.options).map(function (key, idx) {
      	return <option value={key} key={idx}>{this.props.options[key]}</option>;
    	}.bind(this));
		}

		return (
			<div className={classnames('gamr-select',{
				invalid: !this.state.valid
			})}>
		    <select 
		      value={this.state.value} 
		      onChange={this._update}>
		      <option value=''>{this.props.label}</option>
		      {options}
		    </select>
	    </div>
   	);
	}
});