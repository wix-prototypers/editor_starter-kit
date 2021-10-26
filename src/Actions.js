import {
  deselectAll,
  selectSection,
} from "./Utils/ADISelectionModel/adiSelectionModel.js";
import { getCoords, titleCase } from "./Utils/functions.js";

export const Actions = {
  remainOpen() {
    body.classList.remove("closePanel");
  },
  closePanel() {
    body.classList.add("closePanel");
  },
  option1() {
    document.documentElement.style.setProperty(
      "--section-selection",
      `#116dff`
    );
    document.documentElement.style.setProperty(
      "--section-selection-light",
      `#e0f0fa`
    );
  },
  option2() {
    document.documentElement.style.setProperty(
      "--section-selection",
      `#60bc57`
    );
    document.documentElement.style.setProperty(
      "--section-selection-light",
      `#ddffda`
    );
  },
  option3() {
    document.documentElement.style.setProperty(
      "--section-selection",
      `#5a48f5`
    );
    document.documentElement.style.setProperty(
      "--section-selection-light",
      `#e7e4ff`
    );
  },
  option4() {
    document.documentElement.style.setProperty(
      "--section-selection",
      `#0a6363`
    );
    document.documentElement.style.setProperty(
      "--section-selection-light",
      `#e5fbfb`
    );
  },
  option5() {
    document.documentElement.style.setProperty(
      "--section-selection",
      `#0d487f`
    );
    document.documentElement.style.setProperty(
      "--section-selection-light",
      `#deebf8`
    );
  },
  showSpacing() {
    document.querySelector("#stage").classList.remove("noSpace");
  },
  removeSpacing() {
    document.querySelector("#stage").classList.add("noSpace");
  },

  //Actions

  zoomMode(data) {
    const stage = document.querySelector("#stage");
    const body = document.querySelector("body");
    const leftPanel = document.querySelector("#left-panel");
    const editor = document.querySelector("#editor");
    const leftBar = document.querySelector("#left-bar");
    const sectionActions = document.querySelector(".sectionActions");
    const zoomBtn = document.querySelector(".zoom");

    if (data.isActive == true) {
      editor.classList.add("zoomMode");
      zoomBtn.classList.add("selected");
      stage.classList.add("zoomMode");
      body.classList.add("zoomMode");
      body.removeAttribute("panel-type");
      stage.removeAttribute("panel-type");
    } else {
      editor.classList.remove("zoomMode");
      zoomBtn.classList.remove("selected");
      stage.classList.remove("zoomMode");
      body.classList.remove("zoomMode");
    }
  },

  //App
  panel(data) {
    const stage = document.querySelector("#stage");
    const body = document.querySelector("body");
    const leftPanel = document.querySelector("#left-panel");
    const editor = document.querySelector("#editor");
    const leftBar = document.querySelector("#left-bar");
    const sectionActions = document.querySelector(".sectionActions");
    const zoomBtn = document.querySelector(".zoom");

    stage.style.pointerEvents = "none";

    sectionActions.classList.remove("show");

    sectionActions.style.visibility = "hidden";
    if (data == "close") {
      leftBar.classList.remove("panld");
      stage.style.pointerEvents = "all";
      editor.classList.remove("add-sections");
      editor.classList.remove("zoomMode");
      sectionActions.classList.remove("show");
      if (stage.classList.contains("zoomMode")) {
        editor.classList.add("zoomMode");

        sectionActions.classList.remove("show");
      }
      document.querySelector("#left-panel").classList.remove("show");
      document.querySelector("#left-panel").removeAttribute("content");
      document
        .querySelectorAll(`.leftbar-item.selected`)
        .forEach((selected) => selected.classList.remove("selected"));
      stage.removeAttribute("panel-type");
      body.removeAttribute("panel-type");

      document
        .querySelectorAll(`.place-holder`)
        .forEach((selected) => selected.classList.remove("on"));

      !stage.classList.contains("zoomMode") &&
        zoomBtn.classList.remove("selected");
    } else if (data.isOpen) {
      leftBar.classList.add("panld");

      editor.classList.add("add-sections");
      if (data.type == "add") {
        leftBar.classList.add("panld");
        zoomBtn.classList.add("selected");
        document
          .querySelector(".leftbar-item-sections")
          .classList.add("selected");
        if (data.panelContent == "sections") {
          editor.classList.contains("zoomMode") &&
            document
              .querySelectorAll(".place-holder")
              .forEach((ph) => ph.classList.remove("on"));
        }

        editor.classList.add("zoomMode");
        leftPanel.setAttribute("content", "add-sections");
        stage.setAttribute("panel-type", "add-sections");
        body.setAttribute("panel-type", "add-sections");
        document.querySelector("#left-panel").classList.add("show");
        document.querySelector("#left-panel").setAttribute("show-panel", "add");
        document.querySelectorAll("#left-panel .title").forEach((ttl) => {
          ttl.innerHTML = "Add Sections";
        });

        setTimeout(() => {
          stage.style.pointerEvents = "all";

          sectionActions.style.visibility = "visible";
        }, 500);

        setTimeout(() => {
          data.sectionPlaceholder.classList.add("on");
        }, 500);
      }
    }
    setTimeout(() => {
      stage.style.pointerEvents = "all";

      sectionActions.style.visibility = "visible";
    }, 500);
  },
  regPanel(data) {
    const stage = document.querySelector("#stage");
    const body = document.querySelector("body");
    const leftPanel = document.querySelector("#left-panel");
    const editor = document.querySelector("#editor");
    const leftBar = document.querySelector("#left-bar");
    const sectionActions = document.querySelector(".sectionActions");
    if (data === "close") {
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
          stage.setAttribute("panel-type", "add-sections");
          stage.classList.add("design");
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

  editPanel(data) {
    const zoomBtn = editor.querySelector(".zoom");
    if (data == "close") {
      zoomBtn.classList.remove("selected");
      body.removeAttribute("panel-type");
      document.querySelector("#sectionActions").classList.remove("show");
      document
        .querySelectorAll(".highlight")
        .forEach((high) => high.classList.remove("highlight"));
      document.querySelectorAll(".hlight").forEach((hlight) => {
        hlight.classList.remove("hlight");
      });

      var mouseEvent = new Event("mouseover");

      document.querySelector(".section").dispatchEvent(mouseEvent);
    } else if (data.isActive) {
      zoomBtn.classList.add("selected");
      body.setAttribute("panel-type", "edit-panel");

      deselectAll();
      console.log();
      selectSection(document.querySelector("#" + data.id));
    }
  },
  stageOnly() {
    body.classList.remove("stageAndWorkspace");
    body.classList.add("liteMode");
  },
  stageAndWorkspace() {
    body.classList.add("stageAndWorkspace");
    body.classList.remove("liteMode");
  },
  closePanel() {
    body.classList.add("closePanel");
  },
  notCloePanel() {
    body.classList.remove("closePanel");
  },
};
