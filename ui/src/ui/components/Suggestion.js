import m from "mithril"
import stream from "mithril/stream";
import {
  Menu,
  List,
  ListTile
} from "polythene-mithril"

const menuOptions = [
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content"
]

const Page = {
  oninit: vnode => {
    const isOpen = vnode.attrs.isOpen;
    const selectedIndex = stream(0)
    vnode.state = {
      isOpen,
      selectedIndex,
      target: "settings-menu"
    }
  },
  view: vnode => {
    const state = vnode.state
    const target = state.target
    const isOpen = state.isOpen()
    const selectedIndex = state.selectedIndex()
    // return m("div",, [
    //
    // ])
    console.log(isOpen);
    return m(Menu, {
      target: `#${target}`,
      show: isOpen,
      hideDelay: .240,
      didHide: () => state.isOpen(false),
      size: 7,
      content: m(List, {
        tiles: menuOptions.map((setting, index) =>
          m(ListTile, {
            title: setting,
            selected: index === selectedIndex,
            ink: true,
            events: {
              onclick: () => state.selectedIndex(index)
            }
          })
        )
      })
    });
  }
};

module.exports = Page;
