import { Actions } from "../../Actions.js";
//Append Styles

export const Controller = (state, setState) => {
  let panelInfo = {
    prototypeTitle: "Editor 2.0 Section Indications",
    prototypeDescription: ` Try selecting sections, strips and elements. 
    `,
    panelDirection: "left",
  };
  const panelSections = [
    {
      sectionNumber: 0,
      sectionTitle: "Selection Model",
      fields: [
        {
          fieldName: "example-input-radiobtn",
          fieldLabel: "Selection Model",
          divider: false,
          function: "exampleFunction",
          disabled: false,
          fieldType: "radio-button",
          defaultIndex: 0,
          optionsDisplayList: ["Section First", "Element First"],
          optionsBackendList: ["sectionFirst", "elementFirst"],
        },
      ],
    },

    {
      sectionNumber: 1,
      sectionTitle: " Sections Discoverabilty",
      fields: [
        {
          fieldName: "example-input-radiobtn-3",
          fieldLabel: "Section Indications Color",
          divider: false,
          function: "exampleFunction",
          disabled: false,
          fieldType: "radio-button",
          defaultIndex: 0,
          optionsDisplayList: [
            "Wix Blue",
            "New Purple",
            "Light Green",
            "Dark Green",
          ],
          optionsBackendList: [
            "blueIndication",
            "purpleIndication",
            "greenIndication",
            "darkGreenIndication",
          ],
        },

        {
          fieldName: "example-input-toggle2",
          fieldLabel: `Off Stage - Section Color Indications`,
          divider: false,
          function: "controller",
          disabled: false,
          fieldType: "toggle",
          option2Display: "Activate",
          option2Value: "onColor",
          option1Display: "Diactivate",
          option1Value: "offColor",
        },

        {
          fieldName: "example-input-toggle-4",
          fieldLabel: `Overlay section when section actions hovered`,
          divider: false,
          function: "controller",
          disabled: false,
          fieldType: "toggle",
          option1Display: "Apply",
          option1Value: "applyOverlay",
          option2Display: "Disable",
          option2Value: "disableOverlay",
        },
      ],
    },
    {
      sectionNumber: 4,
      sectionTitle: "Expose Section Actions",
      fields: [
        {
          fieldName: "example-input-toggle-5",
          fieldLabel: `Animate Actions / Show in`,
          divider: false,
          function: "controller",
          disabled: false,
          fieldType: "toggle",
          option1Display: "GFPP",
          option1Value: "useGfpp",
          option2Display: "Animate",
          option2Value: "useHighlight",
        },
        {
          fieldName: "example-input-toggle-r",
          fieldLabel: `Color Section Actions Icon`,
          divider: false,
          function: "controller",
          disabled: false,
          fieldType: "toggle",
          option2Display: "Active",
          option2Value: "actionsColorActive",
          option1Display: "Disabled",
          option1Value: "actionsColorDisabled",
        },
        {
          fieldName: "example-input-toggle-r4",
          fieldLabel: `Actions Round UI`,
          divider: false,
          function: "controller",
          disabled: false,
          fieldType: "toggle",
          option2Display: "Active",
          option2Value: "roundUI",
          option1Display: "Disabled",
          option1Value: "disRoundUI",
        },
      ],
    },
  ];
  initPrototypePanel(panelInfo, panelSections);
  document.querySelectorAll(`input`).forEach((input) => {
    input.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      let key = e.target.value;
      console.log(key);
      Actions[key] && Actions[key].call(this, e.target.value);
    });
  });
};
