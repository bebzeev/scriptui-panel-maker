import type { ElementDef } from '../../types/schema'

export const imageDef: ElementDef<'Image'> = {
  type: 'Image',
  isContainer: false,
  defaultStyle: {
    type: 'Image',
    varName: null,
    enabled: true,
    visible: true,
    helpTip: null,
    image: null,
    preferredSize: [0, 0],
    alignment: null,
  },
  propertyGroups: ['identity', 'content', 'layout', 'alignment', 'behavior'],
  addPanelIcon: 'Image',
  addPanelCategory: 'visuals',
  addPanelLabel: 'Image',
  autoVarPrefix: 'image',
  editInfo: 'Upload a PNG or JPG image. Stored as base64 in the generated code.',
}
