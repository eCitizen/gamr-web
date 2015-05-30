/** @jsx React.DOM */

var React = require('react/addons'),
  Survey = require('./components/Survey.jsx');

if (typeof gamrConfig !== 'undefined') {
  React.render(<Survey {... gamrConfig}/>,document.getElementById('gamr'));
} else {
  console.error('[gamr]','You must setup `gamrConfig`');
}

