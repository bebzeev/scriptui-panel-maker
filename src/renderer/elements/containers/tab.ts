import type { ElementDef } from '../../types/schema'

export const tabDef: ElementDef<'Tab'> = {
  type: 'Tab',
  isContainer: true,
  canContainTypes: ['Group', 'Panel', 'Button', 'StaticText', 'EditText', 'Checkbox',
    'RadioButton', 'Slider', 'DropDownList', 'ListBox', 'Image', 'IconButton',
    'Progressbar', 'Divider', 'TabbedPanel', 'VerticalTabbedPanel', 'TreeView'],
  defaultStyle: {
    type: 'Tab',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'Tab',
    orientation: 'column',
    spacing: 10,
    alignChildren: ['left', 'top'],
  },
  propertyGroups: ['identity', 'content', 'layout', 'spacing', 'behavior'],
  addPanelIcon: 'BookOpen',
  addPanelCategory: 'containers',
  addPanelLabel: 'Tab',
  autoVarPrefix: 'tab',
  editInfo: 'Must be placed inside a TabbedPanel or VerticalTabbedPanel.',
}
