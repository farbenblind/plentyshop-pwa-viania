<template>
  <div class="flex gap-[10px] align-baseline text-[18px] xl:text-[24px]">
    <span v-if="crossedPrice && differentPrices" class="line-through xl:font-light">
      {{ format(crossedPrice) }}
    </span>
    <span :class="crossedPrice && differentPrices ? 'text-[#EA665D]' : ''" data-testid="price">
      <span class="font-medium">{{ format(price) }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

const props = defineProps<PriceProps>();

const { format } = usePriceFormatter();
const { t } = useI18n();

const differentPrices = computed(() => {
  return props.crossedPrice
    ? Math.round(props.price * 100) / 100 !== Math.round(props.crossedPrice * 100) / 100
    : false;
});
</script>
