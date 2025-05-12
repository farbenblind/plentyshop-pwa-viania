<template>
    <div class="group max-w-screen-3xl mx-auto lg:px-10 px-4 md:px-6 my-5">
      <div class="bg-secondary-500 px-4 pt-4 pb-8">
        <h3 class="font-bold mb-4 pt-0">Finde deinen BH</h3>
        <div class="flex justify-center flex-row gap-5">
          <div class="w-80">
            <SfInput type="text" />
          </div>
          <div class="w-80">
            <SfInput type="text" />
          </div>
          <div class="w-80">
            <SfInput type="text" />
          </div>
          <div class="w-80">
            <UiButton class="w-full">Finden</UiButton>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { SfInput } from '@storefront-ui/vue';
  </script>