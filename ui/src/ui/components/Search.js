
import {
  Search,
  IconButton,
  Shadow,
  Button
} from 'polythene-mithril';

const {
  ButtonCSS
} = require("polythene-css")
const domain = require('./../../domain');
const m = require('mithril');
const stream = require('mithril/stream');
const gridConfig = {
  params: {
    q: ''
  }
};
ButtonCSS.addStyle(".bordered-button", {
  color_light_text: "#E95420",
  color_light_border: "#E95420",
  color_dark_text: "#E95420",
  color_dark_border: "#E95420"
});

const iconSearchSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/></svg>";
const iconBackSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"/></svg>";
const iconClearSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg>";
const iconMicSVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z\"/></svg>";
const iconEnterSVG = "<svg fill=\"#000000\" height\"24\" viewBox=\"0 0 24 24\" width=\"24\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z\"/></svg>"

const createSearchField = () => {
  const iconSearch = m.trust(iconSearchSVG);
  const iconBack = m.trust(iconBackSVG);
  const iconClear = m.trust(iconClearSVG);
  const iconMic = m.trust(iconMicSVG);
  const iconEnter = m.trust(iconEnterSVG);
  const BackButton = {
    view: ({
        attrs
      }) =>
      m(IconButton, {
        icon: {
          svg: iconBack
        },
        ink: false,
        events: {
          onclick: attrs.leave
        },
      })
  };

  const ClearButton = {
    view: ({
        attrs
      }) =>
      m(IconButton, {
        icon: {
          svg: iconClear
        },
        ink: false,
        events: {
          onclick: attrs.clear
        },
      })
  };

  const SearchIcon = {
    view: () =>
      m(IconButton, {
        icon: {
          svg: iconSearch
        },
        inactive: true,
      })
  };

  const MicIcon = {
    view: () =>
      m(IconButton, {
        icon: {
          svg: iconMic
        },
        inactive: true,
      })
  };

  const FetchResults = {
    view: ({
        attrs
      }) =>
      m(Button, {
        label: "Search",
        borders: true,
        ink: true,
        ripple: {
          endOpacity: 1,
          persistent: true,
          style: {
            color: "#d3d3d3"
          }
        },
        className: "bordered-button",
        events: {
          onclick: attrs.search
        }
      })
  };

  return {
    oninit: vnode => {
      const value = stream("");
      const focus = stream(false);
      const isOpen = stream(false);
      const clear = () => (
        value(""),
        focus(true)
      );
      const leave = () =>
        value("");
      const search = (ev) => {
        ev.preventDefault();
        console.log(value());
      }

      vnode.state = {
        value,
        focus,
        clear,
        leave,
        search,
        isOpen,
        redrawOnUpdate: stream.merge([value]) // for React
      };
    },
    view: ({
      state,
      attrs
    }) => {
      const value = state.value();
      const focus = state.focus();
      return m('div', [
        m('div.row', [
          m(Search, Object.assign({}, {
              textfield: {
                label: "Search",
                onChange: ({
                  value,
                  focus
                }) => {
                  (state.value(value), state.focus(focus))
                  if (value !== "") {
                    // (state.isOpen(true))
                    let pl = Object.assign({}, gridConfig.params, {q: value});
                    console.log(pl);
                    domain.actions.searchLogs({params: pl});
                  }
                },
                value,
                focus
              },
              buttons: {
                none: {
                  before: m(SearchIcon),
                  after: m(MicIcon)
                },
                focus: {
                  before: m(BackButton, {
                    leave: state.leave
                  }),
                  after: m(MicIcon)
                },
                focus_dirty: {
                  before: m(BackButton, {
                    leave: state.leave
                  }),
                  after: m(ClearButton, {
                    clear: state.clear
                  }),
                  // after:
                },
                dirty: {
                  before: m(BackButton, {
                    leave: state.leave
                  }),
                  after: m(ClearButton, {
                    clear: state.clear
                  }),
                  // after: m(FetchResults, {
                  //   search: state.search
                  // })
                }
              },
              before: m(Shadow)
            },
            attrs
          ))
        ]),
        m('div.row', {
          style: {
            position: "relative"
          }
        }, [m(attrs.suggestion, {
          isOpen: state.isOpen,
        })])
      ]);
    }
  };
};

const SearchField = createSearchField();

module.exports = SearchField;
