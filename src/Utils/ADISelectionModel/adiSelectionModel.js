import { DragNDrop } from "../dragNDrop/dragNDrop.js";
import { Gfpp } from "../GFPP/gfpp.js";
import { Resizable } from "../Resize/Resize.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.5-beta/src/Utils/ADISelectionModel/adiSelectionModel.css";
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

let stage = document.querySelector("#stage");
let overlay = document.querySelector(".stage-overlay");

export function select(eleme) {
  deselectAll();
  eleme.classList.add("selected");
  !eleme.classList.contains(".strip") &&
    eleme.closest(".strip").classList.add("parent-select");
  state.selectedElement = eleme;
}

export function hoverOn(eleme) {
  const event = new Event("hovered");
  eleme.dispatchEvent(event);
  eleme.classList.add("hovered");
}

export function deselect(eleme) {
  eleme.classList.remove("hovered");
  let gfpp = eleme.querySelector("#gfpp");
  gfpp && gfpp.classList.remove("show");
}
export function deselectAll() {
  let elemContainers = document.querySelectorAll(
    "#stage .element-container:not(.strip)"
  );
  let strips = document.querySelectorAll(".element-container.strip");
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

export function deselectAllChildren() {
  let elemContainers = document.querySelectorAll(
    "#stage .element-container:not(.strip)"
  );
  elemContainers.forEach((elem) => {
    elem.classList.remove("selected");
    elem.classList.remove("hovered");
    elem.contentEditable = false;
  });
  document
    .querySelectorAll(".gfpp-btn, .hpp-btn, .main-action")
    .forEach((act) => act.classList.remove("selected"));
}

export function selectionModel(state, setState) {
  let elemContainers = document.querySelectorAll(
    ".element-container:not(.strip)"
  );
  elemContainers.forEach((eleme) =>
    eleme.addEventListener("stageElement", () => {
      console.log("to");
      DragNDrop(state, setState);
      Resizable(state, setState);
      selectionModel(state, setState);
      Gfpp(state, setState);
    })
  );

  /**
   * select element on stage
   * @param {Object} event
   * @returns {undefined}
   */

  let strips = document.querySelectorAll(".strip");

  strips.forEach(
    (strip) =>
      (strip.onmouseenter = (e) => {
        hoverOn(strip);
        strip.onmouseleave = (e) => {
          deselect(strip);
        };
      })
  );

  strips.forEach(
    (strip) =>
      (strip.onclick = (e) => {
        console.log("to");
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (!e.target.closest(".floating-panel"))
          document
            .querySelectorAll(".floating-panel")
            .forEach((frame) => frame.classList.remove("active"));
        if (
          e.target.closest(".element-container:not(.strip)") &&
          !e.target.closest("#gfpp")
        ) {
          let elem = e.target.closest(".element-container:not(.strip)");
          deselectAll();
          select(elem);
          document.querySelectorAll(".parent-select").forEach((strip) => {
            strip.classList.remove("parent-select");
          });
          elem.closest(".strip").classList.add("parent-select");
        } else {
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
            .forEach((eleme) => {
              eleme.classList.remove("clicked");
            });

          document
            .querySelectorAll(".element-container.strip")
            .forEach((strip) => {
              strip.classList.remove("parent-select");
              strip.classList.remove("hovered");
            });
          strip.classList.add("selected");
        }
      })
  );

  elemContainers.forEach(
    (elementContainer) =>
      (elementContainer.onclick = (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (!e.target.closest(".floating-panel"))
          document
            .querySelectorAll(".floating-panel")
            .forEach((frame) => frame.classList.remove("active"));
        if (
          e.target.closest(".element-container:not(.strip)") &&
          !e.target.closest("#gfpp")
        ) {
          let elem = e.target.closest(".element-container:not(.strip)");
          deselectAll();
          select(elem);
          document.querySelectorAll(".parent-select").forEach((strip) => {
            strip.classList.remove("parent-select");
          });
          elem.closest(".strip").classList.add("parent-select");
        } else {
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
            .forEach((eleme) => {
              eleme.classList.remove("clicked");
            });

          document
            .querySelectorAll(".element-container.strip")
            .forEach((strip) => {
              strip.classList.remove("parent-select");
              strip.classList.remove("hovered");
            });
          strip.classList.add("selected");
        }
      })
  );
}
