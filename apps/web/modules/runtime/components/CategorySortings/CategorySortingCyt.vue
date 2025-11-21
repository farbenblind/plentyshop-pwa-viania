<template>
  <div class="w-full md:flex items-center py-[20px] md:py-0 md:ml-auto md:w-auto" data-testid="category-sorting">
    <div class="text-[14px] pb-2 pl-[20px] pt-[10px] font-bold select-none whitespace-nowrap border-t border-[#E5E5E5] md:border-0 md:p-0">
      {{ t('sortBy') }}
    </div>
    <div class="pl-[20px]">
      <select id="sortBy" v-model="selected" :aria-label="t('sortBy')" class="text-[14px]">
        <option v-if="selectionModeCompact" value="" disabled hidden>{{ t('sortBy') }}</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ t(`sortType.${option}`) }}
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
import { SfSelect } from '@storefront-ui/vue';
import { useRoute } from 'vue-router';
import { isPageOfType } from '~/utils/pathHelper';

const props = defineProps<{ selectionModeCompact?: boolean }>();
const { updateSorting } = useCategoryFilter();
const { t } = useI18n();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingSearch } = useSiteSettings('defaultSortingSearch');
const { getSetting: defaultSortingOption } = useSiteSettings('defaultSortingOption');

const route = useRoute();
const useSelectionModeCompact = computed(() => props.selectionModeCompact);
watch(useSelectionModeCompact, (on) => {
  if (on) updateSorting('');
});
const options = computed<string[]>(() => availableSortingOptions());
const defaultOption = computed<string | undefined>(() =>
  isPageOfType('search') ? defaultSortingSearch() : defaultSortingOption(),
);

const selected = computed<string>({
  get: () => {
    if (useSelectionModeCompact.value) return '';

    const sortQueryParam = route.query.sort;
    const currentSort = typeof sortQueryParam === 'string' ? sortQueryParam : '';
    if (currentSort && options.value.includes(currentSort)) return currentSort;

    return (
      (defaultOption.value && options.value.includes(defaultOption.value) ? defaultOption.value : options.value[0]) ??
      ''
    );
  },
  set: (val) => {
    if (!val) return;
    updateSorting(val);
  },
});
</script>
