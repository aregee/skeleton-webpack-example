function getPackages() {
  require.ensure([], function(require) {
    let context = require.context(`.`, true, /\.js$/);
    context.keys().map(context);
  });
}

export default getPackages;
