//Add button to stage

window.onload = () => {
  const btn = document.getElementById("button-drag");
  if (btn)
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
function onGfppClick() {
  console.log(
    `GFPP button was clicked. parent-element:${this.elementContainerId} gfpp button :${this.buttonType}`
  );
}

function onFloatingPanelHide() {
  console.log(
    `Floating Panel was closed. parent-element:${this.parentElementId} gfpp button:${this.gfppTrigger}`
  );
}

function onElementSelect() {
  console.log(
    `Element was selected. element:${this.eleme} element id:${this.elemeId}`
  );
  state.leftPanel = false;
}

/* function topbar() {
  return {
    template: `<div id="topbar" style="top:0px; left:50%; position:absolute;">Topbar</div>`,
    methods: {
      topBarClick(template) {
        template.querySelector("#topbar").onclick = (e) => {
          console.log("Topbar clicked!");
        };
      },
    },
  };
}

function leftbar() {
  return {
    template: `<div id="leftbar" style="top:0px; position:absolute;">LeftBar</div>`,
    methods: {
      leftbarClick(template) {
        template.querySelector("#leftbar").onclick = (e) => {
          console.log("Leftbar clicked!");
        };
      },
    },
  };
}
 */
