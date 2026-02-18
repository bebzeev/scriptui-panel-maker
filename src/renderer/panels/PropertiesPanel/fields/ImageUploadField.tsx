import React, { useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadFieldProps {
  label?: string
  value: string | null
  onChange: (value: string | null) => void
}

export function ImageUploadField({ label = 'Image', value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      onChange(evt.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-2xs text-app-muted">{label}</label>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="max-w-full h-24 object-contain border border-app-border rounded bg-app-active"
          />
          <button
            onClick={() => onChange(null)}
            className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-app-bg/80 text-app-muted hover:text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={10} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="
            w-full h-16 border border-dashed border-app-border rounded flex flex-col items-center justify-center
            gap-1 text-app-muted hover:text-app-text hover:border-app-accent transition-colors
          "
        >
          <Upload size={14} />
          <span className="text-2xs">Click to upload PNG or JPG</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
