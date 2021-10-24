import { Gfpp } from "./GFPP/gfpp.js";
import { sectionActions } from "./sectionActions/sectionActions.js";
import { selectionModel } from "./ADISelectionModel/adiSelectionModel.js";
import { AddSection } from "./AddSection/AddSection.js";
import { resizeSection } from "./Resize/Resize.js";
import { Controller } from "./Controller/Controller.js";
import { DragNDrop } from "./dragNDrop/dragNDrop.js";

export const Utils = (state, setState) => {
  Controller(state, setState);
  selectionModel(state, setState);
  //resizeSection(state, setState)
  DragNDrop(state, setState);
  Gfpp(state, setState);
  sectionActions(state, setState);
  AddSection(state, setState);
};
