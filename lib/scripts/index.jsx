/** @jsx React.DOM */

var React = require('react/addons'),
  App = require('./components/App.jsx');

if (typeof gamrConfig !== 'undefined') {
  App(gamrConfig);
} else {
  console.error('[gamr]','You must setup `gamrConfig`');
}

