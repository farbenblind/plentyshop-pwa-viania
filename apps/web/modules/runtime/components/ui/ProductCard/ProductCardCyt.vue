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
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfLink, SfIconShoppingCart, SfLoaderCircular, SfRating, SfCounter } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';
import type { ItemGridContent } from '~/components/blocks/ItemGrid/types';

const props = withDefaults(defineProps<ProductCardProps>(), {
  configuration: () => ({
    cardBorders: true,
    contentAlignment: 'left',
    fields: {
      title: true,
      rating: true,
      previewText: false,
      price: true,
      addToCart: true,
      manufacturer: false,
    },
    fieldsOrder: ['title', 'manufacturer', 'rating', 'previewText', 'price', 'addToCart'],
    showWishlistButton: false,
    showSecondImageOnHover: false,
    addToCartStyle: 'primary',
    itemsPerRowDesktop: 4,
    itemsPerRowTablet: 3,
    itemsPerRowMobile: 1,
    showItemCount: true,
    itemCountPosition: 'center',
    fieldsDisabled: [],
    paginationPosition: 'bottom',
  }),
});

const product = computed(() => props.product);

const configuration = computed(() => props.configuration || ({} as ItemGridContent));

const { addModernImageExtension } = useModernImage();
const localePath = useLocalePath();
const { format } = usePriceFormatter();
const { t } = useI18n();
const { openQuickCheckout } = useQuickCheckout();
const { addToCart } = useCart();
const { price, crossedPrice } = useProductPrice(product.value);
const { send } = useNotification();
const loading = ref(false);
const config = useRuntimeConfig();
const useTagsOnCategoryPage = config.public.useTagsOnCategoryPage;

const name = computed(() => productGetters.getName(product.value) ?? '');
const manufacturer = computed(() => productGetters.getManufacturer(product.value));
const ratingCount = computed(() => productGetters.getTotalReviews(product.value));
const rating = computed(() => productGetters.getAverageRating(product.value, 'half'));
const shortDescription = computed(() => productGetters.getShortDescription(product.value) || '');
const canAddFromCategory = computed(() => productGetters.canBeAddedToCartFromCategoryPage(product.value));
const showFromText = computed(() => productGetters.showFromText(product.value));

const cover = computed(() => productGetters.getCoverImage(product.value));
const secondCover = computed(() => productGetters.getSecondCoverImage(product.value));
const firstImage = computed(() => productImageGetters.getFirstImage(product.value));

const imageUrl = computed(() => addModernImageExtension(cover.value));
const effectiveHoverImageUrl = computed(() => {
  if (!configuration.value?.showSecondImageOnHover) return '';
  const src = addModernImageExtension(secondCover.value);
  return src || '';
});

const imageAlt = computed(() => productImageGetters.getImageAlternate(firstImage.value) || name.value || '');
const imageTitle = computed(() => productImageGetters.getImageName(firstImage.value) || '');

const imageWidth = computed(() => productGetters.getImageWidth(product.value) || 600);
const imageHeight = computed(() => productGetters.getImageHeight(product.value) || 600);

const basePrice = computed(() => productGetters.getDefaultBasePrice(product.value));
const unitContent = computed(() => productGetters.getUnitContent(product.value));
const unitName = computed(() => productGetters.getUnitName(product.value));
const showBasePrice = computed(() => productGetters.showPricePerUnit(product.value));

const variationId = computed(() => productGetters.getVariationId(product.value));

const productPath = computed(() => {
  const basePath = `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`;
  const shouldAppendVariation = variationId.value && productGetters.getSalableVariationCount(product.value) === 1;
  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const priority = ref((props.index || 0) < 5);
const lazy = ref(props.lazy || false);
const isFromWishlist = ref(props.isFromWishlist || false);
const isFromSlider = ref(props.isFromSlider || false);

const getWidth = () => {
  if (imageWidth.value && imageWidth.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth.value;
  }
  return '';
};

const getHeight = () => {
  if (imageHeight.value && imageHeight.value > 0 && imageUrl.value.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight.value;
  }
  return '';
};

const addWithLoader = async (productId: number, quickCheckout = true) => {
  loading.value = true;
  try {
    await addToCart({ productId, quantity: 1 });
    if (quickCheckout) {
      openQuickCheckout(product.value, 1);
    } else {
      send({ message: t('addedToCart'), type: 'positive' });
    }
  } finally {
    loading.value = false;
  }
};
const differentPrices = (price: number, crossedPrice: number) => {
  return crossedPrice ? Math.round(price * 100) / 100 !== Math.round(crossedPrice * 100) / 100 : false;
};

const NuxtLink = resolveComponent('NuxtLink');
</script>