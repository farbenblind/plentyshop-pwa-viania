<template>
  <div class="w-full md:flex items-center py-[20px] md:py-0 md:ml-auto md:w-auto" data-testid="category-sorting">
    <div class="text-[14px] pb-2 pl-[20px] pt-[10px] font-bold select-none whitespace-nowrap border-t border-[#E5E5E5] md:border-0 md:p-0">
      {{ t('sortBy') }}
    </div>
    <div class="pl-[20px]">
      <select id="sortBy" v-model="selected" :aria-label="t('sortBy')" @change="sortingChanged" class="text-[14px]">
        <option v-for="{ value, label } in options" :key="value" :value="value">
          {{ t(`sortType.${label}`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
select {
  background-color: #fff;
  appearance: none;
  padding-right: 20px;

  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10.707' height='6.061' viewBox='0 0 10.707 6.061'%3e%3cg transform='translate(0.354 0.354)'%3e%3cpath d='M10.354.354l-5,5-5-5' transform='translate(-0.354 -0.354)' fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='1'/%3e%3c/g%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right center;
}

select::-ms-expand {
  display: none;
}
</style>

<script setup lang="ts">
const { getFacetsFromURL, updateSorting } = useCategoryFilter();
const { t } = useI18n();
const options = ref([
  {
    label: 'recommended',
    value: 'default.recommended_sorting',
  },
  {
    label: 'nameA-Z',
    value: 'texts.name1_asc',
  },
  {
    label: 'nameZ-A',
    value: 'texts.name1_desc',
  },
  {
    label: 'priceUp',
    value: 'sorting.price.avg_asc',
  },
  {
    label: 'priceDown',
    value: 'sorting.price.avg_desc',
  },
  {
    label: 'newest',
    value: 'variation.createdAt_desc',
  },
  {
    label: 'oldest',
    value: 'variation.createdAt_asc',
  },
  {
    label: 'availabilityUp',
    value: 'variation.availability.averageDays_asc',
  },
  {
    label: 'availabilityDown',
    value: 'variation.availability.averageDays_desc',
  },
  {
    label: 'variationNumberUp',
    value: 'variation.number_asc',
  },
  {
    label: 'variationNumberDown',
    value: 'variation.number_desc',
  },
  {
    label: 'lastUpdate',
    value: 'variation.updatedAt_asc',
  },
  {
    label: 'firstUpdate',
    value: 'variation.updatedAt_desc',
  },
  {
    label: 'manufacturerAsc',
    value: 'item.manufacturer.externalName_asc',
  },
  {
    label: 'manufacturerDesc',
    value: 'item.manufacturer.externalName_desc',
  },
  {
    label: 'topSellerUp',
    value: 'variation.position_asc',
  },
  {
    label: 'topSellerDown',
    value: 'variation.position_desc',
  },
  {
    label: 'reviewsUp',
    value: 'item.feedbackDecimal_asc',
  },
  {
    label: 'reviewsDown',
    value: 'item.feedbackDecimal_desc',
  },
]);
const selected = ref(options.value[0].value);

function sortingChanged() {
  updateSorting(selected.value);
}

function sortQueryChanged() {
  const facets = getFacetsFromURL();
  selected.value = facets.sort ?? options.value[0].value;
}

sortQueryChanged();

watch(
  () => useNuxtApp().$router.currentRoute.value.query.sort,
  () => {
    sortQueryChanged();
  },
);
</script>
