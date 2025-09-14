
<template>
  <ion-page>
    <ion-content class="gradient-bg dark:gradient-bg-dark">
      <!-- Theme Toggle -->
      <div class="absolute top-6 right-6 z-10">
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

      <div class="min-h-full flex items-center justify-center px-4 py-8">
        <div class="max-w-md w-full">
          <!-- Header -->
          <div class="text-center mb-8 animate-fade-in">
            <div class="w-20 h-20 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21A2 2 0 0 0 5 23H19A2 2 0 0 0 21 21V9M19 9H14V4H19V9Z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">MasterKey Login</h1>
            <p class="text-white/80 text-lg">Secure authentication system</p>
          </div>

          <!-- Instructions Card -->
          <div class="card animate-slide-up mb-6">
            <h2 class="text-xl font-semibold text-themed mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
              </svg>
              How it works
            </h2>
            <ol class="space-y-3 text-sm text-themed-muted">
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full mr-3 mt-0.5">1</span>
                <span>Enter your email and tap <strong class="text-themed">Get Code</strong></span>
              </li>
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full mr-3 mt-0.5">2</span>
                <span>Scan the <strong class="text-themed">Pre-login QR</strong> (payload starts with <code class="bg-gray-100 dark:bg-dark-700 px-1 rounded text-xs">mkey:</code>)</span>
              </li>
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full mr-3 mt-0.5">3</span>
                <span>Enter the 6-digit code to receive your access token</span>
              </li>
            </ol>
          </div>

          <!-- Login Form -->
          <div class="card animate-slide-up">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-themed mb-2">Email Address</label>
                <div class="relative">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="you@example.com"
                    class="input-field pl-12"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15C12.81,15 13.5,14.7 14.07,14.12C14.63,13.54 14.94,12.81 14.94,12C14.94,11.19 14.63,10.46 14.07,9.88C13.5,9.3 12.81,9 12,9C11.19,9 10.46,9.3 9.88,9.88C9.3,10.46 9,11.19 9,12C9,12.81 9.3,13.54 9.88,14.12C10.46,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 18.8,4.8C20.6,6.5 21.5,8.85 21.5,11.6V12.4C21.5,14.95 20.75,17.15 19.25,18.85C17.75,20.55 15.8,21.4 13.4,21.4H10.6C8.2,21.4 6.25,20.55 4.75,18.85C3.25,17.15 2.5,14.95 2.5,12.4V11.6C2.5,8.85 3.4,6.5 5.2,4.8C6.9,3 9.25,2 12,2Z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <button @click="getCode" :disabled="loadingRequest" class="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <ion-spinner v-if="loadingRequest" name="crescent" class="w-5 h-5"></ion-spinner>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                </svg>
                <span>{{ loadingRequest ? 'Sending…' : 'Get Verification Code' }}</span>
              </button>

              <!-- Code Input Section -->
              <div v-if="nonce" class="border-t border-gray-200 dark:border-dark-600 pt-6 animate-fade-in">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-themed mb-2">6-digit verification code</label>
                  <input
                    v-model="code"
                    type="text"
                    maxlength="6"
                    placeholder="000000"
                    class="input-field text-center text-2xl tracking-widest font-mono"
                  />
                </div>
                <button @click="verify" :disabled="loadingVerify" class="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  <ion-spinner v-if="loadingVerify" name="crescent" class="w-5 h-5"></ion-spinner>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
                  </svg>
                  <span>{{ loadingVerify ? 'Verifying…' : 'Verify & Login' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Global loading overlay -->
      <ion-loading :is-open="loadingRequest || loadingVerify" message="Please wait…" spinner="crescent" />

      <!-- Toast notifications -->
      <ion-toast
        :is-open="toastOpen"
        :message="toastMessage"
        :color="toastColor"
        :duration="2200"
        position="top"
        @didDismiss="toastOpen = false"
      />
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { api, setToken } from '../lib/api'
import { useDarkMode } from '../composables/useDarkMode'
import { IonPage, IonContent, IonToast, IonLoading, IonSpinner } from '@ionic/vue'

const { isDarkMode, toggleDarkMode } = useDarkMode()

const email = ref('')
const nonce = ref<string | null>(null)
const code = ref('')
const loadingRequest = ref(false)
const loadingVerify = ref(false)
const toastOpen = ref(false)
const toastMessage = ref('')
const toastColor = ref<'success' | 'danger' | 'warning' | 'medium'>('success')

function showToast(message: string, color: 'success' | 'danger' | 'warning' | 'medium' = 'success') {
  toastMessage.value = message
  toastColor.value = color
  toastOpen.value = true
}

async function getCode() {
  console.log('Getting code for email:', email.value)
  loadingRequest.value = true
  try {
    const { data } = await api.post('/api/app/request-code', { email: email.value })
    nonce.value = data.nonce
    showToast('Code sent! Check your inbox and enter it below.', 'success')
    console.log('Code request acknowledged:', data)
  } catch (error: any) {
    console.error('Error getting code:', error)
    showToast(`Error getting code: ${error.message}`, 'danger')
  } finally {
    loadingRequest.value = false
  }
}

async function verify() {
  console.log('Verifying code:', code.value, 'with nonce:', nonce.value)
  if (!nonce.value) return
  loadingVerify.value = true
  try {
    const { data } = await api.post('/api/app/verify', { nonce: nonce.value, code: code.value })
    setToken(data.token)
    showToast('Logged in successfully!', 'success')
    console.log('Login successful, token set:', data.token)
    window.location.href = '/'
  } catch (error: any) {
    console.error('Error verifying code:', error)
    const msg = (error.body && error.body.message) ? error.body.message : error.message
    showToast(`Error verifying code: ${msg}`, 'danger')
  } finally {
    loadingVerify.value = false
  }
}
</script>
