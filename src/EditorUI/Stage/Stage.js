import { getPlaceholder } from "../LeftBar/LeftBar.js";
import { getCoords, getSize } from "../../Utils/functions.js";
//Append Styles
var href = "../../App/EditorUI/Stage/stage.css";
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
const stage = document.getElementById("stage");
export const Stage = (state, setState) => {
  // var sections = [...document.querySelectorAll("#stage .section")];
  // console.log(sections);

  stage.onscroll = () => {
    if (document.querySelector(".mvpScroll")) {
      let sectionActions = document.querySelector("#sectionActions");

      let section = document.querySelector(
        `.section#${sectionActions.getAttribute("section")}`
      );
      console.log("section", section.id);
      sectionActions.classList.add("show");

      let mvp = window.innerHeight / 2 - 40;
      let scrollTop = stage.scrollTop;

      let sectionTop = getCoords(section).top + scrollTop;
      let sectionBottom = getCoords(section).top + getSize(section).height;
      console.log(sectionTop, mvp, sectionBottom);
      if (mvp > sectionTop - scrollTop && mvp < sectionBottom - 192) {
        sectionActions.style.top = mvp + "px";
        console.log(1);
      } else if (mvp < sectionTop - scrollTop) {
        sectionActions.style.top = sectionTop - scrollTop + 12 + "px";
        console.log(2);
      } else {
        console.log(3);
        sectionActions.style.top = sectionBottom - 192 + "px";
      }
      if (
        section.classList.contains("selected") ||
        document.querySelector(".sectionHover")
      ) {
        sectionActions.classList.remove("un-indent");
      } else {
        sectionActions.classList.add("un-indent");
      }
    } else if (!stage.classList.contains("halty")) {
      let sectionActions = document.querySelector("#sectionActions");

      let strip = document.querySelector(
        `.section#${sectionActions.getAttribute("section")}`
      );
      let top = getCoords(strip).top + getSize(strip).height / 2;
      sectionActions.style.top = top - 78 + "px";

      let bdbox = stage.getBoundingClientRect();
      let right = bdbox.width - bdbox.x + 40;
    }
  };
};
