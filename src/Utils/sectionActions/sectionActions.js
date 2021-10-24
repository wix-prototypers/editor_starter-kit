import { sectionActionsBtns } from "./sectionActions_data.js";
import { getCoords, getSize } from "../functions.js";
import { selectSection } from "../ADISelectionModel/adiSelectionModel.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/Utils/sectionActions/sectionActions.css";
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

const stage = document.querySelector("#stage");
//moveUp moveDown duplicate delete

export const sectionActions = (state, setState) => {
  let elemContainers = document.querySelectorAll("#stage .section");

  elemContainers.forEach((elem) => {
    let isSub = false;

    if (getCoords(elem).top < 150) {
      isSub = true;
    }
  });

  /**
   * Create sectionActions
   * @param {*} sectionActionsArray
   * @param {*} element
   */

  function createsectionActions() {
    let sectionActionsArray = [
      `moveUp`,
      `moveDown`,
      `duplicate`,
      "delete",
      "background",
      "animation",
      "elipsis",
    ];
    const sectionActionsUl = document.createElement("ul");

    sectionActionsUl.setAttribute("id", "sectionActions");
    sectionActionsUl.classList.add("sectionActions");
    sectionActionsUl.setAttribute("top", "90px");
    sectionActionsUl.setAttribute("section", "#s0");

    sectionActionsArray.forEach((button) => createsectionActionsItems(button));

    function createsectionActionsItems(button) {
      let sectionActionsLi;
      sectionActionsLi = document.createElement("li");
      sectionActionsLi.setAttribute("type", button);

      //create button
      sectionActionsLi.innerHTML = sectionActionsBtns[button].svg;
      sectionActionsLi.classList.add("sectionActions-btn");
      //create tooltip
      let toolTip = document.createElement("span");
      toolTip.classList.add("sectionActions-tooltip");
      toolTip.innerHTML = sectionActionsBtns[button].tooltip;
      let toolTipArrow = document.createElement("div");
      toolTipArrow.classList.add("arrow");
      toolTip.appendChild(toolTipArrow);
      toolTip.setAttribute("type", button);
      sectionActionsLi.appendChild(toolTip);
      sectionActionsUl.appendChild(sectionActionsLi);
    }

    !stage.parentNode.querySelector("#sectionActions") &&
      stage.parentNode.prepend(sectionActionsUl);
    setTimeout(() => {
      document
        .querySelector(`#sectionActions [type="moveDown"]`)
        .insertAdjacentHTML("afterend", "<hr/>");
    });

    /**
     * Select sectionActions button
     * @param {Object} event
     * @returns {undefined}
     */

    let allBtns = document.querySelectorAll(
      ".sectionActions-btn,.sectionActions-btn svg,.sectionActions-main-action"
    );

    let actions = document.querySelector("#sectionActions");
    //trigger main action on double-click

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
        let ttp = btnTarget.querySelector(".sectionActions-tooltip");
        if (ttp) {
          ttp.classList.add("show");
        }

        let sectionId = e.target
          .closest("#sectionActions")
          .getAttribute("section");

        let section = document.querySelector(`#stage #${sectionId}`);
        let body = document.querySelector("body");
        if (body.classList.contains("actionsOverlay")) {
          !section.classList.contains("selected") &&
            section.classList.add("hover");
          section.classList.contains("selected") &&
            section.classList.add("overlay");
          section.classList.contains("parent-selected") &&
            section.classList.add("overlay");
        }
      });

      btn.addEventListener("mouseout", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let btnTarget = e.target;
        btnTarget = btnTarget.closest("li");
        let ttp = btnTarget.querySelector(".sectionActions-tooltip");
        if (ttp) {
          ttp.classList.remove("show");
          let sectionId = e.target
            .closest("#sectionActions")
            .getAttribute("section");

          let section = document.querySelector(`#stage #${sectionId}`);

          section.classList.remove("overlay");
        }
      });
    });

    actions.addEventListener("mouseover", function (e) {
      let sectionId = e.target
        .closest("#sectionActions")
        .getAttribute("section");

      let section = document.querySelector(`#stage #${sectionId}`);

      console.log(section);
      !section.classList.contains("selected") && section.classList.add("hover");
    });

    /**
     * update sectionActions on panel close
     * @param {event} blur
     * @param {*} undefined
     */

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
        if (
          !e.target.closest(".panel-frame") &&
          !e.target.closest(".mini-panel-frame") &&
          !e.target.classList.contains("mode-bar") &&
          !e.target.closest(".sub-element-container") &&
          !e.target.closest(".paneled")
        ) {
          elemContainers.forEach((elem) => {
            elem.classList.remove("paneled");
            elem.querySelectorAll("li").forEach((li) => {
              if (li.classList.contains("selected")) {
                li.classList.remove("selected");
              }
            });
          });
        }
      });
    });
  }

  createsectionActions();

  setTimeout(() => {
    document.querySelectorAll(".sectionActions").forEach((sectionActions) => {
      sectionActions.onclick = () => {
        let section = document.querySelector(
          "#" + sectionActions.getAttribute("section")
        );
        selectSection(section);
      };
    });
  });
  document.querySelectorAll(".edit-panel .close").forEach((sectionActions) => {
    sectionActions.onclick = () => {
      setState(state, "editPanel", "close");
    };
  });
};

export function updatesectionActionsTop(top, section) {
  let sectionActions = document.querySelector("#sectionActions");
  if (document.querySelector(".mvpScroll")) {
    sectionActions.classList.add("show");
    sectionActions.setAttribute("section", section.id);
    let mvp = window.innerHeight / 2 - 40;
    let scrollTop = stage.scrollTop;

    let sectionTop = getCoords(section).top + scrollTop;
    let sectionBottom = getCoords(section).top + getSize(section).height;
    console.log(sectionTop, mvp, sectionBottom);
    if (mvp > sectionTop - scrollTop && mvp < sectionBottom - 192) {
      sectionActions.style.top = mvp + "px";
      console.log(1);
    } else if (mvp < sectionTop - scrollTop) {
      sectionActions.style.top = sectionTop - scrollTop + 12 + "px";
      console.log(2);
    } else {
      console.log(3);
      sectionActions.style.top = sectionBottom - 192 + "px";
    }
    if (section.classList.contains("selected")) {
      sectionActions.classList.remove("un-indent");
    } else {
      sectionActions.classList.add("un-indent");
    }
  } else {
    sectionActions.classList.add("show");

    if (section.classList.contains("selected")) {
      sectionActions.classList.remove("un-indent");
    } else {
      sectionActions.classList.add("un-indent");
    }

    sectionActions.style.top = top;
    sectionActions.setAttribute("section", section.id);
    setTimeout(() => {
      sectionActions.style.opacity = 1;
    }, 100);
  }
}
export function hidesectionActions() {
  let sectionActions = document.querySelector("#sectionActions");
  sectionActions.style.opacity = 0;
}

export function updatesectionActionsTopOnResizeandScroll() {
  let sectionActions = document.querySelector("#sectionActions");
  let strip = document.querySelector(
    `.section#${sectionActions.getAttribute("section")}`
  );
  let top = getCoords(strip).top - 10 + getSize(strip).height / 2;
  sectionActions.style.top = top + "px";
}
