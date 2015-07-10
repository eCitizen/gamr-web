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
    var optionsData = {};

    if (Array.isArray(this.props.options)) {
      options = this.props.options.map(function (v, idx) {
        optionsData[v.value] = v.label;
        return <option value={v.value} key={idx}>{v.label}</option>;
      });
    } else {
      optionsData = this.props.options;
      options = Object.keys(optionsData).map(function (key, idx) {
        return <option value={key} key={idx}>{optionsData[key]}</option>;
      });
    }

    return (
      <div className={classnames('gamr-field gamr-select', {
        invalid: !this.state.valid,
        'has-value': this.state.value
      })}>
        <span className='select-cover'>{optionsData[this.state.value] || this.props.label}</span>
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