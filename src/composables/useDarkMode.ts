import { ref, onMounted } from 'vue'

// Fixed dark mode for the new brand design
const isDarkMode = ref(true)

// Always apply dark mode class to document since our design is dark-first
const applyDarkMode = () => {
  document.documentElement.classList.add('dark')
  document.body.classList.add('dark')
}

export const useDarkMode = () => {
  // No-op functions for compatibility with existing code
  const toggleDarkMode = () => {
    // Dark mode is fixed, so this does nothing
  }

  const setDarkMode = (dark: boolean) => {
    // Dark mode is fixed, so this does nothing
  }

  // Initialize dark mode
  const initDarkMode = () => {
    applyDarkMode()
  }

  // Always initialize dark mode on mount
  onMounted(() => {
    initDarkMode()
  })

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  }
}
