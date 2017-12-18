'use strict';


var m = require('mithril');


var Link = require('./Link');

var utils = require('./../utils');

var FAVORITED_CLASS = 'btn btn-sm btn-primary';
var NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';


function onFavoriteButtonClick(e) {
  e.preventDefault();
  // TODO add implementation
}


function view(vnode) {
  var article = vnode.attrs.article,
    favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  return m('.article-preview',
    m('.container', [
      m('.article-meta', [
        m(Link, {
            to: '/@' + article.author.name
          },
          m('img', {
            src: utils.getUserImageOrDefault(article.author)
          })
        ),

        m('.info', [
          m(Link, {
            to: '/@' + article.author.name,
            className: 'author'
          }, article.author.name),
          m('.date', new Date(article.createdAt).toDateString())
        ]),

        m('.pull-xs-right',
          m('button', {
            className: favoriteButtonClass,
            onclick: onFavoriteButtonClick
          }, [
            m('i.ion-heart'),
            m('span', ' ' + article.author.permissions.length)
          ])
        )

      ]),

      m(Link, {
        to: '/article/' + article.conversationId,
        className: 'preview-link'
      }, [
        m('h1', article.body),
        m('p', article.body),
        m('span', 'Read more...'),
        m('ul.tag-list', article.author.permissions.splice(0, 5).map(function (tag) {
          return m('li.tag-default tag-pill tag-outline', {
            key: tag
          }, tag);
        }))
      ])

    ])
  );
};


module.exports = {
  view: view
};
