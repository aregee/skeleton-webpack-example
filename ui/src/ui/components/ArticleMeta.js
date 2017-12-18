'use strict';


var m = require('mithril');


var utils = require('./../utils');
var Link = require('./Link');


function view(vnode) {
  var article = vnode.attrs.article ? vnode.attrs.article : null;
  var content = m('div', '...');

  if (article) {
    content = [
      m(Link, {
          to: '/@' + article.author.name
        },
        m('img', {
          src: utils.getUserImageOrDefault(article.author)
        })
      ),
      m('div.info',
        m(Link, {
          className: 'author',
          to: '/@' + article.author.name
        }, article.author.name),
        m('span.date', utils.formatDate(article.createdAt))
      )
    ];
  }

  return m('div.article-meta', {
    style: vnode.attrs.style
  }, [
    content
  ]);
};


module.exports = {
  view: view
};
