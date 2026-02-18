import type { ElementDef } from '../../types/schema'

export const sliderDef: ElementDef<'Slider'> = {
  type: 'Slider',
  isContainer: false,
  defaultStyle: {
    type: 'Slider',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    preferredSize: [150, 0],
    alignment: null,
    minvalue: 0,    // editable (was hardcoded in reference app)
    maxvalue: 100,  // editable
    value: 50,      // editable
  },
  propertyGroups: ['identity', 'advanced', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'SlidersHorizontal',
  addPanelCategory: 'inputs',
  addPanelLabel: 'Slider',
  autoVarPrefix: 'slider',
}
