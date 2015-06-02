var React = require('react/addons'),
  FormField;

var fields = {
	select: require('./FormSelect.jsx'),
	input: require('./FormInput.jsx')
};

module.exports = FormField = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
	},

	render: function () {
		if (fields.hasOwnProperty(this.props.type)) {
			return React.createElement(fields[this.props.type], this.props);
		} else {
			console.error('[form] invalid field type:',this.props.type);
			return null;
		}
	}
});