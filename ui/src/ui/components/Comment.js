'use strict';


var m = require('mithril');


var utils = require('./../utils');
var Link = require('./Link');
var ArticleMetaAndActions = require('./ArticleMetaAndActions');

function view(vnode) {
  // var article = vnode.attrs.article.data;
  var comment = vnode.attrs.comment;
  var content = m('div', '...');

  if (comment) {
    console.log(comment);
    content = [
      m('div.col-xs-12', [
        m('div', m.trust(utils.convertMarkdownToHTML(comment.body)))
      ]),
      m('div.article-actions', m(ArticleMetaAndActions, {
        article: comment
      }))
    ];
  }

  return m('div.article-content', [content]);
};


module.exports = {
  view: view
};


// ('div.article-meta', [
// 	m(Link, {
// 			className: 'comment-author',
// 			to: utils.getLinkToUserProfile(comment.author.username)
// 		},
// 		m('img.comment-author-img', {
// 			src: comment.author.image
// 		})
// 	),
// 	m('span', m.trust('&nbsp; ')),
// 	m(Link, {
// 			className: 'comment-author',
// 			to: utils.getLinkToUserProfile(comment.author.username)
// 		},
// 		comment.author.username
// 	),
// 	m('span.date-posted', utils.formatDate(comment.createdAt, utils.dateFormats.DEFAULT_WITH_TIME))
// ])
