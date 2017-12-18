'use strict';


var m = require('mithril');


var utils = require('./../utils');
var Link = require('./Link');


function view(vnode) {
  var currentUser = vnode.attrs.currentUser ? vnode.attrs.currentUser : {
    name: ''
  };

  var allLinks = {
    home: {
      route: '/',
      label: 'Home'
    },
    user: {
      route: '/@' + currentUser.name,
      label: '<img class="user-pic" src="' + utils.getUserImageOrDefault(currentUser) + '" /> ' + currentUser.name
    }
  };

  var linksForGuest = [
    allLinks.home
  ];

  var linksForMember = [
    allLinks.home,
    allLinks.user
  ];


  var linksToDisplay = linksForGuest;
  if (currentUser.name) {
    linksToDisplay = linksForMember;
  }

  return m('ul', {
      className: vnode.attrs.className
    },
    linksToDisplay.map(function (link) {
      var className = 'nav-link';

      if (m.route.get() === link.route) {
        className += ' active';
      }

      return m('li.nav-item', m(Link, {
        className: className,
        to: link.route
      }, m.trust(link.label)));
    })
  );

};


module.exports = {
  view: view
};
