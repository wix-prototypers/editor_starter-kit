import { updatesectionActionsTop } from "../sectionActions/sectionActions.js";

import { getCoords, getSize } from "../functions.js";
const body = document.querySelector("body");
//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@latest/src/Utils/ADISelectionModel/adiSelectionModel.css";
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

export function hoverOnSection(section) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("hover");
    if (document.querySelector(".sectionHover")) {
      section.classList.remove("selected");
    }
  });
  section.classList.add("hover");
  if (document.querySelector(`#a${section.id.split("s")[1]}`)) {
    document
      .querySelectorAll(".Add-Section")
      .forEach((add) => add.classList.remove("show"));
    document
      .querySelector(`#a${section.id.split("s")[1]}`)
      .classList.add("show");
  }

  let sectionActions = document.querySelector(`.sectionActions`);
  if (section.querySelector(".strip.selected")) {
    sectionActions.classList.add("parent-select");
  } else {
    sectionActions.classList.remove("parent-select");
    if (!section.classList.contains("selected")) {
      sectionActions.classList.add("hover");
    }
  }
}

export function selectSection(section) {
  if (!section.classList.contains("selected")) {
    deselectAll();
    section.classList.add("selected");
    const mouseoverEvent = new Event("mouseover");
    section.dispatchEvent(mouseoverEvent);
    let secAct = document.querySelector(`#sectionActions`);
    secAct.classList.add("indent");

    if (document.querySelector(`#a${section.id.split("s")[1]}`)) {
      document
        .querySelectorAll(".Add-Section")
        .forEach((add) => add.classList.remove("show"));
      document
        .querySelector(`#a${section.id.split("s")[1]}`)
        .classList.add("show");
    }
    section.classList.add("select-overlay");
    setTimeout(() => {
      section.classList.remove("select-overlay");
    }, 800);
  }
}

export function selectElemeWrapper(eleme) {
  eleme.classList.add("selected");
}

export function deselect(eleme) {
  eleme.classList.remove("selected");
  let gfpp = eleme.querySelector("#gfpp");
  gfpp && gfpp.classList.remove("show");
}
export function deselectAll() {
  deselectAllSections();
  deselectAllStrips();
  deselectAllElemeWrappers();
}

export function deselectAllSections() {
  let sections = document.querySelectorAll("#stage .section");
  sections.forEach((section) => {
    section.classList.remove("selected");
    section.classList.remove("outs");
    section.classList.remove("parent-selected");
    section.classList.remove("stripped");
    section.contentEditable = false;
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));
  let secAct = document.querySelector(`#sectionActions`);
  secAct.classList.remove("indent");
}

export function deselectAllStrips() {
  let strips = document.querySelectorAll("#stage .strip");
  strips.forEach((strip) => {
    strip.classList.remove("selected");
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));
}
export function hoverOn(eleme) {
  document
    .querySelectorAll(".hovered")
    .forEach((hover) => hover.classList.remove("hovered"));
  eleme.classList.add("hovered");
  eleme.onmouseleave = () => {
    eleme.classList.remove("hovered");
  };
}

export function deselectEleme(eleme) {
  eleme.classList.remove("hovered");
  let gfpp = eleme.querySelector("#gfpp");
  gfpp && gfpp.classList.remove("show");
}
export function deselectAllElements() {
  strips.forEach((strip) => {
    strip.classList.remove("selected");
    strip.classList.remove("hovered");
    strip.classList.remove("parent-select");
    strip.contentEditable = false;
  });
  elemContainers.forEach((elem) => {
    elem.classList.remove("selected");
    elem.classList.remove("hovered");
    elem.contentEditable = false;
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));
}

export function deselectAllEleme() {
  elemContainers.forEach((elem) => {
    elem.classList.remove("selected");
    elem.classList.remove("hovered");
    elem.contentEditable = false;
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));
  document.querySelector.closest(".strip.parent-select") &&
    document
      .querySelector(".strip.parent-select")
      .classList.add("parent-select");
}

export function deselectAllElemeWrappers() {
  let elemContainers = document.querySelectorAll(".element-wrapper, .strip");
  elemContainers.forEach((elem) => {
    elem.classList.remove("selected");
    elem.classList.remove("hovered");
    elem.contentEditable = false;
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));

  if (document.querySelector(".strip.parent-select")) {
    document
      .querySelector(".strip.parent-select")
      .classList.add("parent-select");
  }
}

export function selectionModel(state, setState) {
  let elemContainers = document.querySelectorAll(".element-container");
  let stage = document.querySelector("#stage");
  var sections = document.querySelectorAll("#stage .section");
  /**
   * select element on stage
   * @param {Object} event
   * @ireturns {undefined}
   */

  let strips = document.querySelectorAll("#stage .strip");

  function selectEleme(eleme) {
    eleme.classList.add("selected");
  }

  strips.forEach((strip) => {
    strip.onmouseenter = (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      hoverOn(strip);
      hoverOnSection(strip.closest(".section"));
      strip.onmouseout = (e) => {
        strip.classList.remove("hovered");
      };
      updatesectionActionsTop(
        getCoords(strip.closest(".section")).top +
          getSize(strip.closest(".section")).height / 2 -
          78 +
          "px",
        strip.closest(".section"),
        state
      );

      if (
        document.querySelector(".sectionHover") &&
        !e.target.closest(".section").classList.contains("parent-selected")
      ) {
        sectionActions.classList.add("indent");
        sectionActions.classList.remove("un-indent");
      } else if (document.querySelector(".sectionHover")) {
      }
    };
    strip.onmouseover = (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      hoverOn(strip);

      hoverOnSection(strip.closest(".section"));
      strip.onmouseout = (e) => {
        strip.classList.remove("hovered");
      };
      if (e.target.closest(".sectionHover")) {
        document
          .querySelectorAll(".section.selected")
          .forEach((sel) => sel.classList.remove("selected"));
      }
    };
    if (
      document.querySelector(".sectionHover") &&
      !e.target.closest(".section").classList.contains("parent-selected")
    ) {
      sectionActions.classList.add("indent");
      sectionActions.classList.remove("un-indent");
    } else if (document.querySelector(".sectionHover")) {
    }
  });

  strips.forEach((strip) => {
    strip.onclick = (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (e.target.closest(".element-wrapper")) {
        e.target.closest(".element-wrapper").click();
        return;
      }
      if (
        document.querySelector(".stageClose") &&
        (document.querySelector(".zoomMode") ||
          document.querySelector(`[panel-type="add-sections"]`))
      ) {
        document.querySelector(".sectionActions").style.display = "none";
        setState(state, "panel", "close");
        setState(state, "zoomMode", { isActive: false });
      }

      hoverOnSection(strip.closest(".section"));
      updatesectionActionsTop(
        getCoords(strip.closest(".section")).top +
          getSize(strip.closest(".section")).height / 2 -
          78 +
          "px",
        strip.closest(".section"),
        state
      );

      document.querySelectorAll(".strip").forEach((strip) => {
        strip.classList.remove("parent-select");
        strip.classList.remove("selected");
      });
      if (
        e.target.closest(".element-container:not(.strip)") &&
        !e.target.closest("#gfpp") &&
        !e.target.closest(".resizing")
      ) {
        let elem = e.target.closest(".element-container:not(.strip)");
        deselectAllEleme();
        selectEleme(elem);
        document.querySelectorAll(".strip").forEach((strip) => {
          strip.classList.remove("parent-select");
          strip.classList.remove("selected");
        });
      } else {
        if (!e.target.closest(".resizing")) {
          deselectAll();
          document
            .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
            .forEach((act) => act.classList.remove("selected"));

          elemContainers.forEach((elem) => {
            elem.classList.remove("selected");
            elem.contentEditable = false;
          });

          document
            .querySelectorAll(".element-container:not(.strip)")
            .forEach((strip) => {
              strip.classList.remove("clicked");
            });

          document.querySelectorAll("#stage .section").forEach((section) => {
            section.classList.remove("parent-selected");
            section.classList.remove("stripped");
          });

          strip.closest(".section").classList.add("parent-selected");
          strip.closest(".section").classList.add("stripped");
          strip.classList.add("selected");
        }
      }
    };
  });

  //selectSection(document.querySelector("#s0"));

  sections.forEach(
    (section) =>
      (section.onclick = (e) => {
        if (
          !e.target.closest(".strip") &&
          !e.target.closest(".element-wrapper")
        ) {
          !body.classList.contains("useGfpp") &&
            document.querySelector("#sectionActions").classList.add("overlayz");
        }

        setTimeout(() => {
          document
            .querySelector("#sectionActions")
            .classList.remove("overlayz");
        }, 200);
        if (
          !e.target.closest(".strip") &&
          !e.target.closest(".element-wrapper")
        ) {
          if (document.querySelector(".stageClose")) {
            /*      setState(state, "zoomMode", { isActive: false }); */
          }

          document
            .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
            .forEach((act) => act.classList.remove("selected"));

          elemContainers.forEach((elem) => {
            elem.contentEditable = false;
          });
          if (
            !e.target.closest(".element-container:not(.section)") &&
            !e.target.closest(".hpp-btn.main-action") &&
            !e.target.closest(".section.selected")
          ) {
            deselectAllSections();
            selectSection(section);
          }

          /*  if (e.target.closest(".outside")) {
            section.classList.add("outs");
          } */
        }
      })
  );

  sections.forEach(
    (section) =>
      (section.onmouseover = (e) => {
        if (!section.closest(".resizing")) {
          hoverOnSection(section);
          updatesectionActionsTop(
            getCoords(section).top + getSize(section).height / 2 - 78 + "px",
            section,
            state
          );
          /*  setTimeout(() => {
            updateZgfppTop(
              Math.floor(getCoords(section).top + getSize(section).height / 2),
              section
            );
          }, 100); */

          if (
            document.querySelector(".sectionHover") &&
            !e.target.closest(".section").classList.contains("parent-selected")
          ) {
            sectionActions.classList.add("indent");
            sectionActions.classList.remove("un-indent");
          } else if (document.querySelector(".sectionHover")) {
          }

          section.onmouseenter = (e) => {
            if (
              document.querySelector(".sectionHover") &&
              !section.classList.contains("parent-selected")
            ) {
              console.log("yo");
              sectionActions.classList.add("indent");
              sectionActions.classList.remove("un-indent");
            } else if (document.querySelector(".sectionHover")) {
              sectionActions.classList.remove("indent");
              sectionActions.classList.add("un-indent");
            }
          };
        }
      })
  );
  const elements = document.querySelectorAll(".element-wrapper");

  elements.forEach((element) => {
    element.onmouseenter = (e) => {
      hoverOn(element);

      if (
        document.querySelector(".sectionHover") &&
        !e.target.closest(".section").classList.contains("parent-selected")
      ) {
        sectionActions.classList.add("indent");
        sectionActions.classList.remove("un-indent");
      } else if (document.querySelector(".sectionHover")) {
        sectionActions.classList.remove("indent");
        sectionActions.classList.add("un-indent");
      }

      element.onmouseleave = (e) => {
        deselectEleme(element);
      };
    };
  });

  elements.forEach(
    (element) =>
      (element.onclick = (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (!e.target.closest("#gfpp") && !e.target.closest(".resizing")) {
          let element = e.target.closest(".element-wrapper");
          deselectAllSections();
          deselectAllStrips();
          deselectAllElemeWrappers();
          selectElemeWrapper(element);

          document
            .querySelectorAll(".parent-select, .parent-selected, .stripped")
            .forEach((ps) => {
              ps.classList.remove("parent-selected");
              ps.classList.remove("parent-select");
              ps.classList.remove("stripped");
            });

          if (element.closest(".strip")) {
            element.closest(".strip").classList.add("parent-select");
            element.closest(".section").classList.add("parent-selected");
          } else {
            element.closest(".section").classList.add("parent-selected");
          }

          let sectionActions = document.querySelector(`#sectionActions`);
          sectionActions.classList.remove("indent");
        }
      })
  );
}
