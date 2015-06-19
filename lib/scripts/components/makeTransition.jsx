
var React = require('react/addons'),
  ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = function (Component) {
  return React.createClass({
    statics: {
      willTransitionFrom: function (transition, component, callback) {
        component.setState({
          show: false
        });
        setTimeout(callback, 300);
      }
    },

    getInitialState: function () {
      return {
        show: true
      };
    },

    // componentDidMount: function () {
    //   pocess.nextTick(function () {
    //     this.setState({
    //       show: true
    //     });
    //   }.bind(this));
    // },

    render: function () {
      return (
        <ReactCSSTransitionGroup 
          transitionName='example'
          transitionAppear={true}
          component='div'>
          {this.state.show ? <Component {... this.props} key='a'/> : null}
        </ReactCSSTransitionGroup>
      );
    }
  });
};