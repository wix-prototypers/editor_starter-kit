import * as icons from "./icons.js";

export const Resizable = () => {
  var href =
    "https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.9-beta/src/Utils/Resize/Resize.css";
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

  const elements = document.querySelectorAll(
    ".strip:not(.header) .element-container:not(.strip)"
  );
  elements.forEach((element) => {
    element.insertAdjacentHTML(
      "afterbegin",
      ` <div class="resizers">
  <div class="resizer top"></div>
  <div class="resizer top-right"></div>
  <div class="resizer top-left"></div>
  <div class="resizer bottom"></div>
  <div class="resizer bottom-right"></div>
  <div class="resizer bottom-left"></div>
</div>
<div class="drag-handle">
${icons.drag}
</div>
<div class="drag-handle bt">
${icons.drag}
</div>
<div class="rotate-handle">
${icons.rotate}
</div>
`
    );

    const resizers = element.querySelectorAll(".resizer");
    const minimum_size = 0;
    let original_width = element.getBoundingClientRect().width;
    let original_height = element.getBoundingClientRect().height;
    let original_x = element.getBoundingClientRect().x;
    let original_y = element.getBoundingClientRect().y;

    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener("mousedown", function (e) {
        let original_mouse_x = e.pageX - element.getBoundingClientRect().x;
        let original_mouse_y = e.pageY - element.getBoundingClientRect().y;
        e.preventDefault();
        original_width = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(element, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      });

      function resize(e) {
        if (currentResizer.classList.contains("bottom-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
          if (height > minimum_size) {
            element.style.width = width + "px";
            element.style.height = height + "px";
          }
        } else if (currentResizer.classList.contains("bottom-left")) {
          const height = original_height + (e.pageY - original_mouse_y);
          const width = original_width - (e.pageX - original_mouse_x);
          if (height > minimum_size) {
            element.style.height = height + "px";
          }
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left =
              original_x + (e.pageX - original_mouse_x) + "px";
          }
        } else if (currentResizer.classList.contains("top-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
            element.style.top =
              original_y + (e.pageY - original_mouse_y) + "px";
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            element.style.width = width + "px";
            element.style.left =
              original_x + (e.pageX - original_mouse_x) + "px";
          }
          if (height > minimum_size) {
            element.style.height = height + "px";
            element.style.top =
              original_y + (e.pageY - original_mouse_y) + "px";
          }
        }
      }

      function stopResize() {
        window.removeEventListener("mousemove", resize);
      }
    }
  });
};
