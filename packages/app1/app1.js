import {
  skeletonEngine
} from 'skeletonpwa';

const skeletondemo = skeletonEngine.shell('skeletondemo');


import('./reactapp')
.then(({
  reactAppProvider,
  ReactAppView,
  reactview,
  route
}) => {

  skeletondemo.provider('app1', reactAppProvider);
  skeletondemo.factory('ReactView', ReactAppView);
  skeletondemo.provider('reactview', reactview);
  skeletondemo.factory('reactroute', route);
  skeletonEngine.shell('skeletondemo').run((app) => {
    skeletondemo.app.core.container.reactroute;
  });

});
