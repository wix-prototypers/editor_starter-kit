document.onmouseover = () => {
  var root = document.documentElement;
  let currColor = getComputedStyle(root).getPropertyValue(
    "--section-selection"
  );

  root.style.setProperty("--section-selection-50", currColor + "80");
};
document.onmouseout = () => {
  var root = document.documentElement;
  let currColor = getComputedStyle(root).getPropertyValue(
    "--section-selection"
  );

  root.style.setProperty("--section-selection-50", currColor + "80");
};
