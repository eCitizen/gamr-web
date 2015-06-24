var ejs = require('ejs'),
  getPageData = require('./getPageData'),
  readFile = require('fs').readFileSync,
  writeFileSync = require('fs').writeFileSync;

var template = ejs.compile(readFile(__dirname + '/../views/index.ejs').toString());
var html = template(getPageData());

console.log(html);