<template>
  <div class="max-w-screen-3xl mx-auto px-[20px]">
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Versandinfomationen</h1>
      
      <div class="grid gap-4 md:grid-cols-3">
        <!-- Germany -->
        <div class="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">DE</span>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-2">Deutschland</h3>
              <p class="text-gray-600 text-sm mb-3">Versand 4,95€</p>
              <div class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Gratis ab 50€
              </div>
            </div>
          </div>
        </div>

        <!-- Austria -->
        <div class="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">AT</span>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-2">Österreich</h3>
              <p class="text-gray-600 text-sm mb-3">Versand 13,95€</p>
              <div class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Gratis ab 150€
              </div>
            </div>
          </div>
        </div>

        <!-- EU -->
        <div class="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">EU</span>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-2">EU-Länder</h3>
              <p class="text-gray-600 text-sm mb-3">Versand 14,95€</p>
              <div class="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-700">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Gratis ab 150€
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const details = useCategoryDetails();
</script>