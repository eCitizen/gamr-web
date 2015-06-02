var React = require('react/addons'),
	InputStore = require('../input/store'),
  Form;

module.exports = Form = React.createClass({
	getInitialState: function () {
		return {};
	},

	componentDidMount: function () {
		InputStore.on(this.props.id, this._handleChange);
	},

	componentWillUnmount: function () {
		InputStore.removeListener(this.props.id, this._handleChange);
	},

	_handleChange: function () {
		console.log('form change', InputStore.getForm(this.props.id));
		this.setState({
			new: true
		});
	},

	render: function () {
		var formId = this.props.id;

		// Aggressivly pas down prop for form id!
		var fields = (function replace(children) {
			return React.Children.map(children, function (child) {
				if (!React.isValidElement(child)) {
					return child;
				} else {
					return React.cloneElement(child, {
						formId: formId,
						children: replace(child.props.children)
					});
				}
			});
		}(this.props.children));

		return (
			<form>
				{fields}
			</form>
		);
	}
});
