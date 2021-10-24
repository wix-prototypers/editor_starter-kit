import { panelCreator } from "../Panels/floating-panels/panels.js/index.js";

export const megaTooltip = (element, content, top, left, width) => {
  if (element) {
    element.insertAdjacentHTML(
      "afterbegin",
      ` 
<span class="mega-tooltip" style=" width:${width + "px"}; transform:translate(${
        top + "px"
      },${left + "px"}) ">
<div>
${content}
</div>
   <div class="arrow"></div>
</span>
 `
    );

    const show = () => {
      element.querySelector(".mega-tooltip").classList.add("show");
    };
    const hide = () => {
      element.querySelector(".mega-tooltip").classList.remove("show");
    };

    element.addEventListener("mouseenter", () => {
      let tooltip = element.querySelector(".mega-tooltip");
      element.addEventListener("mouseleave", (e) => {
        hide();
        e.target.removeAttribute("data-mouseover");
      });

      element.setAttribute("data-mouseover", true);
      tooltip.addEventListener("mouseenter", (e) => {
        e.target.setAttribute("data-mouseover", true);
      });

      tooltip.addEventListener("mouseleave", (e) => {
        hide();
        e.target.removeAttribute("data-mouseover");
      });

      setTimeout(() => {
        if (
          element.getAttribute("data-mouseover") ||
          element.getAttribute("data-mouseover")
        ) {
          show();
        }
      }, 300);
    });

    element.querySelector(".link") &&
      element
        .querySelector(".link")
        .addEventListener("click", function dashboard() {
          console.log(
            document.querySelector(".sub-element-container.active.selected")
          );
          panelCreator(
            document.querySelector(".sub-element-container.active"),
            "dashboard"
          );
        });
  }
};
