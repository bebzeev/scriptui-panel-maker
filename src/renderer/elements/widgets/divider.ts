import type { ElementDef } from '../../types/schema'

export const dividerDef: ElementDef<'Divider'> = {
  type: 'Divider',
  isContainer: false,
  defaultStyle: {
    type: 'Divider',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
  },
  propertyGroups: ['identity', 'behavior'],
  addPanelIcon: 'Minus',
  addPanelCategory: 'visuals',
  addPanelLabel: 'Divider',
  autoVarPrefix: 'divider',
  editInfo: 'Renders as a horizontal or vertical line depending on the parent orientation. In code, a divider is added as a panel with no text.',
}
