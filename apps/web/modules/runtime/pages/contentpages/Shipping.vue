<template>
  <div class="max-w-screen-3xl mx-auto px-[20px]">
      <div class="space-y-[20px] no-preflight">
        <h1>Versandinfomationen</h1>
        <ul class="!list-none !p-0 !m-0">
            <li>Versand innerhalb Deutschlands 4,95€, <strong>versandkostenfrei ab 50,-€</strong></li>
            <li>Versand nach Österreich 13,95€, <strong>versandkostenfrei ab 150,-€</strong></li>
            <li>Versand innerhalb der EU 14,95€, <strong>versandkostenfrei ab 150,-€</strong></li>
        </ul>
      </div>
  </div>
</template>

<script setup lang="ts">
  const details = useCategoryDetails();
</script>