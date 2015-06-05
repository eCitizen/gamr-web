
var React = require('react/addons'),
	InputStore = require('../input/store'),
  FormSubmit;


module.exports = FormSubmit = React.createClass({
	getInitialProps: function () {
		return {
			action: function () {}
		};
	},

	render: function () {
		return (<div onClick={function () {
			this.props.action(InputStore.getForm(this.props.formId));
		}.bind(this)}>Submit!</div>);
	}
});