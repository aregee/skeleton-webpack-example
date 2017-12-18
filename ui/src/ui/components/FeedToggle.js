'use strict';


var m = require('mithril');


var domain = require('./../../domain');


function setCurrentlyActiveView(vnode, type) {
  var payload = {
    type: type
  };

  switch (type.name) {
  case domain.store.viewListTypes.USER_CONVERSATIONS.name:
    payload.author = '';
    payload.favorited = vnode.state.username;
    break;

  case domain.store.viewListTypes.USER_NOTIFICATIONS.name:
    payload.author = vnode.state.username;
    payload.favorited = '';
    break;
  }

  domain.actions.setCurrentlyActiveView(payload);
}


function onLinkClick(vnode, type, e) {
  e.preventDefault();

  setCurrentlyActiveView(vnode, type);
}


function buildLink(vnode, linkType, currentType) {
  var linkClassName = linkType.name === currentType.name ? '.active' : '';

  return m('li.nav-item',
    m('a.nav-link' + linkClassName, {
      href: '',
      onclick: onLinkClick.bind(null, vnode, linkType)
    }, linkType.label)
  );
}


function oninit(vnode) {
  console.log('vnode.attrs.currentType', vnode.attrs.currentType);
  setCurrentlyActiveView(vnode, vnode.attrs.linkTypes[0]);
}


function view(vnode) {
  var currentType = vnode.attrs.currentType ? vnode.attrs.currentType : '';
  var linkTypes = vnode.attrs.linkTypes ? vnode.attrs.linkTypes : [];
  vnode.state.username = vnode.attrs.username ? vnode.attrs.username : '';

  return m('div.feed-toggle',
    m('ul.nav.nav-pills.outline-active', linkTypes.map(function (linkType) {
      return buildLink(vnode, linkType, currentType);
    }))
  );
};


module.exports = {
  oninit: oninit,
  view: view
};
