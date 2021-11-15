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
var href = "../src/EditorUI/LeftPanel/left-panel.css";
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
            setState(state, "regPanel", "close");
            //setState(state, "zoomMode", { isActive: false });
            setTimeout(() => {
              e.target.closest(".regular") &&
                e.target.closest(".regular").classList.remove("regular");
            }, 300);
          } else {
            setState(state, "panel", "close");
            setState(state, "regPanel", "close");
            // setState(state, "zoomMode", { isActive: false });
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

          document.querySelector(".zgfpp").classList.remove("show");
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
          }, 0);
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
