//Append Styles
/* var href = "../../src/EditorUI/FloatingPanel/floating-panel.css"; */

import { getCoords, getSize } from "../../Utils/functions.js";
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.2.1-beta/src/EditorUI/FloatingPanel/floating-panel.css";
/*   "../src/EditorUI/FloatingPanel/floating-panel.css"; */
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
      const onPanelClose = window.onPanelClose;
      onPanelClose && onPanelClose();
    };
  });
  positionPanels();
  dragFloatingPanels();
  ``;
}, 200);

export const showPanel = (panel, elementId) => {
  positionPanels();
  if (!panel) return;
  panel.classList.add("active");
  panel.setAttribute("element", elementId);
};

export const hideFloatingPanels = () => {
  window.onPanelHide && window.onPanelHide();
  document
    .querySelectorAll(".floating-panel")
    .forEach((panel) => panel.classList.remove("active"));
  document
    .querySelectorAll(".gfpp .selected")
    .forEach((gfpp) => gfpp.classList.remove("selected"));
  positionPanels();
};

const dragFloatingPanels = () => {
  const handels = document.querySelectorAll(".floating-panel .panel-header");
  handels.forEach((handle) => {
    const panel = handle.closest(".floating-panel");
    handle.onmousedown = (e) => {
      const mousePos = { x: e.pageX, y: e.pageY };
      const coords = getCoords(panel);
      const offset = {
        x: mousePos.x - coords.left,
        y: mousePos.y - coords.top,
      };

      document.onmousemove = (moveEvent) => {
        const mousePos = { x: moveEvent.pageX, y: moveEvent.pageY };
        panel.style.top = mousePos.y - offset.y + "px";
        panel.style.left = mousePos.x - offset.x + "px";
      };
      document.onmouseup = (moveEvent) => {
        document.onmousemove = null;
      };
    };
  });
};

const positionPanels = () => {
  const panels = document.querySelectorAll(".floating-panel");
  panels.forEach((panel) => {
    const elementId = panel.getAttribute("element");
    const element = document.querySelector(`#${elementId}`);
    panel.style.top = getCoords(element).top + "px";
    panel.style.left = getCoords(element).left + getSize(element).width + "px";

    const coords = {
      top: parseInt(panel.getAttribute("top")),
      left: parseInt(panel.getAttribute("left")),
    };
    if (coords.left || coords.left === 0) panel.style.left = coords.left + "px";
    if (coords.top || coords.top === 0) panel.style.top = coords.top + "px";
  });
};
