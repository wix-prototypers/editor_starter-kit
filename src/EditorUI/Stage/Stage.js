//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.6-beta/src/EditorUI/Stage/stage.css";
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
  document.onclick = (e) => {};
};
export const zoomMode = (curr, state, setState) => {};
