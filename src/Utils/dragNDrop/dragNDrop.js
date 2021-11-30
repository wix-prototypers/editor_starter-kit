import {
  deselectAll,
  select,
  deselectAllChildren,
} from "../ADISelectionModel/adiSelectionModel.js";
var mousePosY = 0;
const topBarsHeight = 170;
const leftBarWidth = 58;
const stage = document.querySelector("#stage");
const body = document.querySelector("body");

var strp = 0;

export function DragNDrop() {
  var href =
    "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.8-beta/src/Utils/dragNDrop/dragNDrop.css";
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
  /**
   * Drag elements
   * @param {Object} event
   * @ireturns {undefined}
   */

  document
    .querySelectorAll(".strip:not(.header) .element-container:not(.strip)")
    .forEach((item) => {
      item.addEventListener("mousedown", function (event) {
        if (
          !event.target.closest("#gfpp") &&
          !event.target.closest(".resizer")
        ) {
          deselectAll();
          mousePosY = window.innerHeight - event.clientY;
          deselectAllChildren();
          event.stopPropagation();
          item.classList.add("on-the-move");
          item.closest(".strip")?.classList.add("origin-strip");
          stage.classList.add("dragging");
          body.classList.add("dragging");
          let boxCoords = getCoords(item);
          let shiftX = event.pageX - boxCoords.left;
          let shiftY = event.pageY - boxCoords.top;

          let coords = {
            top: Math.ceil(
              event.pageY -
                topBarsHeight +
                stage.scrollTop -
                shiftY -
                strp * 500
            ),
            left: Math.ceil(event.pageX - leftBarWidth - shiftX),
          };

          item.setAttribute("coords", `x:${coords.left}y:${coords.top}`);

          document.onmousemove = function (event) {
            mousePosY = window.innerHeight - event.clientY;
            showAttachIndication(event, shiftY, item);
            event.stopPropagation();
            let coords = {
              top: Math.ceil(
                event.pageY -
                  topBarsHeight +
                  stage.scrollTop -
                  shiftY -
                  strp * 500
              ),
              left: Math.ceil(event.pageX - leftBarWidth - shiftX),
            };

            item.style.left = coords.left + "px";
            item.style.top = coords.top + "px";

            item.setAttribute("coords", `x:${coords.left},y:${coords.top}`);

            if (mousePosY < 12) {
              pageScrollDown();
              function pageScrollDown() {
                let interval = setInterval(() => {
                  let dragEnd = stage.classList.contains("page-end")
                    ? 3900
                    : 3500;
                  if (mousePosY < 12 && stage.scrollTop < dragEnd) {
                    stage.classList.add("autoScroll");
                    stage.scrollBy({ top: 1, left: 0 });
                    item.style.top = getElementTop(item) + 1 + "px";
                  } else {
                    stage.classList.remove("autoScroll");
                    clearInterval(interval);
                  }
                }, 30);
              }
            } else if (window.innerHeight - mousePosY < 100) {
              stage.classList.add("autoScroll");
              pageScrollUp();
              function pageScrollUp() {
                let interval = setInterval(() => {
                  if (window.innerHeight - mousePosY < 100) {
                    stage.scrollBy({ top: -1, left: 0 });
                    item.style.top = getElementTop(item) - 1 + "px";
                  } else {
                    clearInterval(interval);
                    stage.classList.remove("autoScroll");
                  }
                }, 30);
              }
            }
          };

          item.onmouseup = function (e) {
            document
              .querySelectorAll(".attach-to-me")
              .forEach((me) => me.classList.remove("attach-to-me"));

            event.stopPropagation();

            item.classList.remove("on-the-move");
            document.onmousemove = null;
            item.onmouseup = null;
            stage.onscroll = null;
            document
              .querySelectorAll(".origin-strip")
              .forEach((origin) => origin.classList.remove("origin-strip"));

            stage.classList.remove("dragging");
            body.classList.remove("dragging");
            locateStripAndAttach(e, shiftY, item);

            select(item);
            item.closest(".strip").classList.add("parent-select");
          };
        }
      });
    });
}
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top - pageYOffset,
    left: box.left + pageXOffset,
  };
}

function getElementTop(elem) {
  return parseInt(window.getComputedStyle(elem).top.split("px")[0]);
}
function locateStripAndAttach(e, shiftY, item) {
  let top = e.pageY + stage.scrollTop - shiftY - 163;
  strp = Math.floor(top / 500);

  if (item.closest(".strip").id.split("s")[1] == strp) {
    return;
  } else {
    item.style.top = top - strp * 500 + "px";
    item.closest(".strip").removeChild(item);
    document.querySelector(`#s${strp}`).appendChild(item);
  }
}
function showAttachIndication(e, shiftY, item) {
  let top = e.pageY + stage.scrollTop - shiftY - 163;
  let stripVal = Math.floor(top / 500);

  if (item.closest(".strip")?.id.split("s")[1] != stripVal) {
    document
      .querySelectorAll(".attach-to-me")
      .forEach((me) => me.classList.remove("attach-to-me"));
    document.querySelector(`#s${stripVal}`) &&
      document.querySelector(`#s${stripVal}`).classList.add("attach-to-me");
  } else {
    document
      .querySelectorAll(".attach-to-me")
      .forEach((me) => me.classList.remove("attach-to-me"));
  }
}
