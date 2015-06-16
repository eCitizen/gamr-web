
var app = require('./components/App.jsx');

if (typeof gamrConfig !== 'undefined') {
  app(gamrConfig);
} else {
  console.error('[gamr]','You must setup `gamrConfig`');
}

