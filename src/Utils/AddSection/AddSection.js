//to do : add ph   <div class="place-holder" id="ph3"><span>Add Section Here</span></div>

import {
  hoverOnSection,
  selectSection,
} from "../ADISelectionModel/adiSelectionModel.js";
import { getCoords } from "../functions.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@latest/src/Utils/AddSection/add-section.css";
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

export const AddSection = (state, setState) => {
  document
    .querySelectorAll(".Add-Section")
    .forEach((section) => section.remove());

  /**
   * Create Add Section Element and add after sections
   * @param {object} elem
   * @returns {undefined}
   */

  let sections = document.querySelectorAll("#stage .section");
  sections.forEach((section, i) => {
    //Add SectionButton
    section.id = `s${i}`;

    let AddSection = `<div class="Add-Section" id="a${section.id.replace(
      "s",
      ""
    )}">`;

    section.insertAdjacentHTML("afterend", AddSection);

    document.querySelectorAll(`.Add-Section`).forEach((addSection) => {
      addSection.onmouseover = (e) => {
        let id = e.target.closest(".Add-Section").id;
        let secIndex = "s" + id.split("a")[1];
        let section = document.querySelector(`#${secIndex}`);
        console.log(section);
        !section.classList.contains("selcted") && hoverOnSection(section);
      };
    });
  });
};
