//Append Styles

var href = "../../App/EditorUI/LeftBar/left-bar.css";
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
  leftBarItems = ["Pages", "Sections", "Add", "Apps", "Design", "Ascend"]
) => {
  let container = document.querySelector("#left-bar");
  container.classList.add("leftbar");
  leftBarItems.forEach((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      ` 
  <div class="leftbar-item leftbar-item-${item.toLowerCase()}" id="${item.toLowerCase()}">
  <img
    src="../../Common/Images/leftbar/${item.toLowerCase()}.svg"
  />
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
        if (e.target.closest(".leftbar-item").id == "sections") {
          setState(state, "regPanel", "close");
          document.querySelector("#left-panel").classList.remove("regular");
          if (state.panel.isOpen) {
            document.querySelector(".actions .close-panel").click();
          } else {
            let placeholder = document.querySelector("#ph1");
            console.log(placeholder);
            setState(state, "panel", {
              isOpen: true,
              type: "add",
              title: "Add to Section",
              panelContent: "sections",
              sectionPlaceholder: placeholder,
            });
            document
              .querySelector(".leftbar-item#sections")
              .classList.add("selected");
          }
        } else {
          if (
            e.target.closest(".leftbar-item").classList.contains("selected")
          ) {
            document.querySelectorAll(".leftbar-item").forEach((item) => {
              item.classList.remove("selected");
            });
            setState(state, "regPanel", "close");
            setState(state, "panel", "close");
            state.zoomMode = {
              isActive: false,
            };
          } else {
            setState(state, "panel", "close");
            setState(state, "zoomMode", { isActive: false });
            document.querySelector("#left-panel").classList.add("regular");

            document.querySelectorAll(".leftbar-item").forEach((item) => {
              item.classList.remove("selected");
            });
            e.target.closest(".leftbar-item").classList.add("selected");
            setState(state, "regPanel", e.target.closest(".leftbar-item").id);
          }
        }
        if (e.target.closest(".leftbar-item").id == "design") {
          if (
            e.target.closest(".leftbar-item").classList.contains("selected")
          ) {
            setState(state, "zoomMode", { isActive: true });
          } else {
            setState(state, "zoomMode", { isActive: false });
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
