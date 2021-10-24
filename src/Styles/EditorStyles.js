var hrefs = [
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/Styles/fonts.css",
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/Styles/normalize.css",
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/Styles/ptyp.css",
  "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit/src/Styles/variables.css",
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
