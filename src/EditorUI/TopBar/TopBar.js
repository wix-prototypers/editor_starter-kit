import { icons } from "./top-bar-icons.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/EditorUI/TopBar/top-bar.css";
const exists = false;
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

//icons and images
const logoSrc = "../../Common/Images/top-bar/wixLogo.svg";
const chevSrc = "../../Common/Images/top-bar/chev.svg";
const searchSrc = "../../Common/Images/top-bar/search.svg";
const desktop2Src = "../../Common/Images/top-bar/tb2/Desktop.svg";
const mobile2Src = "../../Common/Images/top-bar/tb2/Mobile.svg";
const undo2Src = "../../Common/Images/top-bar/tb2/Undo.svg";
const redo2Src = "../../Common/Images/top-bar/tb2/Redo.svg";
const toolsSrc = "../../Common/Images/top-bar/tb2/Tools.svg";
const editor = document.querySelector("#editor");

export const TopBar = (state, setState) => {
  let container = document.querySelector("#top-bar");
  console.log(location.search);

  container.insertAdjacentHTML(
    "afterbegin",
    `
<div class="topbar">
  <div class="left-side">
    <div class="wix_logo">
      <img src="${logoSrc}"/>
    </div>
  
    <div class="text-links flex row justify-between">
      <div class="topbar-item flex row flex justify-center align-center" value="site">
        <span class="item-text">Site</span>
      </div>
      <div class="topbar-item flex row flex justify-center align-center" value="settings">
        <span class="item-text">Settings</span>
      </div>
      <div class="topbar-item flex row flex justify-center align-center" value="devmode">
        <span class="item-text">Dev Mode</span>
      </div>
      <div class="topbar-item flex row flex justify-center align-center" value="help">
        <span class="item-text">Help</span>
      </div>
      <div class="topbar-item flex row flex justify-center align-center" value="hire">
      <span class="item-text">Hire a Partner</span>
    </div>
      <div class="topbar-item flex row flex justify-center align-center save" style="color:#a046be !important;" value="upgrade">
        <span class="item-text save-preview-publish upgrade">Upgrade</span>
      </div>
    </div>
  </div>
  <div class="right-side flex row align-center">
    <div class="topbar-item flex row flex justify-center align-center save">
      <span class="item-text save-preview-publish">Save</span>
    </div>
    <div class="topbar-item flex row flex justify-center align-center preview">
      <span class="item-text save-preview-publish">Preview</span>
    </div>
    <div class="topbar-item flex row flex justify-center align-center bordered publish">
      <span class="item-text save-preview-publish publishb">Publish</span>
    </div>
  </div>
</div>
<div class="topbar second-topbar flex justify-between fixed">
<div class="flex row justify-arround mww ">
    <div class="topbar-item  bordered flex  align-center text-HelveticaNeueW01-55Roman ">
 
      <div class=" page_selector_container">
        <div class="page_selector  flex row  justify-between align-center">
          <div class="text">
            Page:
            <span class="text-HelveticaNeueW01-45Light">Home</span>
          </div>
          <img class="page-dropdown" src="${chevSrc}" />
        </div>
      </div>
    </div>
    <div class="viewport-icons bordered uy flex row" currentValue="desktop" >
    
        <div class="topbar-item viewport-mode flex align-center selected" type="desktop">
          <img src="${desktop2Src}" class="icon-desktop"  />
        </div>
        <div class="topbar-item viewport-mode flex align-center" type="mobile">
          <img class="icon-mobile" src="${mobile2Src}" />
        </div>
<div class="bordered" style="transform: translate(-21px ,0px); width: 20px; height:100%;">

      </div>
    </div>
    <div></div>
  </div>
  
  <div class="left-side flex row align-center ">
  
  <div class="right-side flex row align-center justify-end">
  <div class="bordered" style="height: 100%;"></div>
</div>


  <div class="bordered" style="height: 100%;"></div>
    <div class="topbar-item icon-item flex justify-center align-center  undo">
      <img src=${undo2Src} />
    </div>
    <div class="topbar-item icon-item flex justify-center align-center  redo ">
    <img src=${redo2Src} />
    </div>
    <div class="topbar-item zoom zoomB flex row flex justify-arro align-center bordered">
<?xml version="1.0" encoding="UTF-8"?>

  <span class="fifty flex justify-between align-center">${icons.zoomIn} &nbsp; <span class="number"> 50%</span></span>
  <span class="hundred flex justify-between align-center">${icons.zoomOut} &nbsp;<span class="number"> 100%</span></span>
   </div>
    <div style="height: 100%;"></div>
  

    <div class="bordered" style="height: 100%;"></div>
    <div class=" topbar-item tools-item   flex align-center " data-collaps="false">
      <img src=${toolsSrc} alt="" />

      <span>
      Tools
  </span>
    </div>
  
    <div class="bordered" style="height: 100%;"></div>
    <div class=" topbar-item icon-item search-wix search  flex align-center " data-collaps="false">
      <img src=${searchSrc} alt="" />
      <span>
      Search
  </span>
    </div>
  
    </div>
  </div>
  <div class="hide-tools-button flex justify-center align-center fixed hide">
    <img src="${chevSrc}" />
  </div>
</div>

<div class="topbar third-topbar">
  <div class="left-side">
    <div class="wix_logo">
      <img src="${logoSrc}"/>
    </div>
    <div class="flex row justify-arround mww ">
    <div style="transform:translate(30px,0px);" class="topbar-item  bordered flex  align-center text-HelveticaNeueW01-55Roman ">
 
      <div style="transform:translate(-25px,0px);" class=" page_selector_container">
        <div class="page_selector flex row  justify-between align-center">
          <div class="text">
            Page:
            <span class="text-HelveticaNeueW01-45Light">Home</span>
          </div>
          <img class="page-dropdown" src="${chevSrc}" />
        </div>
      </div>
    </div>
    <div   class="viewport-icons bordered uy flex row" currentValue="desktop" >
    
        <div class="topbar-item viewport-mode flex align-center selected" type="desktop">
          <img src="${desktop2Src}" class="icon-desktop"  />
        </div>
        <div class="topbar-item viewport-mode flex align-center" type="mobile">
          <img class="icon-mobile" src="${mobile2Src}" />
        </div>
<div class="bordered" style="transform: translate(-21px ,0px); width: 20px; height:100%;">
</div>
      </div>
      </div>
   </div>
  <div class="right-side flex row align-center">
    <div class="topbar-item flex row flex justify-center align-center save">
      <span class="item-text save-preview-publish">Save</span>
    </div>
    <div class="topbar-item flex row flex justify-center align-center preview">
      <span class="item-text save-preview-publish">Preview</span>
    </div>
    <div class="topbar-item flex row flex justify-center align-center bordered exit-mode publish">
      <span class="item-text save-preview-publish exit-mode publishb ">Exit Mode</span>
    </div>
  </div>
</div>
    `
  );

  /*   container.querySelectorAll(".zoom").forEach(
    (zoom) =>
      (zoom.onclick = (e) => {
        console.log(state);

        if (!state.zoomMode.isActive && !state.panel.isOpen) {
          setState(state, "zoomMode", {
            isActive: true,
          });
          e.target.closest(".zoom").classList.add("selected");
        } else if (state.zoomMode.isActive || state.panel.isOpen) {
          setState(state, "zoomMode", {
            isActive: false,
          });
          e.target.closest(".zoom") &&
            e.target.closest(".zoom").classList.remove("selected");
          setState(state, "panel", "close");
        }
      })
  ); */

  container.querySelector(".publish").onclick = (e) => {
    console.log("t0");
    //setState(state, "zoomMode", { isActive: false });
  };
};
