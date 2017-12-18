'use strict';


var m = require('mithril');


var domain = require('./../../domain');
var utils = require('./../utils');
var Banner = require('./../components/Banner');
var ArticleList = require('./../components/ArticleList');
var FeedToggle = require('./../components/FeedToggle');


function oninit() {
  utils.updateDocumentTitle('Home');
  // domain.actions.getTags();
}


function view() {
  var banner = m(Banner);

  // if (domain.store.user) {
  //   banner = null;
  // }

  return m('div.home-page', [
    banner,
    m('.container.page', [
      m('.row', [
        m('.col-md-9', [
          m(FeedToggle, {
            currentType: domain.store.selectedView.type,
            username: domain.store.user ? domain.store.user.name : '',
            linkTypes: [
              domain.store.viewListTypes.USER_CONVERSATIONS,
              domain.store.viewListTypes.PATIENTS,
              domain.store.viewListTypes.USER_NOTIFICATIONS
            ]
          }),
          m(ArticleList, {
            limit: 10
          })
        ]),
        m('.col-md-3', [
          m('.sidebar', [])
        ])
      ])
    ])
  ]);
};


module.exports = {
  oninit: oninit,
  view: view
};
