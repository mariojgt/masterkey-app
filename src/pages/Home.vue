<template>
  <ion-page>
    <ion-content>
      <div class="min-h-full relative z-10 gradient-bg bg-enterprise-pattern bg-particles-enterprise bg-ambient-light">
        <!-- Modern Header -->
        <div class="gradient-header px-6 pt-12 pb-8 border-b border-gray-800">
          <div class="container-custom">
            <!-- Logo and Brand -->
            <div class="flex items-center space-x-4 mb-6">
              <div class="icon-container-large glow-brand">
                <svg class="w-8 h-8 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-primary">MasterKey</h1>
                <p class="text-secondary text-sm">Secure Authentication Hub</p>
              </div>
            </div>

            <!-- Status Overview -->
            <div class="grid grid-cols-2 gap-4">
              <div class="stat-card">
                <div class="text-2xl font-bold text-primary">{{ token ? '✓' : '✗' }}</div>
                <div class="text-xs text-muted">Auth Status</div>
              </div>
              <div class="stat-card">
                <div class="text-2xl font-bold text-accent">{{ sessionCount }}</div>
                <div class="text-xs text-muted">Active Sessions</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="px-6 py-8">
          <div class="container-custom space-y-6">
            <!-- Authentication Status Card -->
            <div class="card slide-up">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-primary flex items-center">
                  <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                  </svg>
                  Authentication
                </h2>
                <div :class="token ? 'status-success' : 'status-error'">
                  <div :class="token ? 'bg-success-400' : 'bg-danger-400'" class="w-2 h-2 rounded-full"></div>
                  <span>{{ token ? 'Authenticated' : 'Not Authenticated' }}</span>
                </div>
              </div>

              <!-- Authenticated State -->
              <div v-if="token" class="space-y-4 fade-in">
                <div class="success-state rounded-xl p-4">
                  <div class="flex items-center space-x-3">
                    <div class="icon-container">
                      <svg class="w-6 h-6 text-success-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold text-success-300">Authentication Active</div>
                      <div class="text-sm text-success-400/80">Ready to approve web logins</div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
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
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              <!-- Not Authenticated State -->
              <div v-else class="space-y-4 fade-in">
                <div class="error-state rounded-xl p-4">
                  <div class="flex items-center space-x-3">
                    <div class="icon-container">
                      <svg class="w-6 h-6 text-danger-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="font-semibold text-danger-300">Authentication Required</div>
                      <div class="text-sm text-danger-400/80">Please login to continue</div>
                    </div>
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
            <transition name="slide-fade" mode="out-in">
              <div v-show="showApiConfig" class="card slide-up">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-semibold text-primary flex items-center">
                    <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2L14.39,5.42C15.92,7.31 17.68,8.88 19.68,10.11L22,12L19.68,13.89C17.68,15.12 15.92,16.69 14.39,18.58L12,22L9.61,18.58C8.08,16.69 6.32,15.12 4.32,13.89L2,12L4.32,10.11C6.32,8.88 8.08,7.31 9.61,5.42L12,2Z"/>
                    </svg>
                    API Configuration
                  </h2>
                  <button @click="toggleApiConfig" class="icon-container">
                    <svg class="w-4 h-4 text-secondary transition-transform duration-300" :class="{ 'rotate-180': showApiConfig }" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </button>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-secondary mb-2">API Base URL</label>
                    <div class="flex space-x-2">
                      <input
                        v-model="apiBase"
                        @input="updateApiBase"
                        type="url"
                        placeholder="https://api.example.com"
                        class="input-field flex-1"
                      />
                      <button @click="saveBase" class="btn-outline">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-muted">
                    Configure your MasterKey API endpoint for authentication services.
                  </p>
                </div>
              </div>
            </transition>

            <!-- Quick Actions Grid -->
            <div class="grid grid-cols-2 gap-4">
              <button @click="refreshStatus" class="card text-center p-4 hover:bg-gray-800/60 transition-colors duration-200">
                <svg class="w-8 h-8 text-accent mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                </svg>
                <div class="text-sm font-medium text-secondary">Refresh</div>
              </button>

              <button @click="toggleApiConfig" class="card text-center p-4 hover:bg-gray-800/60 transition-colors duration-200">
                <svg class="w-8 h-8 text-accent mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H19V9Z"/>
                </svg>
                <div class="text-sm font-medium text-secondary">Settings</div>
              </button>
            </div>

            <!-- Brand & About -->
            <div class="grid grid-cols-2 gap-4">
              <button @click="$router.push('/branding')" class="card text-center p-4 hover:bg-gray-800/60 transition-colors duration-200">
                <svg class="w-8 h-8 text-accent mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A8.995,8.995 0 0,0 21,12A9,9 0 0,0 12,3Z"/>
                </svg>
                <div class="text-sm font-medium text-secondary">Branding</div>
              </button>

              <button @click="showAppInfo" class="card text-center p-4 hover:bg-gray-800/60 transition-colors duration-200">
                <svg class="w-8 h-8 text-accent mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                <div class="text-sm font-medium text-secondary">About</div>
              </button>
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

const router = useRouter()

const token = ref<string | null>(null)
const apiBase = ref<string>(localStorage.getItem('apiBase') || '')
const sessionCount = ref<number>(0)
const showApiConfig = ref<boolean>(false)

onMounted(() => {
  token.value = getToken()
  updateApiBase()
  refreshStatus()
})

function logout() {
  setToken(null)
  token.value = null
  sessionCount.value = 0
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
  router.push('/login')
}

function refreshStatus() {
  // Mock session count for demo
  sessionCount.value = token.value ? Math.floor(Math.random() * 5) + 1 : 0
}

function toggleApiConfig() {
  showApiConfig.value = !showApiConfig.value
}

function showAppInfo() {
  // You can implement app info modal or navigate to about page
  console.log('MasterKey v1.0.0 - Secure Authentication Hub')
}
</script>
