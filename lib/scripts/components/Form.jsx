var React = require('react/addons'),
  InputStore = require('../input/store'),
  InputActions = require('../input/actions'),
  classnames = require('classnames'),
  Form;

module.exports = Form = React.createClass({
  getInitialState: function () {
    InputActions.createForm(this.props.id);
    return {
      formData: InputStore.getForm(this.props.id)
    };
  },

  componentDidMount: function () {
    InputStore.on(this.props.id, this._handleChange);
  },

  componentWillUnmount: function () {
    InputStore.removeListener(this.props.id, this._handleChange);
  },

  _handleChange: function () {
    this.setState({
      formData: InputStore.getForm(this.props.id)
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
      <form className={classnames('gamr-form',this.props.className)}>
        {fields}
      </form>
    );
  }
});
