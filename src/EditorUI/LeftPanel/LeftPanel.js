import {
  addPanelContent,
  designPanelContent,
  addElementsContent,
  myBizContent,
  pagesPanel,
  appsContent,
} from "./leftPanelContent.js";
import {
  selectionModel,
  selectSection,
} from "../../Utils/ADISelectionModel/adiSelectionModel.js";
import { AddSection } from "../../Utils/AddSection/AddSection.js";

const stage = document.querySelector("#stage");
//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@latest/src/EditorUI/LeftPanel/left-panel.css";
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

export const LeftPanel = (state, setState) => {
  let container = document.querySelector("#left-panel");

  container.insertAdjacentHTML("afterbegin", addPanelContent);
  container.insertAdjacentHTML("afterbegin", addElementsContent);
  container.insertAdjacentHTML("afterbegin", designPanelContent);
  container.insertAdjacentHTML("afterbegin", myBizContent);
  container.insertAdjacentHTML("afterbegin", pagesPanel);
  container.insertAdjacentHTML("afterbegin", appsContent);
  setTimeout(() => {
    container.querySelectorAll(".panel-header .close-panel").forEach(
      (close) =>
        (close.onclick = (e) => {
          if (e.target.closest(".regular")) {
            setState(state, "regPanel", "close");
            setState(state, "zoomMode", { isActive: false });
            setTimeout(() => {
              e.target.closest(".regular") &&
                e.target.closest(".regular").classList.remove("regular");
            }, 300);
          } else {
            setState(state, "panel", "close");
            setState(state, "regPanel", "close");
            setState(state, "zoomMode", { isActive: false });
          }
        })
    );

    document
      .querySelectorAll(`.section.content-item.draggable`)
      .forEach((section) => {
        section.onclick = (e) => {
          let placeholder = document.querySelector(".place-holder.on");
          placeholder && placeholder.classList.remove("place-holder");
          placeholder.innerText = "";
          placeholder.classList.add("dropped");
          var added = null;

          sectionfy(placeholder, section);
          placeholder.insertAdjacentHTML(
            "afterend",
            `   <div class="place-holder next" id="ph4">Add Section Here</div>`
          );
          placeholder.insertAdjacentHTML(
            "beforebegin",
            `   <div class="place-holder" id="ph4">Add Section Here</div>`
          );
          reorderSections(state, setState);

          let scrollId = parseInt(placeholder.id.split("s")[1]) + 1;
          let scrollPh = document.querySelector(`#ph${scrollId}`);

          if (document.querySelector(".closePanel")) {
            document.querySelector(".close-panel").click();
            placeholder.scrollIntoView({
              block: "center",
              inline: "end",
            });
          } else {
            let scrolltoId = placeholder.id.replace("s", "a");

            let scrollTo = document.querySelector("#" + scrolltoId);
            console.log(scrollTo);

            placeholder.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          setTimeout(() => {
            stage.classList.remove("halt");
          }, 3000);
        };
      });

    document.querySelector(".cust-btn").onclick = () => {
      document.querySelector(".design-panel-content").classList.add("kits");

      setTimeout(() => {
        document
          .querySelector(".design-panel-content")
          .classList.remove("unkits");
      }, 300);
      document.querySelector(
        ".design-panel .title"
      ).innerHTML = `<div class="flex align-center"><!--?xml version="1.0" encoding="UTF-8"?-->
        <svg style="transform: translate(-2px,1px) !important;" width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>Path 2</title>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Panels-/-Design-theme" transform="translate(-26.000000, -24.000000)">
                    <rect id="BG" fill="#FFFFFF" x="0.969230769" y="6" width="299" height="48"></rect>
                    <text id="Text" font-family="HelveticaRounded-Bold, Helvetica" font-size="16" font-weight="bold" line-spacing="24" fill="#17191C">
                   
                    </text>
                    <polyline id="Path-2" stroke="#000000" stroke-width="2" points="33.1082458 25 28 30.1082458 33.1082458 35.2164917"></polyline>
                </g>
            </g>
        </svg><h3 style="transform: translate(12px,0px) !important;">Site Theme</h3></div>`;
    };

    document.querySelector("#new-design").onclick = (e) => {
      var root = document.documentElement;

      root.style.setProperty("--template-light", "#ffffff");
      root.style.setProperty("--template-dark", "#071545");
      root.style.setProperty("--template1", "#3d45f5");
      root.style.setProperty("--template2", "#f0482a");
      root.style.setProperty("--template3", "#fab600");
      root.style.setProperty("--template4", "#5078bf");
      root.style.setProperty("--main-bg", "#f7b590");
      root.style.setProperty("--template-font-1", "Poppins");

      document
        .querySelectorAll(".design-kit")
        .forEach((kit) => kit.classList.remove("selected"));

      e.target.closest(".design-kit").classList.add("selected");
    };
  });
};

export function reorderSections(state, setState) {
  let sections = document.querySelectorAll("#stage .section");
  sections.forEach((section, id) => (section.id = `s${id}`));
  let placeholders = document.querySelectorAll(".place-holder");
  placeholders.forEach((placeholder, id) => (placeholder.id = `ph${id}`));
  setTimeout(() => {
    AddSection(state, setState);
    selectionModel(state, setState);
  });
}

function sectionfy(placeholder, section) {
  placeholder.classList.add("added");
  placeholder.classList.add("section");
  placeholder.classList.add("about2");
  let templateStrip = document
    .querySelector(".template-strip1")
    .cloneNode(true);
  templateStrip.classList.remove("off");
  placeholder.setAttribute("hat", "Section : About");

  placeholder.classList.remove("place-holder");
  placeholder.classList.remove("dropped");
  placeholder.innerText = "";
  placeholder.insertAdjacentHTML(
    "afterbegin",
    `<div class="attach-to-section"><div class="attach-banner">Attach to Section</div></div>`
  );
  placeholder.insertAdjacentHTML("beforeend", `<div class="outside"></div>`);
  placeholder.insertAdjacentElement("beforeend", templateStrip);
  stage.classList.add("halty");
  selectSection(placeholder);

  setTimeout(() => {
    stage.classList.remove("halty");
  }, 1200);
}
