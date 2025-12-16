<template>
  <div class="flex flex-wrap flex-row gap-[5px] pt-[10px] xl:pt-[20px] group" v-if="currentFacets.length > 0">
    <span class="flex items-center text-xs font-semibold" :class="{ 'w-[100%] lg:w-auto': currentFacets.length >= 2 }">{{ t('Filter3') }}</span>
    <SelectedFilter v-for="facet in facets" :key="facet.id" :facet="facet" :group="facet.name" />
    <div v-if="currentFacets.length > 1" class="all flex flex-wrap items-center bg-[#EA665D] rounded-[5px] text-xs text-white px-[10px] py-[4px] pl-[5px] cursor-pointer" @click="removeFacets">
      <SfIconCloseSm size="sm" class="leading-none align-middle whitespace-nowrap" /> <span class="leading-none">{{ t('search.clearFilters') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';
import {
  SfIconCloseSm
} from '@storefront-ui/vue';

const { getFacetsFromURL, updateQuery } = useCategoryFilter();

const props = defineProps<CategoryFiltersProps>();
const { facets } = toRefs(props);
const currentFacets = ref([] as string[]);

const updateFacetsCount = () => {
  currentFacets.value = getFacetsFromURL().facets?.split(',') ?? [];
};

const removeFacets = () => {
  updateQuery({ 
    facets: null,
    page: null,
    priceMin: null,
    priceMax: null
  });
};

updateFacetsCount();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFacetsCount();
  },
);
</script>