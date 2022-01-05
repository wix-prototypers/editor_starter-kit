import {
  deselectAll,
  select,
} from "./Utils/ADISelectionModel/adiSelectionModel.js";
import { DragNDrop } from "./Utils/dragNDrop/dragNDrop.js";
import { getCoords, titleCase } from "./Utils/functions.js";
import { Gfpp } from "./Utils/GFPP/gfpp.js";
import { Resizable } from "./Utils/Resize/Resize.js";

export const Actions = {
  //Actions

  selectedElement(element) {
    if (!element.classList.contains("selected")) {
      select(element);

      if (!element.querySelector("#gfpp")) {
        Gfpp();
        DragNDrop();
        Resizable();
      }
    }
  },

  zoomMode(data) {
    const stage = document.querySelector("#stage");
    const body = document.querySelector("body");
    const leftPanel = document.querySelector("#left-panel");
    const editor = document.querySelector("#editor");
    const leftBar = document.querySelector("#left-bar");
    const sectionActions = document.querySelector(".sectionActions");
    const zoomBtn = document.querySelector(".zoom");

    if (data == "active" || data === true) {
      editor.classList.add("zoomMode");
      zoomBtn.classList.add("selected");
      stage.classList.add("zoomMode");
      body.classList.add("zoomMode");
      body.removeAttribute("panel-type");
      stage.removeAttribute("panel-type");
    } else if (data === false) {
      editor.classList.remove("zoomMode");
      zoomBtn.classList.remove("selected");
      stage.classList.remove("zoomMode");
      body.classList.remove("zoomMode");
    }
  },

  leftPanel(data) {
    const stage = document.querySelector("#stage");
    const body = document.querySelector("body");
    const leftPanel = document.querySelector("#left-panel");
    const editor = document.querySelector("#editor");
    const leftBar = document.querySelector("#left-bar");
    const sectionActions = document.querySelector(".sectionActions");
    if (data === "close" || data === false) {
      stage.classList.remove("design");
      leftBar.classList.remove("panld");

      document.querySelector("#left-panel").classList.remove("show");
      document.querySelector("#left-panel").removeAttribute("content");
      document
        .querySelectorAll(`.leftbar-item.selected`)
        .forEach((selected) => selected.classList.remove("selected"));
      stage.removeAttribute("panel-type");
      body.removeAttribute("panel-type");
    } else if (data) {
      leftBar.classList.add("panld");
      document.querySelector("#left-panel").classList.add("show");
      document.querySelector("#left-panel").setAttribute("show-panel", data);

      switch (data) {
        case "add": {
          document
            .querySelectorAll("#left-panel .title")
            .forEach((title) => (title.innerHTML = titleCase("Add Elements")));

          document
            .querySelector("#left-panel")
            .setAttribute("show-panel", "add-elements");
          break;
        }
        case "pages": {
          document
            .querySelectorAll("#left-panel .title")
            .forEach((title) => (title.innerHTML = titleCase("Site Pages")));

          break;
        }
        case "design": {
          deselectAll();
          document
            .querySelectorAll("#left-panel .title")
            .forEach((title) => (title.innerHTML = titleCase("Design")));

          break;
        }
        case "apps": {
          document
            .querySelectorAll("#left-panel .title")
            .forEach(
              (title) => (title.innerHTML = titleCase("Wix App Market"))
            );
          break;
        }
        case "ascend": {
          document
            .querySelectorAll("#left-panel .title")
            .forEach((title) => (title.innerHTML = titleCase("My Business")));
          break;
        }
      }
    }
  },
};
