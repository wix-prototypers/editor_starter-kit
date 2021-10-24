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
 * @returns {undefined}
 */

export const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
