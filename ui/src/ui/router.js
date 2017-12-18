'use strict';


var m = require('mithril');


var LayoutDefault = require('./layouts/LayoutDefault');

var Todos = require('./screens/ScreenTodo');
var ScreenUserLogin = require('./screens/ScreenUserLogin');

var routes = {
  '/': buildRoute(Todos),
  // '/article/:slug': buildRoute(ScreenArticle),
  // '/register': buildRoute(ScreenUserRegister),
  '/login': buildRoute(ScreenUserLogin),
  // '/@:username/favorites': buildRoute(ScreenUserFavorites),
  // '/settings': buildRoute(ScreenUserSettings),
  // '/editor': buildRoute(ScreenEditor),
  // '/editor/:slug': buildRoute(ScreenEditor),
  // '/todo': buildRoute(Todos),
  // '/todo/:slug': buildRoute(Todos),
};


function buildRoute(screen, layout) {
  layout = layout || LayoutDefault;

  return {
    render: function () {
      return m(layout, m(screen));
    }
  };
}


// function init() {
  // m.route.prefix('?');
  // m.route(document.getElementById('conduit'), '/', routes);
// }


export {
  routes
};
