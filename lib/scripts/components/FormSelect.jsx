var React = require('react/addons'),
  classnames = require('classnames'),
  FormField = require('./FormField.jsx'),
  Select;

module.exports = Select = React.createClass({
  mixins: [FormField],

  propTypes: {
    formId: React.PropTypes.string,
    options: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]).isRequired,
    vallidate: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      required: true,
      defaultValue: ''
    };
  },

  render: function () {
    var options;
    if (Array.isArray(this.props.options)) {
      // this was put in to support months
      options = this.props.options.map(function (v, idx) {
        return <option value={v.value} key={idx}>{v.label}</option>;
      });
    } else {
      options = Object.keys(this.props.options).map(function (key, idx) {
        return <option value={key} key={idx}>{this.props.options[key]}</option>;
      }.bind(this));
    }

    // TODO: there is an issue with array options and getting current label

    return (
      <div className={classnames('gamr-field gamr-select', {
        invalid: !this.state.valid,
        'has-value': this.state.value
      })}>
        <span className='select-cover'>{this.props.options[this.state.value] || this.props.label}</span>
        <select 
          value={this.state.value}
          onChange={this._update}>
          <option value=''>{this.props.label}</option>
          {options}
        </select>
      </div>
     );
  }
});