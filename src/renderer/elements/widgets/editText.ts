import type { ElementDef } from '../../types/schema'

export const editTextDef: ElementDef<'EditText'> = {
  type: 'EditText',
  isContainer: false,
  defaultStyle: {
    type: 'EditText',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    text: '',
    justify: 'left',
    softWrap: false,
    preferredSize: [0, 0],
    alignment: null,
    creationProps: {
      noecho: false,
      readonly: false,
      multiline: false,
      scrollable: false,
      borderless: false,
      enterKeySignalsOnChange: false,
      characters: 0,
    },
  },
  propertyGroups: ['identity', 'content', 'textStyle', 'colors', 'layout', 'alignment', 'behavior', 'creationProps'],
  addPanelIcon: 'TextCursor',
  addPanelCategory: 'inputs',
  addPanelLabel: 'EditText',
  autoVarPrefix: 'edittext',
}
