<template>
  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <SfDrawer
      v-show="isOpen"
      :model-value="true"
      :disable-click-away="true"
      :disable-esc="true"
      class="w-full md:w-auto md:flex-grow rounded shadow-none md:translate-x-0 z-[100] md:z-0 md:relative md:!flex md:items-center -translate-x-full shrink-0 bg-white overflow-y-auto md:overflow-y-visible"
      data-testid="category-sidebar"
    >
      <div class="h-full md:flex md:flex-grow md:items-baseline md:gap-[30px]">
        <div class="px-[20px] py-[10px] flex justify-between items-center" v-if="viewport.isLessThan('md')">
          <UiButton variant="tertiary" class="!text-black !bg-white !hover:bg-white !p-0 ml-auto" :aria-label="t('closeListSettings')" @click="$emit('close')">
            <template #prefix>
              <SfIconClose />
            </template>
          </UiButton>
        </div>
        <slot class="overflow-y-auto md:overflow-y-visible py-4 md:p-0" />
        <div class="px-[20px] flex flex-wrap justify-between md:border-0 gap-3 border-t border-[#E5E5E5] pt-[20px] md:hidden">
          <UiButton class="!bg-black whitespace-nowrap flex flex-1" variant="primary" @click="$emit('close')">
            {{ t('showProducts') }}
          </UiButton>
        </div>
      </div>
    </SfDrawer>
  </transition>
</template>

<script setup lang="ts">
import { SfDrawer, SfIconClose } from '@storefront-ui/vue';
import type { CategorySidebarEmits, CategorySidebarProps } from '~/components/CategorySidebar/types';

const { t } = useI18n();
const viewport = useViewport();

defineProps<CategorySidebarProps>();
defineEmits<CategorySidebarEmits>();
</script>
