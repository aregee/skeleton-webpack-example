'use strict';


var m = require('mithril');


var domain = require('./../../domain');
var utils = require('./../utils');


var state = {
  formData: {
    composedMessage: ''
  }
};


function setInputValue(name, value) {
  state.formData[name] = value;
}


function isFormSubmissionBusy() {
  return domain.store.isConversationMessageCreationBusy;
}

function isFormSubmitDisabled() {
  return state.formData.body === '' || domain.store.selectedConversation.data === null || isFormSubmissionBusy() === true;
}


function onFormSubmit(e) {
  e.preventDefault();
  // setInputValue('articleSlug', domain.store.selectedArticle.data.slug);
  state.slug = m.route.param('slug');
  domain.actions.replyToConversation(state.slug, state.formData);
  setInputValue('composedMessage', '');
}


function view() {
  return m('div', [
    m('form.card comment-form', {
        disabled: isFormSubmissionBusy(),
        onsubmit: onFormSubmit
      },
      m('div.card-block',
        m('textarea.form-control', {
          oninput: m.withAttr('value', setInputValue.bind(null, 'composedMessage')),
          value: state.formData.composedMessage,
          autocomplete: 'off',
          disabled: isFormSubmissionBusy(),
          rows: '3',
          placeholder: 'Write a comment...'
        })
      ),
      m('div.card-footer', [
        m('img.comment-author-img', {
          src: utils.getUserImageOrDefault(domain.store.user)
        }),
        m('button.btn.btn-sm.btn-primary', {
          type: 'submit',
          disabled: isFormSubmitDisabled()
        }, 'Post Comment')
      ])
    )
  ]);
};


module.exports = {
  view: view
};
