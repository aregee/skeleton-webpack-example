'use strict';


var m = require('mithril');


function view() {
	return m('footer',
		m('.container', [
			m('a.logo-font', {
				href: '/'
			}, 'healthmonitor'),
			m('span.attribution',
				m.trust('Datashop Engine - Getting Started')
			)
		])
	);
};


module.exports = {
	view: view
};
