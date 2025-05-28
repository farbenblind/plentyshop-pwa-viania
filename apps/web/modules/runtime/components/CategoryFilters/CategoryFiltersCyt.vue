<template>
  <div
    class="py-2 px-[20px] font-bold text-black select-none text-[14px] border-t border-[#E5E5E5] md:hidden lg:block md:border-0 md:p-0"
    data-testid="category-filters"
  >
    {{ t('Filter2') }}
  </div>
  <div class="flex flex-col md:flex-row px-[20px] md:px-0 md:gap-[20px]">
    <CategoryFiltersFilter v-for="facet in facets" :key="facet.id" :facet="facet" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

const props = defineProps<CategoryFiltersProps>();
const { t } = useI18n();

const { facets } = toRefs(props);
const viewport = useViewport();
</script>
