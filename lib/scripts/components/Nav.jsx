
var React = require('react/addons');
var State = require('react-router').State;
var classnames = require('classnames');
var Progress = require('./Progress.jsx');
var Title = require('./Title.jsx');

var config = {
  '/identity/consent': {
    main: 'Consent',
    progress: 0
  },
  '/identity/gameplay':  {
    main: 'Identity',
    progress: 1
  },
  '/identity/profile': {
    main: 'Identity',
    progress: 1
  },
  '/identity/background': {
    main: 'Identity',
    progress: 1
  },
  '/survey/brain-type': {
    main: 'Brain Type',
    progress: 2
  },
  '/survey/personality': {
    main: 'Personality',
    progress: 3
  },
  '/survey/gamer-type': {
    main: 'Gamer Type',
    progress: 4
  }
}

module.exports = React.createClass({
  displayName: 'Nav',

  mixins: [State],

  render: function () {
    console.log(this.getPathname());
    var text = config[this.getPathname()];

    if (!text) return null;

    return (
      <div>
        <div className='nav-shadow'/>
        <div className='nav-wrap'>
          <div className='nav'>
            <div className='nav-left'>
              <Title className='nav-title-sub a'>PROJECT</Title>
              <Title className='nav-title-sub b'>GAMR</Title>
              <Title className='nav-title'>{text.main}</Title>
            </div>
            <div className='nav-right'>
              <Progress current={text.progress} length={5}/>
              <span className='pipe'>|</span>
              <span className='about-toggle'>About</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
