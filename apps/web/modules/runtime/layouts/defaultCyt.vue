<template>
  <div>
    <UiHeader />
    <main>
      <slot />
    </main>
    <Cookiebar />
    <PreviewMode />
    <NuxtLazyHydrate when-visible>
      <UiFooter />
    </NuxtLazyHydrate>

    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';
defineProps<DefaultLayoutProps>();
const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
setLogoMeta();
</script>
