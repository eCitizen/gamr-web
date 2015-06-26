
var React = require('react/addons'),
  Router = require('react-router'),
  State = Router.State,
  Link = Router.Link,
  classnames = require('classnames'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  AboutActions = require('../AboutStore/AboutStore.jsx').Actions,
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
    var navRoutes, level1, level2;

    navRoutes = this.getRoutes().map(function (r) {
      return r.name;
    });

    // Do not render on home page
    if (navRoutes[1] === 'intro') {
      return null;
    }

    level1 = [
      makeNavLink('identity', 'Identity', navRoutes[1], 'consent'),
      makeNavLink('survey', 'Survey', navRoutes[1], 'brain'),
      makeNavLink('results', 'Results', navRoutes[1], 'results')
    ];

    switch (navRoutes[1]) {
      case 'identity':
        level2 = [
          makeNavLink('consent', 'Informed Consent', navRoutes[2]),
          makeNavLink('games', 'Gameplay', navRoutes[2]),
          makeNavLink('profile', 'Profiles', navRoutes[2]),
          makeNavLink('bio', 'Background', navRoutes[2])
        ];
        break;

      case 'survey':
        level2 = [
          makeNavLink('brain', 'Brain Type', navRoutes[2]),
          makeNavLink('personality', 'Personality', navRoutes[2]),
          makeNavLink('gamer-type', 'Gamer Type', navRoutes[2]),
        ];
        break;

      case 'results':
        level2 = [

        ];
        break;
      default:
        // noop
    }

    return (
      <div className='nav'>
        <div className='left'>
          <ul className='nav-list level-1'>
            <li className='home-link'>
              <Link to='home'>PROJECT GAMR</Link>
            </li>
          </ul>
          <ul className='nav-list level-2'>
            <li className='about-link' onClick={this.toggleAbout}>
              [About]
            </li>
          </ul>
        </div>
        <div className='right'>
          <ul className='nav-list level-1'>{level1}</ul>
          <ul className='nav-list level-2'>{level2}</ul>
        </div>
      </div>
    );
  }
});

var key = 0;
function makeNavLink(slug, name, level, to) {
  return (
    <li className={getClass(slug, level)} key={key++}>
      <Link to={to || slug}>{name}</Link>
    </li>
  );
}

function getClass(route, current) {
  return classnames({
    active: route === current,
    finished: isFinished(route, current)
  });
}

// TODO:
// substitute for an actual check

var order = [
  'identity',
  'survey',
  'results',
  'consent',
  'games',
  'profile',
  'bio',
  'brain',
  'personality',
  'gamer-type',
  'results'
];

function isFinished(route, current) {
  return order.indexOf(route) < order.indexOf(current);
}


