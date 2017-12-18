'use strict';


var m = require('mithril');


var Link = require('./Link');
var NewCommentForm = require('./NewCommentForm');

function view(vnode) {

	var header = m('p', [
		m(Link, {
			to: '/login'
		}, 'Sign in'),
		m('span', ' or '),
		m(Link, {
			to: '/register'
		}, 'Sign up'),
		m('span', ' to add comments on this article.')
	]);
	var body = null;

	if (vnode.attrs.currentUser) {
		header = m(NewCommentForm);
	}

	return m('div.comments', [
		header,
		body
	]);
};


module.exports = {
	view: view
};
