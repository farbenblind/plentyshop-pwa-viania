<template>
  <div class="max-w-screen-3xl mx-auto p-[10px] xs:p-[20px] lg:p-[40px]">
    <h1 class="font-bold text-[24px]">StoreFinder</h1>
    <p class="text-[16px]">Find your nearest store</p>
    <UiDivider class="mt-2" />
    <div class="py-[20px] lg:py-[40px]">
      Content
    </div>
    
  </div>
</template>

<script setup lang="ts">
  const details = useCategoryDetails();
</script>