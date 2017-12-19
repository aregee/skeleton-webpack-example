
export const router = function () {

  // this is the service factory.
  this.$get = function (shell) {

    // View Container
    let container;
    let currentView;
    let anchorTags;
    let hooks = {
      beforeMount: () => {},
      afterMount: () => {}
    }

    const $window = shell.$window;
    const $document = shell.$document;
    const singleSpa = shell.singleSpa;

    function _cleanContainer(params) {
      if (singleSpa.getMountedApps().indexOf(params.viewClassName) > -1) {
        console.log("unlload app ", params.viewClassName);
        singleSpa.unloadChildApplication(params.viewClassName);
      }
      if (currentView && currentView.parentElement) {
        currentView.parentElement.removeChild(currentView);
      }

      container.innerHTML = '';
    }

    function mountRouteElement(elem, routeParams) {
      let el = elem({
        container,
        routeParams
      });
      _cleanContainer(el);
      currentView = el.componentDidMount();
      container.appendChild(currentView);
      hooks.afterMount();
    }


    /**
     * Returns the location params from url
     * @returns {object}
     */
    function getLocationParams() {
      let out = {};

      // Parse the location object
      location.search.substr(1).split('&').forEach(parts => {
        let values = parts.split('=');
        out[values[0]] = values[1];
      });

      return out;
    }

    const loadRoute = (args) => {
      let _arg = args ? args : {};
      let currentRoute = _arg.pathname ? _arg.pathname : $window.location.pathname;
      // let path = currentRoute.split('#').pop();
      return shell.state.route(currentRoute)
        .then((c) => {
          let route = c;
          let navLink = $document.querySelector(`#skeleton-nav a[href="${currentRoute}"]`);
          let currentActiveLink = $document.querySelector(`#skeleton-nav a.active`);
          if (currentActiveLink) currentActiveLink.classList.remove('active');
          if (navLink) navLink.classList.add('active');
          hooks.beforeMount(route, currentRoute);
          mountRouteElement(route, getLocationParams());
          // hooks.afterMount(()=>);
          singleSpa.navigateToUrl(currentRoute);
        })
        .catch((e) => {
          mountRouteElement(shell.notfound('404', '404'), getLocationParams())
        });
    };

    $window.handleOnClick = function handleOnClick(e) {

      let path = e.target.getAttribute('href');

      e.stopImmediatePropagation();
      e.preventDefault();

      // Push the state
      // $window.history.pushState(null, null, path);
      // $window.handlePushState(['#', path].join(''));
      $window.handlePushState(path);

      return false;
    };

    $window.handlePushState = (p) => {
      // Push the state
      console.log(p);
      try {
        $window.history.pushState(null, null, p);
      } catch (e) {
        throw new Error(e);
      } finally {
        loadRoute();
      }
      // $window.history.pushState(null, null, p);

    }
    $window.onpopstate = function (event) {
      console.log(event.target.location);
      $window.handlePushState(event.target.location);
    };

    const initialize = (routesDefinition, containerElement, hooksDefinition) => {
      container = containerElement;

      // Assign the onclick action
      anchorTags = [].slice.call($document.querySelectorAll('#skeleton-nav .view'));
      anchorTags.forEach(node => node.onclick = $window.handleOnClick);

      loadRoute();
    };

    return {
      initialize
    };

  };
};

export const supportRouter =  function (container) {
  let router = container.router;
  const supportRouter = (app) => {
    let init = ({
      routes,
      viewContainer,
      hooks
    }) => {
      return router.initialize(routes, viewContainer, hooks);
    }
    init(app.utils);
  }
  return supportRouter;
};

export const runRouter = (app) => {
  app.core.container.supportRouter(app);
  let singleSpa = app.core.container.singleSpa;
  singleSpa.start();
};
