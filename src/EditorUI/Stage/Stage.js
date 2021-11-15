import { deselectAll } from "../../Utils/adiSelectionModel/adiSelectionModel.js";

//Append Styles
var href = "../src/EditorUI/Stage/stage.css";
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
  document.onclick = (e) => {
    console.log("to");
  };
};
export const zoomMode = (curr, state, setState) => {};
