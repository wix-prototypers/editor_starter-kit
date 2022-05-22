import {
  addPanelContent,
  designPanelContent,
  addElementsContent,
  myBizContent,
  pagesPanel,
  appsContent,
} from "./leftPanelContent.js";

import * as icons from "./icons.js";
import { selectionModel } from "../../Utils/ADISelectionModel/adiSelectionModel.js";

const stage = document.querySelector("#stage");
const body = document.querySelector("body");
//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.5/src/EditorUI/LeftPanel/left-panel.css";

const exists = false;
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
          var event = new MouseEvent("dblclick", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          body.classList.contains("return100") && stage.dispatchEvent(event);
          if (e.target.closest(".regular")) {
            state.leftPanel = "close";
            //setState(state, "zoomMode", { isActive: false });
            setTimeout(() => {
              e.target.closest(".regular") &&
                e.target.closest(".regular").classList.remove("regular");
            }, 300);
          } else {
            state.leftPanel = "close";
          }
        })
    );

    document.querySelectorAll(".cm-trigger").forEach(
      (trig) =>
        (trig.onclick = (e) => {
          document
            .querySelectorAll(".cmd")
            .forEach((menu) => menu.classList.remove("cmd"));

          trig.closest(".menu-item").classList.add("cmd");
          document
            .querySelectorAll(".cm-menu")
            .forEach((menu) => menu.remove());
          if (trig.closest("#left-panel")) {
            trig.insertAdjacentHTML(
              "afterbegin",
              `<div class="cm-menu">
            <span class="cm-menu-item" item="settings"><span class="icon">${icons.settings}</span>Settings</span>
            <span class="cm-menu-item" item="seo"><span class="icon">${icons.seo}</span>Seo Basics</span>
            <span class="cm-menu-item" item="social"><span class="icon">${icons.social}</span>Social Share</span>
            <hr/>
            <span class="cm-menu-item" item="rename"><span class="icon">${icons.rename}</span>Rename</span>
            <span class="cm-menu-item" item="duplicate"><span class="icon">${icons.duplicate}</span>Duplicate</span>
            <span class="cm-menu-item" item="copy"><span class="icon">${icons.copy}</span>Copy</span>
            <span class="cm-menu-item" item="hompage"><span class="icon">${icons.hompage}</span>Set as Hompage</span>
            <span class="cm-menu-item" item="hide"><span class="icon">${icons.hide}</span>Hide From Main Menu</span>
            <span class="cm-menu-item" item="show"><span class="icon">${icons.show}</span>Show in Main Menu</span>
            <span class="cm-menu-item" item="delete"><span class="icon">${icons.deleteIcon}</span>Delete</span>
            </div>`
            );
          } else {
            trig.insertAdjacentHTML(
              "afterbegin",
              `<div class="cm-menu">
          
              <span class="cm-menu-item" item="rename"><span class="icon">${icons.rename}</span>Rename</span>
              <span class="cm-menu-item" item="seo"><span class="icon">${icons.seo}</span>Settings and SEO</span>
              <hr/>
              <span class="cm-menu-item" item="hide"><span class="icon">${icons.hide}</span>Hide From  Menu</span>
  
              </div>`
            );
          }
          document.onclick = (e) => {
            if (!e.target.closest(".cm-trigger")) {
              document
                .querySelectorAll(".cm-menu")
                .forEach((menu) => menu.remove());
              document
                .querySelectorAll(".cmd")
                .forEach((menu) => menu.classList.remove("cmd"));
            }
          };

          document
            .querySelectorAll(`.cm-menu-item[item="hide"]`)
            .forEach((hide) => {
              hide.onclick = (e) => {
                if (!e.target.closest("#panel-frame2")) {
                  document
                    .querySelectorAll(
                      `.menu-item[value="${e.target
                        .closest(".menu-item")
                        .getAttribute("value")}"]`
                    )
                    .forEach((item) => item.classList.add("hide-item"));
                } else {
                  document
                    .querySelectorAll(
                      `.menu-item[value="${e.target
                        .closest(".menu-item")
                        .getAttribute("value")}"]`
                    )
                    .forEach((item) => item.classList.add("hide-custom-item"));
                }
              };
            });

          document
            .querySelectorAll(`.cm-menu-item[item="show"]`)
            .forEach((hide) => {
              hide.onclick = (e) => {
                if (!e.target.closest("#panel-frame2")) {
                  document
                    .querySelectorAll(
                      `.menu-item[value="${e.target
                        .closest(".menu-item")
                        .getAttribute("value")}"]`
                    )
                    .forEach((item) => item.classList.remove("hide-item"));
                } else {
                  document
                    .querySelectorAll(
                      `.menu-item[value="${e.target
                        .closest(".menu-item")
                        .getAttribute("value")}"]`
                    )
                    .forEach((item) =>
                      item.classList.remove("hide-custom-item")
                    );
                }
              };
            });
        })
    );

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
  //selectSection(placeholder);

  setTimeout(() => {
    stage.classList.remove("halty");
  }, 0);
}
