import m from "mithril";
import * as mdc from "material-components-web";
import { MDCRipple } from "@material/ripple";
import "@material/drawer";
import "@material/textfield";
import { RaisedButton, Dialog, List, TextField } from "polythene-mithril";

import "polythene-css/dist/polythene.css";
import "polythene-css/dist/polythene-typography.css";
import "@material/button/dist/mdc.button.css";
import "@material/ripple/dist/mdc.ripple.css";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/drawer/dist/mdc.drawer.css";
import "@material/list/dist/mdc.list.css";

import "./styles.css";

const MCWButton = {
  oncreate: ({ dom }) => {
    MDCRipple.attachTo(dom);
  },
  view: ({ attrs }) => 
    m("button.mdc-button.mdc-button--raised",
      { onclick: attrs.onclick },
      [
        attrs.icon && m("i.material-icons.mdc-button__icon", 
          attrs.icon
        ),
        attrs.label
      ]
    )
};

const MCWTextField = {
  view: ({ attrs }) => 
    m(".mdc-form-field", 
      m(".mdc-text-field[data-mdc-auto-init='MDCTextField']",
        [
          m(`input.mdc-text-field__input[id='${attrs.id}'][type='text']`),
          m(`label.mdc-text-field__label[for='${attrs.id}']`, 
            attrs.label
          ),
          m(".mdc-text-field__bottom-line")
        ]
      )
    )
};

const MCWDrawer = {
  view: () => 
    m("aside.mdc-temporary-drawer.menu-drawer", 
      m("nav.mdc-temporary-drawer__drawer",
        m(List, {
          className: "drawer-menu",
          header: {
            title: "Polythene List"
          },
          all: {
            hoverable: true
          },
          tiles: [
            { title: "Inbox" },
            { title: "Important" },
            { title: "Sent" },
            { title: "Spam" },
            { title: "Trash" },
          ]
        })
      )
    )
};

const App = {
  oncreate: () => {
    mdc.autoInit();
  },
  view: () => 
    m(".page", [
      m("h1", "Combining Polythene and material-components-web (MDC-Web)"),
      m(".row", [
        m(".header", "Open MCW Drawer from Polythene Button"),
        m(RaisedButton,
          {
            label: "Open Drawer",
            events: {
              onclick: () => {
                let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector(".menu-drawer"));
                drawer.open = true;
              }
            }
          }
        )
      ]),
      m(".row", [
        m(".header", "Open Polythene Dialog from MCW Button"),
        m(MCWButton,
          {
            label: "Open Dialog",
            onclick: () =>
              Dialog.show({
                /* note the Dialog component is below the other elements in the app */
                title: "Polythene Dialog",
                body: "Click the background to hide, or press ESCAPE.",
                backdrop: true
              })
          }
        )
      ]),
      m(".row", [
        m(".header", "MCW TextField"),
        m(MCWTextField, { label: "Your name", id: "mcw" }),
      ]),
      m(".row", [
        m(".header", "Polythene TextField"),
        m(TextField, { label: "Your name", floatingLabel: true, id: "polythene" }),
      ]),
      m("div",
        { class: "footer" },
        [
          m("a",
            { href: "https://github.com/ArthurClemens/polythene-mithril-material-components-web" },
            "Code on Github"
          )
        ]
      ),
      m(MCWDrawer),
      m(Dialog)
    ])
};

m.mount(document.querySelector("#root"), App);
