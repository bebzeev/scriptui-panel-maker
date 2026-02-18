import type { ElementDef } from '../../types/schema'

export const staticTextDef: ElementDef<'StaticText'> = {
  type: 'StaticText',
  isContainer: false,
  defaultStyle: {
    type: 'StaticText',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: 'StaticText',
    justify: 'left',
    softWrap: false,
    preferredSize: [0, 0],
    alignment: null,
    creationProps: {
      truncate: 'none',
      multiline: false,
      scrolling: false,
    },
  },
  propertyGroups: ['identity', 'content', 'textStyle', 'colors', 'layout', 'alignment', 'behavior', 'creationProps'],
  addPanelIcon: 'Type',
  addPanelCategory: 'inputs',
  addPanelLabel: 'StaticText',
  autoVarPrefix: 'statictext',
  editInfo: 'For multiline text, use \\n in the text field. Multiline StaticText is split into a Group + multiple single-line items in the generated code.',
}
