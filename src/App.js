import { EditorUI } from "./EditorUI/EditotUI.js";
import { Utils } from "./Utils/Utils.js";
import { Styles } from "./Styles/EditorStyles.js";
import { setState, State } from "./State.js";

new (function App() {
  document.querySelector("#editor").insertAdjacentHTML("afterbegin", ``);
  setTimeout(() => {
    const stateObj = State.apply(this, []);
    this.state = stateObj.state;

    EditorUI(this.state, setState, this.events, this);
    Utils(this.state, setState, this.events, this);
    if (Styles === "Appended") {
      console.log("Styles Appended!");
    }
  });
})();
