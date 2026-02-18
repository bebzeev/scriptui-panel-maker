import type { ElementDef } from '../../types/schema'

export const verticalTabbedPanelDef: ElementDef<'VerticalTabbedPanel'> = {
  type: 'VerticalTabbedPanel',
  isContainer: true,
  canContainTypes: ['Tab'],
  defaultStyle: {
    type: 'VerticalTabbedPanel',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    preferredSize: [0, 0],
    margins: 0,
    alignment: null,
    tabNavWidth: 100,
    selection: 0,
  },
  propertyGroups: ['identity', 'layout', 'alignment', 'advanced', 'behavior'],
  addPanelIcon: 'PanelLeft',
  addPanelCategory: 'containers',
  addPanelLabel: 'VerticalTabbedPanel',
  autoVarPrefix: 'vtabpanel',
  editInfo: 'Vertical tab navigation. Can only contain Tab items. The tabNavWidth controls the width of the left nav bar.',
}
