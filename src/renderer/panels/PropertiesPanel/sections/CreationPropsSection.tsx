import React from 'react'
import { CheckboxField } from '../fields/CheckboxField'
import { SelectField } from '../fields/SelectField'
import { NumberField } from '../fields/NumberField'
import { useAppStore } from '../../../store'
import type { SectionProps } from '../index'

// Descriptions for creation props (user-friendly)
const PROP_DESCRIPTIONS: Record<string, string> = {
  su1PanelCoordinates: 'Use Photoshop CS1 coordinate system',
  maximizeButton: 'Show maximize button in title bar',
  minimizeButton: 'Show minimize button in title bar',
  independent: 'Window is independent (not child of main)',
  closeButton: 'Show close button in title bar',
  borderless: 'Remove window border and title bar',
  resizeable: 'Allow user to resize the window',
  noecho: 'Hide input (password field)',
  readonly: 'Read-only, no user input',
  multiline: 'Allow multiple lines of text',
  scrollable: 'Show scrollbar for multiline',
  enterKeySignalsOnChange: 'Trigger onChange when Enter is pressed',
  multiselect: 'Allow selecting multiple items',
  showHeaders: 'Show column headers',
  toggle: 'Button stays pressed after click',
  scrolling: 'Enable vertical scrolling',
}

export function CreationPropsSection({ itemId }: SectionProps) {
  const item = useAppStore((s) => s.items[itemId])
  const updateItemStyle = useAppStore((s) => s.updateItemStyle)

  if (!item) return null
  const style = item.style as Record<string, unknown>
  const creationProps = style.creationProps as Record<string, unknown> | undefined
  if (!creationProps) return <p className="text-2xs text-app-muted">No creation properties</p>

  const update = (key: string, value: unknown) =>
    updateItemStyle(itemId, {
      creationProps: { ...creationProps, [key]: value },
    } as Parameters<typeof updateItemStyle>[1])

  return (
    <div className="space-y-2">
      {Object.entries(creationProps).map(([key, value]) => {
        const desc = PROP_DESCRIPTIONS[key]

        // Boolean
        if (typeof value === 'boolean') {
          return (
            <CheckboxField
              key={key}
              label={key}
              value={value}
              onChange={(v) => update(key, v)}
              description={desc}
            />
          )
        }

        // borderStyle select
        if (key === 'borderStyle') {
          return (
            <SelectField
              key={key}
              label="Border Style"
              value={value as string}
              onChange={(v) => update(key, v)}
              options={[
                { value: 'etched', label: 'Etched' },
                { value: 'raised', label: 'Raised' },
                { value: 'sunken', label: 'Sunken' },
                { value: 'gray', label: 'Gray' },
                { value: 'black', label: 'Black' },
              ]}
            />
          )
        }

        // IconButton style
        if (key === 'style' && item.type === 'IconButton') {
          return (
            <SelectField
              key={key}
              label="Button Style"
              value={value as string}
              onChange={(v) => update(key, v)}
              options={[
                { value: 'toolbutton', label: 'Tool Button' },
                { value: 'button', label: 'Button' },
              ]}
            />
          )
        }

        // truncate
        if (key === 'truncate') {
          return (
            <SelectField
              key={key}
              label="Truncate"
              value={value as string}
              onChange={(v) => update(key, v)}
              options={[
                { value: 'none', label: 'None' },
                { value: 'middle', label: 'Middle' },
                { value: 'end', label: 'End' },
              ]}
            />
          )
        }

        // characters
        if (key === 'characters') {
          return (
            <NumberField
              key={key}
              label="Char Limit"
              value={value as number}
              onChange={(v) => update(key, v)}
              min={0}
            />
          )
        }

        // numberOfColumns
        if (key === 'numberOfColumns') {
          return (
            <NumberField
              key={key}
              label="Columns"
              value={value as number}
              onChange={(v) => update(key, v)}
              min={1}
              max={20}
            />
          )
        }

        // Skip arrays for now (columnWidths, columnTitles — complex, handled separately)
        if (Array.isArray(value)) return null

        return null
      })}
    </div>
  )
}
