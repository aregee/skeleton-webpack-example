import {
  skeletonEngine,
} from 'skeletonpwa';

import('./packages')
.then((packages) => {
  packages.default();
  const skeletondemoApp = skeletonEngine.bootstrap('skeletondemo', {
    api: `http://localhost:3000`,
    elements: ['ul', 'li', 'section', 'tr', 'td', 'table', 'tbody', 'thead', 'body', 'script', 'style', 'img', 'form', 'input']
  });
  skeletondemoApp.shell('skeletondemo').run((app) => {
    console.log(app);
  });
});
  
