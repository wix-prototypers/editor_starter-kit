import { EditorUI } from "./EditorUI/EditotUI.js";
import { Utils } from "./Utils/Utils.js";
import { Styles } from "./Styles/Utils.js";
import { setState, State } from "./State.js";

new (function App() {
  const stateObj = State.apply(this, []);
  this.state = stateObj.state;

  EditorUI(this.state, setState, this.events, this);
  Utils(this.state, setState, this.events, this);
  if (Styles === "Appended") {
    console.log("Styles Appended!");
  }
})();
