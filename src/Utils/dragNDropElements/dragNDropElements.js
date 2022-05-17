import {
  deselectAll,
  select,
  deselectAllChildren,
} from "../ADISelectionModel/adiSelectionModel.js";

import {
  hideFloatingPanels,
  showPanel,
} from "../../EditorUI/FloatingPanel/FloatingPanel.js";

var mousePosY = 0;
const topBarsHeight = 170;
const leftBarWidth = 58;
const stage = document.querySelector("#stage");
const body = document.querySelector("body");
var strp = 0;

export function DragNDropElements() {
  /**
   * Drag elements
   * @param {Object} event
   * @ireturns {undefined}
   */

  document
    .querySelectorAll(
      ".strip:not(.header) .element-container:not(.strip).draggable"
    )
    .forEach((item) => {
      item.addEventListener("mousedown", function (event) {
        if (
          !event.target.closest("#gfpp") &&
          !event.target.closest(".resizer")
        ) {
          const activePanel = document.querySelector(
            `.floating-panel.active[element="${item.id}"]`
          );
          const gfppSelected = document.querySelector(
            `#${item.id} .gfpp .selected`
          );

          mousePosY = window.innerHeight - event.clientY;

          event.stopPropagation();

          let boxCoords = getCoords(item);
          let shiftX = event.pageX - boxCoords.left;
          let shiftY = event.pageY - boxCoords.top;
          locateStripAndAttach(event, shiftY, item);
          item.setAttribute("coords", `x:${boxCoords.left} y:${boxCoords.top}`);

          document.onmousemove = function (event) {
            deselectAllChildren();
            deselectAll();
            item.classList.add("on-the-move");
            item.closest(".strip")?.classList.add("origin-strip");

            stage.classList.add("dragging");
            body.classList.add("dragging");
            hideFloatingPanels();
            mousePosY = window.innerHeight - event.clientY;

            event.stopPropagation();
            let coords = {
              top: Math.ceil(
                event.pageY -
                  topBarsHeight +
                  stage.scrollTop -
                  shiftY -
                  strp * 500
              ),
              left: Math.ceil(event.pageX - leftBarWidth - shiftX),
            };

            item.style.left = coords.left + "px";
            item.style.top = coords.top + "px";

            item.setAttribute("coords", `x:${coords.left},y:${coords.top}`);
          };

          item.onmouseup = function (e) {
            console.log(activePanel);
            setTimeout(function () {
              activePanel && showPanel(activePanel, item.id);
              gfppSelected && gfppSelected.classList.add("selected");
            });

            document
              .querySelectorAll(".attach-to-me")
              .forEach((me) => me.classList.remove("attach-to-me"));

            event.stopPropagation();

            item.classList.remove("on-the-move");
            document.onmousemove = null;
            item.onmouseup = null;
            stage.onscroll = null;
            document
              .querySelectorAll(".origin-strip")
              .forEach((origin) => origin.classList.remove("origin-strip"));

            stage.classList.remove("dragging");
            body.classList.remove("dragging");

            select(item);
            item.closest(".strip")?.classList.add("parent-select");
            locateStripAndAttach(e, shiftY, item);
          };
        }
      });
    });
}
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top - pageYOffset,
    left: box.left + pageXOffset,
  };
}

function getElementTop(elem) {
  return parseInt(window.getComputedStyle(elem).top.split("px")[0]);
}
function locateStripAndAttach(e, shiftY, item) {
  let top = e.pageY - shiftY - topBarsHeight;
  strp = Math.floor(top / 500);

  item.style.top = top - strp * 500 + "px";
  item.closest(".strip")?.removeChild(item);
  document.querySelector(`#s${strp}`).appendChild(item);
  select(item);
}
