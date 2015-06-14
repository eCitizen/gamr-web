
var React = require('react/addons'),
  classnames = require('classnames'),
  Splitter;

module.exports = Splitter = React.createClass({
  getDefaultProps: function () {
    return {
      separator: '',
      classPrefix: 'seg',
      makeStyle: function () { return; }
    };
  },

  render: function () {
    if (typeof this.props.children !== 'string') {
      throw new Error('[Splitter] must have a string as children');
    }

    var segments = this.props.children.split(this.props.separator),
      classPrefix = this.props.classPrefix,
      makeStyle = this.props.makeStyle;

    return (
      <div className='splitter'>
        {segments.map(function (seg, idx) {
          return (
            <span 
              style={makeStyle(idx,seg)}
              className={classnames(classPrefix, classPrefix+'-'+idx)}
              key={idx}>
              <span className='in'>{seg}</span>
            </span>
          );
        })}
      </div>
    );
  }
});