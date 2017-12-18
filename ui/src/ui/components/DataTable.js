'use strict';


var m = require('mithril');
// require('clusterize.js/clusterize.css');
var domain = require('./../../domain');

function initClusterize() {
  // const clusterize = new Clusterize({
  //   scrollId: 'scrollArea',
  //   contentId: 'contentArea'
  // });
  // clusterize.clear();
}

function cleanClusterize() {
  // const clusterize = new Clusterize({
  //   rows: [],
  //   scrollId: 'scrollArea',
  //   contentId: 'contentArea'
  // });
  // clusterize.clear();
}

let tableCompoent = (headers, content) => m(".clusterize", [
  m("table.hover.cozy", {style: 'table-layout: fixed'},
    m("thead",
      m('tr', headers.filter(h => !h.hidden).map(d => m('th', d.headerName)))),
  ),
  m(".clusterize-scroll[id='scrollArea']", {
      style: 'max-height: -webkit-fill-available;'
    },
    m("table.hover.cozy",{style: 'table-layout: fixed'},
      m("tbody.clusterize-content[id='contentArea']", content.map((row) => m("tr", headers.filter(h => !h.hidden)
        .map(k => m('td', row[k.field]))
      )))
    )
  )
]);


let emptyTable = () => m(".clusterize", [
  m("table",
    m("thead",
      m("tr",
        m("th",
          "Headers"
        )
      )
    )
  ),
  m(".clusterize-scroll[id='scrollArea']",
    m("table",
      m("tbody.clusterize-content[id='contentArea']",
        m("tr",
          m("td",
            "Loading data…"
          )
        )
      )
    )
  )
]);

function grid(vnode) {
  let columnDefs = vnode.attrs.columnDefs ? vnode.attrs.columnDefs : [];
  let rowData = vnode.attrs.rowData ? vnode.attrs.rowData : [];
  if (columnDefs.length > 0) {
    return tableCompoent(columnDefs, rowData);
  } else {
    return emptyTable();
  }
}

function oninit(vnode) {
  console.log('vnode.attrs', vnode.attrs);
  // specify the columns
}


function view(vnode) {
  return grid(vnode);
};

function onupdate(vnode) {
  let rowData = vnode.attrs.rowData ? vnode.attrs.rowData : [];
  let headers = vnode.attrs.columnDefs ? vnode.attrs.columnDefs : [];
  // let rows = rowData.map(row => dom.tr({}, headers.filter(h => !h.hidden).map(k => row[k.field])));
  // initClusterize(rows);
  if (rowData.length > 0) {
    // return tableCompoent(columnDefs, rowData);
    initClusterize();
  }
}

function oncreate(vnode) {
  console.log("Initialized with height of: ", vnode.dom.offsetHeight)
  console.log('init clusterize');
  let rowData = vnode.attrs.rowData ? vnode.attrs.rowData : [];
  let headers = vnode.attrs.columnDefs ? vnode.attrs.columnDefs : [];
  // let rows = rowData.map(row => dom.tr({}, headers.filter(h => !h.hidden).map(k => row[k.field])));
  // initClusterize(rows);
  if (rowData.length > 0) {
    // return tableCompoent(columnDefs, rowData);
    initClusterize();
  }

}

module.exports = {
  oninit: oninit,
  oncreate: oncreate,
  onupdate: onupdate,
  view: view
};
