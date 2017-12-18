import('./editor.js')
.then(({mithrilAppProvider, MithrilEditorView, mdeditorprovider, mdrun }) => {
  import('skeletonpwa').then(({
    skeletonEngine
  }) => {
    const skeletondemo = skeletonEngine.shell('skeletondemo');
    skeletondemo.provider('mithrilapp', mithrilAppProvider);
    skeletondemo.factory('MithrilEditor', MithrilEditorView);
    skeletondemo.provider('mdeditor', mdeditorprovider);
    skeletondemo.run(mdrun);
  });
});
