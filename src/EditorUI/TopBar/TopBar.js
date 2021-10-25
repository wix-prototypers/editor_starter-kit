import { icons } from "./top-bar-icons.js";

//Append Styles
var href =
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/EditorUI/TopBar/top-bar.css";
var exists = false;
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
const { logo, chev, search, desktop2, mobile2, undo2, redo2, tools } = icons;

export const TopBar = (state, setState) => {
  let container = document.querySelector("#top-bar");

  container.insertAdjacentHTML(
    "afterbegin",
    `
<div class="topbar">
  <div class="left-side">
    <div class="wix_logo">
    ${logo}
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
       ${chev}
        </div>
      </div>
    </div>
    <div class="viewport-icons bordered uy flex row" currentValue="desktop" >
    
        <div class="topbar-item viewport-mode flex align-center selected" type="desktop">
          ${desktop2}
        </div>
        <div class="topbar-item viewport-mode flex align-center" type="mobile">
          ${mobile2}
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
      ${undo2} 
    </div>
    <div class="topbar-item icon-item flex justify-center align-center  redo ">
   ${redo2} 
    </div>
    <div class="topbar-item zoom zoomB flex row flex justify-arro align-center bordered">
<?xml version="1.0" encoding="UTF-8"?>

  <span class="fifty flex justify-between align-center">${icons.zoomIn} &nbsp; <span class="number"> 50%</span></span>
  <span class="hundred flex justify-between align-center">${icons.zoomOut} &nbsp;<span class="number"> 100%</span></span>
   </div>
    <div style="height: 100%;"></div>
  

    <div class="bordered" style="height: 100%;"></div>
    <div class=" topbar-item tools-item   flex align-center " data-collaps="false">
     ${tools} 

      <span>
      Tools
  </span>
    </div>
  
    <div class="bordered" style="height: 100%;"></div>
    <div class=" topbar-item icon-item search-wix search  flex align-center " data-collaps="false">
${search} 
      Search
  </span>
    </div>
  
    </div>
  </div>
  <div class="hide-tools-button flex justify-center align-center fixed hide">
${chev}
  </div>
</div>

    `
  );

  container.querySelector(".publish").onclick = (e) => {
    console.log("ariel was here");
  };
};
