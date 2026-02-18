import type { ElementDef } from '../../types/schema'

export const treeViewDef: ElementDef<'TreeView'> = {
  type: 'TreeView',
  isContainer: true,
  canContainTypes: ['TreeItem'],
  defaultStyle: {
    type: 'TreeView',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    preferredSize: [0, 100],
    alignment: null,
  },
  propertyGroups: ['identity', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'ListTree',
  addPanelCategory: 'containers',
  addPanelLabel: 'TreeView',
  autoVarPrefix: 'treeview',
  editInfo: 'Can only contain TreeItem elements.',
}
