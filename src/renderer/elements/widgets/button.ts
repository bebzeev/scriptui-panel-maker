import type { ElementDef } from '../../types/schema'

export const buttonDef: ElementDef<'Button'> = {
  type: 'Button',
  isContainer: false,
  defaultStyle: {
    type: 'Button',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'Button',
    justify: 'center',
    preferredSize: [0, 0],
    alignment: null,
  },
  propertyGroups: ['identity', 'content', 'textStyle', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'RectangleHorizontal',
  addPanelCategory: 'inputs',
  addPanelLabel: 'Button',
  autoVarPrefix: 'button',
}
