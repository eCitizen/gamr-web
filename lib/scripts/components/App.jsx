/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  DefaultRoute = Router.DefaultRoute,
  NotFoundRoute = Router.NotFoundRoute,
  Route = Router.Route,
  Link = Router.Link,
  RouteHandler = Router.RouteHandler,
  api = require('../services/api');

var Home = require('./Home.jsx'),
  Identity = require('./Identity.jsx'),
  Survey = React.createClass({render: function () { return <Router.RouteHandler {... this.props}/>; }}),
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
    <Route name="survey" handler={Survey}>
      <Route name="identity" path="identity" handler={Identity}/>
      <Route name="brain" path="brain-type" handler={BrainType}/>
      <Route name="personality" path="personality" handler={Personality}/>
      <Route name="gamer-type" path="gamer-type" handler={GamerType}/>
      <DefaultRoute handler={Consent}/>
    </Route>
    <Route name="profile" handler={ProfileWrap}>
      <Route name="reward" path=":data" handler={Profile}/>
      <DefaultRoute handler={NotFound}/>
    </Route>
    <DefaultRoute handler={Intro}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = function (config) {
  api.config(config);
  Router.run(routes, function (Handler, state) {
    React.render(<Handler params={state.params}/>, document.body);
  });
}
