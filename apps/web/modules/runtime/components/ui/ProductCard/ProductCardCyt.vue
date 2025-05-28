<template>
    <div class="flex flex-col border border-[transparent] rounded-[10px] overflow-hidden hover:border-[1px] hover:border-[#E5E5E5]" data-testid="product-card">
      <div class="relative overflow-hidden">
        <UiBadges
          :use-tags="useTagsOnCategoryPage"
          :class="['absolute', isFromWishlist ? 'mx-2' : 'm-2']"
          :product="product"
          :use-availability="isFromWishlist"
        />
  
        <SfLink
          :tag="NuxtLink"
          rel="preload"
          :to="productPath"
          :class="{ 'size-48': isFromSlider }"
          as="image"
          class="img"
        >
          <NuxtImg
            :src="imageUrl"
            :alt="imageAlt"
            :title="imageTitle"
            :loading="lazy && !priority ? 'lazy' : 'eager'"
            :fetchpriority="priority ? 'high' : 'auto'"
            :preload="priority || false"
            :width="getWidth()"
            :height="getHeight()"
            data-testid="image-slot"
          />
        </SfLink>
      </div>
      <div class="flex flex-col flex-auto text-[14px] md:text-[16px] lg:text-[18px] p-[10px] sm:p-[20px]">
        <SfLink :tag="NuxtLink" :to="productPath" class="no-underline font-light" variant="secondary" data-testid="productcard-name">
          {{ name }}
        </SfLink>
        <LowestPrice :product="product" />
        <div v-if="showBasePrice" class="mb-2">
          <BasePriceInLine :base-price="basePrice" :unit-content="unitContent" :unit-name="unitName" />
        </div>
        <div class="flex items-start mt-auto gap-[10px] pb-[10px]">
          <span class="block font-bold" data-testid="product-card-vertical-price">
            <span v-if="!productGetters.canBeAddedToCartFromCategoryPage(product)" class="mr-1">
              {{ t('account.ordersAndReturns.orderDetails.priceFrom') }}
            </span>
            <span class="font-semibold">{{ format(price) }}</span>
          </span>
          <span v-if="crossedPrice" class="line-through">
            {{ format(crossedPrice) }}
          </span>
        </div>
        <slot name="wishlistButton">
          <WishlistButton
            class="text-right"
            :product="product"
          />
        </slot>
      </div>
    </div>
  </template>

<style scoped>
.img {
  position: relative;
  height: 0;
  padding-bottom: 100%;
  display: block;
  width: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
  
<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLink, SfIconShoppingCart, SfLoaderCircular, SfRating, SfCounter } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';

const localePath = useLocalePath();
const { format } = usePriceFormatter();
const { t } = useI18n();
const {
  product,
  name,
  imageUrl,
  imageAlt = '',
  imageTitle,
  imageWidth,
  imageHeight,
  rating,
  ratingCount,
  priority,
  lazy = true,
  unitContent,
  unitName,
  basePrice,
  showBasePrice,
  isFromWishlist = false,
  isFromSlider = false,
} = defineProps<ProductCardProps>();

const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product);
const { send } = useNotification();
const loading = ref(false);
const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;

const variationId = computed(() => productGetters.getVariationId(product));

const productPath = computed(() => {
  const basePath = `/${productGetters.getUrlPath(product)}_${productGetters.getItemId(product)}`;
  const shouldAppendVariation = variationId.value && productGetters.getSalableVariationCount(product) === 1;

  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const getWidth = () => {
  if (imageWidth && imageWidth > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth;
  }
  return '';
};
const getHeight = () => {
  if (imageHeight && imageHeight > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight;
  }
  return '';
};

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;

  try {
    await addToCart({
      productId: productId,
      quantity: 1,
    });
    if (quickCheckout) {
      openQuickCheckout(product, 1);
    } else {
      send({ message: t('addedToCart'), type: 'positive' });
    }
  } finally {
    loading.value = false;
  }
};

const NuxtLink = resolveComponent('NuxtLink');
</script>