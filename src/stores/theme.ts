import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  return {
    isDark,
  }
})