
<template>
  <ion-page>
    <ion-content class="bg-gray-900 dark:bg-black bg-grid bg-particles bg-orbs">
      <div class="min-h-full relative z-10">
        <!-- Header -->
        <div class="bg-gray-800/50 dark:bg-black/50 backdrop-blur-sm px-4 py-6 border-b border-gray-700 dark:border-gray-800 relative overflow-hidden">
          <!-- Floating scanning elements -->
          <div class="absolute inset-0 opacity-20">
            <div class="absolute top-2 left-6 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
            <div class="absolute top-6 right-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div class="absolute bottom-3 left-12 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
            <div class="absolute bottom-2 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
          </div>

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

          <div class="max-w-md mx-auto text-center">
            <h1 class="text-2xl font-bold text-white mb-1">QR Code Scanner</h1>
            <p class="text-gray-300 dark:text-gray-400">Position QR code within the frame</p>
          </div>
        </div>

  <div class="px-4 py-6">
          <div class="max-w-md mx-auto">
            <!-- Camera View -->
            <div class="relative mb-6">
              <div class="relative overflow-hidden rounded-2xl bg-gray-800 dark:bg-gray-900 shadow-2xl glow scan-lines">
                <video
                  ref="video"
                  playsinline
                  autoplay
                  class="w-full h-80 object-cover"
                  style="background: #1f2937;"
                ></video>

                <!-- Scan Overlay -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div class="relative">
                    <!-- Corner borders -->
                    <div class="w-48 h-48 relative">
                      <!-- Top-left corner -->
                      <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-400 dark:border-primary-300 rounded-tl-lg"></div>
                      <!-- Top-right corner -->
                      <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-400 dark:border-primary-300 rounded-tr-lg"></div>
                      <!-- Bottom-left corner -->
                      <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-400 dark:border-primary-300 rounded-bl-lg"></div>
                      <!-- Bottom-right corner -->
                      <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-400 dark:border-primary-300 rounded-br-lg"></div>

                      <!-- Scanning line animation -->
                      <div class="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-primary-400 dark:via-primary-300 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="space-y-4 mb-6">
              <div class="grid grid-cols-2 gap-3">
                <button :disabled="isScanning" @click="start" class="btn-primary flex items-center justify-center space-x-2 py-4 glow pulse-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                  </svg>
                  <span>{{ isScanning ? 'Scanning…' : 'Start Scanner' }}</span>
                </button>

                <button :disabled="!isScanning" @click="stop" class="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 glow disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18,18H6V6H18V18Z"/>
                  </svg>
                  <span>Stop</span>
                </button>
              </div>

              <!-- Options -->
              <label class="flex items-center space-x-3 select-none">
                <input type="checkbox" v-model="autoApprove" class="form-checkbox h-4 w-4 text-primary-600 rounded" />
                <span class="text-sm text-themed">Auto-approve web login after scan</span>
              </label>
            </div>

            <!-- Status Message -->
            <div v-if="message" class="card animate-fade-in">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div v-if="message.includes('approved') || message.includes('detected')"
                       class="w-8 h-8 status-success rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                    </svg>
                  </div>
                  <div v-else-if="message.includes('Error') || message.includes('Invalid')"
                       class="w-8 h-8 status-error rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                  <div v-else class="w-8 h-8 status-info rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-themed font-medium">{{ message }}</p>
                </div>
              </div>
            </div>

            <!-- Instructions -->
            <div class="card">
              <h2 class="text-lg font-semibold text-themed mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-themed-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11,9H13V7H13V11H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                Supported QR Codes
              </h2>
              <div class="space-y-3 text-sm text-themed-muted">
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full mt-2"></div>
                  <div>
                    <p class="font-medium text-themed">Web Login QR</p>
                    <p>Format: <code class="bg-gray-100 dark:bg-dark-700 px-1 rounded text-xs">mkey:web:{session_id}</code></p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full mt-2"></div>
                  <div>
                    <p class="font-medium text-themed">Pre-login QR</p>
                    <p>Format: <code class="bg-gray-100 dark:bg-dark-700 px-1 rounded text-xs">mkey:prelogin:{nonce}</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="loading" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div class="bg-gray-800 text-white px-5 py-4 rounded-xl shadow-xl flex items-center space-x-3">
            <svg class="animate-spin h-5 w-5 text-primary-400" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span class="font-medium">{{ loadingText }}</span>
          </div>
        </div>

        <!-- Confirm modal -->
        <div v-if="confirm.visible" class="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div class="absolute inset-0 bg-black/60" @click="cancelConfirm"></div>
          <div class="relative w-full md:max-w-md bg-white dark:bg-gray-900 rounded-t-2xl md:rounded-2xl shadow-2xl p-5 m-0 md:m-6">
            <h3 class="text-lg font-semibold text-themed mb-2">Approve web login?</h3>
            <p class="text-sm text-themed-muted mb-4">Session: <span class="font-mono">{{ confirm.sessionId }}</span></p>
            <div class="flex items-center justify-end space-x-3">
              <button @click="cancelConfirm" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-themed">Cancel</button>
              <button @click="approveNow" class="btn-primary px-4 py-2">Approve</button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue'
import { IonPage, IonContent } from '@ionic/vue'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { api, getToken } from '../lib/api'
import { useDarkMode } from '../composables/useDarkMode'

const { isDarkMode, toggleDarkMode } = useDarkMode()

const codeReader = new BrowserMultiFormatReader()
const video = ref<HTMLVideoElement | null>(null)
const message = ref('')
let control: any = null

// UX state
const isScanning = ref(false)
const loading = ref(false)
const loadingText = ref('Processing…')
let initialAutoApprove = false
try { initialAutoApprove = localStorage.getItem('mkey:autoApprove') === '1' } catch {}
const autoApprove = ref<boolean>(initialAutoApprove)

watch(autoApprove, (v) => {
  try { localStorage.setItem('mkey:autoApprove', v ? '1' : '0') } catch {}
})

// Confirm modal state
const confirm = ref<{ visible: boolean; sessionId: string | null }>({ visible: false, sessionId: null })

function parsePayload(text: string) {
  // mkey:prelogin:{nonce} or mkey:web:{session_id}
  if (!text.startsWith('mkey:')) return null
  const [, rest] = text.split('mkey:')
  const [type, value] = rest.split(':')
  return { type, value }
}
async function start() {
  if (isScanning.value) return
  message.value = 'Starting camera...'
  isScanning.value = true
  control = await codeReader.decodeFromVideoDevice(undefined, video.value!, (result, err) => {
    if (result) {
      // Pause scanning while handling result
      pause()
      handleResult(result.getText())
    }
  })
}
function stop() {
  if (control && typeof control.stop === 'function') control.stop()
  // codeReader.reset() // Method doesn't exist, control.stop() handles cleanup
  message.value = 'Stopped.'
  isScanning.value = false
}
function pause() {
  if (control && typeof control.stop === 'function') control.stop()
  isScanning.value = false
}
async function handleResult(text: string) {
  const parsed = parsePayload(text)
  if (!parsed) { message.value = 'Invalid QR payload.'; resumeAfterDelay(); return }
  if (parsed.type === 'web') {
    // If auto-approve, go straight to approve; otherwise ask for confirmation
    if (autoApprove.value) {
      await approveSession(parsed.value)
    } else {
      confirm.value = { visible: true, sessionId: parsed.value }
    }
  } else if (parsed.type === 'prelogin') {
    message.value = 'Pre-login QR detected. Go to Login page to enter your 6-digit code.'
    resumeAfterDelay()
  } else {
    message.value = 'Unknown QR type.'
    resumeAfterDelay()
  }
}

async function approveSession(sessionId: string) {
  // Require auth token for protected API
  const token = getToken()
  if (!token) {
    message.value = 'You must be logged in on the app to approve web logins.'
    resumeAfterDelay()
    return
  }
  loading.value = true
  loadingText.value = 'Approving login…'
  try {
    await api.post('/api/web/approve', { session_id: sessionId })
    message.value = 'Web login approved! You can return to the browser.'
  } catch (e:any) {
    console.error(e)
    const errBody = e?.body
    message.value = typeof errBody?.message === 'string'
      ? `Error: ${errBody.message}`
      : 'Error approving web login.'
  } finally {
    loading.value = false
    // After handling, resume scanning after a small delay
    resumeAfterDelay()
  }
}

function resumeAfterDelay(ms = 1500) {
  setTimeout(() => {
    start()
  }, ms)
}

function cancelConfirm() {
  confirm.value = { visible: false, sessionId: null }
  // Resume scanning so user can try again
  resumeAfterDelay(300)
}

async function approveNow() {
  if (!confirm.value.sessionId) return
  const id = confirm.value.sessionId
  confirm.value = { visible: false, sessionId: null }
  await approveSession(id)
}
onBeforeUnmount(stop)
</script>
