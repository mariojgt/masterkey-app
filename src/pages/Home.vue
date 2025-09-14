
<template>
  <ion-page>
    <ion-content class="bg-themed-secondary">
      <div class="min-h-full">
        <!-- Header -->
        <div class="gradient-bg dark:gradient-bg-dark px-4 pt-12 pb-8 relative">
          <!-- Theme Toggle -->
          <div class="absolute top-6 right-6">
            <button @click="toggleDarkMode" class="theme-toggle animate-theme-switch">
              <div class="theme-toggle-dot">
                <svg v-if="!isDarkMode" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,18C6.48,18 2,13.52 2,8C2,6.84 2.24,5.76 2.64,4.76C3.96,8.1 7.5,10.5 11.5,10.5C15.5,10.5 19.04,8.1 20.36,4.76C20.76,5.76 21,6.84 21,8C21,13.52 16.52,18 12,18Z"/>
                </svg>
                <svg v-else class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
                </svg>
              </div>
            </button>
          </div>

          <div class="max-w-md mx-auto text-center">
            <div class="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-white mb-1">MasterKey</h1>
            <p class="text-white/80">Secure Authentication Hub</p>
          </div>
        </div>

        <div class="px-4 -mt-4 pb-8">
          <div class="max-w-md mx-auto">
            <!-- Status Card -->
            <div class="card mb-6 animate-slide-up">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-themed">Authentication Status</h2>
                <div :class="token ? 'status-success' : 'status-error'"
                     class="px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <div :class="token ? 'bg-green-400' : 'bg-red-400'" class="w-2 h-2 rounded-full"></div>
                  <span>{{ token ? 'Authenticated' : 'Not Authenticated' }}</span>
                </div>
              </div>

              <div v-if="token" class="space-y-4">
                <div class="flex items-center space-x-3 p-3 status-success rounded-xl">
                  <div class="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">You are logged in</p>
                    <p class="text-sm opacity-80">Ready to scan QR codes</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-3">
                  <button @click="$router.push('/scan')" class="btn-primary flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z"/>
                    </svg>
                    <span>Scan QR Code</span>
                  </button>

                  <button @click="logout" class="btn-secondary flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div class="flex items-center space-x-3 p-3 status-error rounded-xl">
                  <div class="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium">Authentication required</p>
                    <p class="text-sm opacity-80">Please log in to continue</p>
                  </div>
                </div>

                <button @click="goToLogin" class="btn-primary w-full flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z"/>
                  </svg>
                  <span>Login to Continue</span>
                </button>
              </div>
            </div>

            <!-- API Configuration Card -->
            <div class="card animate-slide-up">
              <h2 class="text-lg font-semibold text-themed mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-themed-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
                API Configuration
              </h2>

              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-themed mb-2">API Base URL</label>
                  <input
                    v-model="apiBase"
                    @blur="saveBase"
                    placeholder="http://localhost:8000"
                    class="input-field"
                  />
                </div>
                <p class="text-xs text-themed-light">
                  Configure the backend API endpoint for authentication
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { getToken, setToken, updateApiBaseUrl } from '../lib/api'
import { useDarkMode } from '../composables/useDarkMode'

const { isDarkMode, toggleDarkMode } = useDarkMode()
const router = useRouter()

const token = ref<string | null>(null)
const apiBase = ref<string>(localStorage.getItem('apiBase') || '')

onMounted(() => {
  token.value = getToken()
  updateApiBase()
})

function logout() {
  setToken(null)
  token.value = null
}

function updateApiBase() {
  if (apiBase.value) {
    const updatedUrl = updateApiBaseUrl(apiBase.value)
    localStorage.setItem('apiBase', updatedUrl)
    apiBase.value = updatedUrl
  }
}

function saveBase() {
  updateApiBase()
}

function goToLogin() {
  console.log('Login button clicked!')
  router.push('/login')
}
</script>
