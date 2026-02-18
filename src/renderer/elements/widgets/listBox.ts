import type { ElementDef } from '../../types/schema'

export const listBoxDef: ElementDef<'ListBox'> = {
  type: 'ListBox',
  isContainer: false,
  defaultStyle: {
    type: 'ListBox',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    listItems: 'Item 1, Item 2, Item 3',
    selection: [],
    preferredSize: [0, 100],
    alignment: null,
    creationProps: {
      multiselect: false,
      numberOfColumns: 1,
      columnWidths: [],
      columnTitles: [],
      showHeaders: false,
    },
  },
  propertyGroups: ['identity', 'content', 'layout', 'alignment', 'behavior', 'creationProps'],
  addPanelIcon: 'List',
  addPanelCategory: 'inputs',
  addPanelLabel: 'ListBox',
  autoVarPrefix: 'listbox',
}
