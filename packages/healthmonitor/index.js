import('./helpers.js')
.then(({healthAppProvider, HealthAppView, healthapp, mdrun }) => {
  import('skeletonpwa').then(({
    skeletonEngine
  }) => {
    const skeletondemo = skeletonEngine.shell('skeletondemo');
    skeletondemo.provider('declareHealthApp', healthAppProvider);
    skeletondemo.factory('HealthApp', HealthAppView);
    skeletondemo.provider('healthapp', healthapp);
    skeletondemo.run(mdrun);
  });
});
