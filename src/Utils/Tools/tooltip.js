export const tooltip = (element, text, top, left) => {
  element.create(
    `
<span class="tooltip">
${text}
   <div class="arrow"></div>xs
</span>
 `
  );
};
