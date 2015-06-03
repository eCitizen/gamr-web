var React = require('react/addons'),
	classnames = require('classnames'),
	FormField = require('./FormField.jsx'),
  Select;

module.exports = Select = React.createClass({
	mixins: [FormField],

	propTypes: {
		formId: React.PropTypes.string,
		vallidate: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			required: true,
			defaultValue: ''
		};
	},

	render: function () {
		return (
			<div className={classnames('gamr-field gamr-input',{
				invalid: !this.state.valid
			})}>
		    <input 
		      value={this.state.value}
		      placeholder={this.props.label}
		      onChange={this._update}/>
	    </div>
   	);
	}
});