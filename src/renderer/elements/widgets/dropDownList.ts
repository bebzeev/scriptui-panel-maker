import type { ElementDef } from '../../types/schema'

export const dropDownListDef: ElementDef<'DropDownList'> = {
  type: 'DropDownList',
  isContainer: false,
  defaultStyle: {
    type: 'DropDownList',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    listItems: 'Item 1, Item 2, Item 3',
    selection: 0,
    preferredSize: [0, 0],
    alignment: null,
  },
  propertyGroups: ['identity', 'content', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'ChevronDown',
  addPanelCategory: 'inputs',
  addPanelLabel: 'DropDownList',
  autoVarPrefix: 'dropdown',
  editInfo: 'Use a dash "-" as a list item to add a divider.',
}
