/**
 * Destroy Component
 * @param {object} elem
 * @returns {undefined}
 */

export function destroy(id) {
  if (document.querySelector("#" + id)) {
    let component = document.querySelector("#" + id);
    component.parentNode.removeChild(component);
  }
}
/**
 * Make element invisible
 * @param {object} elem
 * @returns {undefined}
 */
export function hideElement(elem) {
  if (elem.style.visibility !== "hidden") {
    elem.style.visibility = "hidden";
    elem.style.display = "none";
  }
}

/**
 * Make element visible
 * @param {object} elem
 * @returns {undefined}
 */
export function showElement(elem) {
  if (elem.style.visibility == "hidden") {
    elem.style.visibility = "visible";
  }
}

/**
 * Get Element coordinates
 * @param {object} elem
 * @returns {scriptsL#1.getCoords.scriptsAnonym$0}
 */
export function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}
/**
 * Get Element Size
 * @param {object} elem
 * @returns {scriptsL#1.getCoords.scriptsAnonym$0}
 */
export function getSize(elem) {
  var box = elem.getBoundingClientRect();
  return {
    height: box.bottom - box.top,
    width: box.right - box.left,
  };
}

/**
 * toogle
 * @param {boolean} elem
 * @returns {boolean}
 */
export function toggle(isTrue) {
  if (isTrue) {
    return false;
  } else {
    return true;
  }
}

/**
 * make Title Case
 * @param {string} title
 * @returns {string}
 */
export function titleCase(str) {
  str = str.toLowerCase();
  str = str.split(" ");
  str = str.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  return str.join(" ");
}

/**
 * copy to clipboard
 * @param {string} title
 */

export const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

/**
 * copy to clipboard
 * @param {HTMLElement} handle
 * @param {HTMLElement} elementToDrag
 * @param {Array} Offset
 */
export const dragAndDrop = (handle, elementToDrag, offset) => {
  handle.onmousedown = (e) => {
    const mousePos = { x: e.pageX, y: e.pageY };
    const coords = getCoords(panel);
    const realOffset = {
      x: mousePos.x - coords.left - LEFT_BAR_WIDTH,
      y: mousePos.y - coords.top - HEADER_HEIGHT,
    };

    document.onmousemove = (moveEvent) => {
      const mousePos = { x: moveEvent.pageX, y: moveEvent.pageY };
      panel.style.top = mousePos.y - offset.y + "px";
      panel.style.left = mousePos.x - offset.x + "px";
    };
    document.onmouseup = (moveEvent) => {
      document.onmousemove = null;
    };
  };
};

export function uuid() {
  const length = 10;
  var result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += "-";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
