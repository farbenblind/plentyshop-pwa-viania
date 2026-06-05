<template>
    <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
      <NarrowContainer>
        <div class="bg-[#F5EFEF] w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <div class="max-w-screen-3xl mx-auto p-[20px] xl:py-[80px]">
            <div class="flex flex-col gap-[30px] xl:grid xl:grid-cols-[auto_520px] xl:gap-[80px]">
              <div class="left xl:min-w-[0] xl:self-start xl:sticky xl:top-[40px]">              
                <Gallery
                  :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" 
                  :product="product"
                />
              </div>              
              <div class="right">
                <div class="drift-zoom-image relative xl:sticky xl:top-[40px]">
                  <NuxtLazyHydrate when-idle>
                    <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
                  </NuxtLazyHydrate>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-screen-3xl mx-auto pt-[20px] xl:pt-[60px]" v-if="true || reviewGetters.getTotalReviews(countsProductReviews) > 0">
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />
        </div>
        <CrossSellingItemsAccessoryCyt />
        <CrossSellingItemsSimilarCyt />
        <RecommendedProducts :categoryId="String(product?.defaultCategories?.[0]?.id)" :headline="'Unsere Topseller in ' + breadcrumbs[breadcrumbs.length - 2]?.name" class="pt-[45px] xl:pt-[60px] 4xl:pt-[80px]" />
      </NarrowContainer>
  
      <UiReviewModal />
      <ProductLegalDetailsDrawer v-if="open" :product="product" class="[&_aside]:!border-0 [&_*]:!text-[14px] [&_header]:!px-[20px] [&_header]:!py-[5px] [&_header]:!bg-black [&_[role='tabpanel']>.py-2.px-4]:!p-0 [&_button]:!rounded-[0]" />
    </NuxtLayout>
  </template>
  
<script setup lang="ts">
import type { Product, ApiError } from '@plentymarkets/shop-api';
import type { WatchStopHandle } from 'vue';
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import type { Locale } from '#i18n';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

const route = useRoute();
const { setCurrentProduct } = useProducts();
const { setBlocksListContext } = useBlocksList();
const { setProductMetaData, setProductRobotsMetaData, setProductCanonicalMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { productParams, productId } = createProductParams(route.params);
const { productForEditor, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const product = productForEditor;
const { disableActions } = useEditor();
const { fetchProductReviews, fetchProductAuthenticatedReviews, data: productReviews } = useProductReviews(Number(productId));
const { open } = useProductLegalDetailsDrawer();
const { setPageMeta } = usePageMeta();
const { resetNotification } = useEditModeNotification(disableActions);
const { isAuthorized } = useCustomer();
const { variationId } = useProductAttributes();
let variationWatchHandler: WatchStopHandle | undefined;

const { addModernImageExtensionForGallery } = useModernImage();

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
  validate: async (route) => {
    return validateProductParams(route.params);
  },
  type: 'product',
  isBlockified: false,
  identifier: 0,
});
const RecommendedProductsAsync = defineAsyncComponent(
  async () => await import('~/components/RecommendedProducts/RecommendedProducts.vue'),
);

const showRecommended = ref(false);
const recommendedSection = ref<HTMLElement | null>(null);
const productName = computed(() => productGetters.getName(product.value));
const icon = 'sell';
setPageMeta(productName.value, icon);

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams).then(() => {
  usePlentyEvent().emit('frontend:productLoaded', {
    product: product.value,
  });
});

if (Object.keys(product.value).length === 0) {
  if (import.meta.client) showError({ statusCode: 404, statusMessage: 'Product not found' });

  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  });
}
setCurrentProduct(product.value || ({} as Product));
setProductMeta();


onBeforeRouteLeave(() => {
  setCurrentProduct({} as Product);
});

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
}
await fetchReviews();

setBreadcrumbs();

/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
        replace: true,
      });
    }
  },
);

watch(
  () => product.value,
  () => {
    setProductCanonicalMetaData(product.value);
    setProductMetaData(product.value);
    setProductRobotsMetaData(product.value);
  },
  { immediate: true },
);

watch(
  () => route.params,
  () => {
    const productName = computed(() => productGetters.getName(product.value));
    const icon = 'sell';
    setPageMeta(productName.value, icon);
  },
  { immediate: true },
);

// for seo stuff (added by Antonio)
watch(
  () => product.value,
  () => {
    const image = productGetters.getCoverImage(product.value)
    const title = productGetters.getName(product.value)
    const description = product.value?.texts?.metaDescription || product.value?.texts?.shortDescription || ''

    useSeoMeta({
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogType: 'website',
      generator: 'createyourtemplate',
    })
  },
  { immediate: true },
)

const observeRecommendedSection = () => {
  if (import.meta.client && recommendedSection.value) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          showRecommended.value = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 250px 0px',
      },
    );
    observer.observe(recommendedSection.value);
  }
};

async function handleVariationChange() {
  if (Number(productParams.variationId) !== variationId.value && variationId.value > 0) {
    try {
      productParams.variationId = variationId.value;
      await fetchProduct(productParams);
      setCurrentProduct(productForEditor.value || ({} as Product));
      setProductMetaData(product.value);
    } catch (error) {
      useHandleError(error as ApiError);
    }
  }
}

onBeforeRouteLeave(() => {
  resetNotification();
  if (variationWatchHandler) {
    variationWatchHandler();
  }
});

onNuxtReady(() => observeRecommendedSection());
</script>
  