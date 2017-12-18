'use strict';


var m = require('mithril');
var utils = require('./../utils');

var UserFollowUnfollowButton = require('./UserFollowUnfollowButton');


function view(vnode) {
  var selectedUser = vnode.attrs.selectedUser ? vnode.attrs.selectedUser : {
    bio: '',
    image: '',
    username: '',
    permissions: []
  };

  var loggedInUser = vnode.attrs.loggedInUser ? vnode.attrs.loggedInUser : {
    username: ''
  };

  return m('.user-info',
    m('.container', [
      m('.row', [
        m('.col-xs-12 col-md-10 offset-md-1', [
          m('img.user-img', {
            src: utils.getUserImageOrDefault(selectedUser)
          }),
          m('h4', selectedUser.name || '...'),
          m('p', selectedUser.permissions.join(',\n')),
          m('button.btn.btn-sm.btn-primary', {
            type: 'Button',
            onClick: function (e) {
              e.preventDefault();
              domain.actions.addProvider(domain.store.user);
            }
          }, 'Add Care Provider')
        ]),
      ])
    ])
  );
};


module.exports = {
  view: view
};
