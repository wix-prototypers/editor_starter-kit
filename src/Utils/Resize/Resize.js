import { getCoords, getSize } from "../functions.js";

import { deselectAll } from "../ADISelectionModel/adiSelectionModel.js";

import * as icons from "./icons.js";
const stage = document.querySelector("#stage");
export const resizeSection = () => {
  var href = "../../App/Utils/Resize/Resize.css";
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
  function getElementTop(elem) {
    return parseInt(window.getComputedStyle(elem).top.split("px")[0]);
  }
  const sections = document.querySelectorAll("#stage .section");
  const strips = document.querySelectorAll(".strip");

  sections.forEach((section) => {
    section.insertAdjacentHTML(
      "beforeend",
      `  <div class="drag-handle">
      ${icons.iconDrag}
      </div>
`
    );
    /* 
    const resizers = section.querySelectorAll(".drag-handle");
    const minimum_size = 0;
    let original_width = section.getBoundingClientRect().width;
    let original_height = section.getBoundingClientRect().height;
    let original_x = section.getBoundingClientRect().x;
    let original_y = section.getBoundingClientRect().y;

    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];

      currentResizer.addEventListener("mousedown", function (e) {
        stage.classList.add("resizing");

        let original_mouse_x = e.pageX - section.getBoundingClientRect().x;
        let original_mouse_y = e.pageY - section.getBoundingClientRect().y;
        e.preventDefault();
        original_width = parseFloat(
          getComputedStyle(section, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(section, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = section.getBoundingClientRect().left;
        original_y = section.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;

        section.style.minHeight = calcMinHeight(section);
        section.classList.remove("parent-selected");
        section
          .querySelectorAll(".strip.selected")
          .forEach((strip) => strip.classList.remove("selected"));
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);

        function resize(e) {
          const height = original_height + (e.pageY - original_mouse_y);

          if (height > minimum_size) {
            section.style.height = height + "px";
            updatesectionActionsTopOnResizeandScroll();
          }
        }

        function stopResize() {
          const maxHeight = getSize(section).height;
          let strip = section.querySelector(".strip");
          if (strip) {
            const height = getSize(strip).height;
            strip.style.height = height + "px";
            strip.style.maxHeight = maxHeight + "px";
          }
          section.style.minHeight = maxHeight + "px";
          window.removeEventListener("mousemove", resize);
          stage.classList.remove("resizing");
        }
        function SectionsOffset(section) {
          var sections = [...document.querySelectorAll(".section")];
          let index = sections.indexOf(section);
          let offset = 194;
          for (let i = 0; i < index; i++) {
            offset = offset + getSize(sections[i]).height;
          }
          offset -= document.querySelector("#stage").scrollTop;
          console.log(offset);
          return offset;
        }

        function calcMinHeight(section) {
          const strips = [...section.querySelectorAll(".strip")];
          var top = 0;
          for (const i in strips) {
            //top += getSize(strips[i]).height;

            if (!strips[i + 1]) {
              top =
                getSize(strips[i]).height +
                getCoords(strips[i]).top -
                SectionsOffset(section);
            }
          }

          return top + "px";
        }
      });
    }
  });
  strips.forEach((strip) => {
    strip.insertAdjacentHTML(
      "beforeend",
      `  
      <div class="handle-wrapper">
      <div class="drag-handle-strip"></div>
      </div>
`
    );

    const resizers = strip.querySelectorAll(".drag-handle-strip");
    console.log(resizers);
    const minimum_size = 0;
    let original_width = strip.getBoundingClientRect().width;
    let original_height = strip.getBoundingClientRect().height;
    let original_x = strip.getBoundingClientRect().x;
    let original_y = strip.getBoundingClientRect().y;

    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];

      currentResizer.addEventListener("mousedown", function (e) {
        stage.classList.add("resizing");
        let original_mouse_x = e.pageX - strip.getBoundingClientRect().x;
        let original_mouse_y = e.pageY - strip.getBoundingClientRect().y;

        e.preventDefault();
        original_width = parseFloat(
          getComputedStyle(strip, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(strip, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = strip.getBoundingClientRect().left;
        original_y = strip.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener("mousemove", resizeStrip);
        window.addEventListener("mouseup", stopResizeStrip);

        function resizeStrip(e) {
          e.stopPropagation();

          const height = original_height + (e.pageY - original_mouse_y);
          const section = strip.closest(".section");
          const isMulti = [...section.querySelectorAll(".strip")].length > 1;

          if (
            getSize(strip).height >= getSize(strip.closest(".section")).height
          ) {
            strip.style.height = height + "px";
            strip.style.maxHeight = height + "px";
            section.style.height = height + "px";
            section.mxHeight = height + "px";
            updatesectionActionsTopOnResizeandScroll();
          } else if (height > minimum_size) {
            strip.style.height = height + "px";
            strip.style.maxHeight = height + "px";
          }
        }

        function stopResizeStrip(e) {
          e.stopPropagation();
          let minHeight = getSize(strip).height;
          let height = getSize(strip.closest(".section")).height;
          strip.closest(".section").style.height = height + "px";
          strip.closest(".section").style.minHeight = minHeight + "px";
          window.removeEventListener("mousemove", resizeStrip);
          setTimeout(() => {
            stage.classList.remove("resizing");
          }, 510);
        }
      });
    }*/
  });
};
