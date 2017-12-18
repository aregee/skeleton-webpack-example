import {
  skeletonEngine,
  skeletonPwa
} from 'skeletonpwa';


const skeletondemo = skeletonEngine.shell('skeletondemo');
import('./helpers')
.then(({router, supportRouter, runRouter})=> {
  console.log(router, supportRouter, runRouter);
  skeletondemo.provider('router', router).factory('supportRouter', supportRouter);
  skeletonEngine.shell('skeletondemo').run(runRouter);
});
