var React = require('react/addons'),
  Form;

module.exports = Form = React.createClass({
	getInitialState: function () {
		return {};
	},

	render: function () {
		console.log(this.state);

		var self = this;

		var fields = React.Children.map(this.props.children, function (child) {
			console.log(child);
			var connected = React.cloneElement(child, {form: self});
			return connected;
		});

		return (
			<form>
				{fields}
			</form>
		);
	}
});