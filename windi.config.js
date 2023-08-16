import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import windiClass from './src/assets/styles/windiClass'

export default defineConfig({
  darkMode: 'class',
  preflight: false,
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(windiClass)
    }),
    require('windicss/plugin/filters'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp')
  ]
})
