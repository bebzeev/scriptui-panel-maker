import type { ElementDef } from '../../types/schema'

export const tabbedPanelDef: ElementDef<'TabbedPanel'> = {
  type: 'TabbedPanel',
  isContainer: true,
  canContainTypes: ['Tab'],
  defaultStyle: {
    type: 'TabbedPanel',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    preferredSize: [0, 0],
    margins: 0,
    alignment: null,
    selection: 0,
  },
  propertyGroups: ['identity', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'PanelTop',
  addPanelCategory: 'containers',
  addPanelLabel: 'TabbedPanel',
  autoVarPrefix: 'tabbedpanel',
  editInfo: 'Can only contain Tab items. Add Tab items to create tabs.',
}
