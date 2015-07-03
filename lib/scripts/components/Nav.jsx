
var React = require('react/addons');
var State = require('react-router').State;
var classnames = require('classnames');
var Progress = require('./Progress.jsx');
var Title = require('./Title.jsx');

var config = {
  '/identity/consent': {
    main: 'Informed Consent',
    progress: 0
  },
  '/identity/gameplay':  {
    main: 'Gameplay',
    sub: 'identity',
    progress: 1
  },
  '/identity/profile': {
    main: 'Profile',
    sub: 'identity',
    progress: 1
  },
  '/identity/background': {
    main: 'Background',
    sub: 'identity',
    progress: 1
  },
  '/survey/brain-type': {
    main: 'Brain Type',
    sub: 'survey',
    progress: 2
  },
  '/survey/personality': {
    main: 'Personality',
    sub: 'survey',
    progress: 3
  },
  '/survey/gamer-type': {
    main: 'Gamer Type',
    sub: 'survey',
    progress: 4
  }
}

module.exports = React.createClass({
  displayName: 'Nav',

  mixins: [State],

  render: function () {
    console.log(this.getPathname());
    var text = config[this.getPathname()];

    return (
      <div className='nav'>
        <div className='nav-left'>
          {text.sub ? <Title className='nav-title-sub'>{text.sub}</Title> : null}
          <Title className='nav-title'>{text.main}</Title>
        </div>
        <div className='nav-right'>
          <Progress current={text.progress} length={5}/>
          <span className='pipe'>|</span>
          <span className='about-toggle'>About</span>
        </div>
      </div>
    );
  }
});
