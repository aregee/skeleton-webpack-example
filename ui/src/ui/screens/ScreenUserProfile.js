'use strict';


var m = require('mithril');


var domain = require('./../../domain');
var utils = require('./../utils');
var UserInfoBanner = require('./../components/UserInfoBanner');
var FeedToggle = require('./../components/FeedToggle');
var ArticleList = require('./../components/ArticleList');


var state = {
  username: '',
  profile: {}
};


function getUserProfile() {
  state.username = m.route.param('username');
  domain.actions.getUserProfile(state.username);
  domain.actions.getPatientProfile()
    .then(d => {
      state.profile = d;
    });
  document.body.scrollTop = 0;
}


function oninit() {
  getUserProfile();
}


function onbeforeupdate() {
  if (state.username !== m.route.param('username')) {
    getUserProfile();
  }

  return true;
}


function onupdate() {
  utils.updateDocumentTitle('@' + state.username);
}


function view() {
  var username = m.route.param('username') || '';

  return m('.profile-page', [
    m(UserInfoBanner, {
      loggedInUser: domain.store.user,
      selectedUser: domain.store.selectedUserProfile.data,
      isLoading: domain.store.selectedUserProfile.isLoading
    }),
    m('.container', [
      m('.row', [])
    ])
  ]);
};


module.exports = {
  oninit: oninit,
  onbeforeupdate: onbeforeupdate,
  onupdate: onupdate,
  view: view
};
