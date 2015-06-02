var React = require('react/addons'),
  Input;

module.exports = Input = React.createClass({
	_update: function (event) {
		var newState = {};
		newState[this.props.id] = event.target.value;
		this.props.form.setState(newState);
	},

	render: function () {
		var formState = this.props.form.state;
		return <input
							onChange={this._update}
							value={formState[this.props.id]}
							placeholder={this.props.label}/>;
	}
});