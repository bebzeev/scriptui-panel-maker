// ============================================================
// Core ScriptUI types — the foundation of the entire app
// ============================================================

export type ScriptUIElementType =
  // Containers
  | 'Dialog'
  | 'Group'
  | 'Panel'
  | 'Tab'
  | 'TabbedPanel'
  | 'VerticalTabbedPanel'
  | 'TreeView'
  | 'TreeItem'
  // Inputs
  | 'Button'
  | 'StaticText'
  | 'EditText'
  | 'Checkbox'
  | 'RadioButton'
  | 'Slider'
  | 'DropDownList'
  | 'ListBox'
  // Visuals
  | 'Image'
  | 'IconButton'
  | 'Progressbar'
  | 'Divider'

export type PropertyGroupId =
  | 'identity'
  | 'content'
  | 'textStyle'
  | 'colors'
  | 'layout'
  | 'alignment'
  | 'spacing'
  | 'behavior'
  | 'creationProps'
  | 'advanced'

export type AlignH = 'left' | 'center' | 'right' | 'fill'
export type AlignV = 'top' | 'center' | 'bottom' | 'fill'
export type JustifyValue = 'left' | 'center' | 'right'
export type Orientation = 'row' | 'column'

// Margins: single number (all sides) or [top, right, bottom, left]
export type MarginsValue = number | [number, number, number, number]

// Preferred size [width, height], 0 means "auto"
export type SizeValue = [number, number]

export interface FontDescriptor {
  name: string
  size: number
  style: 'regular' | 'bold' | 'italic' | 'bold-italic'
}

export interface ScriptUIColor {
  r: number // 0–255
  g: number
  b: number
}

// ============================================================
// Creation properties — set at element creation time in ScriptUI
// ============================================================

export interface DialogCreationProps {
  su1PanelCoordinates: boolean
  maximizeButton: boolean
  minimizeButton: boolean
  independent: boolean
  closeButton: boolean
  borderless: boolean
  resizeable: boolean
}

export interface PanelCreationProps {
  borderStyle: 'black' | 'etched' | 'gray' | 'raised' | 'sunken'
  su1PanelCoordinates: boolean
}

export interface StaticTextCreationProps {
  truncate: 'none' | 'middle' | 'end'
  multiline: boolean
  scrolling: boolean
}

export interface EditTextCreationProps {
  noecho: boolean
  readonly: boolean
  multiline: boolean
  scrollable: boolean
  borderless: boolean
  enterKeySignalsOnChange: boolean
  characters: number // 0 = no limit
}

export interface ListBoxCreationProps {
  multiselect: boolean
  numberOfColumns: number
  columnWidths: number[]
  columnTitles: string[]
  showHeaders: boolean
}

export interface IconButtonCreationProps {
  style: 'toolbutton' | 'button'
  toggle: boolean
}

// ============================================================
// Element styles — one per element type
// ============================================================

// Shared base for all elements
interface BaseStyle {
  varName: string | null
  enabled: boolean
  visible: boolean // NEW: was commented out in reference app
  helpTip: string | null
}

// Shared layout for container elements
interface ContainerLayout {
  preferredSize: SizeValue
  margins: MarginsValue
  spacing: number
  orientation: Orientation
  alignChildren: [AlignH, AlignV]
  alignment: AlignH | AlignV | null
}

// Shared layout for widget elements
interface WidgetLayout {
  preferredSize: SizeValue
  alignment: AlignH | AlignV | null
}

// Shared text styling
interface TextStyle {
  justify: JustifyValue
  softWrap: boolean
  font?: FontDescriptor
  foregroundColor?: ScriptUIColor
}

// ============================================================
// Concrete style types per element
// ============================================================

export interface DialogStyle extends BaseStyle, ContainerLayout {
  type: 'Dialog'
  text: string
  windowType: 'Dialog' | 'Palette' | 'Window'
  creationProps: DialogCreationProps
}

export interface GroupStyle extends BaseStyle, ContainerLayout {
  type: 'Group'
}

export interface PanelStyle extends BaseStyle, ContainerLayout {
  type: 'Panel'
  text: string
  creationProps: PanelCreationProps
}

export interface TabStyle extends BaseStyle {
  type: 'Tab'
  text: string
  orientation: Orientation
  spacing: number
  alignChildren: [AlignH, AlignV]
}

export interface TabbedPanelStyle extends BaseStyle {
  type: 'TabbedPanel'
  preferredSize: SizeValue
  margins: MarginsValue
  alignment: AlignH | AlignV | null
  selection: number
}

export interface VerticalTabbedPanelStyle extends BaseStyle {
  type: 'VerticalTabbedPanel'
  preferredSize: SizeValue
  margins: MarginsValue
  alignment: AlignH | AlignV | null
  tabNavWidth: number
  selection: number
}

export interface TreeViewStyle extends BaseStyle, WidgetLayout {
  type: 'TreeView'
}

export interface TreeItemStyle extends BaseStyle {
  type: 'TreeItem'
  text: string
  expanded: boolean
}

export interface ButtonStyle extends BaseStyle, WidgetLayout {
  type: 'Button'
  text: string
  justify: JustifyValue
  font?: FontDescriptor
}

export interface StaticTextStyle extends BaseStyle, WidgetLayout, TextStyle {
  type: 'StaticText'
  text: string
  creationProps: StaticTextCreationProps
}

export interface EditTextStyle extends BaseStyle, WidgetLayout, TextStyle {
  type: 'EditText'
  text: string
  creationProps: EditTextCreationProps
}

export interface CheckboxStyle extends BaseStyle, WidgetLayout {
  type: 'Checkbox'
  text: string
  value: boolean
}

export interface RadioButtonStyle extends BaseStyle, WidgetLayout {
  type: 'RadioButton'
  text: string
  value: boolean
}

export interface SliderStyle extends BaseStyle, WidgetLayout {
  type: 'Slider'
  minvalue: number // NEW: editable (was hardcoded to 0)
  maxvalue: number // NEW: editable (was hardcoded to 100)
  value: number // NEW: editable (was hardcoded to 50)
}

export interface DropDownListStyle extends BaseStyle, WidgetLayout {
  type: 'DropDownList'
  listItems: string // comma-separated, '-' for divider
  selection: number | null
}

export interface ListBoxStyle extends BaseStyle, WidgetLayout {
  type: 'ListBox'
  listItems: string
  selection: number[]
  creationProps: ListBoxCreationProps
}

export interface ImageStyle extends BaseStyle, WidgetLayout {
  type: 'Image'
  image: string | null // base64 data URL
}

export interface IconButtonStyle extends BaseStyle, WidgetLayout {
  type: 'IconButton'
  text: string
  image: string | null
  creationProps: IconButtonCreationProps
}

export interface ProgressbarStyle extends BaseStyle, WidgetLayout {
  type: 'Progressbar'
  value: number // NEW: editable (was hardcoded to 50)
  maxvalue: number // NEW: editable (was hardcoded to 100)
}

export interface DividerStyle extends BaseStyle {
  type: 'Divider'
}

// Union of all element styles — the discriminated union
export type ElementStyle =
  | DialogStyle
  | GroupStyle
  | PanelStyle
  | TabStyle
  | TabbedPanelStyle
  | VerticalTabbedPanelStyle
  | TreeViewStyle
  | TreeItemStyle
  | ButtonStyle
  | StaticTextStyle
  | EditTextStyle
  | CheckboxStyle
  | RadioButtonStyle
  | SliderStyle
  | DropDownListStyle
  | ListBoxStyle
  | ImageStyle
  | IconButtonStyle
  | ProgressbarStyle
  | DividerStyle

// ============================================================
// Element definition — drives Add Items panel, property editor, codegen
// ============================================================

export interface ElementDef<T extends ScriptUIElementType = ScriptUIElementType> {
  type: T
  isContainer: boolean
  canContainTypes?: ScriptUIElementType[] // undefined = accepts all
  defaultStyle: Extract<ElementStyle, { type: T }>
  propertyGroups: PropertyGroupId[]
  addPanelIcon: string // Lucide icon name
  addPanelCategory: 'containers' | 'inputs' | 'visuals'
  addPanelLabel: string
  autoVarPrefix: string // e.g. 'button', 'panel', 'dropdown'
  editInfo?: string
}

// ============================================================
// App state
// ============================================================

export interface ScriptUIItem {
  id: string
  type: ScriptUIElementType
  parentId: string | null
  collapsed: boolean // collapse state in Structure panel tree
  style: ElementStyle
}

export interface ExportSettings {
  panelName: string
  windowType: 'Palette' // always Palette — all panels are AE dockable
  showPanel: boolean
  functionWrapper: boolean
  indentSize: 2 | 4
  itemReferenceList: 'none' | 'var' | 'findElement' | 'path'
}

export interface AppState {
  items: Record<string, ScriptUIItem>
  order: string[] // flat depth-first list; parentId encodes hierarchy
  activeId: string | null
  settings: ExportSettings
}

export const DEFAULT_SETTINGS: ExportSettings = {
  panelName: 'My Panel',
  windowType: 'Palette',
  showPanel: true,
  functionWrapper: false,
  indentSize: 2,
  itemReferenceList: 'none',
}
