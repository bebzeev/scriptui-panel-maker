import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        // App chrome (dark UI)
        app: {
          bg: '#1e1e1e',
          panel: '#252525',
          border: '#3a3a3a',
          hover: '#2e2e2e',
          active: '#333333',
          text: '#cccccc',
          muted: '#888888',
          accent: '#4a9eff',
        },
        // ScriptUI preview colors (AE Dark theme)
        sui: {
          bg: '#535353',
          inputBg: '#4c4c4c',
          inputBorder: '#5f5f5f',
          listBg: '#535353',
          listSel: '#345c80',
          listHover: '#5f5f5f',
          divider: '#4b4b4b',
          panelBorder: '#4e4e4e',
          accent: '#33cc59',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '10px',
        xs: '11px',
        sm: '12px',
        base: '13px',
      }
    }
  },
  plugins: []
}

export default config
