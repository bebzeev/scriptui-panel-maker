import type { ElementDef } from '../../types/schema'

export const groupDef: ElementDef<'Group'> = {
  type: 'Group',
  isContainer: true,
  defaultStyle: {
    type: 'Group',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    preferredSize: [0, 0],
    margins: 0,
    spacing: 10,
    orientation: 'row',
    alignChildren: ['left', 'center'],
    alignment: null,
  },
  propertyGroups: ['identity', 'layout', 'alignment', 'spacing', 'behavior'],
  addPanelIcon: 'LayoutGrid',
  addPanelCategory: 'containers',
  addPanelLabel: 'Group',
  autoVarPrefix: 'group',
}
