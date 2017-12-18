'use strict';


var m = require('mithril');


var utils = require('./../utils');
var TagList = require('./TagList');


function view(vnode) {
  var article = vnode.attrs.article;
  var content = m('div', '...');

  if (article) {
    content = [
      m('div.col-xs-12', [
        m('div', m.trust(utils.convertMarkdownToHTML(article.body))),
        m(TagList, {
          list: article.author.permissions,
          style: TagList.styles.OUTLINE
        })
      ])
    ];
  }

  return m('div.article-content', content);
};


module.exports = {
  view: view
};
