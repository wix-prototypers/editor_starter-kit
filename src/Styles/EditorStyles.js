var hrefs = [
  "../src/Styles/fonts.css",
  "../src/Styles/normalize.css",
  "../src/Styles/ptyp.css",
  "../src/Styles/variables.css",
];

hrefs.forEach((href) => {
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
});

export const Styles = "Appended";
