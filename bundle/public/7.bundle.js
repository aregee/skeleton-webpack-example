webpackJsonp([7],{242:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.route=t.reactview=t.ReactAppView=t.reactAppProvider=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},c=n(118),l=r(c),f=n(121),s=r(f);t.reactAppProvider=function(){this.$get=function(e){function t(){var e=document.getElementById("app1");return e||(e=document.createElement("div"),e.id="app1",document.body.appendChild(e)),e}var n=e.singleSpaReact;return function(e){return e.then(function(e){function r(e){return a.bootstrap(e)}function o(e){return a.mount(e)}function i(e){return a.unmount(e)}var a=n({React:l.default,ReactDOM:s.default,rootComponent:e.default,domElementGetter:t}),u={bootstrap:r,mount:o,unmount:i};return new Promise(function(e,t){e(u)})})}}},t.ReactAppView=function(e){function t(e){return function(t){return t.pathname.startsWith(""+e)}}var r=e.mix,c=e.GenericView,l=e.View,f=e.singleSpa,s=e.app1;return function(e){function r(e,a,u,p,c){o(this,r);var l=i(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e,a,u,p,c));return l.panels=[],f.declareChildApplication(e,function(){return s(n.e(6).then(n.bind(null,243)))},t("/app1")),l}return a(r,e),u(r,[{key:"loadData",value:function(){var e=this;this.template.classList.add("loading");(function(){var t=e.dom.div({id:"app1"});return new Promise(function(e,n){e({panel:t})})})().then(function(t){e.panels=e.panels.concat([t.panel]),e.render()}).catch(function(t){console.log("You are offline"),e.render()})}},{key:"createTemplate",value:function(){var e=(this.panels.join(""),this.dom.div({id:"app1",style:"height:82vh"}));return e.appendChild(this.dom.style({},["<style>\n  html,body {height:100%;margin:0;}\n  h1,h2,h3,h4,h5,h6,p {margin:0 0 10px;}\n  #editor {display:flex;height:100%;}\n  .input,.preview {box-sizing:border-box;height:100%;margin:0;padding:10px;width:50%;}\n  .input {border:0;border-right:1px solid #ccc;outline:none;resize:none;}\n  \t\t</style>"])),e}},{key:"render",value:function(){if(p(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"render",this).call(this),this.template.parentElement){var e=this.createTemplate();this.template.parentElement.replaceChild(e,this.template),this.template=e}}}]),r}(r(l).with(c))},t.reactview=function(){this.$get=function(e){var t=e.ReactView,n=e.skeletondemo.app,r=(e.state,e.datastore),o=n.utils.api,i=n.utils.genUrl,a=["core",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return o.get(i("/app/mith?",e))}];return r.set(a[0],a[1]),function(e,n,r){return function(){for(var o=arguments.length,i=Array(o),a=0;a<o;a++)i[a]=arguments[a];return new t(e,n,i,r.element,r)}}}},t.route=function(e){var t=e.reactview,n=e.skeletondemo.app,r=e.state;return r.addRoute({component:t("react-view","core",n),pattern:["/app1/.+","/app1"]}),r}}});