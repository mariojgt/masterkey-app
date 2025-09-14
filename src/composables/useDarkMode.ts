import { ref, watch, onMounted } from 'vue'

const isDarkMode = ref(false)

// Check system preference
const getSystemPreference = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Get stored preference or system preference
const getStoredPreference = () => {
  const stored = localStorage.getItem('darkMode')
  if (stored !== null) {
    return JSON.parse(stored)
  }
  return getSystemPreference()
}

// Apply dark mode class to document
const applyDarkMode = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Save preference to localStorage
const savePreference = (dark: boolean) => {
  localStorage.setItem('darkMode', JSON.stringify(dark))
}

export const useDarkMode = () => {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const setDarkMode = (dark: boolean) => {
    isDarkMode.value = dark
  }

  // Initialize dark mode
  const initDarkMode = () => {
    isDarkMode.value = getStoredPreference()
    applyDarkMode(isDarkMode.value)
  }

  // Watch for changes and apply them
  watch(isDarkMode, (newValue) => {
    applyDarkMode(newValue)
    savePreference(newValue)
  })

  // Listen for system theme changes
  onMounted(() => {
    initDarkMode()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem('darkMode') !== null
      if (!hasManualPreference) {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  }
}
