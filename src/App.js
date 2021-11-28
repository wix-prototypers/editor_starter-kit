import { EditorUI } from "./EditorUI/EditotUI.js";
import { Utils } from "./Utils/Utils.js";
import { Styles } from "./Styles/EditorStyles.js";
import { setState, State } from "./State.js";

new (function App() {
  const editor = document.querySelector("#editor");
  const stage = document.querySelector("#stage");
  editor.insertAdjacentHTML(
    "afterbegin",
    `<section id="left-panel" class="hidden "></section>
  <section id="left-bar"></section>
<section id="top-bar"></section>
<section id="panel-frame" class=""></section>`
  );
  editor.classList.add("Madefor");
  stage && stage.classList.add("Madefor");
  setTimeout(() => {
    const stateObj = State.apply(this, []);
    window.state = stateObj.state;
    this.state = window.state;
    EditorUI(this.state, setState, this.events, this);
    Utils(this.state, setState, this.events, this);
    if (Styles === "Appended") {
      console.log("Styles Appended!");
    }
  });
})();
