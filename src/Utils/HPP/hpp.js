import { hppBtns } from "./hppData.js";

//Append Styles
var href = "../../App/Utils/HPP/hpp.css";
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

export const HPP = (state, setState) => {
  let sections = document.querySelectorAll("#stage .section");
  sections.forEach((section) => {
    let hppArray = section.getAttribute("hpp");
    hppArray ? (hppArray = hppArray.split(" ")) : null;
    hppArray ? createHpp(hppArray, section) : null;
  });

  /**
   * Create HPP
   * @param {*} hppArray
   * @param {*} element
   */

  function createHpp(hppArray, element) {
    let hpp = createHppItems(hppArray);
    hpp = hpp
      .map((element) => {
        return element;
      })
      .join("");

    element.insertAdjacentHTML(
      "afterbegin",
      `<ul class="hpp">
    ${hpp}
    </ul>`
    );

    function createHppItems(hppArray) {
      const hpp = hppArray.map((button) => {
        const hppLi = document.createElement("li");

        if (hppBtns[button].type == "text-icon") {
          //create text button

          let hppLiSpan = document.createElement("span");
          hppLiSpan.innerHTML = hppBtns[button].tooltip;

          hppLi.appendChild(hppLiSpan);
        } else if (hppBtns[button].type == "icon") {
          hppLi.innerHTML = hppBtns[button].svg;
        }

        return `<li class="hpp-btn ${
          hppBtns[button].type == "text-icon" ? "main-action" : ""
        }">${hppLi.innerHTML}</li>`;
      });

      return hpp;
    }
  }
  setTimeout(() => {
    document.querySelectorAll(".hpp-btn.main-action").forEach((btn) => {
      btn.onclick = (e) => {
        let btn = e.target.closest(".hpp-btn");
        let section = e.target.closest(".section");
        /*  setState(state, "panel", {
          isOpen: true,
          type: "edit",
          title: section.getAttribute("display-name"),
          origin: section,
          dir: "right",
        }); */
      };
    });
  }, 0);
};
