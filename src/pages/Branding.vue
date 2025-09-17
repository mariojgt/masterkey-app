<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Brand Guidelines</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="min-h-full relative z-10 gradient-bg bg-enterprise-pattern bg-particles-enterprise bg-ambient-light">
        <!-- Header Section -->
        <div class="gradient-header px-6 pt-8 pb-6 border-b border-gray-800">
          <div class="container-custom">
            <div class="flex items-center space-x-4 mb-4">
              <div class="icon-container-large glow-brand">
                <svg class="w-8 h-8 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-primary">MasterKey</h1>
                <p class="text-secondary">Brand Identity & Design System</p>
              </div>
            </div>
            <p class="text-muted text-sm max-w-2xl">
              A comprehensive overview of the MasterKey brand including colors, typography, icons, and design principles that define our secure authentication platform.
            </p>
          </div>
        </div>

        <!-- Main Content -->
        <div class="px-6 py-8">
          <div class="container-custom space-y-8">

            <!-- Brand Identity Section -->
            <section class="card slide-up">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2L2,7L12,12L22,7L12,2M2,17L12,22L22,17M2,12L12,17L22,12"/>
                </svg>
                Brand Identity
              </h2>

              <!-- Logo Variations -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-secondary mb-4">Logo & Icons</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Primary Logo -->
                  <div class="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <div class="icon-container-large glow-brand mx-auto mb-3">
                      <svg class="w-12 h-12 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                      </svg>
                    </div>
                    <h4 class="text-sm font-medium text-secondary">Primary Logo</h4>
                    <p class="text-xs text-muted mt-1">Shield with lock icon</p>
                  </div>

                  <!-- Brand Text -->
                  <div class="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <div class="mb-3">
                      <h1 class="text-3xl font-bold text-primary">MasterKey</h1>
                    </div>
                    <h4 class="text-sm font-medium text-secondary">Brand Name</h4>
                    <p class="text-xs text-muted mt-1">Primary typography</p>
                  </div>

                  <!-- Combined Logo -->
                  <div class="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <div class="flex items-center justify-center space-x-3 mb-3">
                      <div class="icon-container glow-brand">
                        <svg class="w-8 h-8 text-brand-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                        </svg>
                      </div>
                      <h2 class="text-xl font-bold text-primary">MasterKey</h2>
                    </div>
                    <h4 class="text-sm font-medium text-secondary">Combined Logo</h4>
                    <p class="text-xs text-muted mt-1">Icon + text horizontal</p>
                  </div>
                </div>
              </div>

              <!-- Brand Message -->
              <div class="p-6 rounded-xl bg-gradient-to-r from-brand-900/20 to-accent-900/20 border border-brand-700/30">
                <h3 class="text-lg font-semibold text-brand-300 mb-2">Brand Message</h3>
                <p class="text-brand-200 text-lg font-medium mb-2">"Secure Authentication Hub"</p>
                <p class="text-brand-300/80 text-sm">
                  MasterKey represents security, trust, and seamless authentication. Our brand emphasizes modern enterprise-grade security with an intuitive, sophisticated user experience.
                </p>
              </div>
            </section>

            <!-- Color Palette Section -->
            <section class="card slide-up">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A8.995,8.995 0 0,0 21,12A9,9 0 0,0 12,3Z"/>
                </svg>
                Color Palette
              </h2>

              <!-- Primary Brand Colors -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-secondary mb-4">Primary Brand Colors</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <!-- Brand Blue Scale -->
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-secondary">Brand Blue</h4>
                    <div class="space-y-2">
                      <div class="color-swatch bg-brand-400">
                        <span class="text-xs font-mono">400</span>
                        <span class="text-xs">#60a5fa</span>
                      </div>
                      <div class="color-swatch bg-brand-500">
                        <span class="text-xs font-mono">500</span>
                        <span class="text-xs">#3b82f6</span>
                      </div>
                      <div class="color-swatch bg-brand-600">
                        <span class="text-xs font-mono">600</span>
                        <span class="text-xs">#2563eb</span>
                      </div>
                    </div>
                  </div>

                  <!-- Accent Cyan -->
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-secondary">Accent Cyan</h4>
                    <div class="space-y-2">
                      <div class="color-swatch bg-accent-400">
                        <span class="text-xs font-mono">400</span>
                        <span class="text-xs">#22d3ee</span>
                      </div>
                      <div class="color-swatch bg-accent-500">
                        <span class="text-xs font-mono">500</span>
                        <span class="text-xs">#06b6d4</span>
                      </div>
                      <div class="color-swatch bg-accent-600">
                        <span class="text-xs font-mono">600</span>
                        <span class="text-xs">#0891b2</span>
                      </div>
                    </div>
                  </div>

                  <!-- Success Green -->
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-secondary">Success</h4>
                    <div class="space-y-2">
                      <div class="color-swatch bg-success-400">
                        <span class="text-xs font-mono">400</span>
                        <span class="text-xs">#4ade80</span>
                      </div>
                      <div class="color-swatch bg-success-500">
                        <span class="text-xs font-mono">500</span>
                        <span class="text-xs">#22c55e</span>
                      </div>
                    </div>
                  </div>

                  <!-- Danger Red -->
                  <div class="space-y-3">
                    <h4 class="text-sm font-medium text-secondary">Danger</h4>
                    <div class="space-y-2">
                      <div class="color-swatch bg-danger-400">
                        <span class="text-xs font-mono">400</span>
                        <span class="text-xs">#f87171</span>
                      </div>
                      <div class="color-swatch bg-danger-500">
                        <span class="text-xs font-mono">500</span>
                        <span class="text-xs">#ef4444</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Neutral Colors -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-secondary mb-4">Neutral Colors</h3>
                <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
                  <div class="color-swatch bg-gray-50 text-gray-900">
                    <span class="text-xs font-mono">50</span>
                  </div>
                  <div class="color-swatch bg-gray-100 text-gray-900">
                    <span class="text-xs font-mono">100</span>
                  </div>
                  <div class="color-swatch bg-gray-200 text-gray-900">
                    <span class="text-xs font-mono">200</span>
                  </div>
                  <div class="color-swatch bg-gray-300 text-gray-900">
                    <span class="text-xs font-mono">300</span>
                  </div>
                  <div class="color-swatch bg-gray-700">
                    <span class="text-xs font-mono">700</span>
                  </div>
                  <div class="color-swatch bg-gray-800">
                    <span class="text-xs font-mono">800</span>
                  </div>
                  <div class="color-swatch bg-gray-900">
                    <span class="text-xs font-mono">900</span>
                  </div>
                  <div class="color-swatch bg-gray-950">
                    <span class="text-xs font-mono">950</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Typography Section -->
            <section class="card slide-up">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z"/>
                </svg>
                Typography
              </h2>

              <div class="space-y-6">
                <!-- Headings -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Headings</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <h1 class="text-3xl font-bold text-primary">Heading 1</h1>
                      <code class="text-xs text-muted">text-3xl font-bold</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <h2 class="text-2xl font-bold text-primary">Heading 2</h2>
                      <code class="text-xs text-muted">text-2xl font-bold</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <h3 class="text-xl font-semibold text-secondary">Heading 3</h3>
                      <code class="text-xs text-muted">text-xl font-semibold</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <h4 class="text-lg font-semibold text-secondary">Heading 4</h4>
                      <code class="text-xs text-muted">text-lg font-semibold</code>
                    </div>
                  </div>
                </div>

                <!-- Body Text -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Body Text</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <p class="text-primary">Primary text content</p>
                      <code class="text-xs text-muted">text-primary</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <p class="text-secondary">Secondary text content</p>
                      <code class="text-xs text-muted">text-secondary</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <p class="text-muted">Muted text content</p>
                      <code class="text-xs text-muted">text-muted</code>
                    </div>
                    <div class="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                      <p class="text-xs text-muted">Small text content</p>
                      <code class="text-xs text-muted">text-xs text-muted</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Component Showcase -->
            <section class="card slide-up">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
                UI Components
              </h2>

              <div class="space-y-6">
                <!-- Buttons -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Buttons</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button class="btn-primary flex items-center justify-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
                      </svg>
                      <span>Primary Button</span>
                    </button>
                    <button class="btn-secondary flex items-center justify-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
                      </svg>
                      <span>Secondary Button</span>
                    </button>
                    <button class="btn-outline flex items-center justify-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z"/>
                      </svg>
                      <span>Outline Button</span>
                    </button>
                  </div>
                </div>

                <!-- Cards -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Cards</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="card">
                      <h4 class="text-lg font-semibold text-primary mb-2">Standard Card</h4>
                      <p class="text-secondary text-sm">Default glassmorphism card with backdrop blur and transparency</p>
                    </div>
                    <div class="stat-card">
                      <div class="text-2xl font-bold text-accent">42</div>
                      <div class="text-xs text-muted">Stat Card</div>
                    </div>
                  </div>
                </div>

                <!-- Status Indicators -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Status Indicators</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="success-state rounded-xl p-4">
                      <div class="flex items-center space-x-3">
                        <div class="icon-container">
                          <svg class="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                          </svg>
                        </div>
                        <div>
                          <div class="font-semibold text-success-300">Success State</div>
                          <div class="text-sm text-success-400/80">Operation completed successfully</div>
                        </div>
                      </div>
                    </div>

                    <div class="error-state rounded-xl p-4">
                      <div class="flex items-center space-x-3">
                        <div class="icon-container">
                          <svg class="w-5 h-5 text-danger-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                          </svg>
                        </div>
                        <div>
                          <div class="font-semibold text-danger-300">Error State</div>
                          <div class="text-sm text-danger-400/80">Operation failed or requires attention</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Form Elements -->
                <div>
                  <h3 class="text-lg font-semibold text-secondary mb-4">Form Elements</h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-secondary mb-2">Input Field</label>
                      <input type="text" placeholder="Enter your text here" class="input-field" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-secondary mb-2">Password Field</label>
                      <input type="password" placeholder="••••••••" class="input-field" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Design Principles -->
            <section class="card slide-up">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg class="w-6 h-6 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                </svg>
                Design Principles
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="p-4 rounded-xl bg-brand-900/20 border border-brand-700/30">
                    <h3 class="text-lg font-semibold text-brand-300 mb-2">Security First</h3>
                    <p class="text-brand-200/80 text-sm">
                      Visual design emphasizes trust and security through consistent use of shield iconography and stable, professional color palette.
                    </p>
                  </div>

                  <div class="p-4 rounded-xl bg-accent-900/20 border border-accent-700/30">
                    <h3 class="text-lg font-semibold text-accent-300 mb-2">Modern Enterprise</h3>
                    <p class="text-accent-200/80 text-sm">
                      Glassmorphism effects and enterprise background patterns create a sophisticated, cutting-edge appearance suitable for business environments.
                    </p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="p-4 rounded-xl bg-success-900/20 border border-success-700/30">
                    <h3 class="text-lg font-semibold text-success-300 mb-2">Intuitive UX</h3>
                    <p class="text-success-200/80 text-sm">
                      Clear visual hierarchy, consistent spacing, and meaningful interactions guide users through authentication flows seamlessly.
                    </p>
                  </div>

                  <div class="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <h3 class="text-lg font-semibold text-gray-300 mb-2">Dark Mode Focus</h3>
                    <p class="text-gray-200/80 text-sm">
                      Optimized for dark environments with high contrast ratios and reduced eye strain for professional usage.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
</script>

<style scoped>
.color-swatch {
  aspect-ratio: 1;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(55, 65, 81, 0.5);
}

.color-swatch span:first-child {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-weight: 700;
}

.color-swatch span:last-child {
  opacity: 0.8;
}
</style>
