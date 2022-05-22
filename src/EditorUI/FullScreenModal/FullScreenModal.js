import {
  storeContent,
  closePanelIcon,
  coolx,
  bookingContent,
} from "./content.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.6/src/EditorUI/FullScreenModal/FullScreenModal.css";
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

export const FullScreenModal = (state, setState) => {
  setState(state, "FullScreenModal", true);

  let container = document.querySelector(".full-overlay");

  container.insertAdjacentHTML(
    "afterend",
    /*html*/ `
    <div class=" fs fixed flex column AddPagePanel active" content="default">
    <div class="coolx">${coolx}</div>
   ${storeContent}
/*    ${bookingContent} */
        </div>
   `
  );
  setTimeout(() => {
    document.querySelectorAll(".thumb-box").forEach(
      (thumb) =>
        (thumb.onclick = (e) => {
          document
            .querySelectorAll(".thumb-box")
            .forEach((thumb) => thumb.classList.remove("selected"));

          thumb.classList.add("selected");

          document.querySelectorAll(".grid-pages.stores").forEach((gr) => {
            gr.setAttribute(
              "value",
              e.target.closest(".thumb-box").getAttribute("value")
            );
          });
        })
    );
  });
  document.querySelectorAll(".Floating-Btn2").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("yo");
      setState(state, "floatingPanel", "load");
    });
  });
  document.querySelectorAll(".Floating-Btn2").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("yo");
      //setState(state, "floatingPanel", "loadbooking");
    });
  });
  document.querySelectorAll(".coolx").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".fs").remove();
      setState(state, "FullScreenModal", false);
    });
  });
};
