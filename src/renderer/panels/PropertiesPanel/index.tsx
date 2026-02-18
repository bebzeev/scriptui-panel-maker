import React from 'react'
import { useAppStore } from '../../store'
import { ELEMENT_REGISTRY } from '../../elements'
import { PropertySection } from './PropertySection'
import type { PropertyGroupId } from '../../types/schema'

// Section renderers
import { IdentitySection } from './sections/IdentitySection'
import { ContentSection } from './sections/ContentSection'
import { TextStyleSection } from './sections/TextStyleSection'
import { ColorsSection } from './sections/ColorsSection'
import { LayoutSection } from './sections/LayoutSection'
import { AlignmentSection } from './sections/AlignmentSection'
import { SpacingSection } from './sections/SpacingSection'
import { BehaviorSection } from './sections/BehaviorSection'
import { CreationPropsSection } from './sections/CreationPropsSection'
import { AdvancedSection } from './sections/AdvancedSection'

export interface SectionProps {
  itemId: string
}

const SECTION_COMPONENTS: Record<PropertyGroupId, React.ComponentType<SectionProps>> = {
  identity: IdentitySection,
  content: ContentSection,
  textStyle: TextStyleSection,
  colors: ColorsSection,
  layout: LayoutSection,
  alignment: AlignmentSection,
  spacing: SpacingSection,
  behavior: BehaviorSection,
  creationProps: CreationPropsSection,
  advanced: AdvancedSection,
}

const SECTION_LABELS: Record<PropertyGroupId, string> = {
  identity: 'Identity',
  content: 'Content',
  textStyle: 'Text Style',
  colors: 'Colors',
  layout: 'Layout',
  alignment: 'Alignment',
  spacing: 'Spacing',
  behavior: 'Behavior',
  creationProps: 'Creation Properties',
  advanced: 'Advanced',
}

export function PropertiesPanel() {
  const activeId = useAppStore((s) => s.activeId)
  const item = useAppStore((s) => (activeId ? s.items[activeId] : null))

  if (!item) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-3 py-2 text-2xs font-semibold text-app-muted uppercase tracking-wider border-b border-app-border flex-shrink-0">
          Item Properties
        </div>
        <div className="flex-1 flex items-center justify-center text-app-muted text-xs p-4 text-center">
          Select an item in the Structure panel to edit its properties.
        </div>
      </div>
    )
  }

  const def = ELEMENT_REGISTRY[item.type]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-app-border flex-shrink-0">
        <div className="text-2xs font-semibold text-app-muted uppercase tracking-wider mb-0.5">
          Item Properties
        </div>
        <div className="text-xs font-medium text-app-text">{item.type}</div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {def.propertyGroups.map((groupId) => {
          const SectionComponent = SECTION_COMPONENTS[groupId]
          if (!SectionComponent) return null
          return (
            <PropertySection key={groupId} label={SECTION_LABELS[groupId]}>
              <SectionComponent itemId={item.id} />
            </PropertySection>
          )
        })}

        {/* Edit info */}
        {def.editInfo && (
          <div className="px-3 py-2 text-2xs text-app-muted border-t border-app-border mt-1">
            {def.editInfo}
          </div>
        )}
      </div>
    </div>
  )
}
