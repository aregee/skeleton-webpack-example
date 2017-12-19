export const healthAppProvider = function () {

  this.$get = function (container) {

    const singleSpaMithril = container.singleSpaMithril;
    const $window = container.$window;
    const healthView = container.healthapp;
    const app = container.skeletondemo.app;
    function domElementGetter(getLocationParams, healthview) {
      // Make sure there is a div for us to render into
      let el = document.getElementById('conduit');
      if (!el) {
        // we mounth HealthView Component
        el = healthview({
          viewContainer: app.utils.viewContainer,
          routeParams: getLocationParams()
        }).componentDidMount();
      }
      return el;
    }

    return (prop) => prop.then(({routes, domain}) => {
      return import('mithril').then((mithril) => {
        return {routes, domain, mithril};
      });
    })
    .then(({routes, domain, mithril}) => {

      /**
       * Returns the location params from url
       * @returns {object}
       */
      const component = healthView('health', 'health', app);
      function getLocationParams() {
        let out = {};

        // Parse the location object
        location.search.substr(1).split('&').forEach(parts => {
          let values = parts.split('=');
          out[values[0]] = values[1];
        });

        return out;
      }
      const mithrilLifeCyles = singleSpaMithril({
        Mithril: mithril,
        routes: routes,
        base: '/',
        prefix: '/health',
        stateInit: domain.init,
        domElementGetter: domElementGetter.bind(null, getLocationParams, component)
      });

      function bootstrap(props) {
        return mithrilLifeCyles.bootstrap(props);
      }

      function mount(props) {
        return mithrilLifeCyles.mount(props);
      }

      function unmount(props) {
        return mithrilLifeCyles.unmount(props);
      }

      let lcyle =  {
        bootstrap,
        mount,
        unmount
      };

      return new Promise(function (resolve, reject) {
          resolve(lcyle);
      });
    });

  };

};
// .factory('HealthApp', );
export const HealthAppView =function (container) {
  const mix = container.mix;
  const GenericView = container.GenericView;
  const View = container.View;

  class HealthApp extends mix(View).with(GenericView) {
    constructor(
      viewClassName,
      urlName,
      routeParams,
      dom,
      app
    ) {
      super(viewClassName, urlName, routeParams, dom, app);
      this.panels = [];
    }
    loadData() {
      super.loadData();
      let dom = this.dom;
      this.template.classList.add('loading');
      // let store = this.app.core.container.datastore.get(this.urlName);
      let store = () => new Promise(function(resolve, reject) {
        let panel = dom.div({id: "conduit", style:"width:-webkit-fill-available"});
        resolve({panel});
      });

      store(['panel']).then(res => {
          this.panels = this.panels.concat([res.panel]);
          this.render();
        })
        .catch(e => {
          console.log('You are offline');
          this.render();
        });
    }


    createTemplate() {
      let str = this.panels;
      console.log(str);
      return this.dom.div({
        id: "health-app",
        className: "shell"
      }, [].concat(str));
    }
  }

  return HealthApp;
}

export const healthapp = function () {
  this.$get = function (container) {
    const HealthApp = container.HealthApp;
    const app = container.skeletondemo.app;
    const router = container.state;
    const datastore = container.datastore;
    const datashopEngine = app.utils.api;
    let genUrl = app.utils.genUrl;
    datastore.set('health', (parms = []) => datashopEngine.get(`${genUrl('/app/conduit?', parms)}&baseref=/conduit/`));
    const angularView = (viewClassName, urlName, app) => {
      return (...props) => {
        let ngView = new HealthApp(viewClassName, urlName, props, app.element, app);
        return ngView;
      }
    };

    return angularView;
  }
};

export const mdrun = function (app) {
  let router = app.appRouter;
  let healthview = app.core.container.healthapp;
  const singleSpa =  app.core.container.singleSpa;
  const mithrilapp =  app.core.container.declareHealthApp;

  function hashPrefix(prefix) {
    return function (location) {
      return location.pathname.startsWith(`${prefix}`);
    }
  }

  singleSpa.declareChildApplication('health', () => mithrilapp(import('./src/index.js')), hashPrefix('/health'));

  router.addRoute({
    component: healthview('health', 'health', app),
    pattern: ['/health/.+', '/health']
  });
};
