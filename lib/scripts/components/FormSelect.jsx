var React = require('react/addons'),
	InputActions = require('../input/actions'),
	InputStore = require('../input/store'),
  Select;

module.exports = Select = React.createClass({
	getInitialState: function () {
		return {
			value: InputStore.getField(this.props.formId, this.props.id)
		}
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
		console.log(";what", this.props.formId);
		this.setState({
			value: InputStore.getField(this.props.formId, this.props.id)
		})
	},

	render: function () {
		console.log(this.state.value);

		if (Array.isArray(this.props.options)) {
			console.log('deal with array options');
		} else {
			options = Object.keys(this.props.options).map(function (key, idx) {
      	return <option value={key} key={idx}>{this.props.options[key]}</option>;
    	}.bind(this));
		}

		return (
	    <select 
	      value={this.state.value} 
	      onChange={this._update}>
	      <option value="">{this.props.label}</option>
	      {options}
	    </select>
   	);
	}
});