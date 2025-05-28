<template>
  <button
    :aria-label="
      isWishlistItem(variationId)
        ? t('removeProductFromWishlist', { label: productName })
        : t('addProductToWishlist', { label: productName })
    "
    class="inline-flex self-end !relative"
    :disabled="wishlistLoading"
    data-testid="wishlist-trigger"
    @click="onWishlistClick"
  >
    <SfLoaderCircular v-if="actionLoading" class="flex justify-center items-center h-[13px] w-[13px] sm:h-[20px] sm:w-[20px]" size="sm" />
    <template v-else>
      <svg class="h-[13px] w-auto sm:h-[20px]" v-if="isCloseButton" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12"><path d="M15,4.568A3.534,3.534,0,0,0,11.5,1,3.834,3.834,0,0,0,8,3.27,3.834,3.834,0,0,0,4.5,1,3.534,3.534,0,0,0,1,4.568C1,7.73,4.778,10.932,8,13,11.222,10.932,15,7.73,15,4.568Z" transform="translate(-1 -1)" fill="#ea665d"/></svg>
      <svg class="h-[13px] w-auto sm:h-[20px]" v-else-if="isWishlistItem(variationId)" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12"><path d="M15,4.568A3.534,3.534,0,0,0,11.5,1,3.834,3.834,0,0,0,8,3.27,3.834,3.834,0,0,0,4.5,1,3.534,3.534,0,0,0,1,4.568C1,7.73,4.778,10.932,8,13,11.222,10.932,15,7.73,15,4.568Z" transform="translate(-1 -1)" fill="#ea665d"/></svg>
      <svg class="h-[13px] w-auto sm:h-[20px]" v-else xmlns="http://www.w3.org/2000/svg" width="15" height="13.094" viewBox="0 0 15 13.094"><g transform="translate(0.5 0.5)"><path d="M15,4.568A3.534,3.534,0,0,0,11.5,1,3.834,3.834,0,0,0,8,3.27,3.834,3.834,0,0,0,4.5,1,3.534,3.534,0,0,0,1,4.568C1,7.73,4.778,10.932,8,13,11.222,10.932,15,7.73,15,4.568Z" transform="translate(-1 -1)" fill="none" stroke="#000" stroke-linecap="square" stroke-width="1"/></g></svg>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import type { WishlistButtonProps } from '~/components/WishlistButton/types';
import { SfIconFavorite, SfIconFavoriteFilled, SfLoaderCircular, SfIconClose } from '@storefront-ui/vue';
import { productGetters } from '@plentymarkets/shop-api';

const { product, quantity = 1, discard = false } = defineProps<WishlistButtonProps>();
const { t } = useI18n();
const { isWishlistItem, interactWithWishlist, loading: wishlistLoading } = useWishlist();
const actionLoading = ref(false);

const productName = computed(() => productGetters.getName(product));
const variationId = computed(() => productGetters.getVariationId(product));
const isCloseButton = computed(() => isWishlistItem(variationId.value) && discard);
const onWishlistClick = async () => {
  actionLoading.value = true;
  await interactWithWishlist(variationId.value, quantity);
  actionLoading.value = false;
};
</script>