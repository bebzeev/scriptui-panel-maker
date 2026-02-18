import type { ElementDef } from '../../types/schema'

export const progressbarDef: ElementDef<'Progressbar'> = {
  type: 'Progressbar',
  isContainer: false,
  defaultStyle: {
    type: 'Progressbar',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    value: 50,      // editable (was hardcoded in reference app)
    maxvalue: 100,  // editable
    preferredSize: [0, 4],
    alignment: null,
  },
  propertyGroups: ['identity', 'advanced', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'LoaderCircle',
  addPanelCategory: 'visuals',
  addPanelLabel: 'Progressbar',
  autoVarPrefix: 'progressbar',
}
