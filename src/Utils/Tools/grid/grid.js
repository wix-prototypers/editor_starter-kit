/*TBD:
Add css file
*/

export const grid = () => {
  document.querySelector("#grid").insertAdjacentHTML(
    "afterbegin",
    `
 <div class="gridLines-container">
 <div class="top-grid" id="top-grid">
   <div class="grid-item"></div>

   <div class="grid-item"></div>
   <div class="grid-item end"></div>
 </div>
 <div class="bottom-grid">
   <div class="grid-item"></div>
   <div class="grid-item"></div>
   <div class="grid-item end"></div>
 </div>
</div>
 `
  );
};
