'use strict';


var m = require('mithril');


var domain = require('./../../domain');
var ArticleFavoriteButton = require('./ArticleFavoriteButton');
var ArticleUpdateButton = require('./ArticleUpdateButton');
var ArticleDeleteButton = require('./ArticleDeleteButton');
var UserFollowUnfollowButton = require('./UserFollowUnfollowButton');


function updateState(vnode) {
  vnode.state = {
    article: vnode.attrs.article,
    isDeleteArticleBusy: domain.store.isDeleteArticleBusy
  };
}


function oninit(vnode) {
  updateState(vnode);
}


function onupdate(vnode) {
  updateState(vnode);
}


function view(vnode) {
  var article = vnode.attrs.article ? vnode.attrs.article : {
    author: {
      name: null
    }
  };

  var loggedInUsername = domain.store.user ? domain.store.user.name : '';

  return [
    m(ArticleUpdateButton, {
      action: () => {}
    }),
    m('span', ' '),
    m(ArticleDeleteButton, {
      action: () => {}
    }),
    m('span', ' '),
    m('span', ' '),
    m(ArticleFavoriteButton, {
      article: article
    })
  ];
};


module.exports = {
  oninit: oninit,
  onupdate: onupdate,
  view: view
};
