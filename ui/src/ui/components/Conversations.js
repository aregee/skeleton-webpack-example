'use strict';


var m = require('mithril');


var Link = require('./Link');
var Comment = require('./Comment');


function view(vnode) {
	var comments = vnode.attrs.comments.data || [];
	var body = null;

	if (vnode.attrs.comments.isLoading) {
		body = m('div', 'Loading...');
	}

	if (comments) {
		body = comments.map(function (comment) {
			return m('div', [
				m('div.row', m(Comment, {
					comment: comment,
					key: comment.id
				})),
				m('hr')
			]);
		});
	}

	return m('div', [
		body
	]);
};


module.exports = {
	view: view
};
