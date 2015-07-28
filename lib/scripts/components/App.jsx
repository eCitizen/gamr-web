
var React = require('react'),
  Router = require('react-router'),
  DefaultRoute = Router.DefaultRoute,
  NotFoundRoute = Router.NotFoundRoute,
  Route = Router.Route,
  api = require('../services/api'),
  guide = require('../services/guide'),
  makeTransition = require('./makeTransition.jsx');

var Home = require('./Home.jsx'),
  Games = require('./Games.jsx'),
  Identity = require('./Identity.jsx'),
  Survey = require('./Survey.jsx'),
  Section = require('./Section.jsx'),
  Consent = require('./Consent.jsx'),
  ProfileWrap = require('./ProfileWrap.jsx'),
  Profile = require('./Profile.jsx'),
  Intro = require('./Intro.jsx'),
  NotFound = require('./NotFound.jsx'),
  BrainType = Section.BrainType,
  Personality = Section.Personality,
  GamerType = Section.GamerType;

var routes = (
  <Route name="home" path="/" handler={Home}>
    <Route name="consent" path="consent" handler={Consent}/>
    <Route name="identity" path="identity" handler={Identity}/>
    <Route name="survey" handler={Survey}>
      <Route name="brain" path="brain-type" handler={BrainType}/>
      <Route name="personality" path="personality" handler={Personality}/>
      <Route name="gamer-type" path="gamer-type" handler={GamerType}/>
    </Route>
    <Route name="results" handler={ProfileWrap}>
      <Route name="profile" path=":data?" handler={Profile}/>
      <DefaultRoute handler={NotFound}/>
    </Route>
    <DefaultRoute name='intro' handler={Intro}/>
    <NotFoundRoute name='not-found' handler={NotFound}/>
  </Route>
);

module.exports = function (config) {
  api.config(config);
  guide.config(config);
  var cb = function (Handler, state) {
    React.render(<Handler params={state.params}/>, document.body);
  };
  if (config.usePushState) {
    Router.run(routes, Router.HistoryLocation, cb);
  } else {
    Router.run(routes, cb);
  }
};
