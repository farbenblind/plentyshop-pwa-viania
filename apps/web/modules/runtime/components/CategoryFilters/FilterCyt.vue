<template>
  <SfAccordionItem v-if="facet" v-model="open">
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
</template>

<script setup lang="ts">
import { type Filter, type FilterGroup, facetGetters } from '@plentymarkets/shop-api';
import {
  SfInput,
  SfIconCheck,
  SfIconClose,
  SfAccordionItem,
  SfIconChevronLeft,
  SfListItem,
  SfRating,
  SfCheckbox,
  SfCounter,
  SfIconArrowUpward,
} from '@storefront-ui/vue';
import type { FilterProps } from '~/components/CategoryFilters/types';
import type { Filters } from '~/composables';

const { getFacetsFromURL, updateFilters, updatePrices } = useCategoryFilter();
const { t } = useI18n();

const open = ref(false);
const props = defineProps<FilterProps>();
const filters = facetGetters.getFilters(props.facet ?? ({} as FilterGroup)) as Filter[];
const models = ref({} as Filters);

// Price
const minPrice = ref(getFacetsFromURL().priceMin ?? '');
const maxPrice = ref(getFacetsFromURL().priceMax ?? '');

function updatePriceFilter() {
  const min = minPrice.value.length > 0 ? Number(minPrice.value) : Number.NaN;
  const max = maxPrice.value.length > 0 ? Number(maxPrice.value) : Number.NaN;
  const minValue = Number.isNaN(min) ? '' : min.toString();
  const maxValue = Number.isNaN(max) ? '' : max.toString();

  updatePrices(minValue, maxValue);
}

function resetPriceFilter() {
  updatePrices('', '');
}

const updateFilter = () => {
  const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
  for (const filter of filters) {
    const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();

    models.value[filterId] = currentFacets.includes(filterId);
  }
};

const facetChange = () => updateFilters(models.value);

updateFilter();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFilter();

    minPrice.value = getFacetsFromURL().priceMin ?? '';
    maxPrice.value = getFacetsFromURL().priceMax ?? '';
  },
);
const feedbackNumber = (filter: Filter) => {
  return Number(filter.id.toString().replace('feedback-', ''));
};
const sortedReviews = (facet: FilterGroup): Filter[] =>
  facetGetters.getFilters(facet).sort((a, b) => feedbackNumber(b) - feedbackNumber(a));
</script>
