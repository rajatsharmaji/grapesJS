const editor = grapesjs.init({
  container: "#gjs",
  fromElement: false,
  components: "<h1>Hey Coder!</h1>",
  height: "650px",
  width: "auto",
  storageManager: false,
  panels: { defaults: [] },

  blockManager: {
    appendTo: "#blocks",
    blocks: [
      {
        id: "section",
        label: "<b>Section</b>",
        attributes: { class: "gjs-block-section" },
        content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
      },
      {
        id: "text",
        label: "Text",
        content: '<div data-gjs-type="text">Insert your text here</div>',
      },
      {
        id: "image",
        label: "Image",
        select: true,
        content: { type: "image" },
        activate: true,
      },
      {
        id: "button",
        label: "button",
        select: true,
        content: '<span><button type="button">click me</button><br></span>',
        activate: true,
      },
      {
        id: "heading",
        label: "heading",
        select: true,
        content: "<h2>HEADING</h2>",
        activate: true,
      },
    ],
  },

  layerManager: {
    appendTo: ".layers-container",
  },
  panels: {
    defaults: [
      {
        id: "layers",
        el: ".panel__right",
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
            id: 'show-layers',
            active: true,
            label: 'Layers',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          }, {
            id: 'show-style',
            active: true,
            label: 'Styles',
            command: 'show-styles',
            togglable: false,
        }, {
          id: 'show-traits',
          active: true,
          label: 'Traits',
          command: 'show-traits',
          togglable: false,
      }],
      },
    ],
  },
  selectorManager: {
    appendTo: '.styles-container'
  },
  styleManager: {
    appendTo: '.styles-container',
    sectors: [{
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          }
        ]
      },{
        name: 'Extra',
        open: false,
        buildProps: ['background-color', 'box-shadow', 'custom-prop'],
        properties: [
          {
            id: 'custom-prop',
            name: 'Custom Label',
            property: 'font-size',
            type: 'select',
            defaults: '32px',
            // List of options, available only for 'select' and 'radio'  types
            options: [
              { value: '12px', name: 'Tiny' },
              { value: '18px', name: 'Medium' },
              { value: '32px', name: 'Big' },
            ],
         }
        ]
      }]
  },
  traitManager: {
    appendTo: '.traits-container',
  },
});

editor.BlockManager.add("input", {
  label: "input",
  category: "default",
  content: {
    tagName: "div",
    draggable: true,
    attributes: { color: "red" },
    components: [
      {
        tagName: "div",
        components:
          '<span><input type="text" id="fname" name="fname"><br></span>',
      },
    ],
  },
});

editor.Panels.addPanel({
  id: "panel-top",
  el: ".panel__top",
});
editor.Panels.addPanel({
  id: "basic-actions",
  el: ".panel__basic-actions",
  buttons: [
    {
      id: "visibility",
      active: true, // active by default
      className: "btn-toggle-borders",
      label: "<u>B</u>",
      command: "sw-visibility", // Built-in command
    },
    {
      id: "export",
      className: "btn-open-export",
      label: "Exp",
      command: "export-template",
      context: "export-template", // For grouping context of buttons from the same panel
    },
    {
      id: "show-json",
      className: "btn-show-json",
      label: "JSON",
      context: "show-json",
      command(editor) {
        editor.Modal.setTitle("Components JSON")
          .setContent(
            `<textarea style="width:100%; height: 250px;">
              ${JSON.stringify(editor.getComponents())}
            </textarea>`
          )
          .open();
      }, 
    },
  ],
});

editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});
editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});

editor.Commands.add('show-traits', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.traits-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});