import { TopBar } from "./TopBar/TopBar.js";
import { LeftBar } from "./LeftBar/LeftBar.js";
import { Stage } from "./Stage/Stage.js";
import { LeftPanel } from "./LeftPanel/LeftPanel.js";
import { FloatingPanel } from "./FloatingPanel/FloatingPanel.js";
export const EditorUI = (state, setState) => {
  TopBar(state, setState);
  LeftBar(state, setState);
  LeftPanel(state, setState);
  Stage(state, setState);
  FloatingPanel(state, setState);
};
