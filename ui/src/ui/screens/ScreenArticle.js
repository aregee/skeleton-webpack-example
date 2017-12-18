'use strict';


var m = require('mithril');


var domain = require('./../../domain');
var utils = require('./../utils');
var Banner = require('./../components/Banner');
var ArticleBanner = require('./../components/ArticleBanner');
var ArticleContent = require('./../components/ArticleContent');
var ArticleMetaAndActions = require('./../components/ArticleMetaAndActions');
var Comments = require('./../components/Comments');
var Conversations = require('./../components/Conversations');

var state = {
  slug: ''
};


function getArticle() {
  state.slug = m.route.param('slug');
  domain.actions.listen()
  domain.actions.setSelectedConversation(state.slug);
  document.body.scrollTop = 0;
}


function oninit() {
  getArticle();
}


function onbeforeupdate() {
  if (state.slug !== m.route.param('slug')) {
    getArticle();
  }

  return true;
}



function onupdate() {
  if (domain.store.selectedConversation.data) {
    utils.updateDocumentTitle(domain.store.selectedConversation.data[0].body);
  }
}


function view() {
  return m('div.article-page', [
    m(Banner,
      m(ArticleBanner, {
        article: () => {
          return domain.store.selectedConversation.data ? domain.store.selectedConversation.data[0] : null
        }
      })
    ),
    m('div.container', [
      m('hr'),
      m(Conversations, {
        comments: domain.store.selectedConversation,
        currentUser: domain.store.user
      }),
      m('div.row',
        m('div.col-xs-12.col-md-8.offset-md-2',
          m(Comments, {
            comments: [],
            currentUser: domain.store.user
          })
        )
      )
    ])
  ]);
};


module.exports = {
  oninit: oninit,
  onbeforeupdate: onbeforeupdate,
  onupdate: onupdate,
  view: view
};
