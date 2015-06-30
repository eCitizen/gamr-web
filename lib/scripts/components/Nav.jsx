
var React = require('react/addons'),
  Router = require('react-router'),
  State = Router.State,
  classnames = require('classnames'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  AboutActions = require('../AboutStore/AboutStore.jsx').Actions,
  Progress = require('./Progress.jsx'),
  Title = require('./Title.jsx'),
  Nav2;

module.exports = Nav2 = React.createClass({
  mixins: [State],

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
    return (
      <div className='nav'>
        <div className='nav-left'>
          <Title className='nav-title-sub'>Identity</Title>
          <Title className='nav-title'>Informed consent</Title>
        </div>
        <div className='nav-right'>
          <Progress/>
        </div>
      </div>
    );
  }
});
