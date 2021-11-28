//Append Styles
/* var href = "../../src/EditorUI/FloatingPanel/floating-panel.css"; */
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@v1.0.0.0-beta/src/EditorUI/FloatingPanel/floating-panel.css";
let exists = false;
document.querySelectorAll("link").forEach((link) => {
  if (link.getAttribute("href") === href) {
    exists = true;
  }
});
if (!exists) {
  var link = document.createElement("link");
  link.href = href;
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

import * as icons from "./icons.js";

export const FloatingPanel = (state, setState) => {
  document.querySelectorAll(".floating-panel").forEach((panel) =>
    panel.insertAdjacentHTML(
      "afterbegin",
      `<div class="panel-header">

      ${panel.getAttribute("title")}
      <div class="flex buttons">
      <div class="control-button btn-help ">
      <div class="button-content">
      ${icons.helpIcon}
      </div>
      </div>

    
      <div class="control-button btn-close ">
      <div class="button-content">
      ${icons.closePanelIcon}
      </div>
      </div>
</div>
      </div>`
    )
  );
};
setTimeout(() => {
  document.querySelectorAll(".floating-panel .btn-close").forEach((btn) => {
    btn.onclick = () => {
      hideFloatingPanels();
    };
  });
}, 200);

export const hideFloatingPanels = () => {
  document
    .querySelectorAll(".floating-panel")
    .forEach((panel) => panel.classList.remove("active"));
  document
    .querySelectorAll(".gfpp .selected")
    .forEach((gfpp) => gfpp.classList.remove("selectedp"));
};
