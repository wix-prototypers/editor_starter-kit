import { defaultContent, addStoreContent, newLean } from "./content.js";
import { closePanelIcon, helpIcon } from "./content.js";
import { FullScreenModal } from "../FullScreenModal/FullScreenModal.js";

//Append Styles
var href = "../../App/EditorUI/FloatingPanel/floating-panel.css";
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

const aboutBasic = "../../../Common/Images/FloatingPanel/about.png";
const tagIcon = "";

export const FloatingPanel = (state, setState) => {
  let container = document.querySelector(".full-overlay");

  container.insertAdjacentHTML(
    "afterend",
    /*html*/ `
    <div class="FloatingPanel fixed flex column AddPagePanel" content="default">
    <div class="FloatingPanel-header flex justify-between align-canter ">
      <div class="FloatingPanel-title flex align-center text-HelveticaNeueW01-45Light">Add Page</div>
      <div class="FloatingPanel-controls flex row align-center">
        <div class="FloatingPanel-controls-btn">
          ${helpIcon}
        </div>
        <div class="FloatingPanel-controls-btn close">
   
        ${closePanelIcon}
        </div>
      </div>
    </div>
    <div class="FloatingPanel-content flex">
      <div class="flex row align-self-strech">
      <div class="flex column" style="max-height:calc(100vh - 97px); overflow:scroll; background-color: rgb(246, 251, 255);">
        <ul class="AddPagePanel-sideMenu flex column">
          <li class="Floating-Btn flex align-center title fields"> <span style="transform:translate(-6px,-1.5px) scale(1.3)">+</span> Blank Page</li>
          <span class="mini-title" >BASIC </span>
            ${[
              "About",
              "Team",
              "Services",
              "Projects",
              "Gallery",
              "Contact",
              "General",
              "Froms",
            ]
              .map(
                (
                  item
                ) => ` </li><li id="${item}" class="AddFieldPanel-sideMenu-item FloatingPanel-sideMenu-item flex align-center title ${
                  item == "About" ? "selected" : ""
                }">
              ${item}
            </li>`
              )
              .join("")}
        
           </ul>
           
           <ul style="top:422px;  background-color:transparent;" class="AddPagePanel-sideMenu flex column">
           <span class="hr" style=" transform:translate(0px,-20px);height:0px; border-top:1px solid #DFE5EB; width:80%;"> </span>
           <span class="mini-title" text-HelveticaNeueW01-55Roma flex align-center title">BUSINESS APPS</span>
             ${["Stores", "Booking", "Blog", "Pricing Plan"]
               .map(
                 (item) => `
                 </li><li id="${item}" class="AddFieldPanel-sideMenu-item FloatingPanel-sideMenu-item flex align-center title 
                 ">
               ${item}
             </li>`
               )
               .join("")}
         
            </ul>
            </div>
            <div class="AddPagePanel-content" value="default">
            ${defaultContent}
            </div>
            <div class="AddPagePanel-content" value="add-store">
            <div class="flex">
            ${addStoreContent}
          
            <div>
            </div>
   
       
              </div>
            </div>
          </div>
        </div>
   `
  );
  setTimeout(() => {
    let bApps = document.querySelectorAll(".AddFieldPanel-sideMenu-item");

    bApps.forEach((bApp) => {
      bApp.onclick = (e) => {
        switch (e.target.closest(".AddFieldPanel-sideMenu-item").id) {
          case "Stores":
            bApps.forEach((bApp) => {
              bApp.classList.remove("selected");
            });
            e.target
              .closest(".AddFieldPanel-sideMenu-item")
              .classList.add("selected");
            document
              .querySelector(".FloatingPanel")
              .setAttribute("content", "add-store");
            document.querySelector("body").setAttribute("flow", "lean");
            break;
          case "About":
            bApps.forEach((bApp) => {
              bApp.classList.remove("selected");
            });
            e.target
              .closest(".AddFieldPanel-sideMenu-item")
              .classList.add("selected");
            document
              .querySelector(".FloatingPanel")
              .setAttribute("content", "default");
            break;
          case "Booking":
            /*  bApps.forEach((bApp) => {
              bApp.classList.remove("selected");
            });
            e.target
              .closest(".AddFieldPanel-sideMenu-item")
              .classList.add("selected");

            document
              .querySelector(".FloatingPanel")
              .setAttribute("content", "add-store");
            document.querySelector("body").setAttribute("flow", "lean-booking"); */

            break;
        }
      };
      document.querySelector(
        ".FloatingPanel-controls-btn.close"
      ).onclick = () => {
        setState(state, "floatingPanel", false);
      };
    });
  });
  document.querySelectorAll(".Floating-Btn2").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("yo");
      setState(state, "floatingPanel", "load");
    });
  });
  document.querySelectorAll(".Floating-Btn3").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("yo");
      // setState(state, "floatingPanel", "loadbooking");
    });
  });

  document.querySelectorAll(`[value="store-pages"] .preview-btn`).forEach(
    (btn) =>
      (btn.onclick = (e) => {
        FullScreenModal(state, setState);
      })
  );
  document.querySelectorAll(`.preview-btn2`).forEach(
    (btn) =>
      (btn.onclick = (e) => {
        FullScreenModal(state, setState);
      })
  );
  document.querySelectorAll(`[value="store-pages"] .add-page-btn`).forEach(
    (btn) =>
      (btn.onclick = (e) => {
        setState(state, "floatingPanel", "load");
      })
  );
  document.querySelectorAll(`.preview-btn2-installed`).forEach(
    (btn) =>
      (btn.onclick = (e) => {
        setState(state, "preview", true);
        preview(state, setState);
      })
  );

  document.querySelectorAll(".Floating-Btn2-installed").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".FloatingPanel").forEach((fp) => {
        fp.classList.remove("modal");
      });
      document.querySelector("svg#First-Version").classList.remove("modal");
      setState(state, "floatingPanel", "loadAnotherShopPage");
    });
  });
};
