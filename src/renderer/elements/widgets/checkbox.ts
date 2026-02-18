import type { ElementDef } from '../../types/schema'

export const checkboxDef: ElementDef<'Checkbox'> = {
  type: 'Checkbox',
  isContainer: false,
  defaultStyle: {
    type: 'Checkbox',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'Checkbox',
    value: false,
    preferredSize: [0, 0],
    alignment: null,
  },
  propertyGroups: ['identity', 'content', 'advanced', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'SquareCheck',
  addPanelCategory: 'inputs',
  addPanelLabel: 'Checkbox',
  autoVarPrefix: 'checkbox',
}
