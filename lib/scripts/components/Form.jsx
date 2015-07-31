var React = require('react'),
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
    InputStore.on(this.props.id+'submit', this._handleSubmit);
  },

  componentWillUnmount: function () {
    InputStore.removeListener(this.props.id, this._handleChange);
    InputStore.removeListener(this.props.id+'submit', this._handleSubmit);
  },

  _handleChange: function () {
    var data = InputStore.getForm(this.props.id);
    if (this.props.onChange) this.props.onChange(data);
    this.setState({
      formData: data
    });
  },

  _handleSubmit: function () {
    var data = InputStore.getForm(this.props.id);
    if (this.props.onSubmit) this.props.onSubmit(data);
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
