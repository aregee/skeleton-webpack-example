'use strict';


const m = require('mithril');
const {
  apiFactory
} = require('./api');
const API_BASE_URI = 'http://localhost:3000/api';
const api = apiFactory(API_BASE_URI);
// const socket = require('socket.io-client')();

const state = {
  appTitle: 'Healthmonitor',
  isloggedIn: false,
  selectedView: {
    isLoading: false,
    author: '',
    favorited: '',
    limit: 10,
    offset: 0,
    total: 0,
    type: {
      name: 'PATIENTS',
      label: 'Patients'
    },
    list: null,
  },
  viewListTypes: {
    PATIENTS: {
      name: 'PATIENTS',
      label: 'Patients Feed'
    },
    USER_CONVERSATIONS: {
      name: 'USER_CONVERSATIONS',
      label: 'Inbox'
    },
    USER_NOTIFICATIONS: {
      name: 'USER_NOTIFICATIONS',
      label: 'My Notifications'
    }
  },
  conversationsByTag: {},
  tags: {},
  selectedConversation: {
    data: null,
    isLoading: false
  },
  selectedConversationsMessage: {
    data: null,
    isLoading: false
  },
  selectedGridView: {
    rowData: null,
    columnDefs: null
  },
  isConversationMessageCreationBusy: false,
  userAuthorizationToken: null,
  isUserLoginBusy: false,
  userLoginErrors: null,
  isUserRegistrationBusy: false,
  userRegistrationErrors: null,
  isUserSettingsUpdateBusy: false,
  userUpdateSettingsErrors: null,
  isCreateArticleBusy: false,
  createArticleErrors: null,
  isDeleteArticleBusy: false,
  user: null,
  selectedUserProfile: {
    data: null,
    isLoading: false
  }
};




function init() {
  actions.getLoggedInUser();
}


function getErrorMessageFromAPIErrorObject(e) {
  var response = null;

  try {
    response = JSON.parse(e.message).errors;
  } catch (error) {
    response = {
      'An unhandled error occurred': []
    };
  }

  return response;
}


function redirectToPreviousPageOrHome() {
  if (window.history.length > 0) {
    window.history.back();
  } else {
    m.route.set('/');
  }
}


function getConversations() {
  // var queryString = m.buildQueryString(payload);

  return api.get('/v2/chat/')
    .then(function (response) {
      // return []; // Test empty response
      let chats = response.conversations ? response.conversations : [];
      return chats;
    });
}


function isValueNullOrUndefined(value) {
  return (value === null) || typeof value === 'undefined';
}


function getValueFromSuppliedOrOther(supplied, other) {
  return !isValueNullOrUndefined(supplied) ? supplied : other;
}


function setupSelectedViewStateForRequest(payload, selectedView) {
  var selectedView = {
    isLoading: true,
    list: null,
    total: 0,
    type: getValueFromSuppliedOrOther(payload.type, state.viewListTypes.type),
    limit: getValueFromSuppliedOrOther(payload.limit, state.viewListTypes.limit),
    offset: getValueFromSuppliedOrOther(payload.offset, state.viewListTypes.offset)
  };

  return selectedView;
}




const actions = {
  listen: function () {
    // m.startComputation();
    socket.on('new message', function (data) {
      try {
        if (data) {
          console.log(data);
          console.log('?>>>regres\hings>>>');
          state.selectedConversation.data.push(data);
        }
      } catch (e) {
        alert('There is a problem:', e);
      } finally {
        m.redraw()
      }
    });
  },
  addProvider: function (user, pid) {
    return api.post('/v2/health/patients/')
  },
  getPatientProfile: function (user) {
    return api.get('/v2/health/patients/profile');
  },
  updatePatients: function (gridConfig) {
    return api.get('/v2/health/patients')
      .then(data => {
        state.selectedGridView.rowData = data;
        //gridConfig.rowData.concat(data);
        state.selectedGridView.columnDefs = gridConfig.columnDefs;
        return data;
      });
  },
  healthLogs: function (gridConfig) {
    return api.get('/v2/es/list', gridConfig)
      .then(data => {
        state.selectedGridView.rowData = data.data;
        //gridConfig.rowData.concat(data);
        state.selectedGridView.columnDefs = data.schema;
        return data;
      });
  },
  searchLogs: function (gridConfig) {
    return api.get('/v2/es/search', gridConfig)
      .then(data => {
        state.selectedGridView.rowData = data.data;
        //gridConfig.rowData.concat(data);
        state.selectedGridView.columnDefs = data.schema;
        m.redraw();
        return data;
      });
  },
  setCurrentlyActiveView: function (payload) {
    var request = {};
    payload = payload || {};

    state.selectedView = setupSelectedViewStateForRequest(payload);

    request.limit = state.selectedView.limit;
    request.offset = state.selectedView.offset;

    console.info('domain.setCurrentlyActiveView()', payload, request);

    return getConversations(request)
      .then(function (response) {
        console.log(response);
        state.selectedView.list = response;
        state.selectedView.total = response.length;
        state.selectedView.isLoading = false;
      });
  },

  setSelectedConversation: function (slug) {
    state.selectedConversation.data = null;
    state.selectedConversation.isLoading = true;
    return api.get('/v2/chat/' + slug)
      .then(function (response) {
        socket.emit('enter conversation', {
          slug: slug,
          user: state.user
        });
        state.selectedConversation.data = response.conversation;
      })
      .then(function () {
        state.selectedConversation.isLoading = false;
      });
  },
  replyToConversation: function (slug, formData) {
    // state.selectedConversation.data = null;
    state.isConversationMessageCreationBusy = true;
    return api.post('/v2/chat/' + slug, {
        data: formData
      })
      .then(function (response) {
        // state.selectedConversation.data = response.conversation;
        return actions.setSelectedConversation(slug);
      })
      .catch(function (err) {
        state.isConversationMessageCreationBusy = false;
      })
      .then(function () {
        state.isConversationMessageCreationBusy = false;
      });
  },
  goToArticleEditScreen: function (articleSlug) {
    m.route.set('/editor/' + articleSlug);
  },

  redirectAfterUserLoginSuccess: function () {
    redirectToPreviousPageOrHome();
  },


  redirectAfterUserRegistrationSuccess: function () {
    redirectToPreviousPageOrHome();
  },


  getLoggedInUser: function () {
    state.user = {email: 'foobar'};
    return true;
    // api.get('/auth/me').then(function (response) {
    //     state.user = response.me;
    //     state.isloggedIn = true;
    //   })
    //   .catch(function (e) {
    //     console.warn('domain.getLoggedInUser()', e, getErrorMessageFromAPIErrorObject(e));
    //   });
  },


  updateUserSettings: function (payload) {
    state.isUserSettingsUpdateBusy = true;
    state.userUpdateSettingsErrors = null;

    if (!payload.password) {
      delete payload.password;
    }

    m.request({
        method: 'PUT',
        url: API_BASE_URI + '/user',
        headers: {
          'Authorization': 'Token ' + state.user.token
        },
        data: {
          user: payload
        }
      })
      .then(function (response) {
        state.user = response.user;
      })
      .catch(function (e) {
        state.userUpdateSettingsErrors = getErrorMessageFromAPIErrorObject(e);
      })
      .then(function () {
        state.isUserSettingsUpdateBusy = false;
      });
  },


  getUserProfile: function (username) {
    state.selectedUserProfile.isLoading = true;
    state.selectedUserProfile.data = null;
    state.selectedUserProfile.data = {email: 'foo@bar.com'};
    state.selectedUserProfile.isLoading = false;
    // api.get('/auth/me')
    //   .then(function (response) {
    //     state.selectedUserProfile.data = response.me;
    //   })
    //   .then(function () {
    //
    //   });
  },

  logUserOut: function () {
    state.isloggedIn = true;
    state.user = null;
    window.localStorage.setItem('jwt', null);
    m.route.set('/');

  }

};


module.exports = {
  init: init,
  store: state,
  api: api,
  actions: actions,
  socket: {}
};
