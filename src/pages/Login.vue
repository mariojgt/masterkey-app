<template>
  <ion-page>
    <ion-content>
      <div class="min-h-full flex items-center justify-center px-6 py-8 relative z-10 gradient-bg bg-enterprise-pattern bg-particles-enterprise bg-ambient-light">
        <div class="max-w-md w-full">
          <!-- Header -->
          <div class="text-center mb-8 fade-in">
            <div class="icon-container-large mx-auto mb-6 glow-brand">
              <svg class="w-10 h-10 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-primary mb-2">MasterKey Login</h1>
            <p class="text-secondary text-lg">Secure authentication system</p>
          </div>

          <!-- Instructions Card -->
          <div class="card slide-up mb-6">
            <h2 class="text-xl font-semibold text-primary mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
              </svg>
              How it works
            </h2>
            <ol class="space-y-3 text-sm text-secondary">
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-brand-600/20 text-accent text-xs font-bold rounded-full mr-3 mt-0.5 border border-brand-500/30">1</span>
                <span>Enter your email and tap <strong class="text-primary">Get Code</strong></span>
              </li>
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-brand-600/20 text-accent text-xs font-bold rounded-full mr-3 mt-0.5 border border-brand-500/30">2</span>
                <span>Check your email for the 6-digit verification code</span>
              </li>
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-brand-600/20 text-accent text-xs font-bold rounded-full mr-3 mt-0.5 border border-brand-500/30">3</span>
                <span>Enter the code below to complete authentication</span>
              </li>
            </ol>
          </div>

          <!-- Login Form -->
          <div class="card slide-up">
            <div class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-secondary mb-2">
                  Email Address
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2L14.39,5.42C15.92,7.31 17.68,8.88 19.68,10.11L22,12L19.68,13.89C17.68,15.12 15.92,16.69 14.39,18.58L12,22L9.61,18.58C8.08,16.69 6.32,15.12 4.32,13.89L2,12L4.32,10.11C6.32,8.88 8.08,7.31 9.61,5.42L12,2Z"/>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Enter your email address"
                    class="input-field pl-10"
                    :disabled="loadingRequest"
                  />
                </div>
              </div>

              <button @click="getCode" :disabled="loadingRequest || !email" class="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <svg v-if="loadingRequest" class="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                </svg>
                <span>{{ loadingRequest ? 'Sending...' : 'Get Code' }}</span>
              </button>

              <!-- Code Input Section -->
              <div v-if="nonce" class="border-t border-gray-700 pt-6 fade-in">
                <label for="code" class="block text-sm font-medium text-secondary mb-2">
                  Verification Code
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                    </svg>
                  </div>
                  <input
                    id="code"
                    v-model="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxlength="6"
                    class="input-field pl-10 text-center tracking-wider text-lg font-mono"
                    :disabled="loadingVerify"
                  />
                </div>
                <button @click="verify" :disabled="loadingVerify || !code" class="btn-primary w-full mt-4 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  <svg v-if="loadingVerify" class="w-5 h-5 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8L10,17Z"/>
                  </svg>
                  <span>{{ loadingVerify ? 'Verifying...' : 'Verify & Login' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="text-center mt-6">
            <button @click="$router.push('/')" class="text-secondary hover:text-accent transition-colors duration-200 text-sm">
              ← Back to Home
            </button>
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
import { IonPage, IonContent, IonToast, IonLoading } from '@ionic/vue'

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
