import type { ElementDef } from '../../types/schema'

export const iconButtonDef: ElementDef<'IconButton'> = {
  type: 'IconButton',
  isContainer: false,
  defaultStyle: {
    type: 'IconButton',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: '',
    image: null,
    preferredSize: [0, 0],
    alignment: null,
    creationProps: {
      style: 'toolbutton',
      toggle: false,
    },
  },
  propertyGroups: ['identity', 'content', 'layout', 'alignment', 'behavior', 'creationProps'],
  addPanelIcon: 'ImagePlay',
  addPanelCategory: 'visuals',
  addPanelLabel: 'IconButton',
  autoVarPrefix: 'iconbutton',
}
