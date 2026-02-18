import type { ElementDef, ScriptUIElementType } from '../types/schema'

import { dialogDef } from './containers/dialog'
import { groupDef } from './containers/group'
import { panelDef } from './containers/panel'
import { tabDef } from './containers/tab'
import { tabbedPanelDef } from './containers/tabbedPanel'
import { verticalTabbedPanelDef } from './containers/verticalTabbedPanel'
import { treeViewDef } from './containers/treeView'
import { treeItemDef } from './containers/treeItem'
import { buttonDef } from './widgets/button'
import { staticTextDef } from './widgets/staticText'
import { editTextDef } from './widgets/editText'
import { checkboxDef } from './widgets/checkbox'
import { radioButtonDef } from './widgets/radioButton'
import { sliderDef } from './widgets/slider'
import { dropDownListDef } from './widgets/dropDownList'
import { listBoxDef } from './widgets/listBox'
import { imageDef } from './widgets/image'
import { iconButtonDef } from './widgets/iconButton'
import { progressbarDef } from './widgets/progressbar'
import { dividerDef } from './widgets/divider'

export const ELEMENT_REGISTRY: Record<ScriptUIElementType, ElementDef> = {
  Dialog: dialogDef,
  Group: groupDef,
  Panel: panelDef,
  Tab: tabDef,
  TabbedPanel: tabbedPanelDef,
  VerticalTabbedPanel: verticalTabbedPanelDef,
  TreeView: treeViewDef,
  TreeItem: treeItemDef,
  Button: buttonDef,
  StaticText: staticTextDef,
  EditText: editTextDef,
  Checkbox: checkboxDef,
  RadioButton: radioButtonDef,
  Slider: sliderDef,
  DropDownList: dropDownListDef,
  ListBox: listBoxDef,
  Image: imageDef,
  IconButton: iconButtonDef,
  Progressbar: progressbarDef,
  Divider: dividerDef,
}

export const ELEMENT_CATEGORIES = {
  containers: ['Dialog', 'Group', 'Panel', 'TabbedPanel', 'VerticalTabbedPanel', 'Tab', 'TreeView', 'TreeItem'],
  inputs: ['Button', 'StaticText', 'EditText', 'Checkbox', 'RadioButton', 'Slider', 'DropDownList', 'ListBox'],
  visuals: ['Image', 'IconButton', 'Progressbar', 'Divider'],
} as const satisfies Record<string, ScriptUIElementType[]>

export const CONTAINER_TYPES = new Set<ScriptUIElementType>([
  'Dialog', 'Group', 'Panel', 'Tab', 'TabbedPanel', 'VerticalTabbedPanel', 'TreeView', 'TreeItem'
])

export function canContain(parentType: ScriptUIElementType, childType: ScriptUIElementType): boolean {
  const parentDef = ELEMENT_REGISTRY[parentType]
  if (!parentDef.isContainer) return false
  if (!parentDef.canContainTypes) return true // accepts all
  return parentDef.canContainTypes.includes(childType)
}

export function getAddableTypes(parentType: ScriptUIElementType): ScriptUIElementType[] {
  return (Object.keys(ELEMENT_REGISTRY) as ScriptUIElementType[]).filter(
    (type) => type !== 'Dialog' && canContain(parentType, type)
  )
}
