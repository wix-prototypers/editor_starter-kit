import { gfppBtns } from "./gfpp_data.js";
import {
  showPanel,
  hideFloatingPanels,
} from "../../EditorUI/FloatingPanel/FloatingPanel.js";
import { getCoords, getSize } from "../functions.js";

import { uuid } from "../functions.js";

var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.4/src/Utils/GFPP/gfpp.css";
/*   "../src/Utils/GFPP/gfpp.css"; */
var exists = false;
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

export const Gfpp = (state, setState) => {
  let elemContainers = document.querySelectorAll(
    "#stage .element-container, .element-wrapper, .strip"
  );

  elemContainers.forEach((elem) => {
    let isSub = false;

    let gfppArray = elem.getAttribute("gfpp");
    gfppArray ? (gfppArray = gfppArray.split(" ")) : null;

    let activeArray = elem.getAttribute("gfppActive");
    activeArray ? (activeArray = activeArray.split(" ")) : null;
    let disabledArray = elem.getAttribute("gfppDisabled");
    disabledArray ? (disabledArray = disabledArray.split(" ")) : null;
    gfppArray
      ? createGFPP(gfppArray, elem, activeArray, disabledArray, isSub)
      : null;
  });

  /**
   * Create GFPP
   * @param {*} gfppArray
   * @param {*} element
   */

  function createGFPP(gfppArray, element, activeArray, disabledArray, isSub) {
    const gfppUl = document.createElement("ul");

    gfppUl.setAttribute("id", "gfpp");
    gfppUl.classList.add("gfpp");

    if (isSub) {
      gfppUl.classList.add("subGfpp");
    }

    gfppArray.forEach((button) => createGFPPItems(button));

    function createGFPPItems(button) {
      let gfppLi;
      gfppLi = document.createElement("li");
      gfppLi.setAttribute("type", button);

      if (gfppBtns[button] && gfppBtns[button].type == "text") {
        //create text button
        let gfppLiSpan = document.createElement("span");
        gfppLi.classList.add("gfpp-main-action");

        gfppLiSpan.innerHTML = gfppBtns[button].tooltip;
        gfppLi.appendChild(gfppLiSpan);
      } else if (gfppBtns[button]) {
        //create button
        gfppLi.innerHTML = gfppBtns[button].svg;
        gfppLi.classList.add("gfpp-btn");
        //create tooltip
        let toolTip = document.createElement("span");
        toolTip.classList.add("gfpp-tooltip");
        toolTip.innerHTML = gfppBtns[button].tooltip;
        let toolTipArrow = document.createElement("div");
        toolTipArrow.classList.add("arrow");
        toolTip.appendChild(toolTipArrow);
        gfppLi.appendChild(toolTip);
      }

      //set Active state
      if (activeArray && activeArray.includes(button)) {
        gfppLi.classList.add("active");
      }
      //set disabled state
      if (disabledArray && disabledArray.includes(button)) {
        gfppLi.classList.add("disabled");
      }
      gfppUl.appendChild(gfppLi);
    }

    !element.querySelector("#gfpp") && element.prepend(gfppUl);

    /**
     * Select GFPP button
     * @param {Object} event
     * @returns {undefined}
     */

    let allBtns = document.querySelectorAll(
      ".gfpp-btn,.gfpp-btn svg,.gfpp-main-action"
    );

    allBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.target.closest(".gfpp-tooltip")) {
          return;
        }

        let btnTarget = e.target.closest("li");
        window.onGfppClick &&
          onGfppClick.apply({
            buttonType: btnTarget.getAttribute("type"),
            elementContainerRef: btnTarget.closest(".element-container"),
            elementContainerId: btnTarget.closest(".element-container").id,
          });

        btnTarget = btnTarget.closest("li");
        if (!btnTarget.classList.contains("disabled")) {
          hideFloatingPanels();
          if (btnTarget.classList.contains("selected")) {
            btnTarget.classList.remove("selected");
          } else {
            allBtns.forEach((btn) => btn.classList.remove("selected"));
            btnTarget.classList.add("selected");
            let elementId = btnTarget.closest(".element-container").id;
            let type = btnTarget.getAttribute("type");
            const panel = document.querySelector(
              `.floating-panel[element="${elementId}"][gfpp-trigger="${type}"]`
            );

            showPanel(panel, elementId);
          }
        }
      });
    });

    /**
     * Show/hide tooltip
     * @param {Object} event
     * @returns {undefined}
     */

    allBtns.forEach((btn) => {
      btn.addEventListener("mouseover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let btnTarget = e.target;
        btnTarget = btnTarget.closest("li");
        let ttp = btnTarget.querySelector(".gfpp-tooltip");
        if (ttp) {
          ttp.classList.add("show");
        }
      });

      btn.addEventListener("mouseout", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let btnTarget = e.target;
        btnTarget = btnTarget.closest("li");
        let ttp = btnTarget.querySelector(".gfpp-tooltip");
        if (ttp) {
          ttp.classList.remove("show");
        }
      });
    });

    /**
     * update gfpp on panel close
     * @param {event} blur
     * @param {*} undefined
     */
    let stage = document.querySelector("#stage");
    stage.addEventListener("click", (e) => {
      if (
        !e.target.closest(".panel-frame") &&
        !e.target.classList.contains("mode-bar") &&
        !event.target.closest(".element-container") &&
        !event.target.closest(".sub-element-container")
      ) {
        elemContainers.forEach((elem) => {
          elem.querySelectorAll("li").forEach((li) => {
            if (li.classList.contains("selected")) {
              li.classList.remove("selected");
            }
          });
        });
      }
    });
    elemContainers.forEach((container) => {
      container.addEventListener("click", (e) => {
        document
          .querySelectorAll("#gfpp.show")
          .forEach((show) => show.classList.remove("show"));

        e.stopImmediatePropagation();

        if (
          !e.target.closest(".panel-frame") &&
          !e.target.closest(".mini-panel-frame") &&
          !e.target.closest(".mini-panel-frame") &&
          !e.target.closest(".context-menu") &&
          (!e.target.closest(".select-overlay") ||
            e.target.closest(".elementfirst")) &&
          !e.target.closest(".sub-element-container") &&
          !e.target.closest(`[contenteditable="true"]`) &&
          !e.target.querySelector(`[contenteditable="true"]`) &&
          e.target.getAttribute("contenteditable") != true
        ) {
          e.target.querySelector("#gfpp") &&
            !e.target.querySelector("#gfpp").classList.contains("show") &&
            e.target.querySelector("#gfpp").classList.add("show");

          document
            .querySelectorAll("#gfpp.show")
            .forEach((show) => show.classList.remove("show"));
          elemContainers.forEach((elem) => {
            elem.classList.remove("paneled");
            elem.querySelectorAll("li").forEach((li) => {
              if (li.classList.contains("selected")) {
                li.classList.remove("selected");
              }
            });
          });

          if (
            !e.target.closest(".strip") &&
            !e.target.closest(".element-wrapper") &&
            (!e.target.closest(".select-overlay") ||
              e.target.closest(".elementfirst"))
          ) {
            console.log(
              e.target
                .closest(".section")
                .querySelector("#gfpp")
                .classList.add("show")
            );
            document.querySelectorAll(".context-menu").forEach((element) => {
              element.remove();
            });
            var gfpp = e.target
              .closest(".section")
              .querySelector(".section > #gfpp");
          }
        }
      });
    });
  }
};
