var React = require('react/addons'),
  Select;

module.exports = Select = React.createClass({
	_update: function (event) {
		var newState = {};
		newState[this.props.id] = event.target.value;
		this.props.form.setState(newState);
	},

	render: function () {
		var formState = this.props.form.state,
			self = this,
			options;

		if (Array.isArray(this.props.options)) {
			console.log('deal with array options');
		} else {
			options = Object.keys(this.props.options).map(function (key, idx) {
      	return <option value={key} key={idx}>{self.props.options[key]}</option>;
    	});
		}

		return (
	    <select 
	      value={formState[this.props.id]} 
	      onChange={this._update}>
	      <option value="">{this.props.label}</option>
	      {options}
	    </select>
   	);
	}
});