import type { ElementDef } from '../../types/schema'

export const treeItemDef: ElementDef<'TreeItem'> = {
  type: 'TreeItem',
  isContainer: true,
  canContainTypes: ['TreeItem'],
  defaultStyle: {
    type: 'TreeItem',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'Item',
    expanded: false,
  },
  propertyGroups: ['identity', 'content', 'advanced', 'behavior'],
  addPanelIcon: 'ListTree',
  addPanelCategory: 'containers',
  addPanelLabel: 'TreeItem',
  autoVarPrefix: 'treeitem',
  editInfo: 'Must be inside a TreeView. Can contain nested TreeItems. The expanded property controls whether it starts expanded.',
}
