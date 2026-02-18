import type { ElementDef } from '../../types/schema'

export const radioButtonDef: ElementDef<'RadioButton'> = {
  type: 'RadioButton',
  isContainer: false,
  defaultStyle: {
    type: 'RadioButton',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'RadioButton',
    value: false,
    preferredSize: [0, 0],
    alignment: null,
  },
  propertyGroups: ['identity', 'content', 'advanced', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'Circle',
  addPanelCategory: 'inputs',
  addPanelLabel: 'RadioButton',
  autoVarPrefix: 'radiobutton',
  editInfo: 'RadioButtons are grouped automatically. All consecutive RadioButtons within the same container are treated as a group.',
}
