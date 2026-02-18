import type { ElementDef } from '../../types/schema'

export const panelDef: ElementDef<'Panel'> = {
  type: 'Panel',
  isContainer: true,
  defaultStyle: {
    type: 'Panel',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'Panel',
    preferredSize: [0, 0],
    margins: 10,
    spacing: 10,
    orientation: 'column',
    alignChildren: ['left', 'top'],
    alignment: null,
    creationProps: {
      borderStyle: 'etched',
      su1PanelCoordinates: false,
    },
  },
  propertyGroups: ['identity', 'content', 'layout', 'alignment', 'spacing', 'behavior', 'creationProps'],
  addPanelIcon: 'SquareDashed',
  addPanelCategory: 'containers',
  addPanelLabel: 'Panel',
  autoVarPrefix: 'panel',
}
