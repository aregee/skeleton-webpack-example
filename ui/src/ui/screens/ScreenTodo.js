'use strict';


var m = require('mithril');
// m.stream
import {actions, store} from './../../domain';
var utils = require('./../utils');
var Grid = require('./../components/DataTable');
var Banner = require('./../components/Banner');
var state = {
  gridConfig: {

  }
};
let columnDefs = [];

state.gridConfig.columnDefs = columnDefs;
state.gridConfig.rowData = [];
state.gridConfig.params = {
  from: 0,
  size: 100,
  search: 'ui',
  col: 'name',
  field: ['dead', 'pending'],
  filter: 'status',
  groupBy: true
};

// specify the data
// from=0&size=100&col=status&search=dead&field[]=mercy&field[]=sonic&groupBy=true
function oninit() {
  console.log('initiedd>>>');
  console.log("sidasd?");
  actions.healthLogs(state.gridConfig);
}

function onupdate() {
  console.log('initiedd>>>');
  actions.healthLogs(state.gridConfig);
}

function tableContainer() {
  return m('.container-fluid', [
    m('.row', [
      m('.col-md-12.col-xs-12', [
        m(Grid, store.selectedGridView)
      ])
    ])
  ]);
};

function view() {
  var banner = m(Banner);

  // if (domain.store.user) {
  //   banner = null;
  // }

  return m('div.home-page', [
    banner,
    tableContainer()]);
};

module.exports = {
  oninit: oninit,
  view: view
};
