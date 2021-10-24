var moved = null;
const stage = document.querySelector("#stage");
const body = document.querySelector("body");
const panel = document.querySelector("#left-panel");
var mousePosY = 0;
import { getSize, getCoords } from "../functions.js";
export function DragNDrop(state, setState) {
  /*   

  panel.onmouseenter = () => {
    stage.classList.remove("hide-ph");
  };

  document.querySelectorAll(".draggable").forEach((item) =>
    item.addEventListener("mousedown", function (event) {
      var panel = document.querySelector(".add-panel");
      moved = null;
      if (event.target.closest(".gfpp") != undefined) {
        return;
      }

      let element = event.target.closest(".draggable");
      let clone = element.cloneNode(true);
      let parent = element.closest("ul");
      parent.appendChild(clone);
      clone.classList.add("on-the-move");
      clone.style.zIndex += 5000;

      let coords = getCoords(element);
      let shiftX = event.pageX - coords.left;
      let shiftY = event.pageY - coords.top;
      clone.style.left = event.pageX - shiftX - 285 + "px";
      clone.style.top = event.pageY - shiftY - 1003 + "px";
      document.onmousemove = function (event) {
        moved = 1;
        let placeholder = document.querySelector(".place-holder.on");
        mousePosY = window.innerHeight - event.clientY;

        updatePlaceholder(event, placeholder);

        clone.style.left = event.pageX - shiftX - 285 + "px";
        clone.style.top = event.pageY - shiftY - 1003 + "px";
        if (isInside(event, placeholder)) {
          placeholder.classList.add("inme");
        } else {
          placeholder.classList.remove("inme");
        }
      };

      clone.onmouseup = function (e) {
        !moved && element.click();
        if (document.querySelector(".inme")) {
          /*  if (document.querySelector(`[add-section="hide"]`)) {
            stage.classList.add("hide-ph");
          } else {
            if (document.querySelector(`#stage.first-time`)) {
              stage.classList.remove("first-time");
            } else {
              stage.classList.add("hide-ph");
            }
          } 
          element.click();
        }
        document
          .querySelectorAll(".inme")
          .forEach((inme) => inme.classList.remove("inme"));
        document.onmousemove = null;
        clone.onmouseup = null;
        document.onmousemove = null;
        clone.remove();
        body.classList.add("allow-edit");
      };
    })
  );


  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
  function getEdge(elem) {
    var box = elem.getBoundingClientRect();
    return {
      left: box.left,
      right: box.right,
      top: box.top,
      bottom: box.bottom,
    };
  }
  function isInside(event, elem) {
    var box = getEdge(elem);

    if (
      event.pageY > box.top &&
      event.pageY < box.bottom &&
      event.pageX > box.left &&
      event.pageX < box.right
    ) {
      return true;
    } else {
      return false;
    }
  }

  function updatePlaceholder(event, placeholder) {
    if (isInside(event, stage)) {
      let MiddleHeight = event.pageY;

      let addSections = document.querySelectorAll(".place-holder");
      let addArray = [...addSections].map((addSection) =>
        Math.abs(getCoords(addSection).top - MiddleHeight)
      );

      let closestIndex = addArray.indexOf(Math.min(...addArray));

      let chosenAddSection = addSections[closestIndex];

      document.querySelector(".place-holder.on") &&
        document.querySelector(".place-holder.on").classList.remove("on");

      document.querySelector(`#ph${closestIndex}`).classList.add("on");
    }
  }

  document.querySelectorAll(".button-drag").forEach((item) =>
    item.addEventListener("mousedown", function (event) {
      moved = null;

      let element = event.target.closest(".button-drag");
      let clone = element.cloneNode(true);
      let parent = element.closest("body");

      clone.classList.add("moving");
      clone.style.zIndex = 999999999999;

      let coords = getCoords(element);
      let shiftX = event.pageX - coords.left;
      let shiftY = event.pageY - coords.top;

      document.onmousemove = function (event) {
        parent.appendChild(clone);
        moved = 1;
        clone.style.left = event.pageX - shiftX + 3 + "px";
        clone.style.top = event.pageY - shiftY + 3 + "px";
        mousePosY = window.innerHeight - event.clientY;

        if (event.pageX > 750) {
          state.addPanelClosed = true;
          document
            .querySelectorAll(".close-panel")
            .forEach((button) => button.click());
        }
        state.addPanelClosed && indicateSection(clone);
      };

      clone.onmouseup = function (e) {
        document.onmousemove = null;
        clone.onmouseup = null;
        document.onmousemove = null;
        var strips = document.querySelectorAll(".section");
        strips.forEach((strip) => {
          strip.classList.remove("attach-to-me");
        });
        stage.classList.remove("attch");
        attachToStrip(clone, e, shiftY, shiftX);
      };
    })
  );

  function attachToStrip(item, e, shiftY, shiftX) {
    var strips = document.querySelectorAll(".strip");
    strips.forEach((strip) => {
      if (!strip.classList.contains("off")) {
        if (
          getCoords(item).top > getCoords(strip).top &&
          getCoords(item).top < getCoords(strip).top + getSize(strip).height
        ) {
          let newItem = item.cloneNode(true);
          newItem.classList.remove("moving");
          item.remove();
          strip.appendChild(newItem);

          newItem.style.top =
            e.pageY - getCoords(strip).top - shiftY + 5 + "px";
          newItem.style.left =
            e.pageX - getCoords(strip).left + 1 - shiftX + "px";
          newItem.classList.add("element-wrapper");
          newItem.insertAdjacentHTML(
            "afterbegin",
            `<ul id="gfpp" class="gfpp"><li type="Edit-Text" class="gfpp-main-action"><span>Edit Text</span></li><li type="animation" class="gfpp-btn"><svg class="symbol symbol-animation" width="26" height="18" preserveAspectRatio="xMidYMid" viewBox="0 0 39 27"><g id="group-1svg"><path id="path-1" d="M34.531 15.295l-7.198 7.198a2.545 2.545 0 0 1-3.599 0l-7.198-7.198a2.545 2.545 0 0 1 0-3.599l7.198-7.198a2.545 2.545 0 0 1 3.599 0l7.198 7.198a2.545 2.545 0 0 1 0 3.599zm-21.736-1.039l4.828 6.084-1.994 1.581-4.851-6.114c-1.024-1.374-1.024-3.249-.024-4.592l4.875-6.146 1.994 1.582-4.852 6.116c-.309.416-.309 1.041.024 1.489zm-2.802 3.982l-2.004 1.569-3.91-5.014a2.546 2.546 0 0 1 0-2.594L7.96 6.824l2.062 1.492-3.743 5.175 3.714 4.747z"></path></g></svg><span class="gfpp-tooltip">Animation<div class="arrow"></div></span></li><li type="design" class="gfpp-btn"><svg class="symbol symbol-design" width="18" height="16" viewBox="0 0 18 16"><g id="Page-1"><path id="gfpp_cstomize_design_reg_up" d="M16.872.786c-1.034-.92-2.761-1.722-6.596 1.821-1.778 1.642-3.428 4.56-4.468 6.778a3.243 3.243 0 0 0-.745-.097c-.723 0-1.468.242-2.06.79-2.253 2.08 1.235 3.218-3.003 5.2 0 0 .524.073 1.312.073 1.479 0 3.885-.26 5.502-1.754.867-.8 1.128-1.796.86-2.635 2.387-.964 5.476-2.466 7.226-4.083 3.836-3.543 2.969-5.139 1.972-6.093zM6.634 11.674c-.025.404-.249.82-.631 1.173-.802.741-1.993 1.182-2.985 1.36.317-.628.42-1.198.344-1.828-.075-.616-.121-1.023.453-1.553a1.813 1.813 0 0 1 1.547-.452c-.297.692-.51 1.261-.61 1.607.391-.096 1.041-.304 1.837-.598.019.096.051.188.045.291z"></path></g></svg><span class="gfpp-tooltip">Design<div class="arrow"></div></span></li><li type="help" class="gfpp-btn"><svg class="symbol symbol-gfpp_help" width="18" height="18" viewBox="0 0 45 45"><path d="M22.5 1.324c-11.695 0-21.176 9.482-21.176 21.176S10.806 43.676 22.5 43.676c11.695 0 21.176-9.482 21.176-21.176S34.194 1.324 22.5 1.324zm2.615 34.411h-5.294v-5.294h5.294v5.294zm6.242-17.632c-.175.654-.408 1.223-.704 1.705s-.63.903-1.001 1.26c-.371.36-.754.686-1.149.982s-.791.588-1.186.871c-.394.286-.76.593-1.093.926s-.503.704-.749 1.112c-.246.408-.36.884-.36 1.427v1.408h-5.294v-1.668c0-.815.204-1.519.413-2.112s.476-1.117.773-1.575c.294-.455.627-.852.987-1.186.357-.334.725-.649 1.096-.945s.717-.574 1.038-.834c.323-.259.606-.543.855-.852.246-.31.445-.649.593-1.019s.222-.802.222-1.297c0-1.136-.278-1.975-.834-2.52-.556-.543-1.329-.815-2.316-.815-.667 0-1.241.13-1.723.389s-.876.606-1.186 1.038c-.31.431-.537.649-.686 1.228s-.222 1.58-.222 1.58h-5.448c.024 0 .251-2.266.686-3.378.431-1.112 1.038-1.93 1.816-2.745s1.715-1.379 2.816-1.837c1.099-.455 2.327-.649 3.687-.649 1.755 0 3.216.259 4.391.741 1.173.482 2.118 1.091 2.835 1.805.715.717 1.228 1.496 1.538 2.321.31.829.463 1.604.463 2.319 0 .889-.087 1.665-.259 2.319z"></path></svg><span class="gfpp-tooltip">Help<div class="arrow"></div></span></li></ul>`
          );
          newItem.setAttribute("hat", "button");
          newItem.classList.add("selected");
        }
      }
    });
  }

  function indicateSection(item, e, shiftY, shiftX) {
    var strips = document.querySelectorAll(".section");

    strips.forEach((strip) => {
      if (!strip.classList.contains("off")) {
        if (
          getCoords(item).top > getCoords(strip).top &&
          getCoords(item).top < getCoords(strip).top + getSize(strip).height
        ) {
          console.log("yo");
          stage.classList.add("attch");
          strip.classList.add("attach-to-me");
        }
      }
    });
  } */
}
