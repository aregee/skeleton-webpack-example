import {
  skeletonEngine
} from 'skeletonpwa';

const skeletondemo = skeletonEngine.shell('skeletondemo');
import ('./404')
.then(({
  fourOfour,
  notFound
}) => {
  skeletondemo.factory('Four0FourView', fourOfour);
  skeletondemo.provider('notfound', notFound);
});
