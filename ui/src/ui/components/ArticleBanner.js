'use strict';


var m = require('mithril');


var ArticleMetaAndActions = require('./ArticleMetaAndActions');

var utils = require('./../utils');


function view(vnode) {
  var title = vnode.attrs.article();
  var ttle = title !== null ? title.body : '...';
  return m('div', [
    m.trust(utils.convertMarkdownToHTML(ttle)),
    m(ArticleMetaAndActions, {
      article: vnode.attrs.article()
    })
  ]);
};


module.exports = {
  view: view
};
