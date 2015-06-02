var React = require('react/addons'),
  Select;

module.exports = Select = React.createClass({
	render: function () {
		var self = this,
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
	      onChange={this.props.onchange.bind(this,this.props.id)}>
	      <option value="">{this.props.label}</option>
	      {options}
	    </select>
   	);
	}
});