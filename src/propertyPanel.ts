const getStylingPanelDefinition = () => ({
  type: "items",
  items: [
    {
      component: "styling-panel",
      chartTitle: "Inputs",
      translation: "LayerStyleEditor.component.styling",
      subtitle: "LayerStyleEditor.component.styling",
      ref: "inputOptions",
      useGeneral: true,
      useBackground: true,
      show: true,
    },
  ],
});

export default getStylingPanelDefinition;
