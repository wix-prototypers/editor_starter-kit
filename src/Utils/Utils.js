//import { sectionActions } from "./sectionActions/sectionActions.js";
//import { AddSection } from "./AddSection/AddSection.js";

import { Gfpp } from "./GFPP/gfpp.js";
import { selectionModel } from "./ADISelectionModel/adiSelectionModel.js";
import { Resizable } from "./Resize/Resize.js";
import { DragNDropElements } from "./dragNDropElements/DragNDropElements.js";

export const Utils = (state, setState) => {
  Resizable(state, setState);
  DragNDropElements(state, setState);
  selectionModel(state, setState);
  Gfpp(state, setState);

  //sectionActions(state, setState);
  //AddSection(state, setState);
};
