<template>
    <template v-if="facet">
        <template v-for="(filter, index) in facetGetters.getFilters(facet)" :key="index">
            <div v-if="models[filter.id]" class="flex items-center bg-primary-600 rounded-[5px] text-xs text-white px-[10px] py-[4px] pl-[5px] cursor-pointer hover:line-through group-has-[.all:hover]:line-through" @click="facetChange(filter.id + '')" >
                <SfIconCloseSm size="xs" class="leading-none align-middle" /> <span class="leading-none">{{ $attrs.group }}: {{ filter.name }}</span>
            </div>
        </template>
    </template>
</template>

<script setup lang="ts">
import { SfIconCloseSm } from '@storefront-ui/vue';
import { type Filter, type FilterGroup, facetGetters } from '@plentymarkets/shop-api';
import type { FilterProps } from '~/components/CategoryFilters/types';
import type { Filters } from '~/composables';

const { getFacetsFromURL } = useCategoryFilter();
const { updateFiltersAndResetPage } = useCategoryFilterWithReset();

const props = defineProps<FilterProps>();
const filters = facetGetters.getFilters(props.facet ?? ({} as FilterGroup)) as Filter[];
const models = ref({} as Filters);

const facetChange = (id: string) => {
  updateFiltersAndResetPage({[id]: false});
};

const updateFilter = () => {
  const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
  for (const filter of filters) {
    const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();

    models.value[filterId] = currentFacets.includes(filterId);
  }
};

updateFilter();

watch(
  () => useNuxtApp().$router.currentRoute.value.query,
  async () => {
    updateFilter();
  },
);
</script>
