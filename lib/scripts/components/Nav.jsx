
var React = require('react');
var State = require('react-router').State;
var classnames = require('classnames');
var Progress = require('./Progress.jsx');
var Title = require('./Title.jsx');
var Link = require('react-router').Link;

var config = {
  '/consent': {
    main: 'Consent',
    progress: 0
  },
  '/identity':  {
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
  },
  '/results/': {
    main: null,
    progress: 4
  }
}

module.exports = React.createClass({
  displayName: 'Nav',

  mixins: [State],

  render: function () {
    console.log('pathname', this.getPathname());
    var text = config[this.getPathname()];

    if (!text) return null;

    return (
      <div>
        <div className='nav-shadow'/>
        <div className='nav-wrap'>
          <div className='nav'>
            <div className='nav-left'>
              <Link to='home'>
                <Title className='nav-title-sub a'>PROJECT GAMR</Title>
              </Link>
              <Title className='nav-title'>{text.main}</Title>
            </div>
            <div className='nav-right'>
              <Progress current={text.progress} length={5}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
