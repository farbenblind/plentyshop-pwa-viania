<template>
    <form
      data-testid="purchase-card"
      @submit.prevent="handleAddToCart()"
    >
      <!-- reviews stars -->
      <div class="flex items-center gap-[10px] cursor-pointer" @click="scrollToReviews" v-if="reviewGetters.getTotalReviews(reviewAverage) > 0">        
        <div class="flex flex-col w-[calc(12*5px+4px)]">
          <div class="inline-flex gap-[1px] h-[12px]">
            <svg v-for="i in 5" :key="i" class="w-[12px] h-[12px] fill-[#999] flex-shrink-0" viewBox="0 0 15 15"><use href="#svg_star"></use></svg>
          </div>
          <div class="inline-flex gap-[1px] overflow-hidden h-[12px] mt-[-12px]" :style="'width:' + reviewGetters.getAverageRating(reviewAverage, 'half') * 20 + '%'">
            <svg v-for="i in 5" :key="i" class="w-[12px] h-[12px] fill-[#FCC72F] flex-shrink-0" viewBox="0 0 15 15"><use href="#svg_star"></use></svg>
          </div>
        </div>

        <div class="text-[12px] underline">{{ reviewGetters.getTotalReviews(reviewAverage) }} {{ reviewGetters.getTotalReviews(reviewAverage) === 1 ? t('Product.review') : t('Product.reviews') }}</div>

        <svg class="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="svg_star"><path d="M753.991,71.8a.664.664,0,0,1-.353-.118l-3.682-2.338a.742.742,0,0,0-.665,0l-3.683,2.338a.49.49,0,0,1-.689-.048.623.623,0,0,1-.077-.535l.983-4.394a.8.8,0,0,0-.206-.664l-3.259-2.949a.564.564,0,0,1-.218-.6.528.528,0,0,1,.511-.348l4.29-.378a.743.743,0,0,0,.538-.41l1.668-4.16c.145-.362.38-.4.473-.4s.328.039.473.4l1.668,4.16a.743.743,0,0,0,.538.41l4.29.378a.528.528,0,0,1,.511.348.564.564,0,0,1-.218.6l-3.259,2.949a.8.8,0,0,0-.205.664L754.4,71.1a.626.626,0,0,1-.077.535A.414.414,0,0,1,753.991,71.8Z" transform="translate(-742.123 -56.796)"/></g>
        </svg>
      </div>

      <h1 class="text-[18px] xl:text-[24px] leading-[1.25] font-light" :class="{'pt-[20px]': reviewGetters.getTotalReviews(reviewAverage) > 0}" data-testid="product-name">{{ productGetters.getName(product) }}</h1>

      <div class="grid grid-cols-[auto_55px] pt-[15px]">
        <div class="prices-badge">
          <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
          <div class="text-[12px]">
            <span>{{ showNetPrices ? t('itemExclVAT') : t('itemInclVAT') }}&nbsp;</span>
            <i18n-t keypath="excludedShipping" scope="global">
              <template #shipping>
                <SfLink :href="localePath(paths.shipping)" target="_blank" class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded">{{ $t('delivery') }}</SfLink>
              </template>
            </i18n-t>
          </div>
          <div :class="['text-[12px] font-bold av' + productGetters.getAvailabilityId(product), productGetters.getAvailabilityId(product) == 1 ? 'text-[#2AC678]' : 'text-[black]']">
            {{ productGetters.getAvailabilityName(product) }}
          </div>
        </div>

        <div class="oeko bg-[#00A687] text-white flex items-center justify-center text-center leading-[1]">
          OEKO<br>TEX
        </div>
      </div>

      <ProductAttributes :product="product" />













<!-- 
    <div class="relative">
        <div class="drift-zoom-image2">
          <section class="p-4 xl:p-6">
            <div class="grid grid-cols-[2fr_1fr] mt-4">
              <h1 class="font-bold typography-headline-4" data-testid="product-name">
                {{ productGetters.getName(product) }}
                <p>Und das ist meine Komponente die ich überschrieben habe.</p>
              </h1>
              <div class="flex items-center justify-center">
                <WishlistButton
                  :product="product"
                  :quantity="quantitySelectorValue"
                  :square="viewport.isLessThan('lg')"
                  :class="{
                    'bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full':
                      viewport.isLessThan('lg'),
                  }"
                >
                  <template v-if="viewport.isGreaterOrEquals('lg')">
                    {{
                      !isWishlistItem(productGetters.getVariationId(product))
                        ? t('addToWishlist')
                        : t('removeFromWishlist')
                    }}
                  </template>
                </WishlistButton>
              </div>
            </div>
            <div class="flex space-x-2">
              <Price :price="priceWithProperties" :crossed-price="crossedPrice" />
              <div v-if="(productBundleGetters?.getBundleDiscount(product) ?? 0) > 0" class="m-auto">
                <UiTag :size="'sm'" :variant="'secondary'">{{
                  t('procentageSavings', { percent: productBundleGetters.getBundleDiscount(product) })
                }}</UiTag>
              </div>
            </div>
            <LowestPrice :product="product" />
            <BasePrice
              v-if="productGetters.showPricePerUnit(product)"
              :base-price="basePriceSingleValue"
              :unit-content="productGetters.getUnitContent(product)"
              :unit-name="productGetters.getUnitName(product)"
            />
            <UiBadges class="mt-4" :product="product" :use-availability="true" />
            <div class="mt-2 variation-properties">
              <VariationProperties :product="product" />
            </div>
            <div class="inline-flex items-center mt-4 mb-2">
              <SfRating
                size="xs"
                :half-increment="true"
                :value="reviewGetters.getAverageRating(reviewAverage, 'half')"
                :max="5"
              />
              <SfCounter class="ml-1" size="xs">{{ reviewGetters.getTotalReviews(reviewAverage) }}</SfCounter>
              <UiButton
                variant="tertiary"
                class="ml-2 text-xs text-neutral-500 cursor-pointer"
                data-testid="show-reviews"
                @click="scrollToReviews"
              >
                {{ t('showAllReviews') }}
              </UiButton>
            </div>
            <div
              v-if="productGetters.getShortDescription(product).length > 0"
              class="mb-4 font-normal typography-text-sm whitespace-pre-line break-words"
              data-testid="product-description"
              v-html="productGetters.getShortDescription(product)"
            />
  
            <ProductAttributes :product="product" />
            <BundleOrderItems v-if="product.bundleComponents" :product="product" />
            <OrderProperties :product="product" />
            <GraduatedPriceList :product="product" :count="quantitySelectorValue" />
  
            <div class="mt-4">
              <div class="flex flex-col md:flex-row flex-wrap gap-4">
                <UiQuantitySelector
                  :min-value="productGetters.getMinimumOrderQuantity(product)"
                  :value="quantitySelectorValue"
                  class="min-w-[145px] flex-grow-0 flex-shrink-0 basis-0"
                  @change-quantity="changeQuantity"
                />
                <SfTooltip
                  show-arrow
                  placement="top"
                  :label="isNotValidVariation || isSalableText"
                  class="flex-grow-[2] flex-shrink basis-auto whitespace-nowrap"
                >
                  <UiButton
                    type="submit"
                    data-testid="add-to-cart"
                    size="lg"
                    class="w-full h-full"
                    :disabled="loading || !productGetters.isSalable(product)"
                  >
                    <template #prefix>
                      <div v-if="!loading" class="flex row items-center">
                        <SfIconShoppingCart size="sm" />
                        {{ t('addToCart') }}
                      </div>
                      <div v-else>
                        <SfLoaderCircular size="sm" />
                      </div>
                    </template>
                  </UiButton>
                </SfTooltip>
              </div>
  
              <div class="mt-4 typography-text-xs flex gap-1">
                <span>{{ t('asterisk') }}</span>
                <span>{{ showNetPrices ? t('itemExclVAT') : t('itemInclVAT') }}</span>
                <i18n-t keypath="excludedShipping" scope="global">
                  <template #shipping>
                    <SfLink
                      :href="localePath(paths.shipping)"
                      target="_blank"
                      class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                    >
                      {{ $t('delivery') }}
                    </SfLink>
                  </template>
                </i18n-t>
              </div>
              <template v-if="showPayPalButtons">
                <PayPalExpressButton type="SingleItem" class="mt-4" @validation-callback="paypalHandleAddToCart" />
                <PayPalPayLaterBanner placement="product" :amount="priceWithProperties * quantitySelectorValue" />
              </template>
            </div>
          </section>
        </div>
      </div>
      -->
    </form>
  </template>
  
<script setup lang="ts">
import { productGetters, reviewGetters, productBundleGetters } from '@plentymarkets/shop-api';
import { SfCounter, SfRating, SfIconShoppingCart, SfLoaderCircular, SfTooltip, SfLink } from '@storefront-ui/vue';
import type { PriceCardPadding, PurchaseCardProps } from '~/components/ui/PurchaseCard/types';
import type { PayPalAddToCartCallback } from '~/components/PayPal/types';
import { paths } from '~/utils/paths';

const props = withDefaults(defineProps<PurchaseCardProps>(), {
  configuration: () => ({
    fields: {
      itemName: true,
      price: true,
      tags: true,
      availability: true,
      starRating: true,
      orderProperties: true,
      variationProperties: true,
      previewText: true,
      attributes: true,
      itemBundle: false,
      graduatedPrices: true,
      addToWishlist: true,
      quantityAndAddToCart: true,
      itemText: false,
      technicalData: false,
    },
    fieldsOrder: [
      'itemName',
      'price',
      'tags',
      'availability',
      'starRating',
      'variationProperties',
      'orderProperties',
      'previewText',
      'attributes',
      'itemBundle',
      'graduatedPrices',
      'addToWishlist',
      'quantityAndAddToCart',
      'itemText',
      'technicalData',
    ],
    fieldsDisabled: ['quantityAndAddToCart', 'price', 'itemBundle', 'attributes'],
    wishlistSize: 'small',

    dropShadow: true,
    borders: true,
    borderColor: '#EFF4F1',
    layout: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
});

const { currentProduct } = useProducts();

const { data: productReviews } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));
const reviewAverage = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const { getSetting } = useSiteSettings('dontSplitItemBundle');
const showBundleComponents = computed(() => {
  return getSetting() !== '1';
});

const { showNetPrices } = useCart();
const viewport = useViewport();
const { getCombination } = useProductAttributes();
const { getPropertiesForCart, getPropertiesPrice } = useProductOrderProperties();
const { validateAllFields, invalidFields, resetInvalidFields } = useValidatorAggregator('properties');
const {
  validateAllFields: validateAllFieldsAttributes,
  invalidFields: invalidAttributeFields,
  resetInvalidFields: resetAttributeFields,
} = useValidatorAggregator('attributes');
const { clear, send } = useNotification();
const { addToCart, loading } = useCart();
const { t } = useI18n();
const quantitySelectorValue = ref(productGetters.getMinimumOrderQuantity(props?.product));
const { isWishlistItem } = useWishlist();
const { openQuickCheckout } = useQuickCheckout();
const { crossedPrice } = useProductPrice(props?.product);
const { reviewArea } = useProductReviews(Number(productGetters.getId(props?.product)));
const localePath = useLocalePath();

const inlineStyle = computed(() => {
  const layout = props?.configuration?.layout || ({} as PriceCardPadding);

  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
    borderColor: props?.configuration?.borderColor || 'transparent',
  };
});

onMounted(() => {
  resetInvalidFields();
  resetAttributeFields();
});

onBeforeRouteLeave(() => {
  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) clear();
  resetInvalidFields();
  resetAttributeFields();
});

const priceWithProperties = computed(
  () =>
    (productGetters.getSpecialOffer(props?.product) ||
      productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.unitPrice.value ||
      productGetters.getPrice(props?.product) ||
      0) + getPropertiesPrice(props?.product),
);

const basePriceSingleValue = computed(
  () =>
    productGetters.getGraduatedPriceByQuantity(props?.product, quantitySelectorValue.value)?.basePrice ??
    productGetters.getDefaultBasePrice(props?.product),
);

const handleValidationErrors = (): boolean => {
  send({
    message: [
      t('errorMessages.missingOrWrongProperties'),
      '',
      ...invalidAttributeFields.value.map((field) => field.name),
      ...invalidFields.value.map((field) => field.name),
      '',
      t('errorMessages.pleaseFillOutAllFields'),
    ],
    type: 'negative',
  });

  return false;
};

const handleAddToCart = async (quickCheckout = true) => {
  await validateAllFieldsAttributes();
  await validateAllFields();

  if (invalidFields.value.length > 0 || invalidAttributeFields.value.length > 0) {
    return handleValidationErrors();
  }

  if (!getCombination()) {
    send({ message: t('productAttributes.notValidVariation'), type: 'negative' });
    return false;
  }

  const addedToCart = await addToCart({
    productId: Number(productGetters.getId(props?.product)),
    quantity: Number(quantitySelectorValue.value),
    basketItemOrderParams: getPropertiesForCart(),
  });

  if (addedToCart) {
    quickCheckout
      ? openQuickCheckout(props?.product, quantitySelectorValue.value)
      : send({ message: t('addedToCart'), type: 'positive' });

    if (getSetting() === '0') {
      send({ message: t('error.notificationsItemBundleSplitted'), type: 'warning' });
    }
  }

  return addedToCart;
};

const paypalHandleAddToCart = async (callback: PayPalAddToCartCallback) => {
  const added = await handleAddToCart(false);

  callback(added);
};

const changeQuantity = (quantity: string) => {
  quantitySelectorValue.value = Number(quantity);
};

const isReviewsAccordionOpen = () => {
  const customerReviewsAccordionDetailsElement = document.querySelector('#customerReviewsAccordion')
    ?.firstChild as HTMLDetailsElement;

  return customerReviewsAccordionDetailsElement.open;
};

const openReviewsAccordion = () => {
  const customerReviewsClickElement = document.querySelector('#customerReviewsClick') as HTMLElement;
  customerReviewsClickElement?.click();
};

const isSalableText = computed(() => (productGetters.isSalable(props?.product) ? '' : t('itemNotAvailable')));
const isNotValidVariation = computed(() => (getCombination() ? '' : t('productAttributes.notValidVariation')));
const showPayPalButtons = computed(() => Boolean(getCombination()) && productGetters.isSalable(props?.product));

const scrollToReviews = () => {
  if (!isReviewsAccordionOpen()) {
    openReviewsAccordion();
  }

  if (reviewArea.value) {
    reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// for later
const colorValue = computed(() => {
  const property = productGetters.getPropertyById(17, props?.product);
  return property?.values instanceof Array ? property?.values.length : 0;
});
</script>
  