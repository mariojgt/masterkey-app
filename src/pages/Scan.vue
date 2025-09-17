<template>
  <ion-page>
    <ion-content>
      <div class="min-h-full relative z-10 gradient-bg bg-enterprise-pattern bg-particles-enterprise bg-ambient-light">
        <!-- Modern header -->
        <div class="gradient-header px-6 py-4 border-b border-gray-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button @click="$router.push('/')" class="icon-container">
                <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                </svg>
              </button>
              <h1 class="text-xl font-semibold text-primary">Scan QR Code</h1>
            </div>

            <div class="flex items-center space-x-2">
              <button @click="toggleScan" class="btn-outline px-3 py-2">
                <span class="text-sm">{{ isScanning ? 'Pause' : 'Scan' }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="px-6 py-6">
          <div class="container-custom">
            <!-- Camera Section -->
            <div class="card mb-6">
              <div class="relative">
                <video
                  ref="video"
                  class="w-full h-64 bg-gray-800 rounded-lg object-cover"
                  :class="{ 'scan-lines': isScanning }"
                  autoplay
                  muted
                  playsinline
                ></video>

                <!-- Scanner overlay -->
                <div v-if="isScanning" class="absolute inset-0 rounded-lg">
                  <div class="scanner-frame w-48 h-48 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <!-- Camera controls overlay -->
                <div class="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div class="bg-gray-900/80 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p class="text-sm text-secondary text-center">{{ message }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error display -->
            <div v-if="errorMsg" class="error-state mb-6">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-danger-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                <div>
                  <div class="font-semibold text-danger-300">Camera Error</div>
                  <div class="text-sm text-danger-400/80">{{ errorMsg }}</div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="space-y-4">
              <div class="card">
                <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                  </svg>
                  Scanner Controls
                </h3>
                <div class="grid grid-cols-2 gap-3">
                  <button @click="start" :disabled="busy || isScanning" class="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                    </svg>
                    Start
                  </button>
                  <button @click="stop" :disabled="busy || !isScanning" class="btn-secondary disabled:opacity-60 disabled:cursor-not-allowed">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18,18H6V6H18V18Z"/>
                    </svg>
                    Stop
                  </button>
                </div>
              </div>

              <!-- Auto-approve toggle -->
              <div class="card">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    <div>
                      <div class="font-medium text-primary">Auto-approve Logins</div>
                      <div class="text-sm text-secondary">Automatically approve web login requests</div>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="autoApprove"
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="loading" class="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
          <div class="card text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <div class="text-primary font-medium">{{ loadingText }}</div>
          </div>
        </div>

        <!-- Confirm modal -->
        <div v-if="confirm.visible" class="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" @click="cancelConfirm"></div>
          <div class="relative card-large max-w-sm w-full mx-4 slide-up">
            <h3 class="text-xl font-semibold text-primary mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              Approve Login?
            </h3>
            <p class="text-secondary mb-6">
              A web session is requesting authentication. Do you want to approve this login?
            </p>
            <div class="grid grid-cols-2 gap-3">
              <button @click="cancelConfirm" class="btn-secondary">Cancel</button>
              <button @click="approveNow" class="btn-primary">Approve</button>
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
import { Haptics, ImpactStyle } from '@capacitor/haptics'

const codeReader = new BrowserMultiFormatReader()
const video = ref<HTMLVideoElement | null>(null)
const message = ref('')
let control: any = null
const errorMsg = ref('')
const busy = ref(false)
const preferredDeviceId = ref<string | undefined>(undefined)

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

async function pickBackCamera(): Promise<string | undefined> {
  try {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()
    const byLabel = (s: string) => /back|rear|environment/i.test(s)
    const match = devices.find(d => byLabel(d.label)) || devices[0]
    return match?.deviceId
  } catch {
    return undefined
  }
}

async function start() {
  if (isScanning.value || busy.value) return
  errorMsg.value = ''
  message.value = 'Starting camera…'
  busy.value = true
  try {
    preferredDeviceId.value = preferredDeviceId.value || await pickBackCamera()
    isScanning.value = true
    control = await codeReader.decodeFromVideoDevice(preferredDeviceId.value, video.value!, (result, err) => {
      if (result) {
        // Pause scanning while handling result
        pause()
        // Subtle haptic feedback on capture
        Haptics.impact?.({ style: ImpactStyle.Light }).catch(() => {})
        handleResult(result.getText())
      }
    })
    message.value = 'Aim at a QR code'
  } catch (e: any) {
    isScanning.value = false
    if (e?.name === 'NotAllowedError') {
      errorMsg.value = 'Camera permission denied. Allow camera access to scan.'
    } else if (e?.name === 'NotFoundError') {
      errorMsg.value = 'No camera found.'
    } else {
      errorMsg.value = 'Unable to start camera.'
    }
  } finally {
    busy.value = false
  }
}

function stop() {
  if (control && typeof control.stop === 'function') control.stop()
  message.value = 'Stopped.'
  isScanning.value = false
}

function pause() {
  if (control && typeof control.stop === 'function') control.stop()
  isScanning.value = false
}

function toggleScan() {
  if (isScanning.value) {
    stop()
  } else {
    start()
  }
}

async function handleResult(text: string) {
  const parsed = parsePayload(text)
  if (!parsed) {
    message.value = 'Invalid QR payload.'
    resumeAfterDelay()
    return
  }

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
  } catch (e: any) {
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
