import React from 'react'
import { useAppStore } from '../../../store'
import { getRootItem, getChildren } from '../../../store/selectors'
import type { AppState, ScriptUIItem } from '../../../types/schema'
import { ELEMENT_REGISTRY } from '../../../elements'

// Import all renderers
import { DialogRenderer } from './renderers/DialogRenderer'
import { GroupRenderer } from './renderers/GroupRenderer'
import { PanelRenderer } from './renderers/PanelRenderer'
import { ButtonRenderer } from './renderers/ButtonRenderer'
import { StaticTextRenderer } from './renderers/StaticTextRenderer'
import { EditTextRenderer } from './renderers/EditTextRenderer'
import { CheckboxRenderer } from './renderers/CheckboxRenderer'
import { RadioButtonRenderer } from './renderers/RadioButtonRenderer'
import { SliderRenderer } from './renderers/SliderRenderer'
import { DropDownListRenderer } from './renderers/DropDownListRenderer'
import { ListBoxRenderer } from './renderers/ListBoxRenderer'
import { TabbedPanelRenderer } from './renderers/TabbedPanelRenderer'
import { VerticalTabbedPanelRenderer } from './renderers/VerticalTabbedPanelRenderer'
import { TreeViewRenderer } from './renderers/TreeViewRenderer'
import { ImageRenderer } from './renderers/ImageRenderer'
import { IconButtonRenderer } from './renderers/IconButtonRenderer'
import { ProgressbarRenderer } from './renderers/ProgressbarRenderer'
import { DividerRenderer } from './renderers/DividerRenderer'
import { TabRenderer } from './renderers/TabRenderer'
import { TreeItemRenderer } from './renderers/TreeItemRenderer'

export interface RendererProps {
  item: ScriptUIItem
  state: AppState
  renderChildren: (parentId: string) => React.ReactNode
}

type RendererComponent = React.ComponentType<RendererProps>

const RENDERER_MAP: Partial<Record<string, RendererComponent>> = {
  Dialog: DialogRenderer,
  Group: GroupRenderer,
  Panel: PanelRenderer,
  Tab: TabRenderer,
  TabbedPanel: TabbedPanelRenderer,
  VerticalTabbedPanel: VerticalTabbedPanelRenderer,
  TreeView: TreeViewRenderer,
  TreeItem: TreeItemRenderer,
  Button: ButtonRenderer,
  StaticText: StaticTextRenderer,
  EditText: EditTextRenderer,
  Checkbox: CheckboxRenderer,
  RadioButton: RadioButtonRenderer,
  Slider: SliderRenderer,
  DropDownList: DropDownListRenderer,
  ListBox: ListBoxRenderer,
  Image: ImageRenderer,
  IconButton: IconButtonRenderer,
  Progressbar: ProgressbarRenderer,
  Divider: DividerRenderer,
}

export function VisualPreview() {
  const storeState = useAppStore()

  const state: AppState = {
    items: storeState.items,
    order: storeState.order,
    activeId: storeState.activeId,
    settings: storeState.settings,
  }

  const root = getRootItem(state)

  if (!root) {
    return (
      <div className="flex items-center justify-center h-full text-app-muted text-xs">
        No items to preview
      </div>
    )
  }

  const renderChildren = (parentId: string): React.ReactNode => {
    const children = getChildren(state, parentId)
    return children.map((child) => renderItem(child))
  }

  const renderItem = (item: ScriptUIItem): React.ReactNode => {
    const Renderer = RENDERER_MAP[item.type]
    if (!Renderer) return null
    return <Renderer key={item.id} item={item} state={state} renderChildren={renderChildren} />
  }

  return (
    <div
      className="flex-1 h-full overflow-auto flex items-start justify-center p-8"
      style={{ background: '#2a2a2a' }}
    >
      {renderItem(root)}
    </div>
  )
}
