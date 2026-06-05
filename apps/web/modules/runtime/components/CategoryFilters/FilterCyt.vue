<template>
  <div v-if="facet">
    <div class="md:hidden has-[>_div:empty]:hidden">
      <input type="checkbox" name="" :id="'filter-' + facet.id" class="peer opacity-0 w-0 h-0 absolute">
      <label :for="'filter-' + facet.id" class="block text-[14px] pb-[10px] flex items-center gap-[10px]">
        <span class="font-medium">{{ facetGetters.getName(facet) }}</span>
        <svg :class="[open ? 'rotate-180' : '-rotate-0']" xmlns="http://www.w3.org/2000/svg" width="10.707" height="6.061" viewBox="0 0 10.707 6.061"><g transform="translate(0.354 0.354)"><path d="M10.354.354l-5,5-5-5" transform="translate(-0.354 -0.354)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1"/></g></svg>
      </label>
      <div class="hidden peer-checked:grid grid-cols-3 sm:grid-cols-4 gap-[5px] pb-[20px]">
        <SfListItem
          v-for="(filter, index) in facetGetters.getFilters(facet)"
          :key="index"
          tag="label"
          size="sm"
          :data-testid="'category-filter-' + index"
          class="bg-transparent hover:bg-transparent !p-0"
        >
          <template #prefix>
            <SfCheckbox
              :id="filter.id"
              v-model="models[filter.id]"
              :value="filter"
              class="flex items-center"
              @change="facetChange"
            />
          </template>
          <p class="select-none">
            <span class="mr-2 text-sm">{{ filter.name ?? '' }}</span>
            <!-- <SfCounter size="sm">{{ filter.count ?? 0 }}</SfCounter> -->
          </p>
        </SfListItem>
      </div>
    </div>
    <div class="hidden md:block">
      <SfAccordionItem v-model="open" @mouseleave="open = false" @mouseover="open = true">
        <template #summary>
          <div class="flex items-center gap-[10px] pt-2 pb-2 select-none" v-if="facetGetters.getType(facet) !== 'price'">
            <p class="text-[14px] font-medium">{{ facetGetters.getName(facet) }}</p>
            <svg :class="[open ? 'rotate-180' : '-rotate-0']" xmlns="http://www.w3.org/2000/svg" width="10.707" height="6.061" viewBox="0 0 10.707 6.061"><g transform="translate(0.354 0.354)"><path d="M10.354.354l-5,5-5-5" transform="translate(-0.354 -0.354)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="1"/></g></svg>
          </div>
        </template>
        <div class="pb-[10px] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 gap-[5px] md:absolute md:z-[20] md:bg-white md:p-[20px] md:border md:border-[#E5E5E5]">
          <SfListItem
            v-for="(filter, index) in facetGetters.getFilters(facet)"
            :key="index"
            tag="label"
            size="sm"
            :data-testid="'category-filter-' + index"
            class="bg-transparent hover:bg-transparent !p-0"
          >
            <template #prefix>
              <SfCheckbox
                :id="filter.id"
                v-model="models[filter.id]"
                :value="filter"
                class="flex items-center"
                @change="facetChange"
              />
            </template>
            <p class="select-none">
              <span class="mr-2 text-sm">{{ filter.name ?? '' }}</span>
              <!-- <SfCounter size="sm">{{ filter.count ?? 0 }}</SfCounter> -->
            </p>
          </SfListItem>
        </div>
      </SfAccordionItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Filter, type FilterGroup, facetGetters } from '@plentymarkets/shop-api';
import {
  SfAccordionItem,
  SfListItem,
  SfCheckbox,
} from '@storefront-ui/vue';
import type { FilterProps } from '~/components/CategoryFilters/types';
import type { Filters } from '~/composables';

const { getFacetsFromURL, updateFiltersAndResetPage } = useCategoryFilterWithReset();

const open = ref(false);
const props = defineProps<FilterProps>();
const filters = facetGetters.getFilters(props.facet ?? ({} as FilterGroup)) as Filter[];
const models = ref({} as Filters);

const updateFilter = () => {
  const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
  for (const filter of filters) {
    const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();

    models.value[filterId] = currentFacets.includes(filterId);
  }
};

const facetChange = () => {
  updateFiltersAndResetPage(models.value);
};

updateFilter();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFilter();
  },
);
</script>

<style scoped>
.peer {
  ~ label svg {
    transition: transform 0.3s ease-in-out;
  }
  &:checked ~ label svg {
    transform: rotate(180deg);
  }
}
</style>