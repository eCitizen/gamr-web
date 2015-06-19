
var React = require('react/addons'),
  Title = require('./Title.jsx'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  AboutActions = require('../AboutStore/AboutStore.jsx').Actions,
  About;

module.exports = About = React.createClass({
  getInitialState: function () {
    return {
      about: AboutStore.get()
    };
  },

  componentDidMount: function () {
    AboutStore.addChangeListener(this.handleAbout);
  },

  componentWillUnount: function () {
    AboutStore.removeChangeListener(this.handleAbout);
  },

  handleAbout: function () {
    this.setState({
      about: AboutStore.get()
    });
  },

  toggleAbout: function () {
    if (this.state.about) {
      AboutActions.close();
    } else {
      AboutActions.open();
    }
  },

  render: function () {
    if (!this.state.about) {
      return null;
    }
    return (
      <div className='about'>
        <Title className='section' separator='.'>About</Title>
      </div>
    );
  }
});