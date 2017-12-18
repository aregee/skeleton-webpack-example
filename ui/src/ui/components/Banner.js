'use strict';


var m = require('mithril');
const Search = require('./Search');
const Suggestion = require('./Suggestion');

function view(vnode) {
  var content = [
    m('h1.logo-font', 'healthmonitor'),
    m('p', 'Remote healthcare diagnostics.'),
    m(Search, {
      suggestion: Suggestion
    })
  ];
  console.log(Search);
  if (vnode.children.length > 0) {
    content = vnode.children;
  }

  return m('.banner',
    m('.container', content)
  );
};


module.exports = {
  view: view
};
