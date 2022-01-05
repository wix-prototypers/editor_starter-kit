import { Gfpp } from "./GFPP/gfpp.js";
//import { sectionActions } from "./sectionActions/sectionActions.js";
import { selectionModel } from "./ADISelectionModel/adiSelectionModel.js";
import { Resizable } from "./Resize/Resize.js";
//import { AddSection } from "./AddSection/AddSection.js";

import { DragNDrop } from "./dragNDrop/dragNDrop.js";

export const Utils = (state, setState) => {
  Resizable(state, setState);
  /*   DragNDrop(state, setState); */
  selectionModel(state, setState);
  Gfpp(state, setState);

  //sectionActions(state, setState);
  //AddSection(state, setState);
};
