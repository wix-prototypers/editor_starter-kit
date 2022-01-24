//Add button to stage

window.onload = () => {
  const btn = document.getElementById("button-drag");

  btn.onclick = () => {
    const stageElement = btn.cloneNode(true);

    stageElement.classList.add("element-container");
    stageElement.setAttribute("gfpp", "Edit-Text design animation help");
    stageElement.setAttribute("hat", "Button");
    document.getElementById("s0").appendChild(stageElement);

    state.leftPanel = "close";
    state.selectedElement = stageElement;
  };
};
