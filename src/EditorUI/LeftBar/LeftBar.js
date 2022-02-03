//Append Styles
import { icons } from "./left-bar-icons.js";

var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.2.2-beta/src/EditorUI/LeftBar/left-bar.css";
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

export const LeftBar = (
  state,
  setState,
  leftBarItems = ["Add", "Pages", "Apps", "Design", "Ascend"]
) => {
  let container = document.querySelector("#left-bar");
  container.classList.add("leftbar");
  leftBarItems.forEach((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      ` 
  <div class="leftbar-item leftbar-item-${item.toLowerCase()}" id="${item.toLowerCase()}">

${icons[item.toLowerCase()]}

  <span class="leftbar-text"> ${
    item === "Ascend"
      ? "My Business"
      : item === "Add"
      ? "Add Elements"
      : item === "Sections"
      ? "Add Sections"
      : item
  } </span>

</div>

`
    );
  });

  setTimeout(() => {
    document.querySelectorAll(".leftbar-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.closest(".leftbar-item").classList.contains("selected")) {
          document.querySelectorAll(".leftbar-item").forEach((item) => {
            item.classList.remove("selected");
          });
          setState(state, "leftPanel", "close");

          state.zoomMode = "close";
        } else {
          setState(state, "leftPanel", "close");
          setState(state, "zoomMode", "close");
          document.querySelector("#left-panel").classList.add("regular");
          document.querySelectorAll(".leftbar-item").forEach((item) => {
            item.classList.remove("selected");
          });
          e.target.closest(".leftbar-item").classList.add("selected");
          state.leftPanel = e.target.closest(".leftbar-item").id;
        }

        if (e.target.closest(".leftbar-item").id == "design") {
          if (
            e.target.closest(".leftbar-item").classList.contains("selected")
          ) {
          } else {
            setState(state, "zoomMode", "close");
          }
        }
      });
    });
  }, 0);
};
function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
  };
}

export function getPlaceholder() {
  let MiddleHeight = (window.innerHeight - 388) / 2;
  let addSections = document.querySelectorAll(".Add-Section");
  let addArray = [...addSections].map((addSection) =>
    Math.abs(getCoords(addSection).top / 2 - MiddleHeight)
  );

  let closestIndex = addArray.indexOf(Math.min(...addArray));
  console.log(closestIndex);

  let chosenAddSection = addSections[closestIndex];

  return document.querySelector(`#ph${closestIndex}`);
}
