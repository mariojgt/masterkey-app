
<template>
  <ion-page>
    <ion-content class="bg-gray-900 dark:bg-black">
      <div class="min-h-full">
        <!-- Minimal header -->
        <div class="flex items-center justify-between px-4 py-4 border-b border-gray-800/70">
          <h1 class="text-white font-semibold">Scan QR</h1>
          <button @click="toggleDarkMode" class="rounded-lg p-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <svg v-if="!isDarkMode" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,18C6.48,18 2,13.52 2,8C2,6.84 2.24,5.76 2.64,4.76C3.96,8.1 7.5,10.5 11.5,10.5C15.5,10.5 19.04,8.1 20.36,4.76C20.76,5.76 21,6.84 21,8C21,13.52 16.52,18 12,18Z"/>
            </svg>
            <svg v-else class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
            </svg>
          </button>
        </div>

        <div class="px-4 py-6">
          <div class="max-w-md mx-auto">
            <!-- Camera view -->
            <div class="relative mb-4">
              <div class="relative overflow-hidden rounded-2xl bg-gray-800/70 dark:bg-gray-900/70 shadow">
                <video
                  ref="video"
                  playsinline
                  autoplay
                  class="w-full h-80 object-cover"
                  style="background: #111827;"
                ></video>

                <!-- Minimal overlay frame -->
                <div class="absolute inset-0 pointer-events-none">
                  <div class="absolute inset-8 border-2 border-primary-400/70 rounded-xl"></div>
                </div>
              </div>
            </div>

            <!-- Lightweight status line -->
            <p v-if="message" class="text-sm text-gray-300 mb-4" aria-live="polite">{{ message }}</p>
            <p v-if="errorMsg" class="text-sm text-red-400 mb-4" aria-live="polite">{{ errorMsg }}</p>

            <!-- Controls -->
            <div class="space-y-4">
              <button @click="toggleScan" :disabled="busy" class="w-full btn-primary py-3 rounded-xl disabled:opacity-50">
                <span v-if="!isScanning">Start scanning</span>
                <span v-else>Stop</span>
              </button>

              <label class="flex items-center space-x-3 select-none">
                <input type="checkbox" v-model="autoApprove" class="form-checkbox h-4 w-4 text-primary-600 rounded" />
                <span class="text-sm text-themed">Auto-approve web login</span>
              </label>

              <!-- Minimal help -->
              <div class="text-xs text-gray-400">
                <p>Supported: mkey:web:{session_id}, mkey:prelogin:{nonce}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="loading" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div class="bg-gray-800 text-white px-5 py-4 rounded-xl shadow flex items-center space-x-3">
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
import { Haptics, ImpactStyle } from '@capacitor/haptics'

const { isDarkMode, toggleDarkMode } = useDarkMode()

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
  // codeReader.reset() // Method doesn't exist, control.stop() handles cleanup
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
