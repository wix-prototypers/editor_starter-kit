import { gfppBtns } from "./gfpp_data.js";
import { getCoords, getSize } from "../functions.js";

//Append Styles

var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.1.5-beta/src/Utils/GFPP/gfpp.css";
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
    "#stage .element-container, .element-wrapper, .section"
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
        document.querySelectorAll(".context-menu").forEach((element) => {
          element.remove();
        });

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.target.closest(".gfpp-tooltip")) {
          return;
        }

        let btnTarget = e.target;
        btnTarget = btnTarget.closest("li");
        console.log(btnTarget.closest("li"));
        if (!btnTarget.classList.contains("disabled")) {
          if (btnTarget.classList.contains("selected")) {
            btnTarget.classList.remove("selected");
            document.querySelectorAll(".context-menu").forEach((element) => {
              element.remove();
            });
          } else {
            allBtns.forEach((btn) => btn.classList.remove("selected"));
            console.log(btnTarget);

            btnTarget.classList.add("selected");
            let element = btnTarget.closest(".element-container");
            let elementId = btnTarget.closest(".element-container").id;
            let type = btnTarget.getAttribute("type");
            const panel = document.querySelector(
              `.floating-panel[element="${elementId}"][gfpp-trigger="${type}"]`
            );

            panel && panel.classList.add("active");
            panel.style.top = getCoords(element).top + 200 + "px";
            panel.style.left =
              getCoords(element).left + getSize(element).width + 140 + "px";
          }

          //further actions, see function below
        }
      });
    });
    //trigger main action on double-click
    /*    element.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      let mainAction = element.querySelector(".gfpp-main-action");
      mainAction.click();
    }); */

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
            if (e.target.closest("#s0")) {
              gfpp.style.left = window.innerWidth - 350 + "px";
              gfpp.style.top = 30 + stage.scrollTop + "px";
            } else if (e.target.closest("#s1")) {
              if (e.pageX > window.innerWidth - 400) {
                gfpp.style.top = e.pageY - 860 + stage.scrollTop + "px";
                gfpp.style.left = window.innerWidth - 480 + "px";
              } else if (e.pageX < 200) {
                gfpp.style.top = e.pageY - 860 + stage.scrollTop + "px";
                gfpp.style.left = 150 + "px";
              } else if (e.pageX > window.innerWidth - 300) {
                gfpp.style.top = e.pageY - 860 + stage.scrollTop + "px";
                gfpp.style.left = e.pageX - 250 + "px";
              } else {
                gfpp.style.top = e.pageY - 860 + stage.scrollTop + "px";
                gfpp.style.left = e.pageX - 50 + "px";
              }
            } else {
              console.log(e.pageY);
              gfpp.style.top = 50 + "px";
              gfpp.style.left = window.innerWidth - 350 + "px";
            }
          }
        } else {
          var gfpp = e.target
            .closest(".section")
            .querySelector(".section > #gfpp");
          gfpp.classList.remove("show");
          e.target.closest(".section").classList.remove("select-overlay");
        }
      });
    });
  }
};
